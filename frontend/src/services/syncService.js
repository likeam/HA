import api from "./api";
import { getPendingBills, savePendingBills } from "./offlineDB";
import { formatUrduCurrency } from "../utils/currency";
import { translateLabel } from "../utils/urduUtils";

// Configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds
const CONCURRENT_REQUESTS = 3;

/**
 * Sync pending bills with the backend
 * @param {function} progressCallback - Callback to report sync progress
 * @returns {Promise<{successCount: number, failedCount: number}>} - Sync result
 */
export const syncPendingBills = async (progressCallback = () => {}) => {
  const pendingBills = getPendingBills();
  if (pendingBills.length === 0) {
    return { successCount: 0, failedCount: 0 };
  }

  let successCount = 0;
  let failedCount = 0;
  let remainingBills = [...pendingBills];
  const retryQueue = [];

  // Process bills in batches
  while (remainingBills.length > 0 || retryQueue.length > 0) {
    // Process concurrent requests
    const currentBatch = remainingBills.splice(0, CONCURRENT_REQUESTS);
    const batchPromises = currentBatch.map((bill) =>
      syncBillWithRetry(bill, MAX_RETRIES, RETRY_DELAY)
    );

    // Wait for the current batch to complete
    const results = await Promise.allSettled(batchPromises);

    // Process results
    results.forEach((result, index) => {
      const bill = currentBatch[index];

      if (result.status === "fulfilled" && result.value.success) {
        successCount++;
      } else {
        // Add to retry queue with retry count
        const retryCount = result.value?.retryCount || 0;
        if (retryCount < MAX_RETRIES) {
          retryQueue.push({ ...bill, retryCount: retryCount + 1 });
        } else {
          failedCount++;
          console.error(
            `Failed to sync bill after ${MAX_RETRIES} attempts`,
            bill
          );
        }
      }

      // Update progress
      progressCallback({
        total: pendingBills.length,
        completed: successCount + failedCount,
        success: successCount,
        failed: failedCount,
        remaining: remainingBills.length + retryQueue.length,
      });
    });

    // Add retries back to remaining bills
    remainingBills = [...retryQueue, ...remainingBills];
    retryQueue.length = 0;
  }

  // Update localStorage
  savePendingBills(remainingBills);

  return { successCount, failedCount };
};

/**
 * Sync a single bill with retry logic
 * @param {object} bill - Bill to sync
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} delay - Delay between retries in milliseconds
 * @returns {Promise<{success: boolean, retryCount: number}>} - Sync result
 */
const syncBillWithRetry = async (bill, maxRetries, delay) => {
  let retryCount = bill.retryCount || 0;

  while (retryCount <= maxRetries) {
    try {
      // Attempt to sync
      await api.post("/bills", bill.data);
      return { success: true, retryCount };
    } catch (error) {
      // If offline or network error, retry
      if (error.message === "Network Error" || error.code === "ECONNABORTED") {
        retryCount++;
        if (retryCount <= maxRetries) {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } else {
        // Other errors (e.g., validation) shouldn't be retried
        console.error("Non-retryable error:", error);
        return { success: false, retryCount };
      }
    }
  }

  return { success: false, retryCount };
};

/**
 * Generate sync report in Urdu
 * @param {number} successCount - Number of successfully synced bills
 * @param {number} failedCount - Number of failed bills
 * @param {number} totalAmount - Total amount of synced bills
 * @returns {string} - Formatted Urdu report
 */
export const generateSyncReport = (
  successCount,
  failedCount,
  totalAmount = 0
) => {
  if (successCount === 0 && failedCount === 0) {
    return translateLabel("NO_PENDING_BILLS");
  }

  const reportParts = [];

  if (successCount > 0) {
    reportParts.push(
      `${successCount} ${translateLabel("BILLS_SYNCED_SUCCESS")} - ` +
        `${translateLabel("TOTAL_AMOUNT")}: ${formatUrduCurrency(totalAmount)}`
    );
  }

  if (failedCount > 0) {
    reportParts.push(`${failedCount} ${translateLabel("BILLS_SYNCED_FAILED")}`);
  }

  return reportParts.join("\n");
};

/**
 * Get sync statistics
 * @returns {object} - Sync statistics
 */
export const getSyncStatistics = () => {
  const pendingBills = getPendingBills();
  const totalAmount = pendingBills.reduce(
    (sum, bill) => sum + bill.data.total,
    0
  );

  return {
    pendingCount: pendingBills.length,
    totalAmount,
    lastSync: localStorage.getItem("lastSync") || null,
  };
};

/**
 * Process pending bills and prepare for sync
 * @returns {Array} - Processed bills with additional metadata
 */
export const prepareBillsForSync = () => {
  return getPendingBills().map((bill) => {
    const created = new Date(bill.createdAt);
    const createdStr = created.toLocaleString("ur-PK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      ...bill,
      createdAtStr: createdStr,
      formattedTotal: formatUrduCurrency(bill.data.total),
    };
  });
};

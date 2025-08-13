import Product from "../models/Product.js";
import { offlineQueue } from "./offlineQueue.js";

// Process pending operations when coming online
export const syncOfflineData = async () => {
  if (!offlineQueue.hasOperations()) return;

  try {
    const operations = offlineQueue.getOperations();
    const results = await Promise.all(
      operations.map((op) => {
        if (op.type === "CREATE_PRODUCT") {
          return Product.create(op.payload);
        }
        if (op.type === "UPDATE_PRODUCT") {
          return Product.findByIdAndUpdate(op.id, op.payload, { new: true });
        }
        // Add other operation types
      })
    );

    offlineQueue.clear();
    return results;
  } catch (error) {
    console.error("Sync failed:", error);
    throw error;
  }
};

// Check online status periodically
setInterval(() => {
  if (navigator.onLine && offlineQueue.hasOperations()) {
    syncOfflineData();
  }
}, 30000); // Check every 30 seconds

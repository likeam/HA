import { createSale, bulkUpdateStock } from "./api";
import offlineDB from "./offlineDB";
import { store } from "../app/store";

export const syncData = async () => {
  try {
    const pendingSales = await offlineDB.getPendingSales();
    let syncedCount = 0;

    for (const sale of pendingSales) {
      await createSale(sale);
      await offlineDB.removeSale(sale.id);
      syncedCount++;
    }

    return syncedCount;
  } catch (error) {
    console.error("Sync failed:", error);
    return 0;
  }
};

export const initSync = () => {
  // Sync when coming online
  window.addEventListener("online", async () => {
    const syncedCount = await syncData();
    if (syncedCount > 0) {
      store.dispatch({ type: "offline/resetPendingSync" });
    }
  });

  // Periodic sync every 5 minutes
  setInterval(async () => {
    if (navigator.onLine) {
      await syncData();
    }
  }, 5 * 60 * 1000);
};

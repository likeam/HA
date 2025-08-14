import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const syncOfflineData = async () => {
  try {
    // Sync unsynced sales
    const unsyncedSales = await Sale.find({ isSynced: false });

    for (const sale of unsyncedSales) {
      // Update stock for each item
      for (const item of sale.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      // Mark sale as synced
      sale.isSynced = true;
      await sale.save();
    }

    console.log(`Synced ${unsyncedSales.length} sales`);
    return { success: true, syncedSales: unsyncedSales.length };
  } catch (error) {
    console.error("Sync failed:", error);
    return { success: false, error: error.message };
  }
};

export const initSyncInterval = () => {
  setInterval(() => {
    if (process.env.OFFLINE_MODE === "false") {
      syncOfflineData();
    }
  }, 300000); // Sync every 5 minutes
};

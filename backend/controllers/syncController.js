import Bill from "../models/Bill.js";
import {
  getPendingBills,
  clearPendingBills,
} from "../config/offlineStorage.js";

// Sync offline bills with database
export const syncBills = async (req, res) => {
  try {
    const pendingBills = getPendingBills();
    if (pendingBills.length === 0) {
      return res.json({ message: "No pending bills to sync" });
    }

    const savedBills = await Bill.insertMany(pendingBills);
    clearPendingBills();

    res.json({
      message: `${savedBills.length} bills synced successfully`,
      bills: savedBills,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

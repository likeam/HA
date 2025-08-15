import Bill from "../models/Bill.js";
import { saveOfflineBill } from "../config/offlineStorage.js";

// Create new bill (with offline support)
export const createBill = async (req, res) => {
  try {
    const { items, total } = req.body;

    // Calculate total if not provided
    const calculatedTotal =
      total ||
      items.reduce((sum, item) => {
        return sum + item.price * (item.quantity || item.weight);
      }, 0);

    const bill = new Bill({
      items,
      total: calculatedTotal,
    });

    // Try to save to DB
    try {
      const savedBill = await bill.save();
      res.status(201).json(savedBill);
    } catch (dbError) {
      // Save offline if DB connection fails
      saveOfflineBill(bill);
      res.status(202).json({
        message: "Bill saved offline",
        bill,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bills
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("items.product");
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

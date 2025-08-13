import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import { generateUrduBill } from "../services/urduBillGenerator.js";

// Create new bill (POS transaction)
export const createBill = async (req, res) => {
  try {
    const { items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid bill items" });
    }

    // Prepare bill items and update stock
    const billItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(400)
          .json({ error: `Product not found: ${item.product}` });
      }

      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product.name}`,
        });
      }

      // Calculate item total
      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      billItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create bill
    const bill = await Bill.create({
      items: billItems,
      total,
      createdAt: new Date(),
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bills with filters
export const getBills = async (req, res) => {
  try {
    const { startDate, endDate, minAmount, maxAmount } = req.query;

    let query = {};

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Amount range filter
    if (minAmount || maxAmount) {
      query.total = {};
      if (minAmount) query.total.$gte = Number(minAmount);
      if (maxAmount) query.total.$lte = Number(maxAmount);
    }

    const bills = await Bill.find(query).sort({ createdAt: -1 }).limit(50);

    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate printable Urdu bill
export const printUrduBill = async (req, res) => {
  try {
    const { id } = req.params;
    const htmlBill = await generateUrduBill(id);

    res.set("Content-Type", "text/html");
    res.send(htmlBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reprint bill
export const reprintBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    const htmlBill = await generateUrduBill(id);
    res.set("Content-Type", "text/html");
    res.send(htmlBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

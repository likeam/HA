import Product from "../models/Product.js";
import Subcategory from "../models/Subcategory.js";

// Create product with offline support
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, barcode, subcategory } = req.body;

    // Verify subcategory exists
    const validSubcategory = await Subcategory.findById(subcategory);
    if (!validSubcategory) {
      return res.status(400).json({ error: "Invalid subcategory" });
    }

    const product = await Product.create({
      name,
      price,
      stock,
      barcode,
      subcategory,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get products with pagination
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, subcategory } = req.query;

    const query = {};
    if (subcategory) query.subcategory = subcategory;

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("subcategory");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Offline product update handler
export const offlineUpdate = async (req, res) => {
  try {
    // Contains array of pending operations
    const { operations } = req.body;

    // Process each operation
    const results = await Promise.all(
      operations.map(async (op) => {
        if (op.type === "create") {
          return Product.create(op.data);
        }
        if (op.type === "update") {
          return Product.findByIdAndUpdate(op.id, op.data, { new: true });
        }
        if (op.type === "delete") {
          return Product.findByIdAndDelete(op.id);
        }
      })
    );

    res.json({ success: true, results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

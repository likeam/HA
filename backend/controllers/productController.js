import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

export const createProduct = async (req, res) => {
  try {
    const { category, subcategory } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Verify subcategory exists and belongs to category
    const subcategoryExists = await Subcategory.findOne({
      _id: subcategory,
      category,
    });
    if (!subcategoryExists) {
      return res
        .status(400)
        .json({ error: "Invalid subcategory for category" });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, subcategory, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { barcode: search },
      ];
    }

    const products = await Product.find(filter)
      .populate("category")
      .populate("subcategory");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bulkUpdateStock = async (req, res) => {
  try {
    const { updates } = req.body;
    const operations = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.productId },
        update: { $inc: { stock: update.quantity } },
      },
    }));

    await Product.bulkWrite(operations);
    res.json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

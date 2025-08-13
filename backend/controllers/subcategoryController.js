import Subcategory from "../models/Subcategory.js";
import Product from "../models/Product.js";

// Create new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    // Validate input
    if (!name || !category) {
      return res.status(400).json({
        error: "Both name and category are required",
      });
    }

    // Check if category exists
    const categoryExists = await Category.exists({ _id: category });
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const subcategory = await Subcategory.create({ name, category });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get subcategories by category
export const getSubcategories = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category) query.category = category;

    const subcategories = await Subcategory.find(query).populate(
      "category",
      "name"
    );
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    // Validate category if changing
    if (category) {
      const categoryExists = await Category.exists({ _id: category });
      if (!categoryExists) {
        return res.status(400).json({ error: "Invalid category" });
      }
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, category },
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete subcategory (and associated products)
export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete subcategory and its products
    const [subcategory] = await Promise.all([
      Subcategory.findByIdAndDelete(id),
      Product.deleteMany({ subcategory: id }),
    ]);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json({ message: "Subcategory and its products deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

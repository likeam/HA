import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check for duplicate
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories with subcategory counts
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "category",
          as: "subcategories",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          subcategoryCount: { $size: "$subcategories" },
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category (and associated subcategories)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete category and its subcategories
    const [category] = await Promise.all([
      Category.findByIdAndDelete(id),
      Subcategory.deleteMany({ category: id }),
    ]);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category and its subcategories deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";

// Create new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const { urduName, englishName, category } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newSubcategory = new Subcategory({ urduName, englishName, category });
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subcategories
export const getSubcategories = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    const subcategories = await Subcategory.find(query)
      .populate("category", "urduName")
      .sort({ createdAt: -1 });

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate("category", "urduName");

    res.json(updatedSubcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete subcategory
export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

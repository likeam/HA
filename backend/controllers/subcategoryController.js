import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";

export const createSubcategory = async (req, res) => {
  try {
    const { category } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const subcategory = new Subcategory(req.body);
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const subcategories = await Subcategory.find(filter).populate("category");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!subcategory)
      return res.status(404).json({ error: "Subcategory not found" });
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory)
      return res.status(404).json({ error: "Subcategory not found" });
    res.json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

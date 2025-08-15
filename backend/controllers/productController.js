import Product from "../models/Product.js";
import Subcategory from "../models/Subcategory.js";

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { urduName, englishName, price, byWeight, subcategory } = req.body;

    // Verify subcategory exists
    const subcategoryExists = await Subcategory.findById(subcategory);
    if (!subcategoryExists) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const newProduct = new Product({
      urduName,
      englishName,
      price,
      byWeight,
      subcategory,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { subcategory, category, search } = req.query;
    let query = {};

    if (subcategory) {
      query.subcategory = subcategory;
    } else if (category) {
      const subcategories = await Subcategory.find({ category });
      query.subcategory = { $in: subcategories.map((s) => s._id) };
    }

    if (search) {
      query.$or = [
        { urduName: { $regex: search, $options: "i" } },
        { englishName: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .populate({
        path: "subcategory",
        populate: {
          path: "category",
          select: "urduName",
        },
      })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "subcategory",
      populate: {
        path: "category",
        select: "urduName",
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategoryController.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  bulkUpdateStock,
} from "../controllers/productController.js";

const router = express.Router();

// Category routes
router.route("/categories").post(createCategory).get(getCategories);

router.route("/categories/:id").put(updateCategory).delete(deleteCategory);

// Subcategory routes
router.route("/subcategories").post(createSubcategory).get(getSubcategories);

router
  .route("/subcategories/:id")
  .put(updateSubcategory)
  .delete(deleteSubcategory);

// Product routes
router.route("/products").post(createProduct).get(getProducts);

router.route("/products/:id").put(updateProduct).delete(deleteProduct);

router.post("/products/stock/bulk", bulkUpdateStock);

export default router;

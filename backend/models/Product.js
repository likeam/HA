import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    urduName: { type: String, required: true },
    englishName: String,
    price: { type: Number, required: true },
    byWeight: { type: Boolean, default: false },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

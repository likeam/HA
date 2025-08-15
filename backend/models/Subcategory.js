import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    urduName: { type: String, required: true },
    englishName: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;

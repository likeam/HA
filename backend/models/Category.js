import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    urduName: { type: String, required: true },
    englishName: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;

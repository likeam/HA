import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      maxlength: [50, "Subcategory name cannot exceed 50 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Parent category is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster querying
subcategorySchema.index({ name: 1 }); // For name-based searches
subcategorySchema.index({ category: 1 }); // For category-based lookups

// Virtual for product count
subcategorySchema.virtual("productCount", {
  ref: "Product",
  localField: "_id",
  foreignField: "subcategory",
  count: true,
});

// Cascade delete products when subcategory is deleted
subcategorySchema.pre("deleteOne", { document: true }, async function (next) {
  await this.model("Product").deleteMany({ subcategory: this._id });
  next();
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
export default Subcategory;

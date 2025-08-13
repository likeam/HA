import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    costPrice: {
      type: Number,
      min: [0, "Cost price cannot be negative"],
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    minStockLevel: {
      type: Number,
      min: [0, "Minimum stock level cannot be negative"],
      default: 5,
    },
    barcode: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
      trim: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Subcategory is required"],
    },
    lastSold: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    offlineId: String, // For offline synchronization
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for optimized queries
productSchema.index({ name: "text" }); // Text search index
productSchema.index(
  { barcode: 1 },
  { unique: true, partialFilterExpression: { barcode: { $type: "string" } } }
);
productSchema.index({ subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ stock: 1 });

// Virtual for low stock alert
productSchema.virtual("isLowStock").get(function () {
  return this.stock <= this.minStockLevel;
});

// Virtual for profit margin
productSchema.virtual("profitMargin").get(function () {
  if (!this.costPrice || this.costPrice <= 0) return 0;
  return ((this.price - this.costPrice) / this.costPrice) * 100;
});

// Pre-save hook to handle offline IDs
productSchema.pre("save", function (next) {
  if (this.isNew && !this.barcode) {
    // Generate simple barcode if not provided
    this.barcode = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Generate offline ID for unsynced records
  if (this.isNew && !this._id) {
    this.offlineId = `offline-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;

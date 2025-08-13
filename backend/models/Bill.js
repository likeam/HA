import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  total: {
    type: Number,
    required: [true, "Item total is required"],
    min: [0, "Item total cannot be negative"],
  },
  offlineProductId: String, // For offline synchronization
});

const billSchema = new mongoose.Schema(
  {
    items: {
      type: [billItemSchema],
      required: [true, "Bill items are required"],
      validate: {
        validator: (items) => items.length > 0,
        message: "Bill must have at least one item",
      },
    },
    total: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    tax: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    grandTotal: {
      type: Number,
      required: [true, "Grand total is required"],
      min: [0, "Grand total cannot be negative"],
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "mobile", "credit"],
      default: "cash",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    isSynced: {
      type: Boolean,
      default: false,
    },
    offlineId: {
      type: String,
      unique: true,
      sparse: true,
    },
    printedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient querying
billSchema.index({ createdAt: -1 }); // Most recent bills first
billSchema.index({ grandTotal: 1 });
billSchema.index({ "items.product": 1 });
billSchema.index(
  { offlineId: 1 },
  { unique: true, partialFilterExpression: { offlineId: { $type: "string" } } }
);

// Pre-save hook for totals calculation
billSchema.pre("save", function (next) {
  // Calculate item totals
  this.items.forEach((item) => {
    item.total = item.price * item.quantity;
  });

  // Calculate subtotal
  const subtotal = this.items.reduce((sum, item) => sum + item.total, 0);

  // Calculate totals
  this.total = subtotal;
  this.grandTotal = subtotal + this.tax - this.discount;

  // Generate offline ID for unsynced bills
  if (this.isNew && !this._id && !this.offlineId) {
    this.offlineId = `offline-bill-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  next();
});

// Post-save hook to update product stock
billSchema.post("save", async function (doc) {
  // Only process if not synced (offline) or new bill
  if (!doc.isSynced) {
    for (const item of doc.items) {
      try {
        await mongoose
          .model("Product")
          .updateOne(
            { _id: item.product },
            { $inc: { stock: -item.quantity } }
          );
      } catch (error) {
        console.error(
          `Error updating stock for product ${item.product}:`,
          error
        );
      }
    }
    doc.isSynced = true;
    await doc.save();
  }
});

// Virtual for bill date formatting
billSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleString("ur-PK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const Bill = mongoose.model("Bill", billSchema);
export default Bill;

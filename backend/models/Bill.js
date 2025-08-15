import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: Number,
  weight: Number,
  price: { type: Number, required: true },
});

const billSchema = new mongoose.Schema(
  {
    items: [billItemSchema],
    total: { type: Number, required: true },
    isSynced: { type: Boolean, default: false }, // For offline tracking
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

export default Bill;

import Product from "../models/Product.js";
import Bill from "../models/Bill.js";
import { offlineQueue } from "../services/offlineQueue.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

// Get initial data for offline use
export const getInitialData = async (req, res) => {
  try {
    const [products, categories, subcategories] = await Promise.all([
      Product.find().select("name price stock barcode subcategory"),
      Category.find().select("name"),
      Subcategory.find().select("name category"),
    ]);

    res.json({
      products,
      categories,
      subcategories,
      lastSync: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Process pending offline operations
export const syncOperations = async (req, res) => {
  try {
    const { operations } = req.body;

    if (!Array.isArray(operations)) {
      return res.status(400).json({ error: "Invalid operations format" });
    }

    const results = [];

    for (const op of operations) {
      try {
        let result;

        switch (op.type) {
          case "CREATE_PRODUCT":
            result = await Product.create(op.data);
            results.push({ ...op, status: "success", result });
            break;

          case "UPDATE_PRODUCT":
            result = await Product.findByIdAndUpdate(op.id, op.data, {
              new: true,
            });
            results.push({ ...op, status: "success", result });
            break;

          case "DELETE_PRODUCT":
            await Product.findByIdAndDelete(op.id);
            results.push({ ...op, status: "success" });
            break;

          case "CREATE_BILL":
            // Re-validate bill before processing
            const billItems = [];
            let total = 0;

            for (const item of op.data.items) {
              const product = await Product.findById(item.product);

              if (!product) {
                throw new Error(`Product not found: ${item.product}`);
              }

              // Verify stock hasn't changed
              if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}`);
              }

              const itemTotal = product.price * item.quantity;
              total += itemTotal;

              billItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                total: itemTotal,
              });

              // Update stock
              product.stock -= item.quantity;
              await product.save();
            }

            result = await Bill.create({
              items: billItems,
              total,
              createdAt: op.data.createdAt || new Date(),
            });

            results.push({ ...op, status: "success", result });
            break;

          default:
            results.push({
              ...op,
              status: "skipped",
              error: "Invalid operation type",
            });
        }
      } catch (error) {
        // Add to offline queue to retry later
        offlineQueue.addOperation(op);
        results.push({ ...op, status: "failed", error: error.message });
      }
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending operations
export const getPendingOperations = async (req, res) => {
  try {
    const pendingOps = offlineQueue.getOperations();
    res.json(pendingOps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear pending operations
export const clearPendingOperations = async (req, res) => {
  try {
    offlineQueue.clear();
    res.json({ message: "Pending operations cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

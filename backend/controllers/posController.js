import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import offlineSync from "../config/offlineSync.js";
import { generateUrduBill } from "../services/urduBillService.js";

export const createSale = async (req, res) => {
  try {
    const { items, offlineId } = req.body;
    let total = 0;
    const productUpdates = [];
    const saleItems = [];

    // Process each item
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product.name}: ${product.stock} available`,
        });
      }

      // Calculate total and prepare updates
      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      saleItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      });

      productUpdates.push({
        productId: item.product,
        quantity: -item.quantity,
      });
    }

    // Create sale record
    const sale = new Sale({
      items: saleItems,
      total,
      offlineId,
      isSynced: !req.isOffline,
    });

    await sale.save();

    // Update stock if online
    if (!req.isOffline) {
      await Product.bulkWrite(
        productUpdates.map((update) => ({
          updateOne: {
            filter: { _id: update.productId },
            update: { $inc: { stock: update.quantity } },
          },
        }))
      );
    }

    // Generate Urdu bill
    const billPath = await generateUrduBill(sale);

    res.status(201).json({
      ...sale.toObject(),
      billUrl: `/bills/${billPath.split("/").pop()}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const syncOfflineSales = async (req, res) => {
  try {
    const { sales } = req.body;
    const results = [];

    for (const offlineSale of sales) {
      const sale = await createSale(offlineSale);
      results.push({
        offlineId: offlineSale.offlineId,
        serverId: sale._id,
      });
    }

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const sales = await Sale.find(filter).populate("items.product");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

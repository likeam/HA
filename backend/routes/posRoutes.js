import express from "express";
import {
  createSale,
  syncOfflineSales,
  getSales,
} from "../controllers/posController.js";
import {
  offlineMiddleware,
  queueOfflineRequests,
} from "../middlewares/offlineQueue.js";

const router = express.Router();

router.use(offlineMiddleware);

// POS routes
router.route("/sales").post(queueOfflineRequests, createSale).get(getSales);

router.post("/sales/sync", syncOfflineSales);

export default router;

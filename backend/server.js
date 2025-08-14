import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import posRoutes from "./routes/posRoutes.js";
import { initSyncInterval } from "./services/offlineSyncService.js";
import logger from "./utils/logger.js";

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/bills", express.static(path.join(__dirname, "public/bills")));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error", err));

// Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/pos", posRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);

  // Initialize offline sync
  if (process.env.OFFLINE_MODE === "true") {
    logger.warn("Running in offline mode");
  } else {
    initSyncInterval();
  }
});

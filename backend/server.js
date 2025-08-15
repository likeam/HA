import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/sync", syncRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

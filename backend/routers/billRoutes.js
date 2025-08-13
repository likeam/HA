import express from "express";
import {
  createBill,
  getBills,
  printUrduBill,
  reprintBill,
} from "../controllers/billController.js";

const router = express.Router();

// POS operations
router.post("/", createBill);
router.get("/", getBills);
router.get("/print/:id", printUrduBill);
router.get("/reprint/:id", reprintBill);

export default router;

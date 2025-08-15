import express from "express";
import { syncBills } from "../controllers/syncController.js";

const router = express.Router();

router.post("/sync-bills", syncBills);

export default router;

import { Router } from "express";
import {
  getMaterialUsage,
  getMaterialUsageByCompany,
  getMaterialUsageByType,
} from "../controllers/stats.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/by-material", verifyToken, getMaterialUsage);
router.get("/by-type", verifyToken, getMaterialUsageByType);
router.get("/by-company", verifyToken, getMaterialUsageByCompany);

export default router;

import { Router } from "express";
import {
  getMaterialUsage,
  getMaterialUsageByCompany,
  getMaterialUsageByType,
} from "../controllers/stats.controller.js";

const router = Router();

router.get("/by-material", getMaterialUsage);
router.get("/by-type", getMaterialUsageByType);
router.get("/by-company", getMaterialUsageByCompany);

export default router;

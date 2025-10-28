import { Router } from "express";
import {
  getMaterialUsage,
  getMaterialUsageByCompany,
} from "../controllers/stats.controller.js";

const router = Router();

router.get("/by-material", getMaterialUsage);
router.get("/by-company", getMaterialUsageByCompany);

export default router;

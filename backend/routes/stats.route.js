import { Router } from "express";
import { getMaterialUsageByCompany } from "../controllers/stats.controller.js";

const router = Router();

router.get("/by-company", getMaterialUsageByCompany);

export default router;

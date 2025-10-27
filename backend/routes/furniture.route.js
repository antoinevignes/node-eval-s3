import { Router } from "express";
import {
  addFurniture,
  getFurnitures,
} from "../controllers/furniture.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/add", verifyToken, addFurniture);
router.get("/", getFurnitures);

export default router;

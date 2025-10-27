import { Router } from "express";
import {
  addFurniture,
  getFurnitureById,
  getFurnitures,
} from "../controllers/furniture.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getFurnitures);
router.get("/:id", getFurnitureById);
router.post("/add", verifyToken, addFurniture);

export default router;

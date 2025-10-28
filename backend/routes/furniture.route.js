import { Router } from "express";
import {
  addFurniture,
  getFurnitureById,
  getFurnitures,
  updateQtyById,
} from "../controllers/furniture.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getFurnitures);
router.get("/:id", getFurnitureById);
router.post("/add", verifyToken, addFurniture);
router.patch("/:id/qty", verifyToken, updateQtyById);

export default router;

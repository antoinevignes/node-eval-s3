import { Router } from "express";
import {
  addFurniture,
  getFurnitures,
} from "../controllers/furniture.controller.js";

const router = Router();

router.post("/add", addFurniture);
router.get("/", getFurnitures);

export default router;

import { Router } from "express";
import { getMaterialDetails } from "../controllers/material.controller.js";

const router = Router();

router.get("/:id", getMaterialDetails);

export default router;

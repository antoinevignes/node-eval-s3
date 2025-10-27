import { Router } from "express";
import userRoute from "./user.route.js";
import furnitureRoute from "./furniture.route.js";

const router = Router();

router.use("/furniture", furnitureRoute);
router.use("/user", userRoute);

export default router;

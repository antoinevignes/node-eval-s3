import { Router } from "express";
import userRoute from "./user.route.js";
import furnitureRoute from "./furniture.route.js";
import materialRoute from "./material.route.js";
import statsRoute from "./stats.route.js";

const router = Router();

router.use("/furniture", furnitureRoute);
router.use("/material", materialRoute);
router.use("/user", userRoute);
router.use("/stats", statsRoute);

export default router;

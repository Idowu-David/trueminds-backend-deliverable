import { Router } from "express";
import { createOrder } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, createOrder);

export default router;

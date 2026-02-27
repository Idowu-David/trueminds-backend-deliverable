import { Router } from "express";
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from "../controllers/orderController.js";
import { authorizeAdmin, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getUserOrders);
router.get("/:id", protectRoute, getOrderById);
router.patch("/:id/status", protectRoute, authorizeAdmin, updateOrderStatus)

export default router;

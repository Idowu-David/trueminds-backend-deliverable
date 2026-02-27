import { type Response } from "express";
import { type AuthRequest } from "../middleware/authMiddleware.js";
import { menu, orders, type Order, type OrderItem } from "../db.js";

export const createOrder = (req: AuthRequest, res: Response) => {
  const { items } = req.body;

  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  let totalAmount = 0;
  const orderItems: OrderItem[] = [];

  for (const cartItem of items) {
    const actualFood = menu.find((m) => m.id === cartItem.foodId);
    if (!actualFood) {
      return res.status(404).json({
        success: false,
        message: `Food item with ID ${cartItem.foodId} does not exist.`,
      });
    }

    if (!actualFood.isAvailable) {
      return res.status(400).json({
        success: false,
        message: `Sorry, ${actualFood.name} is currently sold out.`,
      });
    }

    totalAmount += actualFood.price * cartItem.quantity;

    orderItems.push({
      foodId: actualFood.id,
      quantity: cartItem.quantity,
      priceAtPurchase: actualFood.price,
    });
  }

  const newOrder: Order = {
    id: `order_${Date.now()}`,
    userId: userId,
    items: orderItems,
    totalAmount: totalAmount,
    status: "Pending",
    createdAt: new Date(),
  };

  orders.push(newOrder);

  return res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    data: newOrder,
  });
};

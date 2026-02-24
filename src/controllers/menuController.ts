import { type Response, type Request } from "express";
import { type MenuItem, menu } from "../db.js";

export const getAllMenuItems = async (req: Request, res: Response) => {
  const availableFood = menu.filter((item) => item.isAvailable === true);

  return res.status(200).json({
    success: true,
    message: "Menu fetched successfully",
    count: availableFood.length,
    data: availableFood,
  });
};

export const getMenuItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const foodItem = menu.find((item) => item.id === id);

  if (!foodItem) {
    return res.status(404).json({
      success: false,
      message: "This food item is not on our menu",
    });
  }

  console.log("FOOD ITEM", foodItem);

  res.status(200).json({
    success: true,
    message: "Item retrieved successfully",
    data: foodItem,
  });
};


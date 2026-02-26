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

export const addItemToStock = async (req: Request, res: Response) => {
  const { name, description, price, category, isAvailable } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "Name, Price and Category are required",
    });
  }

  const foodId = `food_${menu.length + 1}`;

  const newFoodItem: MenuItem = {
    id: foodId,
    name,
    description,
    category,
    price,
    isAvailable: isAvailable !== undefined ? isAvailable : true
  };

  menu.push(newFoodItem);

  return res.status(201).json({
    success: true,
    message: "Food item successfully added",
    data: newFoodItem
  });
};

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  role: "user" | "admin";
  lastName: string;
  passwordHash: string;
  referralCode?: string | undefined;
  isVerified: boolean;
  otp?: string | undefined; // in milliseconds
  otpExpiry?: number | undefined;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // Swallow, Rice, Snacks, Dessert
  isAvailable: boolean;
}

export const users: User[] = [];
export const menu: MenuItem[] = [
  {
    id: "food_1",
    name: "Classic Jollof Rice & Chicken",
    description:
      "Party-style smoky Jollof rice served with grilled chicken and fried plantains.",
    price: 3500,
    category: "Mains",
    isAvailable: true,
  },
  {
    id: "food_2",
    name: "Pounded Yam & Egusi Soup",
    description:
      "Smooth pounded yam served with rich Egusi soup and assorted meat.",
    price: 4500,
    category: "Swallow",
    isAvailable: true,
  },
  {
    id: "food_3",
    name: "Beef Sausage Roll",
    description: "Warm, flaky pastry filled with spiced minced beef.",
    price: 1000,
    category: "Snacks",
    isAvailable: true,
  },
  {
    id: "food_4",
    name: "Chilled Zobo Drink",
    description: "Refreshing hibiscus drink infused with ginger and pineapple.",
    price: 800,
    category: "Drinks",
    isAvailable: false,
  },
];

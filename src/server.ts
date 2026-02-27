import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[DEBUG] ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`,
  );

  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("BACKEND IS UP");
});

app.use("/api/auth", authRoutes);
app.use("/api/foods", menuRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

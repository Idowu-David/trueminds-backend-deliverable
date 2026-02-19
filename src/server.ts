import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[DEBUG] ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`,
  );

  // IF THIS LINE IS MISSING, POSTMAN WILL SPIN FOREVER
  next();
});


app.get('/', (req: Request, res: Response) => {
  res.send('BACKEND IS UP')
})

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

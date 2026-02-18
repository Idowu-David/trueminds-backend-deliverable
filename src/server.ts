import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('RUNNING')
})

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

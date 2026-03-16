import { silenceDotenv, logStatus } from './utils/utils.js';
import process from "node:process";

const restore = silenceDotenv();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js"; 
import invoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config();
restore();

const app = express();

connectDB()
  .then(() => logStatus('mongo'))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running smoothly", status: "OK" });
});

app.use("/api", userRoutes);
app.use("/api/inventory", inventoryRoutes); 
app.use("/api/invoices", invoiceRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => logStatus('server', PORT));
}

export default app;
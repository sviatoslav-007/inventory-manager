import { silenceDotenv, logStatus } from './utils/utils.js';
const restore = silenceDotenv();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js"; 

dotenv.config();
restore();

const app = express();
const PORT = 5050;

connectDB().then(() => logStatus('mongo'));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/inventory", inventoryRoutes); 

app.listen(PORT, () => logStatus('server', PORT));

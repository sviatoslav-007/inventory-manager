import mongoose from "mongoose";
import process from "node:process";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("❌ Помилка підключення:", err.message);
    process.exit(1); 
  }
};

export default connectDB;

import mongoose from "mongoose";
import process from "node:process";
import dns from 'node:dns'; dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("❌ Помилка підключення:", err.message);
    process.exit(1); 
  }
};

export default connectDB;

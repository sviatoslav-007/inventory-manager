import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Наявні" },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Inventory", inventorySchema);
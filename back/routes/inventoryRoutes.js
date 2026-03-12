import express from "express";
import Inventory from "../models/Inventory.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Помилка оновлення", error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Товар не знайдено" });
    }

    res.status(200).json({ message: "Товар успішно видалено" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

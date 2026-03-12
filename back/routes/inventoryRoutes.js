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

export default router;
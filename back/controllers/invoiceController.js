import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  try {

    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    

    res.status(201).json({
      success: true,
      message: "Накладну збережено",
      data: savedInvoice
    });
  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Помилка при збереженні",
      error: error.message
    });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  code: { type: String, default: "" },
});

const invoiceSchema = new mongoose.Schema({
  number: { type: String, default: "" },
  date: { type: Date, default: Date.now },
  supplier: { type: String, default: "" },
  code: { type: String, default: "" }, 
  address: { type: String, default: "" },
  responsible: { type: String, default: "" },
  items: [invoiceItemSchema],
  totalSum: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

invoiceSchema.pre("save", function () {
  if (this.items && this.items.length > 0) {
    this.totalSum = this.items.reduce(
      (acc, item) => acc + (Number(item.quantity || 0) * Number(item.price || 0)), 
      0
    );
  } else {
    this.totalSum = 0;
  }
});

export default mongoose.model("Invoice", invoiceSchema);
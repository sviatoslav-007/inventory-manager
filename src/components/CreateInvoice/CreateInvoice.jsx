import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Header from "../Header/Header";
import WordExport from "../WordExport/WordExport";
import styles from "./CreateInvoice.module.css";
import axios from "axios";

const CreateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState(() => {
    const savedItem = localStorage.getItem("editedItem");

    const baseState = {
      number: "001",
      date: new Date().toISOString().split("T")[0],
      supplier: "",
      code: "",
      address: "",
      items: [],
      responsible: "",
    };

    if (savedItem) {
      try {
        const item = JSON.parse(savedItem);
        return {
          ...baseState,
          items: [
            {
              name: item.name || "",
              quantity: item.quantity || 1,
              price: item.price || 0,
              code: item.code || "", // додаємо код, якщо він передбачений
            },
          ],
        };
      } catch (error) {
        console.error("Помилка парсингу даних з localStorage:", error);
        return baseState;
      }
    }

    return baseState;
  });

  // Очищуємо localStorage після того, як дані були успішно завантажені в стейт
  useEffect(() => {
    localStorage.removeItem("editedItem");
  }, []);
  
  const saveToDb = async () => {
  try {
    await axios.post("http://localhost:5050/api/invoices", invoiceData);
    console.log("Дані збережено в БД при експорті");
  } catch (error) {
    console.error("Помилка збереження в БД:", error);
  }
};

  const handleInvoiceChange = (field, value) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    let processedValue = value;

    if (field === "quantity" || field === "price") {
      processedValue = Number(value);
    }

    newItems[index][field] = processedValue;
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newItem = { name: "", quantity: 1, price: 0, code: "" };
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const totalQuantity = invoiceData.items.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0),
    0,
  );

  const totalSum = invoiceData.items.reduce(
    (acc, item) => acc + (Number(item.quantity) * Number(item.price) || 0),
    0,
  );

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Накладна на замовлення товару</h2>

        <div className={styles.header}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>№ Накладної</label>
            <input
              type="text"
              value={invoiceData.number}
              onChange={(e) => handleInvoiceChange("number", e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Дата</label>
            <input
              type="date"
              value={invoiceData.date}
              onChange={(e) => handleInvoiceChange("date", e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.supplierInfo}>
          <input
            type="text"
            placeholder="Постачальник (назва)"
            value={invoiceData.supplier}
            onChange={(e) => handleInvoiceChange("supplier", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Код ЄДРПОУ"
            value={invoiceData.code}
            onChange={(e) => handleInvoiceChange("code", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Адреса поставки"
            value={invoiceData.address}
            onChange={(e) => handleInvoiceChange("address", e.target.value)}
            className={styles.input}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Найменування товару</th>
              <th>Кількість</th>
              <th>Ціна (грн)</th>
              <th>Сума</th>
              <th>Код товару</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className={styles.inputTable}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className={styles.inputTable}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    className={styles.inputTable}
                  />
                </td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
                <td
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) =>
                      handleItemChange(index, "code", e.target.value)
                    }
                    className={styles.inputTable}
                  />
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => removeItem(index)}
                    title="Видалити рядок"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {invoiceData.items.length === 0 && (
              <tr>
                <td>Товари відсутні. Натисніть "+", щоб додати новий рядок.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          type="button"
          className={styles.iconButtonAdd}
          onClick={addItem}
          title="Додати товар"
        >
          <FaPlus /> Додати рядок
        </button>

        <div className={styles.totals}>
          <p>
            <strong>Загальна кількість:</strong> {totalQuantity}
          </p>
          <p>
            <strong>Загальна сума:</strong> {totalSum.toFixed(2)} грн
          </p>
        </div>

        <div className={styles.signatures}>
          <div className={styles.signatureBlock}>
            <p>Відповідальний (ПІБ):</p>
            <input
              type="text"
              value={invoiceData.responsible}
              onChange={(e) =>
                handleInvoiceChange("responsible", e.target.value)
              }
              className={styles.input}
            />
            <div className={styles.line}>Підпис: __________________</div>
          </div>
          <div className={styles.signatureBlock}>
            <p>Постачальник:</p>
            <input
              type="text"
              value={invoiceData.supplier}
              onChange={(e) => handleInvoiceChange("supplier", e.target.value)}
              className={styles.input}
            />
            <div className={styles.line}>Підпис: __________________</div>
          </div>
        </div>

        <div className={styles.actions}>
          <WordExport invoiceData={invoiceData} onExport={saveToDb} />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

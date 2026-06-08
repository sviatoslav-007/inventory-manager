import React, { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Header from "../Header/Header";
import WordExport from "../WordExport/WordExport";
import styles from "./CreateInvoice.module.css";
import axios from "axios";

const CreateInvoice = () => {
  const [productsList, setProductsList] = useState([]);
  const [activeDropdownIdx, setActiveDropdownIdx] = useState(null);
  const dropdownRef = useRef(null);

  const [invoiceData, setInvoiceData] = useState(() => {
    const savedItem = localStorage.getItem("editedItem");
    const baseState = {
      number: "001",
      date: new Date().toISOString().split("T")[0],
      supplier: "",
      code: "",
      address: "",
      items: [{ name: "", quantity: 1, price: 0, code: "" }],
      responsible: "",
    };

    if (savedItem) {
      try {
        const item = JSON.parse(savedItem);
        return {
          ...baseState,
          items: [{ name: item.name || "", quantity: 1, price: item.price || 0, code: item._id || "" }],
        };
      } catch (error) {
        return baseState;
      }
    }
    return baseState;
  });

  useEffect(() => {
    localStorage.removeItem("editedItem");
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/inventory/all");
        console.log("Завантажено з БД для автокомпліту:", response.data);
        if (Array.isArray(response.data)) {
          setProductsList(response.data);
        }
      } catch (error) {
        console.error("Помилка завантаження інвентаря:", error);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownIdx(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInvoiceChange = (field, value) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    if (field === "quantity" || field === "price") {
      newItems[index][field] = value === "" ? 0 : Number(value);
    } else {
      newItems[index][field] = value;
    }
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const selectProduct = (index, product) => {
    const newItems = [...invoiceData.items];
    newItems[index].name = product.name;
    newItems[index].price = product.price;
    newItems[index].code = product._id;
    
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
    setActiveDropdownIdx(null); 
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0, code: "" }],
    }));
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const saveToDb = async () => {
    try {
      await axios.post("http://localhost:5050/api/invoices", invoiceData);
      alert("Накладна успішно збережена!");
    } catch (error) {
      console.error(error);
    }
  };

  const totalQuantity = invoiceData.items.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
  const totalSum = invoiceData.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price) || 0), 0);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Накладна на замовлення товару</h2>

        <div className={styles.header}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>№ Накладної</label>
            <input type="text" value={invoiceData.number} onChange={(e) => handleInvoiceChange("number", e.target.value)} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Дата</label>
            <input type="date" value={invoiceData.date} onChange={(e) => handleInvoiceChange("date", e.target.value)} className={styles.input} />
          </div>
        </div>

        <div className={styles.supplierInfo}>
          <input type="text" placeholder="Постачальник" value={invoiceData.supplier} onChange={(e) => handleInvoiceChange("supplier", e.target.value)} className={styles.input} />
          <input type="text" placeholder="Код ЄДРПОУ" value={invoiceData.code} onChange={(e) => handleInvoiceChange("code", e.target.value)} className={styles.input} />
          <input type="text" placeholder="Адреса поставки" value={invoiceData.address} onChange={(e) => handleInvoiceChange("address", e.target.value)} className={styles.input} />
        </div>

        <table className={styles.table} style={{ overflow: "visible" }}>
          <thead>
            <tr>
              <th>Найменування товару</th>
              <th>Кількість</th>
              <th>Ціна (грн)</th>
              <th>Сума</th>
              <th>Код товару</th>
            </tr>
          </thead>
          <tbody ref={dropdownRef}>
            {invoiceData.items.map((item, index) => {
              
              const currentInputText = item.name || "";
              const filteredSuggestions = productsList.filter((product) => {
                if (!product || !product.name) return false;
                return product.name.toLowerCase().includes(currentInputText.toLowerCase());
              });

              return (
                <tr key={index}>
                  {/* Контейнер відносного позиціонування */}
                  <td style={{ position: "relative", overflow: "visible" }}>
                    <input
                      type="text"
                      value={item.name}
                      placeholder="Введіть назву (напр. мишка)..."
                      onFocus={() => setActiveDropdownIdx(index)}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      className={styles.inputTable}
                      autoComplete="off"
                    />

                    {activeDropdownIdx === index && currentInputText.length > 0 && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        backgroundColor: "#ffffff",
                        border: "1px solid #adadad",
                        borderRadius: "4px",
                        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                        zIndex: 9999,
                        maxHeight: "180px",
                        overflowY: "auto",
                        textAlign: "left"
                      }}>
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((product) => (
                            <div
                              key={product._id}
                              onClick={() => selectProduct(index, product)}
                              style={{
                                padding: "10px 12px",
                                cursor: "pointer",
                                borderBottom: "1px solid #f0f0f0",
                                fontSize: "14px",
                                color: "#333",
                                backgroundColor: "#fff"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#eec"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                            >
                              <span style={{ fontWeight: "bold" }}>{product.name}</span> — {product.price} грн
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: "10px", color: "#888", fontSize: "13px", backgroundColor: "#fafafa" }}>
                            Товару "{currentInputText}" не знайдено в базі
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className={styles.inputTable} /></td>
                  <td><input type="number" value={item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} className={styles.inputTable} /></td>
                  <td style={{ fontWeight: "bold" }}>{(item.quantity * item.price).toFixed(2)}</td>
                  <td style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input type="text" value={item.code} readOnly className={styles.inputTable} placeholder="ID товару" />
                    <button type="button" onClick={() => removeItem(index)} className={styles.iconButton}><FaTrashAlt /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button type="button" onClick={addItem} className={styles.iconButtonAdd}><FaPlus /> Додати рядок</button>

        <div className={styles.totals}>
          <p><strong>Загальна кількість:</strong> {totalQuantity}</p>
          <p><strong>Загальна сума:</strong> {totalSum.toFixed(2)} грн</p>
        </div>

        <div className={styles.signatures}>
          <div className={styles.signatureBlock}>
            <p>Відповідальний (ПІБ):</p>
            <input type="text" value={invoiceData.responsible} onChange={(e) => handleInvoiceChange("responsible", e.target.value)} className={styles.input} />
          </div>
          <div className={styles.signatureBlock}>
            <p>Постачальник:</p>
            <input type="text" value={invoiceData.supplier} onChange={(e) => handleInvoiceChange("supplier", e.target.value)} className={styles.input} />
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
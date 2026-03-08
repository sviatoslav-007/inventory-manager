import React, { useState } from "react";
import Header from "../Header/Header";
import WordExport from "../WordExport/WordExport";
import styles from "./CreateInvoice.module.css";

const CreateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    number: "001",
    date: "2026-03-08",
    supplier: "ТОВ 'Оріж Техно'",
    code: "12345",
    address: "вул. Котнарка 1, Київ",
    items: [
      { name: "Комп'ютерний стіл", quantity: 10, price: 1000, code: "001-01" },
      { name: "Офісне крісло", quantity: 15, price: 850, code: "001-02" },
      { name: "Принтер", quantity: 5, price: 3500, code: "001-03" },
    ],
    responsible: "Петро Іванов",
  });

  const handleInvoiceChange = (field, value) => {
    setInvoiceData({ ...invoiceData, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    if (field === "quantity" || field === "price") value = Number(value);
    newItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const totalQuantity = invoiceData.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalSum = invoiceData.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Накладна на замовлення товару</h2>

        <div className={styles.header}>
          <input
            type="text"
            value={invoiceData.number}
            onChange={(e) => handleInvoiceChange("number", e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            value={invoiceData.date}
            onChange={(e) => handleInvoiceChange("date", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.supplierInfo}>
          <input
            type="text"
            value={invoiceData.supplier}
            onChange={(e) => handleInvoiceChange("supplier", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            value={invoiceData.code}
            onChange={(e) => handleInvoiceChange("code", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
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
              <th>Ціна</th>
              <th>Сума</th>
              <th>На товар</th>
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
                <td>{item.quantity * item.price}</td>
                <td>
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) =>
                      handleItemChange(index, "code", e.target.value)
                    }
                    className={styles.inputTable}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.totals}>
          <p>
            <strong>Загальна кількість:</strong> {totalQuantity}
          </p>
          <p>
            <strong>Загальна сума:</strong> {totalSum} грн
          </p>
        </div>

        <div className={styles.signatures}>
          <div>
            <p>Відповідальний:</p>
            <input
              type="text"
              value={invoiceData.responsible}
              onChange={(e) =>
                handleInvoiceChange("responsible", e.target.value)
              }
              className={styles.input}
            />
            <p>Підпис: __________________</p>
          </div>
          <div>
            <p>Постачальник:</p>
            <p>Підпис: __________________</p>
          </div>
        </div>

        <WordExport invoiceData={invoiceData} />
      </div>
    </div>
  );
};

export default CreateInvoice;
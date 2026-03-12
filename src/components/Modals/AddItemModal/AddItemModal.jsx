import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./AddItemModal.module.css";

const AddItemModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    price: 0,
    status: "Наявні",
    category: "electronics",
  });

  // 1. Закриття на клавішу Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    // 2. Клік на Overlay закриває модалку
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* 3. stopPropagation запобігає закриттю при кліку всередині самої модалки */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Додати новий товар</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Назва товару</label>
            <input
              name="name"
              type="text"
              placeholder="Введіть назву..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Кількість</label>
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Ціна (грн)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Статус</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Наявні">Наявні</option>
              <option value="Під замовлення">Під замовлення</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Категорія</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="electronics">Електроніка</option>
              <option value="furniture">Меблі</option>
            </select>
          </div>

          <button type="submit" className={styles.saveButton}>
            Додати товар
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
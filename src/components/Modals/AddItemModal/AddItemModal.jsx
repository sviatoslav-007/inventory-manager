import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import styles from "./AddItemModal.module.css";

const AddItemModal = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "", // Порожньо спочатку, щоб не було 0
    price: "",    // Порожньо спочатку
    status: "Наявні",
    category: "", // Тепер пустий рядок для ручного введення
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Для ціни та кількості дозволяємо лише цифри
    if (name === "quantity" || name === "price") {
      // Якщо поле порожнє — записуємо порожньо, інакше перетворюємо на число
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валідація перед відправкою (перевіряємо, що числа більше 0)
    if (Number(formData.quantity) <= 0 || Number(formData.price) <= 0) {
      alert("Кількість та ціна мають бути більшими за 0");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5050/api/inventory/add", formData);
      if (response.status === 201) {
        if (onRefresh) onRefresh(); 
        onClose(); 
      }
    } catch (error) {
      console.error("Помилка при додаванні товару:", error);
      alert("Не вдалося зберегти товар");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
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
              placeholder="Наприклад: Ноутбук"
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
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                className={styles.noArrows} 
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Ціна (грн)</label>
              <input
                name="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className={styles.noArrows}
                required
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
            <input
              name="category"
              type="text"
              placeholder="Наприклад: Електроніка"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.saveButton} disabled={loading}>
            {loading ? "Збереження..." : "Додати товар"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./EditItemModal.module.css";

const EditItemModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    status: item.status,
    category: item.category,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "Enter") {
      e.preventDefault(); 
      onSave(formData); 
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [formData, onClose, onSave]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Редагувати товар</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Назва товару"
            required
          />
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Кількість"
            required
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ціна"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Наявні">Наявні</option>
            <option value="Під замовлення">Під замовлення</option>
          </select>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="electronics">Електроніка</option>
            <option value="furniture">Меблі</option>
          </select>
          <button type="submit" className={styles.saveButton}>
            Зберегти
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
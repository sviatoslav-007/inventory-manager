import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./EditItemModal.module.css";

const EditItemModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    quantity: item?.quantity ?? "", 
    price: item?.price ?? "",
    status: item?.status || "Наявні",
    category: item?.category || "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "quantity" || name === "price") {
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
    
    if (Number(formData.quantity) <= 0 || Number(formData.price) <= 0) {
      alert("Кількість та ціна мають бути більшими за 0");
      return;
    }

    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const handleCreateInvoice = () => {
    localStorage.setItem("editedItem", JSON.stringify(formData));
    navigate("/createInvoice");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Редагувати товар</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Назва товару</label>
            <input
              name="name"
              type="text"
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
                className={styles.noArrows} 
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Ціна (грн)</label>
              <input
                name="price"
                type="number"
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

          <div className={styles.modalActions}>
            <button 
              type="submit" 
              className={styles.saveButton} 
              disabled={loading}
            >
              {loading ? "Зберігаємо..." : "Зберегти зміни"}
            </button>
            
            <button 
              type="button" 
              className={styles.saveButton} 
              onClick={handleCreateInvoice}
            >
              Створити інвойс
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
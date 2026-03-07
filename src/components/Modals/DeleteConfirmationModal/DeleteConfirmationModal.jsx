import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({ item, onClose, onConfirm }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); 
      }
      if (e.key === "Enter") {
        e.preventDefault(); 
        onConfirm(); 
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onConfirm]);

  if (!item) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className={styles.modalHeader}>
          <h2>Підтвердження видалення</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        <p>
          Ви дійсно хочете видалити <strong>{item.name}</strong>?
        </p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.confirmButton}
            onClick={() => {
              onConfirm();
            }}
          >
            Видалити
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => {
              onClose(); 
            }}
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
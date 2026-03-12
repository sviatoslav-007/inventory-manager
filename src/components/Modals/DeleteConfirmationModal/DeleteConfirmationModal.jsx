import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({ item, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") {
        e.preventDefault();
        handleConfirm();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Підтвердження видалення</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.modalContent}>
          <p>Ви дійсно хочете видалити <strong>{item.name}</strong>?</p>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Видалення..." : "Видалити"}
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
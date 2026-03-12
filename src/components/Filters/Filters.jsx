import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import { FaSearch } from "react-icons/fa";

const Filters = ({
  category,
  status,
  priceOrder,
  categoryOptions = [],
  statusOptions = [],
  priceOptions = [],
  onCategoryChange,
  onStatusChange,
  onPriceOrderChange,
  onSearchChange,
  searchQuery,
  children, 
}) => {
  // Синхронізуємо локальний пошук із зовнішнім, якщо він зміниться ззовні
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value); // Миттєва фільтрація при наборі
    }
  };

  return (
    <div className={styles.filters}>
      {/* Фільтр Категорії */}
      <select
        value={category}
        onChange={onCategoryChange}
        className={styles.select}
      >
        <option value="">Усі категорії</option>
        {categoryOptions.map((cat, idx) => (
          <option key={idx} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Фільтр Статусу — саме тут працює твій setItemStatus */}
      <select
        value={status}
        onChange={onStatusChange}
        className={styles.select}
      >
        <option value="">Будь-який статус</option>
        {statusOptions.map((stat, idx) => (
          <option key={idx} value={stat.value}>
            {stat.label}
          </option>
        ))}
      </select>

      {/* Сортування Ціни */}
      <select
        value={priceOrder}
        onChange={onPriceOrderChange}
        className={styles.select}
      >
        <option value="">Сортувати ціну</option>
        {priceOptions.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Пошук */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          value={localSearchQuery}
          onChange={handleInputChange}
          placeholder="Назва товару..."
        />
        <div className={styles.searchIconWrapper}>
          <FaSearch />
        </div>
      </div>

      {children}
    </div>
  );
};

export default Filters;
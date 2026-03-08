import React, { useState } from "react";
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
  onSearchChange, // Пропс для обробки пошуку
  searchQuery, // Поточний запит пошуку
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const handleSearchSubmit = () => {
    if (onSearchChange) {
      onSearchChange(localSearchQuery);
    }
  };

  return (
    <div className={styles.filters}>
      <select
        value={category}
        onChange={onCategoryChange}
        className={styles.select}
      >
        <option value="">Категорія</option>
        {categoryOptions.map((cat, idx) => (
          <option key={idx} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={onStatusChange}
        className={styles.select}
      >
        <option value="">Статус</option>
        {statusOptions.map((stat, idx) => (
          <option key={idx} value={stat.value}>
            {stat.label}
          </option>
        ))}
      </select>

      <select
        value={priceOrder}
        onChange={onPriceOrderChange}
        className={styles.select}
      >
        <option value="">Ціна</option>
        {priceOptions.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Поле для пошуку */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          value={localSearchQuery}
          onChange={handleSearchChange}
          placeholder="Пошук..."
        />
        <button
          className={styles.searchButton}
          onClick={handleSearchSubmit}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Filters;

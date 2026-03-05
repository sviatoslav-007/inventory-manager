import React from "react";
import styles from "./Filters.module.css";

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
}) => {
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
    </div>
  );
};

export default Filters;

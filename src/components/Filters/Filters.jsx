import React from 'react';
import styles from './Filters.module.css';

const Filters = ({
  itemStatus,
  priceOrder,
  statusOptions = [],
  priceOptions = [],
  onStatusChange,
  onPriceOrderChange,
  onSearch
}) => {
  return (
    <div className={styles.filters}>
      <select value={itemStatus} onChange={onStatusChange} className={styles.select}>
        <option value="">Статус</option>
        {statusOptions.map((status, idx) => (
          <option key={idx} value={status}>{status}</option>
        ))}
      </select>

      <select value={priceOrder} onChange={onPriceOrderChange} className={styles.select}>
        <option value="">Ціна</option>
        {priceOptions.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <button className={styles.submitButton} onClick={onSearch}>Пошук</button>
    </div>
  );
};

export default Filters;
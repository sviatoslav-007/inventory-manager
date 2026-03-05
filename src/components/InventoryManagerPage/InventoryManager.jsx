import React, { useState } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import styles from './InventoryManager.module.css';

const InventoryManager = () => {
  const [itemStatus, setItemStatus] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  const purchaseItems = [
    { name: 'Принтер HP Laves/et', quantity: 15, price: 3500, status: 'Наявні', category: 'electronics' },
    { name: 'Офісне Крісло ErgoPlus', quantity: 15, price: 855, status: 'Наявні', category: 'furniture' },
    { name: 'Ноутбук Dell Inspiron', quantity: 5, price: 3500, status: 'Під замовлення', category: 'electronics' },
  ];

  const statusOptions = ['Наявні', 'Під замовлення'];
  const priceOptions = [
    { value: 'asc', label: 'За зростанням' },
    { value: 'desc', label: 'За спаданням' }
  ];

  const filteredItems = purchaseItems.filter(item =>
    (itemStatus ? item.status === itemStatus : true)
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (priceOrder === 'asc') return a.price - b.price;
    if (priceOrder === 'desc') return b.price - a.price;
    return 0;
  });

  const handleSearch = () => {
    console.log('Фільтруємо товари');
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.pageTitle}>Менеджер закупок</h1>

      <Filters
        itemStatus={itemStatus}
        priceOrder={priceOrder}
        statusOptions={statusOptions}
        priceOptions={priceOptions}
        onStatusChange={(e) => setItemStatus(e.target.value)}
        onPriceOrderChange={(e) => setPriceOrder(e.target.value)}
        onSearch={handleSearch}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва Товару</th>
            <th>Кількість</th>
            <th>Ціна</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price} грн</td>
              <td>{item.status}</td>
              <td>
                <button className={styles.editButton}>Редагувати</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManager;
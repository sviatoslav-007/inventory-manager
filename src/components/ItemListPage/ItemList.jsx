import React, { useState } from 'react';
import Header from '../Header/Header'; 
import styles from './ItemList.module.css'; 

const ItemList = () => {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  const items = [
    { name: 'Комп\'ютерний стіл', quantity: 10, price: 1200, status: 'В наявності', category: 'furniture' },
    { name: 'Офісне крісло', quantity: 15, price: 850, status: 'В наявності', category: 'furniture' },
    { name: 'Принтер', quantity: 5, price: 3500, status: 'Під замовлення', category: 'electronics' },
  ];

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handlePriceOrderChange = (e) => setPriceOrder(e.target.value);

  const filteredItems = items.filter(item => 
    (category ? item.category === category : true) &&
    (status ? item.status === status : true)
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (priceOrder === 'asc') {
      return a.price - b.price;
    } else if (priceOrder === 'desc') {
      return b.price - a.price;
    }
    return 0; 
  });

  return (
    <div className={styles.container}>
      <Header /> 
      <h1 className={styles.pageTitle}>Товари на складі</h1> 
      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <select className={styles.select} value={category} onChange={handleCategoryChange}>
            <option value="">Категорія</option>
            <option value="electronics">Електроніка</option>
            <option value="furniture">Меблі</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <select className={styles.select} value={status} onChange={handleStatusChange}>
            <option value="">Статус</option>
            <option value="available">В наявності</option>
            <option value="backorder">Під замовлення</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <select className={styles.select} value={priceOrder} onChange={handlePriceOrderChange}>
            <option value="">Ціна</option>
            <option value="asc">За зростанням</option>
            <option value="desc">За спаданням</option>
          </select>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва Товару</th>
            <th>Кількість</th>
            <th>Ціна</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price} грн</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
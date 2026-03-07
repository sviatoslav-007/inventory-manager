import React, { useState } from "react";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import styles from "./ItemList.module.css";

const ItemList = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  const items = [
    {
      name: "Комп'ютерний стіл",
      quantity: 10,
      price: 1200,
      status: "В наявності",
      category: "furniture",
    },
    {
      name: "Офісне крісло",
      quantity: 15,
      price: 850,
      status: "В наявності",
      category: "furniture",
    },
    {
      name: "Принтер",
      quantity: 5,
      price: 3500,
      status: "Під замовлення",
      category: "electronics",
    },
  ];

  const categoryOptions = [
    { value: "electronics", label: "Електроніка" },
    { value: "furniture", label: "Меблі" },
  ];

  const statusOptions = [
    { value: "В наявності", label: "В наявності" },
    { value: "Під замовлення", label: "Під замовлення" },
  ];

  const priceOptions = [
    { value: "asc", label: "За зростанням" },
    { value: "desc", label: "За спаданням" },
  ];

  const filteredItems = items.filter(
    (item) =>
      (category ? item.category === category : true) &&
      (status ? item.status === status : true),
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (priceOrder === "asc") return a.price - b.price;
    if (priceOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.pageTitle}>Список товарів</h1>

      <Filters
        category={category}
        status={status}
        priceOrder={priceOrder}
        categoryOptions={categoryOptions}
        statusOptions={statusOptions}
        priceOptions={priceOptions}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onStatusChange={(e) => setStatus(e.target.value)}
        onPriceOrderChange={(e) => setPriceOrder(e.target.value)}
      />

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
              <td
                className={`${styles.status} ${
                  item.status === "В наявності" ? styles.available : ""
                } ${item.status === "Під замовлення" ? styles.backorder : ""}`}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;

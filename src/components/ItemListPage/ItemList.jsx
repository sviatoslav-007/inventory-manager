import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import styles from "./ItemList.module.css";

const ItemList = () => {
  // --- СТАН (STATE) ---
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // --- ЛОГІКА ЗАВАНТАЖЕННЯ (БЕЗПЕЧНА) ---
 // 1. Оновлена функція fetchItems (повертає дані, а не встановлює їх)
const fetchItems = useCallback(async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/inventory/all");
    return response.data; // Повертаємо дані для обробки в ефекті
  } catch (error) {
    console.error("Помилка завантаження товарів:", error);
    return null;
  }
}, []);

// 2. Оновлений useEffect
useEffect(() => {
  let isMounted = true;

  const loadData = async () => {
    // Виконуємо асинхронну дію
    const data = await fetchItems();

    // Оновлюємо стан тільки якщо компонент все ще в DOM 
    // і дані дійсно прийшли
    if (isMounted && data) {
      setPurchaseItems(data);
      setLoading(false);
    } else if (isMounted) {
      setLoading(false);
    }
  };

  loadData();

  return () => {
    isMounted = false; // Очищення
  };
}, [fetchItems]); // fetchItems стабільна завдяки useCallback

  // --- ДИНАМІЧНІ ОПЦІЇ ДЛЯ ФІЛЬТРІВ ---
  const categoryOptions = [...new Set(purchaseItems.map((item) => item.category))]
    .filter(Boolean)
    .map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

  const statusOptions = [
    { value: "Наявні", label: "Наявні"  },
    { value: "Під замовлення", label: "Під замовлення" },
  ];

  const priceOptions = [
    { value: "asc", label: "За зростанням" },
    { value: "desc", label: "За спаданням" },
  ];

  // --- ФІЛЬТРАЦІЯ ТА СОРТУВАННЯ ---
  const filteredItems = purchaseItems.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const matchesStatus = status ? item.status === status : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
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
        searchQuery={searchQuery}
        categoryOptions={categoryOptions}
        statusOptions={statusOptions}
        priceOptions={priceOptions}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onStatusChange={(e) => setStatus(e.target.value)}
        onPriceOrderChange={(e) => setPriceOrder(e.target.value)}
        onSearchChange={(val) => setSearchQuery(val)}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Назва Товару</th>
              <th>Категорія</th>
              <th>Кількість</th>
              <th>Ціна</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className={styles.loadingText}>Завантаження даних...</td>
              </tr>
            ) : sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td className={styles.categoryCell}>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} грн</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        item.status === "Наявні" ? styles.available : styles.backorder
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>Товарів не знайдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
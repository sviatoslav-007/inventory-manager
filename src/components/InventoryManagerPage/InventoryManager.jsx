import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import styles from "./InventoryManager.module.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import EditItemModal from "../Modals/EditItemModal/EditItemModal";
import DeleteModal from "../Modals/DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";

const InventoryManager = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [category, setCategory] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/inventory/all",
      );
      setPurchaseItems(response.data);
    } catch (error) {
      console.error("Помилка завантаження товарів:", error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/inventory/all",
        );
        if (isMounted) {
          setPurchaseItems(response.data);
        }
      } catch (error) {
        console.error("Помилка:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryOptions = [
    ...new Set(purchaseItems.map((item) => item.category)),
  ]
    .filter(Boolean)
    .map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

  const statusOptions = [
    { value: "Наявні", label: "Наявні" },
    { value: "Під замовлення", label: "Під замовлення" },
  ];

  const priceOptions = [
    { value: "asc", label: "За зростанням" },
    { value: "desc", label: "За спаданням" },
  ];

  const filteredItems = purchaseItems.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const matchesStatus = itemStatus ? item.status === itemStatus : true;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (priceOrder === "asc") return a.price - b.price;
    if (priceOrder === "desc") return b.price - a.price;
    return 0;
  });

  const handleEdit = (item) => setEditingItem(item);

  const handleSaveEdit = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5050/api/inventory/update/${editingItem._id}`,
        updatedData,
      );
      fetchItems();
      setEditingItem(null);
    } catch (error) {
      console.error("Помилка оновлення:", error);
      alert("Не вдалося зберегти зміни");
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await axios.delete(
        `http://localhost:5050/api/inventory/delete/${itemToDelete._id}`,
      );
      fetchItems();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Помилка видалення:", error);
      alert("Не вдалося видалити товар");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.pageTitle}>Менеджер закупок</h1>

      <Filters
        category={category}
        status={itemStatus}
        priceOrder={priceOrder}
        searchQuery={searchQuery}
        categoryOptions={categoryOptions}
        statusOptions={statusOptions}
        priceOptions={priceOptions}
        onCategoryChange={(e) => setCategory(e.target.value)}
        onStatusChange={(e) => setItemStatus(e.target.value)}
        onPriceOrderChange={(e) => setPriceOrder(e.target.value)}
        onSearchChange={(value) => setSearchQuery(value)}
      >
        <button
          className={styles.addMainButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus /> Додати
        </button>
      </Filters>

      <div className={styles.tableWrapper}>
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
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} грн</td>
                  <td>
                    <span
                      className={
                        item.status === "Наявні"
                          ? styles.statusInStock
                          : styles.statusOrder
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit title="Редагувати" />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleDeleteClick(item)}
                    >
                      <FaTrashAlt title="Видалити" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  Товарів не знайдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <AddItemModal
          onClose={() => setIsAddModalOpen(false)}
          onRefresh={fetchItems}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          item={itemToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default InventoryManager;

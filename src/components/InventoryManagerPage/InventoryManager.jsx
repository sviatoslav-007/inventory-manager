import React, { useState } from "react";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import styles from "./InventoryManager.module.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import EditItemModal from "../Modals/EditItemModal/EditItemModal";
import DeleteModal from "../Modals/DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";

const InventoryManager = () => {
  // --- СТАН (STATE) ---
  const [category, setCategory] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Стейт для модалок
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Дані товарів
  const [purchaseItems, setPurchaseItems] = useState([
    {
      name: "Принтер HP LaserJet",
      quantity: 15,
      price: 3500,
      status: "Наявні",
      category: "electronics",
    },
    {
      name: "Офісне Крісло ErgoPlus",
      quantity: 15,
      price: 855,
      status: "Наявні",
      category: "furniture",
    },
    {
      name: "Ноутбук Dell Inspiron",
      quantity: 5,
      price: 12500,
      status: "Під замовлення",
      category: "electronics",
    },
  ]);

  // --- ОПЦІЇ ДЛЯ ФІЛЬТРІВ ---
  const categoryOptions = [
    { value: "electronics", label: "Електроніка" },
    { value: "furniture", label: "Меблі" },
  ];

  const statusOptions = [
    { value: "Наявні", label: "Наявні" },
    { value: "Під замовлення", label: "Під замовлення" },
  ];

  const priceOptions = [
    { value: "asc", label: "За зростанням" },
    { value: "desc", label: "За спаданням" },
  ];

  // --- ЛОГІКА ОБРОБКИ ДАНИХ ---
  
  // 1. Фільтрація за категорією, статусом та пошуковим запитом
  const filteredItems = purchaseItems.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const matchesStatus = itemStatus ? item.status === itemStatus : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // 2. Сортування за ціною
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (priceOrder === "asc") return a.price - b.price;
    if (priceOrder === "desc") return b.price - a.price;
    return 0;
  });

  // --- ОБРОБНИКИ ПОДІЙ (HANDLERS) ---

  const handleAddItem = (newItem) => {
    setPurchaseItems((prev) => [...prev, newItem]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (updatedItem) => {
    setPurchaseItems(
      purchaseItems.map((it) => (it === editingItem ? updatedItem : it))
    );
    setEditingItem(null);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setPurchaseItems(purchaseItems.filter((item) => item !== itemToDelete));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.pageTitle}>Менеджер закупок</h1>

      {/* Блок фільтрів з вкладеною кнопкою "Додати" */}
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

      {/* Таблиця результатів */}
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
            sortedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price} грн</td>
                <td>
                  <span className={item.status === "Наявні" ? styles.statusInStock : styles.statusOrder}>
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
              <td colSpan="5" className={styles.noData}>Товарів не знайдено</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* МОДАЛЬНІ ВІКНА */}

      {/* 1. Додавання */}
      {isAddModalOpen && (
        <AddItemModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddItem} 
        />
      )}

      {/* 2. Редагування */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* 3. Підтвердження видалення */}
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
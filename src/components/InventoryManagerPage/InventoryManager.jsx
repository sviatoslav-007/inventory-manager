import React, { useState } from "react";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import styles from "./InventoryManager.module.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import EditItemModal from "../Modals/EditItemModal/EditItemModal";
import DeleteModal from "../Modals/DeleteConfirmationModal/DeleteConfirmationModal";

const InventoryManager = () => {
  const [category, setCategory] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
      price: 3500,
      status: "Під замовлення",
      category: "electronics",
    },
  ]);

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

  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setPurchaseItems(purchaseItems.filter((item) => item !== itemToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleSave = (updatedItem) => {
    setPurchaseItems(
      purchaseItems.map((it) => (it === editingItem ? updatedItem : it)),
    );
    setEditingItem(null);
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
          onClick={() => console.log("Відкрити модалку створення")}
        >
          <FaPlus /> Додати
        </button>
      </Filters>

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
              <td className={styles.actionsCell}>
                <button
                  className={styles.iconButton}
                  onClick={() => handleEdit(item)}
                >
                  <FaEdit title="Редагувати" />
                </button>
                <button
                  className={styles.iconButton}
                  onClick={() => handleDelete(item)}
                >
                  <FaTrashAlt title="Видалити" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
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

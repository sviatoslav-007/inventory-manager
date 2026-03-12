import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaClipboardList, FaDollarSign } from 'react-icons/fa';
import styles from './StatisticsCard.module.css'; 

const StatisticsCard = ({ title, value, icon, bgColor, iconColor }) => (
  <div className={`${styles.statCard} ${styles[bgColor]}`}>
    <div className={styles.statContent}>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statValue}>
        {value}
        <div className={`${styles.icon} ${styles[iconColor]}`}>{icon}</div>
      </div>
    </div>
  </div>
);

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/inventory/all");
        setData(response.data);
      } catch (error) {
        console.error("Помилка завантаження статистики:", error);
      }
    };
    fetchData();
  }, []);


  const totalItemsCount = data.length;

  const underOrderCount = data.filter(
    (item) => item.status === "Під замовлення"
  ).length;

  const totalValue = data.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseFloat(item.quantity) || 0;
    return acc + (price * qty);
  }, 0);

  const formattedPrice = new Intl.NumberFormat('uk-UA').format(totalValue);

  return (
    <div className={styles.statistics}>
      <StatisticsCard
        title="Загальна кількість товарів"
        value={totalItemsCount}
        icon={<FaBox />}
        bgColor="lightBlueBackground"
        iconColor="blueIcon"
      />
      <StatisticsCard
        title="Під замовлення"
        value={underOrderCount}
        icon={<FaClipboardList />}
        bgColor="lightOrangeBackground"
        iconColor="orangeIcon"
      />
      <StatisticsCard
        title="Загальна вартість"
        value={`${formattedPrice} грн`}
        icon={<FaDollarSign />}
        bgColor="lightGreenBackground"
        iconColor="greenIcon"
      />
    </div>
  );
};

export default Statistics;
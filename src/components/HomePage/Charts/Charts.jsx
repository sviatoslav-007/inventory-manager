import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import styles from "./Charts.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Charts = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/inventory/all");
        setInventoryData(response.data);
      } catch (error) {
        console.error("Помилка завантаження даних для графіків:", error);
      }
    };
    fetchData();
  }, []);

  
  const categoryCounts = inventoryData.reduce((acc, item) => {
    const cat = item.category || "Інше";
    acc[cat] = (acc[cat] || 0) + 1; 
    return acc;
  }, {});

  const labels = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Кількість позицій",
        data: counts,
        backgroundColor: ["#6EC1E4", "#378F97", "#0E4C6D", "#4A90E2", "#50E3C2"],
        borderWidth: 1,
      },
    ],
  };

  const statusCounts = inventoryData.reduce((acc, item) => {
    const status = item.status || "Не вказано";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#6EC1E4", "#378F97", "#0E4C6D"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartCard}>
        <h3 className={styles.chartCardTitle}>Товари за категоріями</h3>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { display: false }, beginAtZero: true },
            },
          }}
          height={150}
          width={350}
        />
      </div>
      <div className={styles.doughnutChartCard}>
        <h3 className={styles.chartCardTitle}>Статус товарів</h3>
        <Doughnut
          className={styles.chartSector}
          data={doughnutData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
          }}
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default Charts;
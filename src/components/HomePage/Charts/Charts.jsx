import React from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
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
  const barChartData = {
    labels: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 13],
        backgroundColor: [
          "#6EC1E4", 
          "#378F97", 
          "#0E4C6D", 
          "#6EC1E4", 
          "#378F97", 
          "#0E4C6D", 
          "#6EC1E4", 
        ],
        borderColor: [
          "#6EC1E4", 
          "#378F97", 
          "#0E4C6D", 
          "#6EC1E4", 
          "#378F97", 
          "#0E4C6D", 
          "#6EC1E4", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["В наявності", "В резерві", "Продано"],
    datasets: [
      {
        data: [60, 20, 20],
        backgroundColor: [
          "#6EC1E4",
          "#378F97", 
          "#0E4C6D", 
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartCard}>
        <h3 className={styles.chartCardTitle}>Статистика закупок</h3>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false, 
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          }}
          height={150} 
          width={350}  
        />
      </div>
      <div className={styles.doughnutChartCard}>
        <h3 className={styles.chartCardTitle}>Категорії</h3>
        <Doughnut className={styles.chartSector}
          data={doughnutData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
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
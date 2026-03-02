import React from 'react';
import Header from './Header/Header';  
import StatisticsCard from './StatisticsCard/StatisticsCard';  
import InvoiceTable from './InvoiceTable/InvoiceTable';

import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import styles from './HomePage.module.css';  

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

const HomePage = () => {
  const barChartData = {
    labels: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип'],
    datasets: [
      {
        label: 'Статистика Товарів',
        data: [12, 19, 3, 5, 2, 3, 13],
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1
      }
    ]
  };

  const doughnutData = {
    labels: ['В наявності', 'В резерві', 'Продано'],
    datasets: [
      {
        data: [60, 20, 20],
        backgroundColor: [
          '#0099FF',  
          '#0066CC',  
          '#003366'   
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className={styles.container}>
      <Header />
      <StatisticsCard /> 

      <InvoiceTable />

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3>Статистика Товарів</h3>
          <Bar data={barChartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Статистика Товарів' } } }} />
        </div>
        <div className={styles.chartCard}>
          <h3>Розподіл по категоріях</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
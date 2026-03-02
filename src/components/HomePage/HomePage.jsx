import React from 'react';
import Header from './Header/Header';  
import StatisticsCard from './StatisticsCard/StatisticsCard';  
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

      <div className={styles.invoiceTable}>
        <h3>Останні накладні</h3>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Постачальник</th>
              <th>Дата</th>
              <th>Загальна сума</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001</td>
              <td>ТОВ "Sipic: Темпо"</td>
              <td>15.03.2006</td>
              <td>4,006</td>
              <td className={`${styles.status} ${styles.approved}`}>Середнє</td>
            </tr>
            <tr>
              <td>#002</td>
              <td>ТОВ "Opic: Темпо"</td>
              <td>15.03.2006</td>
              <td>5,006</td>
              <td className={`${styles.status} ${styles.pending}`}>Відправка</td>
            </tr>
            <tr>
              <td>#003</td>
              <td>Вул. Коптирева 1, Київ</td>
              <td>15.03.2006</td>
              <td>9,700</td>
              <td className={`${styles.status} ${styles.rejected}`}>Підписка</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Розділ з графіками */}
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
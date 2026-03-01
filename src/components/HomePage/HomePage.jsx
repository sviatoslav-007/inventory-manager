import React from 'react';
import { FaBox, FaCogs, FaDollarSign } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import styles from './HomePage.module.css';  // Import styles

// Register ChartJS components
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
          '#0099FF',  // Lighter shade
          '#0066CC',  // Mid shade
          '#003366'   // Darker shade
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>Офісний Склад</div>
        <div className={styles.icons}>
          <FaBox />
          <FaCogs />
        </div>
      </div>

      {/* Statistics Section */}
      <div className={styles.statistics}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <FaBox className={styles.icon} />
            <div className={styles.statTitle}>Загальна Кількість товарів</div>
            <div className={styles.statValue}>152</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <FaCogs className={styles.icon} />
            <div className={styles.statTitle}>В резерві</div>
            <div className={styles.statValue}>28</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <FaDollarSign className={styles.icon} />
            <div className={styles.statTitle}>Загальна вартість</div>
            <div className={styles.statValue}>325,400 грн</div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
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

      {/* Charts Section */}
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

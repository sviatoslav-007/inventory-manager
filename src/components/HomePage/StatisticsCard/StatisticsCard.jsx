import React from 'react';
import { FaBox, FaCogs, FaDollarSign } from 'react-icons/fa';
import styles from './StatisticsCard.module.css'; 

const StatisticsCard = ({ title, value, icon, bgColor, iconColor }) => {
  return (
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
};

const Statistics = () => {
  return (
    <div className={styles.statistics}>
      <StatisticsCard
        title="Загальна Кількість товарів"
        value="152"
        icon={<FaBox />}
        bgColor="lightBlueBackground"
        iconColor="blueIcon"
      />
      <StatisticsCard
        title="В резерві"
        value="28"
        icon={<FaCogs />}
        bgColor="lightOrangeBackground"
        iconColor="orangeIcon"
      />
      <StatisticsCard
        title="Загальна вартість"
        value="325,400 грн"
        icon={<FaDollarSign />}
        bgColor="lightGreenBackground"
        iconColor="greenIcon"
      />
    </div>
  );
};

export default Statistics;
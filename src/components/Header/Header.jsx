import React from 'react';
import { FaBox, FaCogs, FaSearch, FaList, FaBuilding, FaHome } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // імпортуємо Link
import styles from './Header.module.css'; 

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <FaBuilding className={styles.logoIcon} /> 
        <div className={styles.title}>Офісний Склад</div>
      </div>
      <div className={styles.icons}>
        <Link to="/homePage">
          <FaHome className={`${styles.icon} ${styles.grayIcon}`} />
        </Link>
        <Link to="/items">
          <FaSearch className={`${styles.icon} ${styles.grayIcon}`} />
        </Link>
        <Link to="/management">
          <FaBox className={`${styles.icon} ${styles.grayIcon}`} />
        </Link>
        <FaCogs className={`${styles.icon} ${styles.grayIcon}`} /> 
      </div>
    </div>
  );
};

export default Header;
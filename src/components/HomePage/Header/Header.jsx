import React from 'react';
import { FaBox, FaCogs, FaSearch, FaList, FaBuilding } from 'react-icons/fa'; 
import styles from './Header.module.css'; 

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <FaBuilding className={styles.logoIcon} /> 
        <div className={styles.title}>Офісний Склад</div>
      </div>
      <div className={styles.icons}>
        <FaSearch className={`${styles.icon} ${styles.grayIcon}`} /> 
        <FaList className={`${styles.icon} ${styles.grayIcon}`} /> 
        <FaBox className={`${styles.icon} ${styles.grayIcon}`} /> 
        <FaCogs className={`${styles.icon} ${styles.grayIcon}`} /> 
      </div>
    </div>
  );
};

export default Header;
import React from 'react';
import { FaBox, FaSearch, FaBuilding, FaHome, FaSignOutAlt } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import styles from './Header.module.css'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    
    navigate('/');
  };

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
        
        <button 
          onClick={handleLogout} 
          className={styles.logoutBtn}
          title="Вийти"
        >
          <FaSignOutAlt className={`${styles.icon} ${styles.grayIcon}`} />
        </button>
      </div>
    </div>
  );
};

export default Header;
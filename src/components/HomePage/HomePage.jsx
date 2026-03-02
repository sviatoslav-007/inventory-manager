import React from 'react';
import Header from './Header/Header';  
import StatisticsCard from './StatisticsCard/StatisticsCard';  
import InvoiceTable from './InvoiceTable/InvoiceTable';
import Charts from './Charts/Charts';  

import styles from './HomePage.module.css';  

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <StatisticsCard /> 
      <InvoiceTable />
      <Charts />
    </div>
  );
};

export default HomePage;
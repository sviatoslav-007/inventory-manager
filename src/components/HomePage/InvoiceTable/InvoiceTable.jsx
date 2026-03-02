// InvoiceTable.js
import React from 'react';
import styles from './InvoiceTable.module.css';

const InvoiceTable = () => {
  const invoices = [
    { id: '#001', supplier: 'ТОВ "Sipic: Темпо"', date: '15.03.2006', amount: '4,006', status: 'paid' },
    { id: '#002', supplier: 'ТОВ "Opic: Темпо"', date: '15.03.2006', amount: '5,006', status: 'prepaid' },
    { id: '#003', supplier: 'Вул. Коптирева 1, Київ', date: '15.03.2006', amount: '9,700', status: 'unpaid' },
    { id: '#004', supplier: 'ТОВ "Октава: Резерв"', date: '18.03.2006', amount: '3,500', status: 'paid' },
    { id: '#005', supplier: 'ТОВ "Запас: Візит"', date: '20.03.2006', amount: '6,000', status: 'unpaid' }
  ];

  return (
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
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.supplier}</td>
              <td>{invoice.date}</td>
              <td>{invoice.amount}</td>
              {/* Використовуємо англійські статуси: paid, prepaid, unpaid */}
              <td className={`${styles.status} ${styles[invoice.status]}`}>{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
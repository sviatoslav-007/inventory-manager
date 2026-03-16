import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './InvoiceTable.module.css';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/invoices');
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoices(sortedData);
      } catch (error) {
        console.error("Помилка завантаження накладних:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p>Завантаження даних...</p>;

  const latestInvoices = invoices.slice(0, 5);

  return (
    <div className={styles.invoiceTable}>
      <h3>Останні накладні</h3>
      
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Постачальник</th>
              <th>Дата</th>
              <th>Загальна сума</th>
              <th>Відповідальний</th>
            </tr>
          </thead>
          <tbody>
            {latestInvoices.length > 0 ? (
              latestInvoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice.number || '—'}</td>
                  <td>{invoice.supplier || 'Не вказано'}</td>
                  <td>{new Date(invoice.date).toLocaleDateString('uk-UA')}</td>
                  <td>{invoice.totalSum?.toLocaleString('uk-UA')} грн</td>
                  <td>{invoice.responsible || '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Накладних поки немає</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
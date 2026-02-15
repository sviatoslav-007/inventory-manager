import React, { useState } from 'react';
import styles from './LogInPage.module.css';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    // Логіка для перевірки користувача (наприклад, через API)
    setErrorMessage('');
    console.log('Logged in:', { email, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Log In</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>
          
          <div className={styles.inputWrapper}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
            />
          </div>
          
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <button type="submit" className={styles.submitButton}>Log In</button>
        </form>
        
        <p className={styles.forgotPassword}>Forgot your password?</p>
      </div>
    </div>
  );
};

export default LogInPage;

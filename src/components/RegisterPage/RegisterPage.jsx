import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from './RegisterPage.module.css';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import HomePage from '../HomePage/HomePage'; 
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is not valid');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is not valid');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      console.log('User registered:', { email, password });
      navigate('/homePage'); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Реєстрація</h2>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputWrapper}>
            <AiOutlineMail />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value); 
              }}
              className={styles.input}
              placeholder="Введіть ваш email"
            />
          </div>
          {emailError && <p className={styles.error}>{emailError}</p>} 

          <div className={styles.inputWrapper}>
            <AiOutlineLock />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value); 
              }}
              className={styles.input}
              placeholder="Введіть ваш пароль"
            />
          </div>
          {passwordError && <p className={styles.error}>{passwordError}</p>} 

          <div className={styles.inputWrapper}>
            <AiOutlineLock />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value); 
              }}
              className={styles.input}
              placeholder="Повторіть ваш пароль"
            />
          </div>
          {confirmPasswordError && <p className={styles.error}>{confirmPasswordError}</p>} 

          <button type="submit" className={styles.submitButton}>Зареєструватися</button>

          <div className={styles.loginLink}>
            <p>Вже маєте акаунт? <Link to="/signIn" className={styles.link}>Увійти</Link></p> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
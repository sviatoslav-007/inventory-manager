import React, { useState } from "react";
import styles from "./LogInPage.module.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await fetch("http://localhost:5050/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/homePage");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Помилка мережі:", error);
        alert("Не вдалося з’єднатися з сервером");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Вхід в Систему</h2>
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

          <button type="submit" className={styles.submitButton}>
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;

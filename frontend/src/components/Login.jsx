import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ setToken }) {
  const [email, setEmail] = useState(""); // Состояние для хранения значения email
  const [password, setPassword] = useState(""); // Состояние для хранения значения пароля

  /**
   * Функция для обработки формы входа
   * Отправляет данные email и password на сервер для получения токена
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      setToken(response.data.token); // Устанавливаем токен после успешного входа
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Почта
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Пароль
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Войти
      </button>
    </form>
  );
}

export default Login;

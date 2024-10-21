import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AddressSearch({ token }) {
  const [query, setQuery] = useState(""); // Для хранения поискового запроса
  const [addresses, setAddresses] = useState([]); // Для хранения предложений адресов
  const [savedAddresses, setSavedAddresses] = useState([]); // Для хранения уже сохранённых адресов

  /**
   * Функция для загрузки сохранённых адресов с сервера
   */
  const loadSavedAddresses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedAddresses(response.data || []); // Обновляем список сохранённых адресов
    } catch (error) {
      console.error(error);
    }
  };

  // Загружаем сохранённые адреса при первой загрузке компонента или изменении токена
  useEffect(() => {
    loadSavedAddresses();
  }, [token]);

  /**
   * Функция для поиска адресов через API DaData
   */
  const searchAddresses = async () => {
    try {
      const response = await axios.post(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        {
          query, // Отправляем текущий поисковый запрос
        },
        {
          headers: {
            Authorization: "Token 536543dee958ef405d78cf803395035ad76e9880",
          },
        }
      );
      setAddresses(response.data.suggestions); // Обновляем список предложений адресов
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Функция для сохранения выбранного адреса на сервере
   * @param {object} address - Объект адреса, который нужно сохранить
   */
  const saveAddress = async (address) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/addresses",
        {
          address: address.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // После успешного сохранения, заново загружаем список сохранённых адресов
      loadSavedAddresses();
      alert("Адрес сохранен");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={searchAddresses}
          placeholder="Введите адрес"
        />
      </div>

      {/* Список предложений адресов от DaData */}
      <div className="mb-4">
        <ul className="list-group">
          {addresses.map((address, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {address.value}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => saveAddress(address)}
              >
                Сохранить
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Мои адреса</h2>
        <ul className="list-group">
          {Array.isArray(savedAddresses) &&
            savedAddresses.map((address, index) => (
              <li key={index} className="list-group-item">
                {address.address}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AddressSearch;

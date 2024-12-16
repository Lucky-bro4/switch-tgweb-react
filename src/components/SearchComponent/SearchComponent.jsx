import React, { useState } from 'react';
import './SearchComponent.css';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const searchProducts = async () => {
    console.log({ query, filters });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="search-container">

      <div className="search-row">
        {/* Кнопки для мужского и женского */}
        <button className="category-button">Мужское</button>
        <button className="category-button">Женское</button>

        {/* Кнопка с иконкой фильтра для открытия модального окна */}
        <button onClick={openModal} className="filter-button">
          <i className="filter-icon">🔧</i>
        </button>

        {/* Поисковая строка */}
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Поиск по заголовкам товара"
          className="search-input"
        />
      </div>

      {/* Модальное окно с фильтрами */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal} className="close-modal">✖</button>

            <div className="filters">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Все категории</option>
                <option value="electronics">Электроника</option>
                <option value="fashion">Мода</option>
              </select>

              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Все цены</option>
                <option value="low">До 1000</option>
                <option value="medium">1000-5000</option>
                <option value="high">Больше 5000</option>
              </select>
            </div>

            <button onClick={searchProducts} className="search-button">
              Искать
            </button>
          </div>
        </div>
      )}

      <div className="results">
        {results.map((product) => (
          <div key={product.id} className="result-item">
            <h3 className="result-title">{product.title}</h3>
            <p>{product.description}</p>
            <p>Цена: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
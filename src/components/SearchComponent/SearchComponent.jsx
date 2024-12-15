import React, { useState } from 'react';
import './SearchComponent.css';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });
  const [results, setResults] = useState([]);

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
    // Здесь нужно будет выполнить запрос на сервер
    console.log({ query, filters });
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Поиск товаров</h2>
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Поиск по заголовкам товара"
          className="search-input"
        />
      </div>

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

import React, { useState, useEffect } from 'react';
import './SearchComponent.css';

const SearchComponent = ({ onFilterChange }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });


  const handleCategoryClick = (category) => {
    const updatedFilters = {
      ...filters,
      category,
    };
    setFilters(updatedFilters);
    onFilterChange({ query, filters: updatedFilters });
  };

  const handleFilterChange = (e) => {
    const updatedFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(updatedFilters);
    onFilterChange({ query, filters: updatedFilters });
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onFilterChange({ query: newQuery, filters });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
        <button className="category-button" onClick={() => handleCategoryClick('Male')}>Мужское</button>
        <button className="category-button" onClick={() => handleCategoryClick('Female')}>Женское</button>

        {/* Кнопка с иконкой фильтра для открытия модального окна */}
        <button onClick={openModal} className="filter-button">
          <span className="filter-icon">⚙️</span>
        </button>

        {/* Поисковая строка */}
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Поиск"
          className={`search-input`}
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
                <option value="medium">1000-3000</option>
                <option value="medium-high">3000-5000</option>
                <option value="high">Больше 5000</option>
              </select>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;

import React, { useState, useEffect } from 'react';
import './SearchComponent.css';

const SearchComponent = ({ onFilterChange }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    category: '',
    priceRange: ''
  });


  const handleGenderClick = (gender) => {
    const updatedFilters = {
      ...filters,
      gender
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

  const removeFilter = (filterKey) => {
    const updatedFilters = {
      ...filters,
      [filterKey]: '',
    };
    setFilters(updatedFilters);
    onFilterChange({ query, filters: updatedFilters });
  };

  const resetFilters = () => {
    const resetValues = { gender: '', category: '', priceRange: '' };
    setFilters(resetValues);
    setQuery('');
    onFilterChange({ query: '', filters: resetValues });
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


  const activeFilterCount = [
    query,
    filters.gender,
    filters.category,
    filters.priceRange,
  ].filter(Boolean).length;


  return (
    <div className="search-container">

      <div className="search-row">
        {/* Кнопки для мужского и женского */}
        <button 
          className={`category-button ${filters.gender === 'Мужское' ? 'active' : ''}`}
          onClick={() => handleGenderClick('Мужское')}
          >
            Мужское
        </button>
        <button 
          className={`category-button ${filters.gender === 'Женское' ? 'active' : ''}`}
          onClick={() => handleGenderClick('Женское')}
        >
          Женское
        </button>

        {/* Кнопка с иконкой фильтра для открытия модального окна */}
        <button onClick={openModal} className="filter-button">
          <span className="filter-icon">
            <img 
              src="/Images/icons/icons8-фильтр-30.png" 
              width={25} 
              alt="filter-icon" 
            />
          </span>
        </button>


        

        {/* Поисковая строка */}
        {/* <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Поиск"
          className={`search-input`}
        /> */}
      </div>

      {/* Модальное окно с фильтрами */}
      {isModalOpen && (
        <div className="search-modal">
          <div className="search-modal-content">
            <button onClick={closeModal} className="close-modal">✖</button>

            <div className="filters">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Все категории</option>
                <option value="Куртка">Куртка</option>
                <option value="Худи">Худи</option>
                <option value="Зип-худи">Зип-худи</option>
                <option value="Свитшот">Свитшот</option>                            
                <option value="Лонгслив">Лонгслив</option>
                <option value="Футболка">Футболка</option>
                <option value="Рубашка">Рубашка</option>
                <option value="Джемпер">Джемпер</option>
                <option value="Кофта">Кофта</option>
                <option value="Топ">Топ</option>
                <option value="Джинсы">Джинсы</option>
                <option value="Штаны">Штаны</option>
                <option value="Джоггеры">Джоггеры</option>
                <option value="Шорты">Шорты</option>
                <option value="Головные уборы">Головные уборы</option>
              </select>

              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Все цены</option>
                <option value="до 1000">До 1000</option>
                <option value="1000-3000">1000-3000</option>
                <option value="3000-5000">3000-5000</option>
                <option value="от 5000">Больше 5000</option>
              </select>
            </div>

          </div>
        </div>
      )}
      <div className="active-filters">
        {query && (
          <span className="filter-chip">
            Поиск: {query}
            <button className="remove-chip" onClick={() => setQuery('')}>
              ✖
            </button>
          </span>
        )}
        {filters.gender && (
          <span className="filter-chip">
            {filters.gender === 'Мужское' ? 'Мужское' : 'Женское'}
            <button className="remove-chip" onClick={() => removeFilter('gender')}>
              ✖
            </button>
          </span>
        )}
        {filters.category && (
          <span className="filter-chip">
            {filters.category}
            <button className="remove-chip" onClick={() => removeFilter('category')}>
              ✖
            </button>
          </span>
        )}
        {filters.priceRange && (
          <span className="filter-chip">
            ₽ {filters.priceRange}
            <button className="remove-chip" onClick={() => removeFilter('priceRange')}>
              ✖
            </button>
          </span>
        )}
        {/* Кнопка сброса всех фильтров */}
        {activeFilterCount > 1 && (
          <button className="reset-button" onClick={resetFilters}>
            Сбросить все
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;

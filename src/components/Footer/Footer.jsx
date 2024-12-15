import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section" onClick={handleProfileClick}>
          <i className="icon-user"></i>
          <p>Профиль</p>
        </div>
        <div className="footer-section" onClick={handleFavoritesClick}>
          <i className="icon-favorites"></i>
          <p>Избранное</p>
        </div>
        <div className="footer-section" onClick={handleCartClick}>
          <i className="icon-cart"></i>
          <p>Корзина</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
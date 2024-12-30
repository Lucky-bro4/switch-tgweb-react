import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = ({ addedItems, favoriteItems }) => {

  const location = useLocation();
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

  const handleHomeClick = () => {
    navigate('/');
  };

  const isProfileActive = location.pathname === "/profile";
  const isFavoritesActive = location.pathname === "/favorites";
  const isCartActive = location.pathname === "/cart";
  const isHomeActive = location.pathname === "/";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section" onClick={handleHomeClick}>
          <i className="icon-home">
          <img 
                src={isHomeActive ? "/Images/icons/mainLogo_withoutRental&Back-active.png" : "/Images/icons/mainLogo_withoutRental&Back-not-active.png"}
                width={30} 
                alt="icon-home" />
          </i>
        </div>
        <div className="footer-section" onClick={handleProfileClick}>
          <i className="icon-user">
          <img 
                src={isProfileActive ? "/Images/icons/icon-profile-active.png" : "/Images/icons/icon-profile-not-active.png"}
                width={30} 
                alt="icon-profile" />
          </i>
        </div>
        <div className="footer-section" onClick={handleFavoritesClick}>
          <i className="icon-favorites">
          <img 
                src={isFavoritesActive ? "/Images/icons/icon-love-active.png" : "/Images/icons/icon-love-not-active.png"}  
                width={30} 
                alt="icon-favorites" />
                {favoriteItems.length > 0 && (
                    <div className="badge-favorites">{favoriteItems.length}</div>
                )}
          </i>
        </div>
        <div className="footer-section" onClick={handleCartClick}>
            <i className="icon-cart">
                <img 
                    src={isCartActive ? "/Images/icons/icon-cart-active.png" : "/Images/icons/icon-cart-not-active.png"} 
                    width={30} 
                    alt="icon-cart" />
                {addedItems.length > 0 && (
                    <div className="badge-cart">{addedItems.length}</div>
                )}
            </i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
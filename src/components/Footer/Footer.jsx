import React, { useContext } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { AppContext } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {

  const { addedItems, favoriteItems } = useContext(AppContext);
  const { user } = useTelegram();

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
                src={isHomeActive ? "/Images/icons/mainLogo_withoutRental_Back-active.webp" : "/Images/icons/mainLogo_withoutRental_Back-not-active.webp"}
                width={30} 
                alt="icon-home" />
          </i>
        </div>
        <div className="footer-section" onClick={handleFavoritesClick}>
          <i className="icon-favorites">
          <img 
                src={isFavoritesActive ? "/Images/icons/icon-love-active.webp" : "/Images/icons/icon-love-not-active.webp"}  
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
                    src={isCartActive ? "/Images/icons/icon-cart-active.webp" : "/Images/icons/icon-cart-not-active.webp"} 
                    width={30} 
                    alt="icon-cart" />
                {addedItems.length > 0 && (
                    <div className="badge-cart">{addedItems.length}</div>
                )}
            </i>
        </div>
        <div className="footer-section" onClick={handleProfileClick}>
          <i className="icon-user">
          <img 
                src={isProfileActive ? "/Images/icons/icon-profile-active.webp" : "/Images/icons/icon-profile-not-active.webp"}
                width={30} 
                alt="icon-profile" />
          </i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = ({ addedItems }) => {

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

  const isProfileActive = location.pathname === "/profile";
  const isFavoritesActive = location.pathname === "/favorites";
  const isCartActive = location.pathname === "/cart";

  return (
    <footer className="footer">
      <div className="footer-container">
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
                alt="icon-love" />
          </i>
        </div>
        {/* <div className="cart-icon" onClick={() => navigate("/profile")}>
            <div className="icon">
            <img 
                src="/Images/icons/shopping_basket.png" 
                width={30} 
                alt="shopping_basket" />
            {addedItems.length > 0 && (
                <div className="badge">{addedItems.length}</div>
            )}
          </div>
        </div> */}
        <div className="footer-section" onClick={handleCartClick}>
            <i className="icon-cart">
                <img 
                    src={isCartActive ? "/Images/icons/icon-cart-active.png" : "/Images/icons/icon-cart-not-active.png"} 
                    width={30} 
                    alt="icon-cart" />
                {addedItems.length > 0 && (
                    <div className="badge">{addedItems.length}</div>
                )}
            </i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
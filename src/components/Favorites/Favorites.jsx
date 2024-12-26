import React from "react";
import "./Favorites.css";


const Favorites = ({ favoriteItems }) => {

    //Пример из корзины (Cart)

    const totalPrice = favoriteItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="cart-section">
            <h1>
                <span className="catalog-icon" onClick={() => window.location.href = '/'}>
                    <img 
                        src="/Images/mainLogo_withoutRental&Back.png" 
                        width={40} 
                        alt="Go to catalog" 
                        title="Go to Catalog"
                    />
                </span>
                Избранное
            </h1>
            <div className="order-list">
                {favoriteItems.length > 0 ? (
                    favoriteItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image[0]} alt={item.brand} className="order-image" />
                            <div>
                                <h2>{item.category + item.brand}</h2>
                                <p>Цена: {item.price} ₽</p>
                                <p>Размер бренда: {item.brandSize}</p>
                                <p>Состояние: {item.condition}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>В избранном ничего нет</p>
                )}
            </div>
            {favoriteItems.length > 0 && (
                <div className="total-price">
                    <h2>Общая сумма: {totalPrice} Р</h2>
                </div>
            )}
        </div>
    );
};

export default Favorites;
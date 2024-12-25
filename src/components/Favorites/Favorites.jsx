import React from "react";
import "./Favorites.css";


const Favorites = ({ addedItems }) => {

    //Пример из корзины (Cart)

    const totalPrice = addedItems.reduce((acc, item) => acc + item.rentPrice, 0);

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
                {addedItems.length > 0 ? (
                    addedItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image[0]} alt={item.name} className="order-image" />
                            <div>
                                <h2>{item.name}</h2>
                                <p>Цена: {item.rentPrice} ₽</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>В избранном ничего нет</p>
                )}
            </div>
            {addedItems.length > 0 && (
                <div className="total-price">
                    <h2>Общая сумма: {totalPrice} Р</h2>
                </div>
            )}
        </div>
    );
};

export default Favorites;
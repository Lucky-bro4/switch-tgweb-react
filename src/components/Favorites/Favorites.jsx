import React from "react";
import { Link } from 'react-router-dom';
import "./Favorites.css";


const Favorites = ({ addedItems }) => {

    //Пример из корзины (Cart)

    const totalPrice = addedItems.reduce((acc, item) => acc + item.rentPrice, 0);

    return (
        <div className="cart-section">
            <h1>Корзина</h1>
            <div className="order-list">
                {addedItems.length > 0 ? (
                    addedItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image[0]} alt={item.name} className="order-image" />
                            <div>
                                <h2>{item.name}</h2>
                                <p>Цена аренды: {item.rentPrice} Р</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Корзина пуста</p>
                )}
            </div>
            {addedItems.length > 0 && (
                <div className="total-price">
                    <h2>Общая сумма: {totalPrice} Р</h2>
                </div>
            )}
            <div className="return-button">
                <Link to="/" className="button">
                    Вернуться в каталог
                </Link>
            </div>
        </div>
    );
};

export default Favorites;
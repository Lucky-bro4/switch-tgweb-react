import React from "react";
import "./ProfilePage.css";

const ProfilePage = ({ addedItems }) => {
    const totalPrice = addedItems.reduce((acc, item) => acc + item.rentPrice, 0);

    return (
        <div className="profile-page">
            <h1>Ваш заказ</h1>
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
        </div>
    );
};

export default ProfilePage;

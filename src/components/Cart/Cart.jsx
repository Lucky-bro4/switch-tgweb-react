import React, {useCallback, useEffect, useState} from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Cart.css";


const Cart = ({ addedItems }) => {

    const { tg, queryId, user } = useTelegram();
    const totalPrice = addedItems.reduce((acc, item) => acc + item.price, 0);

    const onSendData = useCallback(() => {
            
            const data = {
                items: addedItems,
                totalPrice: getTotalPrice(addedItems),
                queryId,
                user
            }
            fetch('https://bottry-lucky-bro4.amvera.io/web-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        }, [addedItems, queryId])

    useEffect(() => {
        if (addedItems > 0) {

            tg.BottomButton.show();
            tg.BottomButton.setParams({
                text: 'Оформить заказ',
            })

            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
            tg.offEvent('mainButtonClicked', onSendData)
            }
        }
        
    }, [onSendData])

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.price
        }, 0)
    }

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
                Корзина
            </h1>
            <div className="order-list">
                {addedItems.length > 0 ? (
                    addedItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image[0]} alt={item.brand} className="order-image" />
                            <div>
                                <h2>{item.brand}</h2>
                                <p>Цена: {item.price} ₽</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Корзина пуста</p>
                )}
            </div>
            {addedItems.length > 0 && (
                <div className="total-price">
                    <h2>Общая сумма: {totalPrice} ₽</h2>
                </div>
            )}
        </div>
    );
};

export default Cart;

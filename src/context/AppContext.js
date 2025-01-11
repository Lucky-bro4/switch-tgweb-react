import React, { createContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [addedItems, setAddedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);

    const { user } = useTelegram();

    useEffect(() => {

        try {
            console.log('chatId: ', user)
            const response = fetch(`https://bottry-lucky-bro4.amvera.io/products?chatId=${user.id}`);
            // const response = await fetch(`https://bottry-lucky-bro4.amvera.io/products`);
            const data = response.json();
            
            if (data.customer.favorite_items) {
                setFavoriteItems(data.customer.favorite_items)
            }
            if (customer.cart_items) {
                setAddedItems(data.customer.cart_items)
            }
        } catch (e) {
            console.log('Ошибка при получении списка товаров:', e)
        }
    }, [user])

    return (
        <AppContext.Provider value={{ addedItems, setAddedItems, favoriteItems, setFavoriteItems }}>
            {children}
        </AppContext.Provider>
    );
};
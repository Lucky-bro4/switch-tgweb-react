import React, { createContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [customer, setCustomer] = useState({});

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products || []);

    const [addedItems, setAddedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);

    const { tg, user } = useTelegram();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://bottry-lucky-bro4.amvera.io/allProducts`);
                if (!response.ok) {
                    tg.showAlert('Перезапустите бота командой /start в чате');
                    tg.close();
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response data:', data);

                if (data.error) {
                    console.log('Error detected:', data.error);
                    tg.showAlert('Перезапустите бота командой /start в чате');
                    tg.close();
                    return
                }

                if (data.products) {
                    // setProducts(data.products);
                    // setFilteredProducts(data.products);

                    // if (data.customer) {
                    //     setCustomer(data.customer)
                    // }

                    // if (data.customer?.favorite_items) {
                    //     const favoriteItems = data.customer.favorite_items
                    //         .map(id => data.products.find(product => product.id === id))
                    //         .filter(product => product); // Убираем null/undefined, если id нет в data.products
                    //     setFavoriteItems(favoriteItems);
                    // }
    
                    // if (data.customer?.cart_items) {
                    //     const addedItems = data.customer.cart_items
                    //         .map(id => data.products.find(product => product.id === id))
                    //         .filter(product => product); // Убираем null/undefined, если id нет в data.products
                    //     setAddedItems(addedItems);
                    // }

                } else {
                    setProducts([]);
                    setFilteredProducts([]);
                    setFavoriteItems([]);
                    setAddedItems([]);
                }

            } catch (e) {
                console.error('Ошибка при получении данных в AppContext:', e);
            }
        };

        if (user?.id) {
            fetchData();
        }
    }, [user]);

    return (
        <AppContext.Provider value={{ 
            products, 
            setProducts, 
            filteredProducts, 
            setFilteredProducts, 
            addedItems, 
            setAddedItems, 
            favoriteItems, 
            setFavoriteItems,
            customer
        }}>
            {children}
        </AppContext.Provider>
    );
};
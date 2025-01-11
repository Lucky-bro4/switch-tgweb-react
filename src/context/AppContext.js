import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [addedItems, setAddedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);

    return (
        <AppContext.Provider value={{ addedItems, setAddedItems, favoriteItems, setFavoriteItems }}>
            {children}
        </AppContext.Provider>
    );
};
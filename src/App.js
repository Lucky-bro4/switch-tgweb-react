import './App.css';
import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
// import Footer from './components/Footer/Footer';
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Profile from './components/Profile/Profile';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import AdminPage from './components/AdminPage/AdminPage';


function App() {

    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])


    return (
        <div className="App">
            <Routes>
                <Route path="/" 
                    element={<ProductList  />} 
                />
                <Route path="/form" element={<Form />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" 
                    element={<Favorites />} 
                />
                <Route path="/cart" 
                    element={<Cart />} 
                />

            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;

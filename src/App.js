import './App.css';
import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
import Footer from './components/Footer/Footer';
import { Router, Route, Routes, useLocation } from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Profile from './components/Profile/Profile';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import AdminPage from './components/AdminPage/AdminPage';


function App() {

    const { tg } = useTelegram();
    const location = useLocation();

    useEffect(() => {
        tg.ready();

        function checkStatus() {
            const status = tg.checkHomeScreenStatus();
            console.log("Home Screen Status:", status);
            if (status === "missed") {
                tg.addToHomeScreen();
            } else {
                tg.showAlert(status);
            }
        }
        checkStatus();

        // tg.checkHomeScreenStatus().then((status) => {
        //     if (status === 'missed') {
        //         tg.addToHomeScreen();
        //     }
        // })

    }, [])



    const showFooter = location.pathname !== '/form' && location.pathname !== '/adminPage';


    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/form" element={<Form />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            {showFooter && <Footer />}
        </div>
    );
}

export default App;

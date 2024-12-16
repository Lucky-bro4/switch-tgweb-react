import './App.css';
import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
// import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import ProfilePage from './components/ProfilePage/ProfilePage';
import AdminPage from './components/AdminPage/AdminPage';
import AuthPage from './components/AuthPage/AuthPage';


function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    const [addedItems, setAddedItems] = useState([]);

    return (
        <div className="App">
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<ProductList addedItems={addedItems} setAddedItems={setAddedItems} />} />
                <Route path="/form" element={<Form />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/profile" element={<ProfilePage addedItems={addedItems} />} />
                {/* <Route path={'account'} element={<Account />}/> */}
                
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

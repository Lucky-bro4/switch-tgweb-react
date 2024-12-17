import './App.css';
import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Cart from './components/Cart/Cart';
import AdminPage from './components/AdminPage/AdminPage';


function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    const [addedItems, setAddedItems] = useState([]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProductList addedItems={addedItems} setAddedItems={setAddedItems} />} />
                <Route path="/form" element={<Form />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/cart" element={<Cart addedItems={addedItems} />} />
                {/* <Route path={'account'} element={<Account />}/> */}
                
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

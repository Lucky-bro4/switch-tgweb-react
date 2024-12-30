import './App.css';
import React, { useState, useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Footer from './components/Footer/Footer';
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Profile from './components/Profile/Profile';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import AdminPage from './components/AdminPage/AdminPage';


function App() {

    const { tg, user } = useTelegram();

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState(products || []);

    const [addedItems, setAddedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);

    useEffect(() => {
        tg.ready();
    }, [])

    useEffect(() => {
        const getProducts = async () => {
            try {
                console.log('chatId: ', user)
                const response = await fetch(`https://bottry-lucky-bro4.amvera.io/products?chatId=${user.id}`);
                // const response = await fetch(`https://bottry-lucky-bro4.amvera.io/products`);
                const data = await response.json();
                
                // setProducts(data.products)
                setFilteredProducts(data.products || []);
                if (customer.favorite_items) {
                    setFavoriteItems(data.customer.favorite_items)
                }
                if (customer.cart_items) {
                    setAddedItems(data.customer.cart_items)
                }

                // if (!data.customer.location && !data.customer.phone_number) {
                //     setNewUser(true)
                // }

                // if (data.successOrder.status === 'in delivery' || data.successOrder.status === 'order_confirm') {
                //     setCosts(180);
                //     if (data.successOrder.comment === 'Аренда скоро закончится') {
                //         setClosedChainOrder(false);
                //     } else {
                //         setClosedChainOrder(true);
                //     }
                // }

            } catch (e) {
                console.log('Ошибка при получении списка товаров:', e)
            }
        }

        getProducts();
    }, [filteredProducts])

    return (
        <div className="App">
            <Routes>
                <Route path="/" 
                    element={<ProductList
                        filteredProducts={filteredProducts}
                        setFilteredProducts={setFilteredProducts}
                        addedItems={addedItems} 
                        setAddedItems={setAddedItems} 
                        favoriteItems={favoriteItems} 
                        setFavoriteItems={setFavoriteItems}
                        productsInCart={productsInCart}
                        setProductsInCart={setProductsInCart}
                    />} 
                />
                <Route path="/form" element={<Form />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites addedItems={addedItems} setAddedItems={setAddedItems} favoriteItems={favoriteItems} setFavoriteItems={setFavoriteItems} />} />
                <Route path="/cart" element={<Cart addedItems={addedItems} setAddedItems={setAddedItems} favoriteItems={favoriteItems} setFavoriteItems={setFavoriteItems} />} />
                {/* <Route path={'account'} element={<Account />}/> */}
                
            </Routes>
            <Footer addedItems={addedItems} favoriteItems={favoriteItems} />
        </div>
    );
}

export default App;

import React, { useCallback, useEffect, useState, useContext } from "react";
import { AppContext } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTelegram } from "../../hooks/useTelegram";
import { useFavorite } from "../../hooks/useFavorite";
import ProductModal from "../ProductModal/ProductModal";
import "./Cart.css";


const Cart = () => {

    const { tg, queryId, user } = useTelegram();
    const { addedItems, favoriteItems, setFavoriteItems } = useContext(AppContext);
    const { handleFavoriteClick } = useFavorite({ favoriteItems, setFavoriteItems, user });

    const handleButtonClick = useCallback(() => {
        onSendData();
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const [locCart, setLocCart] = useState('true');

    const isCartActive = location.pathname === "/cart";

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isFavoriteMap, setIsFavoriteMap] = useState({});

    // const addedItems = products.filter(product => addedItems.some(item => item.id === product.id));

    const calculateTotalPrice = (items = []) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    const totalPrice = calculateTotalPrice(addedItems);

    const onSendData = useCallback(async () => {
        const data = {
            items: addedItems,
            totalPrice,
            queryId,
            user
        };
        try {
            const response = await fetch('https://bottry-lucky-bro4.amvera.io/web-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (!response.ok) {
                tg.showAlert(`Произошла ошибка: ${result.message}. Попробуйте позже.`);
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }, [addedItems, totalPrice, queryId, user]);

    useEffect(() => {

        // if (isCartActive && addedItems.length > 0 && !isModalOpen) {
            tg.MainButton
                .setParams({ 
                    text: 'Оформить заказ',
                    color: '#146eeb'
                })
                .show();

            tg.onEvent('mainButtonClicked', handleButtonClick)
            
        // } else if (isCartActive && addedItems.length > 0 && isModalOpen) {
        //     tg.MainButton.hide();
        // }

        return () => {
            tg.offEvent('mainButtonClicked', handleButtonClick)
        }
        
    }, [tg, isModalOpen, isCartActive, addedItems]);

     // useEffect(() => {
    //     if (!closedChainOrder) {
    //         tg.onEvent('mainButtonClicked', onSendData)
    //         return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //         }
    //     }
    // }, [onSendData])

    // useEffect(() => {
    //     if (tg.MainButton.isVisible) {
    //         tg.MainButton.hide();
    //     }
    // }, [tg]);


    const handleHomeClick = () => {
        navigate('/');
    };

    const onProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };


    return (
        <div className="cart-section">
            <h1>
                <span className="catalog-icon" onClick = {handleHomeClick}>
                    <img 
                        src="/Images/mainLogo_withoutRental&Back.png" 
                        width={40} 
                        alt="Go to catalog" 
                        title="Go to Catalog"
                    />
                </span>
                Корзина
            </h1>
            <div className="cart-list">
                {addedItems.length > 0 ? (
                    addedItems.map((item) => (
                        <div 
                            key={item.id} 
                            className="cart-item"
                            onClick={() => onProductClick(item)}
                        >
                            <div className="cart-image-wrapper">
                                <img 
                                    src={item.image[0]} 
                                    alt={item.category + ' ' + item.brand} 
                                    className="cart-image" 
                                />
                                <div 
                                    className="favorite-icon-cart" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavoriteClick(item);
                                    }}
                                >
                                    <img 
                                        src={
                                            favoriteItems.some(product => product.id === item.id)
                                                ? "/Images/icons/icon-already-add.png"
                                                : "/Images/icons/icon-not-add.png"
                                        } 
                                        alt={
                                            favoriteItems.some(product => product.id === item.id)
                                                ? "Remove from Favorites"
                                                : "Add to Favorites"
                                        }
                                        className={
                                            favoriteItems.some(product => product.id === item.id) ? "active" : ""
                                        }
                                    />
                                </div>
                            </div>
                            
                            <div className="cart-details">
                                <h2>{item.category + ' ' + item.brand}</h2>
                                <p className="cart-price">Цена: {item.price} ₽</p>
                                <p>Размер бренда: {item.brandSize}</p>
                                <p>Состояние: {item.condition}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Корзина пуста</div>
                )}
                {isModalOpen && selectedProduct && (
                    <ProductModal
                        product={selectedProduct} 
                        onClose={closeModal}
                        location={locCart}
                    />
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

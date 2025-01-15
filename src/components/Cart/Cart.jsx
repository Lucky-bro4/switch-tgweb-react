import React, { useCallback, useEffect, useState, useContext } from "react";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from "../../hooks/useTelegram";
import { useFavorite } from "../../hooks/useFavorite";
import ProductModal from "../ProductModal/ProductModal";
import "./Cart.css";


const Cart = () => {

    const { tg, queryId, user } = useTelegram();
    const { products, addedItems, favoriteItems, setFavoriteItems } = useContext(AppContext);
    const { handleFavoriteClick } = useFavorite({ favoriteItems, setFavoriteItems, user });

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/');
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isFavoriteMap, setIsFavoriteMap] = useState({});

    const cartProducts = products.filter(product => addedItems.some(item => item.id === product.id));

    const calculateTotalPrice = (items = []) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    const totalPrice = calculateTotalPrice(cartProducts);

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
            alert(`Error: ${error.message}`);
        }
    }, [cartProducts, totalPrice, queryId, user]);

    useEffect(() => {
        if (addedItems.length > 0) {
            
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Оформить заказ',
            })

            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
        }
        
    }, [cartProducts, onSendData, tg])

    // const handleFavoriteClick = async (e, product) => {
    //     e.stopPropagation();

    //     const isCurrentlyFavorite = favoriteItems.some(item => item.id === product.id);
    //     const newFavoriteState = !isCurrentlyFavorite;

    //     // Обновить глобальный или серверный список избранного
    //     if (newFavoriteState) {
    //         setFavoriteItems([...favoriteItems, product.id]); // Добавляем ID продукта
    //     } else {
    //         setFavoriteItems(favoriteItems.filter(id => id !== product.id)); // Убираем ID продукта
    //     }

    //     try {
    //         // Запрос для обновления на сервере
    //         await fetch(`https://bottry-lucky-bro4.amvera.io/favorites/${product.id}`, {
    //             method: newFavoriteState ? 'POST' : 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ chatId: user.id }),
    //         });

    //         setFavoriteItems((prevFavorites) =>
    //             newFavoriteState
    //                 ? [...prevFavorites, product.id]
    //                 : prevFavorites.filter((id) => id !== product.id)
    //         );

    //     } catch (error) {
    //         console.error('Error updating favorite status:', error);

    //         // Откат состояния при ошибке
    //         setIsFavorite(!newFavoriteState);
    //         if (!newFavoriteState) {
    //             setFavoriteItems([...favoriteItems, product.id]);
    //         } else {
    //             setFavoriteItems(favoriteItems.filter(id => id !== product.id));
    //         }
    //     }
    // };

    const onProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    }

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
                {cartProducts.length > 0 ? (
                    cartProducts.map((item) => (
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
                                            favoriteItems.includes(item.id)
                                                ? "/Images/icons/icon-already-add.png"
                                                : "/Images/icons/icon-not-add.png"
                                        } 
                                        alt={
                                            favoriteItems.includes(item.id)
                                                ? "Remove from Favorites"
                                                : "Add to Favorites"
                                        }
                                        className={
                                            favoriteItems.includes(item.id) ? "active" : ""
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
                        // addedItems={addedItems}
                        // favoriteItems={favoriteItems}
                        // setFavoriteItems={setFavoriteItems}
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

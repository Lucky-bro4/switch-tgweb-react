import React, { useState, useContext } from "react";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from "../../hooks/useTelegram";
import { useFavorite } from '../../hooks/useFavorite';
import { useCart } from '../../hooks/useCart';
import ProductModal from "../ProductModal/ProductModal";
import "./Favorites.css";


const Favorites = () => {

    const { products, addedItems, setAddedItems, favoriteItems, setFavoriteItems } = useContext(AppContext);
    const { user } = useTelegram();

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const favoriteProducts = products.filter(product => favoriteItems.some(item => item.id === product.id));

    const calculateTotalPrice = (items = []) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    const totalPrice = calculateTotalPrice(favoriteProducts);

    const { handleFavoriteClick } = useFavorite({ favoriteItems, setFavoriteItems, user });
    const { handleCartClick } = useCart({ addedItems, setAddedItems, user });

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
            
    //         console.error("Error updating favorite status:", error);
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
        <div className="favorites-section">
            <h1>
                <span className="catalog-icon" onClick = {handleHomeClick}>
                    <img 
                        src="/Images/mainLogo_withoutRental&Back.png" 
                        width={40} 
                        alt="Go to catalog" 
                        title="Go to Catalog"
                    />
                </span>
                Избранное
            </h1>
            <div className="favorites-list">
                {favoriteProducts.length > 0 ? (
                    favoriteProducts.map((item) => (
                        <div 
                            key={item.id} 
                            className="favorites-item"
                            onClick={() => onProductClick(item)}
                        >
                            <div className="favorites-image-wrapper">
                                <img 
                                    src={item.image[0]} 
                                    alt={item.category + ' ' + item.brand} 
                                    className="favorites-image"
                                />
                            </div>
                            <div 
                                className="favorite-icon-catalog" 
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
                            <div>
                                <div className="favorites-details">
                                    <h2>{item.category + ' ' + item.brand}</h2>
                                    <p className="favorites-price">Цена: {item.price} ₽</p>
                                    <p>Размер бренда: {item.brandSize}</p>
                                    <p>Состояние: {item.condition}</p>
                                </div>
                                <div className="cart-button-container">
                                    {addedItems.includes(item.id) ? (
                                        <div>
                                            <button 
                                                className="remove-from-cart" 
                                            >
                                                Товар в корзине
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            className="add-to-cart" 
                                            onClick={() => handleCartClick(item)}
                                        >
                                            Добавить в корзину
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>В избранном ничего нет</div>
                )}
                {isModalOpen && selectedProduct && (
                    <ProductModal
                        product={selectedProduct} 
                        onClose={closeModal}
                        // addedItems={addedItems}
                        // setAddedItems={setAddedItems}
                        // favoriteItems={favoriteItems}
                        // setFavoriteItems={setFavoriteItems}
                    />
                )}
            </div>
            {favoriteItems.length > 0 && (
                <div className="total-price">
                    <h2>Общая сумма: {totalPrice} ₽</h2>
                </div>
            )}
        </div>
    );
};

export default Favorites;
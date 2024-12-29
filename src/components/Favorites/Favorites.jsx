import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTelegram } from "../../hooks/useTelegram";
import "./Favorites.css";


const Favorites = ({ addedItems, setAddedItems, favoriteItems, setFavoriteItems }) => {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useTelegram();

    const calculateTotalPrice = (items = []) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    const totalPrice = calculateTotalPrice(favoriteItems);

    const handleFavoriteClick = async (e, product) => {
        e.stopPropagation();

        const isCurrentlyFavorite = favoriteItems.includes(product.id);
        const newFavoriteState = !isCurrentlyFavorite;

        // Обновить глобальный или серверный список избранного
        if (newFavoriteState) {
            setFavoriteItems([...favoriteItems, product.id]); // Добавляем ID продукта
        } else {
            setFavoriteItems(favoriteItems.filter(id => id !== product.id)); // Убираем ID продукта
        }

        try {
            // Запрос для обновления на сервере
            await fetch(`https://bottry-lucky-bro4.amvera.io/favorites/${product.id}`, {
                method: newFavoriteState ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId: user.id }),
            });

            setFavoriteItems((prevFavorites) =>
                newFavoriteState
                    ? [...prevFavorites, product.id]
                    : prevFavorites.filter((id) => id !== product.id)
            );

        } catch (error) {
            console.error('Error updating favorite status:', error);

            // Откат состояния при ошибке
            setIsFavorite(!newFavoriteState);
            if (!newFavoriteState) {
                setFavoriteItems([...favoriteItems, product.id]);
            } else {
                setFavoriteItems(favoriteItems.filter(id => id !== product.id));
            }
        }
    };

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
                {favoriteItems.length > 0 ? (
                    favoriteItems.map((item) => (
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
                                onClick={(e) => handleFavoriteClick(e, item)}
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
                            <div className="favorites-details">
                                <h2>{item.category + ' ' + item.brand}</h2>
                                <p className="favorites-price">Цена: {item.price} ₽</p>
                                <p>Размер бренда: {item.brandSize}</p>
                                <p>Состояние: {item.condition}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>В избранном ничего нет</p>
                )}
                {isModalOpen && selectedProduct && (
                    <ProductModal
                        product={selectedProduct} 
                        onClose={closeModal}
                        addedItems={addedItems}
                        setAddedItems={setAddedItems}
                        favoriteItems={favoriteItems}
                        setFavoriteItems={setFavoriteItems}
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
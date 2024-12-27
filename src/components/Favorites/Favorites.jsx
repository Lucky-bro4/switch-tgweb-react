import React, { useState } from "react";
import "./Favorites.css";


const Favorites = ({ addedItems, setAddedItems, favoriteItems, setFavoriteItems }) => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPrice = favoriteItems.reduce((acc, item) => acc + item.price, 0);

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
                <span className="catalog-icon" onClick={() => window.location.href = '/'}>
                    <img 
                        src="/Images/mainLogo_withoutRental&Back.png" 
                        width={40} 
                        alt="Go to catalog" 
                        title="Go to Catalog"
                    />
                </span>
                Избранное
            </h1>
            <div className="order-list">
                {favoriteItems.length > 0 ? (
                    favoriteItems.map((item) => (
                        <div 
                            key={item.id} 
                            className="order-item"
                            onClick={() => onProductClick(item)}
                        >
                            <div className="order-image-wrapper">
                                <img 
                                    src={item.image[0]} 
                                    alt={item.brand} 
                                    className="order-image"
                                />
                            </div>
                            <div className="order-details">
                                <h2>{item.category + ' ' + item.brand}</h2>
                                <p className="order-price">Цена: {item.price} ₽</p>
                                <p>Размер бренда: {item.brandSize}</p>
                                <p>Состояние: {item.condition}</p>
                            </div>
                            <button 
                                className={`favorite-icon ${item.isFavorite ? 'favorite-active' : ''}`} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(item.id);
                                }}
                                title={item.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                            >
                                {item.isFavorite ? '❤️' : '🤍'}
                            </button>
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
                    <h2>Общая сумма: {totalPrice} Р</h2>
                </div>
            )}
        </div>
    );
};

export default Favorites;
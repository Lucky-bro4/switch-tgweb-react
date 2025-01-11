import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTelegram } from '../../hooks/useTelegram';
import './ProductModal.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ProductModal = ({ product, onClose }) => {

    const { addedItems, setAddedItems, favoriteItems, setFavoriteItems } = useContext(AppContext);

    const { tg, user } = useTelegram();

    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    // const onAddHandler = () => {    
    //     setAddedItems([...addedItems, product]);
    //     // tg.BottomButton [{
    //     //     type: 'main',
    //     // }]

    //     if (tg.MainButton.isVisible) {
    //         tg.MainButton.hide();
    //     }
  
    // };

    // useEffect(() => {
    //     tg.MainButton.show();
    //     tg.MainButton.setParams({
    //         type: 'main',
    //         text: 'Добавить в корзину',
    //         color: '#E22D60'
    //     })
        
    //     tg.onEvent('mainButtonClicked', onAddHandler)
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onAddHandler)
    //     }
        
    // }, [product, addedItems])

    useEffect(() => {
        setIsFavorite(favoriteItems.includes(product.id));
    }, [favoriteItems, product.id]);


    const handleFavoriteClick = async (e) => {
        e.stopPropagation();
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        setFavoriteItems([...favoriteItems, product]);

        // Обновить глобальный или серверный список избранного
        try {
            const response = await fetch(`https://bottry-lucky-bro4.amvera.io/favorites/${product.id}`, {
                method: newFavoriteState ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({chatId: user.id}),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }
    
            const data = await response.json();
            console.log('Favorite status updated successfully:', data);
        } catch (error) {
            console.error('Error updating favorite status:', error);
            // Revert state change in case of error
            setIsFavorite(!newFavoriteState);
        }

    };


    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{product.gender + ' ' + product.category + ' ' + product.brand}</h2>

                <div className="slider-container">
                    <div className="progress-bar">
                        {product.image.map((_, index) => (
                            <div
                                key={index}
                                className={`progress-bar-segment ${activeIndex === index ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>
                    <div className="img-container">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            onSlideChange={handleSlideChange}
                            style={{ width: "100%", height: "auto" }}
                        >
                            {product.image.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} alt={`${product.brand} - ${index + 1}`} className="product-image" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div 
                            className="favorite-icon" 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteClick(e);
                            }}
                        >
                            <img 
                                src={isFavorite ? '/Images/icons/icon-already-add.png' : '/Images/icons/icon-not-add.png'} 
                                alt={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}    
                            />
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <div class="column">
                        {/* <p><strong>{`${product.gender} ${product.category} ${product.brand}`}</strong></p> */}
                        <p><strong>Бренд:</strong> {product.brand}</p>
                        <p><strong>Цена:</strong> {product.price} р.</p>
                        <p><strong>Состояние:</strong> {product.condition}</p>
                        <p><strong>Замеры:</strong></p>
                        {product.measurements && typeof product.measurements === 'object' ? (
                            <ul>
                                {Object.entries(product.measurements).map(([key, value]) => (
                                    <li key={key}><strong>{key}:</strong> {value}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{product.measurements && typeof product.measurements === 'string' ? product.measurements : 'Нет данных'}</p>
                        )}
                    </div>
            
                    <div class="column">
                        <p><strong>Размер бренда:</strong> {product.brandSize}</p>
                        <p><strong>Цвет:</strong> {product.color}</p>
                        <p><strong>О товаре:</strong></p>
                        {product.description && typeof product.description === 'object' ? (
                            <ul>
                                {Object.entries(product.description).map(([key, value]) => (
                                    <li key={key}><strong>{key}:</strong> {value}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{product.description && typeof product.description === 'string' ? product.description : 'Нет данных'}</p>
                        )}
                    </div>
                </div>

                {/* Кнопки для модального окна */}
                <div className="cart-button-container">
                    {addedItems.includes(product) ? (
                        <div>
                            <button 
                                className="remove-from-cart" 
                                onClick={() => setAddedItems(addedItems.filter(item => item !== product))}
                            >
                                Удалить из корзины
                            </button>
                            <button 
                                className="go-to-cart" 
                                onClick={() => navigate('/cart')}
                            >
                                Перейти в корзину
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="add-to-cart" 
                            onClick={() => setAddedItems([...addedItems, product])}
                        >
                            Добавить в корзину
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
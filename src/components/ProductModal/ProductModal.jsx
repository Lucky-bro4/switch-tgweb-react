import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTelegram } from '../../hooks/useTelegram';
import { useFavorite } from '../../hooks/useFavorite';
import { useCart } from '../../hooks/useCart';
import './ProductModal.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ProductModal = ({ product, onClose, location }) => {

    const { addedItems, setAddedItems, favoriteItems, setFavoriteItems } = useContext(AppContext);

    const { tg, user } = useTelegram();
    
    const [activeIndex, setActiveIndex] = useState(0);

    // const location = useLocation();
    const navigate = useNavigate();


    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    // const changeAfterRemoveButton = () => {
    //     tg.MainButton
    //         .setParams({ 
    //             text: 'Добавить в корзину',
    //             color: '#E22D60',
    //         })

    //     handleCartClick(product);
    // }

    // const changeAddProductButton = () => {
    //     tg.MainButton
    //         .setParams({ 
    //             text: 'Перейти в корзину',
    //             color: '#82d83f',
    //         })

    //     handleCartClick(product);
    // }

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const { handleFavoriteClick } = useFavorite({ favoriteItems, setFavoriteItems, user });
    const { handleCartClick } = useCart({ addedItems, setAddedItems, user });

    const keyTranslations = {
        shoulders: 'Плечи',
        sleeveLength: 'Длина рукава',
        underarms: 'Подмышки',
        backLength: 'Длина спинки',
        outerLegLength: 'Длина внешней штанины',
        innerLegLength: 'Длина внутренней штанины',
        waistWidth: 'Ширина талии',
    };

    const goToCart = () => {
        navigate('/cart');
    }

    useEffect(() => {
        // Очистка всех предыдущих обработчиков перед назначением новых
        // tg.MainButton.offClick();

        const handleButtonClick = () => {
            if (addedItems.some(item => item.id === product.id)) {
                // if (location === 'true') {
                    handleCartClick(product); // Удаляем товар из корзины
                // } else {
                //     goToCart(); // Переход в корзину
                // }
            } else {
                handleCartClick(product); // Добавляем товар в корзину
            }
        };
        
        if (addedItems.some(item => item.id === product.id)) {
            // if (location === 'true') {
                tg.MainButton.setParams({
                    text: 'Удалить из корзины',
                    color: '#000000',
                }).show();
            // } else {
            //     tg.MainButton.setParams({
            //         text: 'Перейти в корзину',
            //         color: '#82d83f',
            //     }).show();
            // }
        } else {
            tg.MainButton.setParams({
                text: 'Добавить в корзину',
                color: '#E22D60',
            }).show();
        }

        tg.onEvent('mainButtonClicked', handleButtonClick)
        return () => {
           tg.offEvent('mainButtonClicked', handleButtonClick)
        }
    
        // tg.MainButton.onClick(handleButtonClick);
        // // Очистка обработчиков при размонтировании компонента
        // return () => {
        //     tg.MainButton.offClick();
        // };
    }, [tg, addedItems]);

    // tg.onEvent('mainButtonClicked', onSendData)
    // return () => {
    //    tg.offEvent('mainButtonClicked', onSendData)
    // }

    // useEffect(() => {
    
    //     if (isCartActive && addedItems.length > 0) {
    //         tg.MainButton
    //             .setParams({ 
    //                 text: 'Оформить заказ',
    //                 color: '#82d83f'
    //             })
    //             .show();

    //         tg.MainButton.onClick(handleButtonClick);
    //     } else {
    //         tg.MainButton.hide();
    //     }

    //     return () => {
    //         tg.MainButton.offClick(handleButtonClick);
    //     };
        
    // }, [addedItems, handleButtonClick, tg]);

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
                                handleFavoriteClick(product);
                            }}
                        >
                            <img 
                                src={favoriteItems.some(item => item.id === product.id) ? '/Images/icons/icon-already-add.png' : '/Images/icons/icon-not-add.png'} 
                                alt={favoriteItems.some(item => item.id === product.id) ? 'Remove from Favorites' : 'Add to Favorites'}    
                            />
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <div class="column">
                        {/* <p><strong>{`${product.gender} ${product.category} ${product.brand}`}</strong></p> */}
                        <p className='product-modal-brand'><strong>Бренд:</strong> {product.brand}</p>
                        <p><strong>Размер бренда:</strong> {product.brandSize}</p>
                        <p><strong>Состояние:</strong> {product.condition}</p>
                        <p><strong>Замеры (см):</strong></p>
                        {product.measurements && typeof product.measurements === 'object' ? (
                            <ul>
                                {Object.entries(product.measurements).map(([key, value]) => (
                                    <li key={key}>
                                        <p>{keyTranslations[key] || key}: {value}</p></li>
                                ))}
                            </ul>
                        ) : (
                            <p>{product.measurements && typeof product.measurements === 'string' ? product.measurements : 'Нет данных'}</p>
                        )}
                    </div>
            
                    <div class="column">
                        <p className='product-modal-price'><strong>Цена:</strong> {product.price} ₽</p>    
                        <p><strong>Цвет:</strong> {product.color}</p>
                        <p><strong>О товаре:</strong></p>
                        {product.description && typeof product.description === 'object' ? (
                            <ul>
                                {Object.entries(product.description).map(([key, value]) => (
                                    <li key={key}><p>{key}: {value}</p></li>
                                ))}
                            </ul>
                        ) : (
                            <p>{product.description && typeof product.description === 'string' ? product.description : 'Нет данных'}</p>
                        )}
                    </div>
                </div>

                {/* Кнопки для модального окна */}
                <div className="cart-button-container">
                    {addedItems.some(item => item.id === product.id) ? (
                        <div>
                            <button 
                                className="remove-from-cart" 
                                onClick={() => handleCartClick(product)}
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
                            onClick={() => handleCartClick(product)}
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
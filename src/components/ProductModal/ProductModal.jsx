import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTelegram } from '../../hooks/useTelegram';
import { useCart } from '../../hooks/useCart';
import { useFavorite } from '../../hooks/useFavorite';
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

    const getFormattedTitle = (gender, category, brand) => {
        // Словарь окончаний для согласования по роду
        const masculine = ['Футболка', 'Куртка', 'Рубашка', 'Кофта'];
        const neutral = ['Худи', 'Зип-худи'];
        const masculineAdj = ['Лонгслив', 'Свитшот', 'Джемпер', 'Топ'];
        const plural = ['Джинсы', 'Штаны', 'Джоггеры', 'Шорты', 'Головные уборы'];
    
        let formattedGender = gender;
        if (gender === 'Мужское') {
          if (masculine.includes(category)) formattedGender = 'Мужская';
          else if (neutral.includes(category)) formattedGender = 'Мужское';
          else if (masculineAdj.includes(category)) formattedGender = 'Мужской';
          else if (plural.includes(category)) formattedGender = 'Мужские';
        } else if (gender === 'Женское') {
          if (masculine.includes(category)) formattedGender = 'Женская';
          else if (neutral.includes(category)) formattedGender = 'Женское';
          else if (masculineAdj.includes(category)) formattedGender = 'Женский';
          else if (plural.includes(category)) formattedGender = 'Женские';
        }
    
        const formattedCategory = category.toLowerCase();
        return `${formattedGender} ${formattedCategory} ${brand}`;
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const { handleFavoriteClick } = useFavorite({ favoriteItems, setFavoriteItems, user });
    const { handleCartClick } = useCart({ addedItems, setAddedItems, user });

    const keyTranslations = {
        shoulders: 'Плечи',
        sleeveLength: 'Длина рукава',
        underarms: 'Подмышки',
        backLength: 'Длина по спине',
        outerLegLength: 'Длина внешнего шва',
        innerLegLength: 'Длина внутреннего шва',
        waistWidth: 'Ширина талии',
    };

    const goToCart = () => {
        navigate('/cart');
    }

    useEffect(() => {

        const handleButtonClick = () => {
            if (addedItems.some(item => item.id === product.id)) {
                if (location === 'true') {
                    handleCartClick(product); // Удаляем товар из корзины
                } else {
                    goToCart(); // Переход в корзину
                }
            } else {
                handleCartClick(product); // Добавляем товар в корзину
            }

            if (typeof ym !== 'undefined') {
                ym(99575777,'reachGoal','1', {
                    productId: product.id,
                    productName: product.brand,
                });
            }
        };

        
        if (addedItems.some(item => item.id === product.id)) {
            if (location === 'true') {
                tg.MainButton.setParams({
                    text: 'Удалить из корзины',
                    color: '#000000',
                }).show();
            } else {
                tg.MainButton.setParams({
                    text: 'Перейти в корзину',
                    color: '#82d83f',
                }).show();
            }
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

    }, [tg, addedItems]);


    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{getFormattedTitle(product.gender, product.category, product.brand)}</h2>

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
                {/* <div className="cart-button-container">
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
                </div> */}
            </div>
        </div>
    );
};

export default ProductModal;
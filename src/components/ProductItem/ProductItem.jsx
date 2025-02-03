import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useTelegram } from "../../hooks/useTelegram";
import { useFavorite } from "../../hooks/useFavorite";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ProductItem.css';

const ProductItem = ({ product, className, onClick, onAdd, closedChainOrder }) => {

    const { favoriteItems, setFavoriteItems } = useContext(AppContext);

    const { tg, user } = useTelegram();

    const { handleFavoriteClick } = useFavorite({ favoriteItems, setFavoriteItems, user });

    const [animationActive, setAnimationActive] = useState(true);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    useEffect(() => {
        const animationPlayed = localStorage.getItem("productCardAnimationPlayed");
    
        if (!animationPlayed) {
          const interval = setInterval(() => {
            if (animationActive) {
              const ripple = document.createElement("div");
              ripple.classList.add("click-animation");
              document.getElementById("product-card").appendChild(ripple);
    
              setTimeout(() => {
                ripple.remove();
              }, 1000);
            }
          }, 5000);
    
          return () => clearInterval(interval);
        }
    }, [animationActive]);

    const handleClick = () => {
        setAnimationActive(false);
        localStorage.setItem("productCardAnimationPlayed", "true");
    };


    return (
        <div key={product.id} className={'product ' + className} onClick={handleClick}>
            <div className="product-img-container">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    onSlideChange={handleSlideChange}
                    style={{ width: "100%", height: "auto" }}
                >
                    {product.image.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`${product.brand} - ${index + 1}`}
                                className="product-item-image"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div 
                    className="favorite-icon-catalog" 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteClick(product);
                    }}
                >
                    <img 
                        src={favoriteItems.some(item => item.id === product.id) ? '/Images/icons/icon-already-add.png' : '/Images/icons/icon-not-add.png'} 
                        alt={favoriteItems.some(item => item.id === product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        className={favoriteItems.some(item => item.id === product.id) ? 'active' : ''}
                    />
                </div>
            </div>
            <div className='product-item-info'>
                <div className={'price'}><p>{product.price} ₽</p></div>
                <div className={'brand'}><p>{product.brand}</p></div>
                <div className={'category'}><p>{product.category}</p></div>
                <div className={'brandSize'}><p>Размер: {product.brandSize}</p></div>
            </div>
            {/* <Button className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                onClick={onAddHandler}
            >
                {content} за {product.rentPrice} Р
            </Button> */}
            {/* <Button 
                className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                onClick={handleAdd}
            >
                {content}
            </Button>
            <div id='remove'>
                {status === 'add-btn' ? 'Добавить' : 'Удалить'}
            </div>         */}
        </div>
    );
};

export default ProductItem;

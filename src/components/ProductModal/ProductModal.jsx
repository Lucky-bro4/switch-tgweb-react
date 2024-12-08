import React, { useState } from 'react';
import './ProductModal.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductModal = ({ product, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{product.name}</h2>

                {/* Добавляем прогресс-бар и карусель */}
                <div className="slider-container">
                    <div className="progress-bar">
                        {product.image.map((_, index) => (
                            <div
                                key={index}
                                className={`progress-bar-segment ${activeIndex === index ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        onSlideChange={handleSlideChange}
                        style={{ width: "100%", height: "auto" }}
                    >
                        {product.image.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`${product.name} - ${index + 1}`} className="product-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <p><strong>{product.category + product.name}</strong></p>
                <p><strong>Размер:</strong> {product.size} </p>
                <p><strong>Описание:</strong> {product.description} </p>
                {/* <p><strong>Цена аренды:</strong> {product.rentPrice} Р</p> */}
                <p><strong>Цена:</strong> {product.price} Р</p>
                <Button className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                    onClick={onAddHandler}
                >Добавить в корзину</Button>
            </div>
        </div>
    );
};

export default ProductModal;
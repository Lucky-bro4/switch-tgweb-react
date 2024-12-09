import React, { useState } from 'react';
import './ProductModal.css';
import Button from "../Button/Button";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductModal = ({ product, onClose, onAdd }) => {

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const onAddHandler = () => {
        if (set <= 4) {
            onAdd(product)
            changeButton()
        }
    }
    
    const [status, setStatus] = useState('add-btn')
    const [content, setContent] = useState('Добавить в корзину ща')
    
    const changeButton = () => {
        if (status === 'add-btn' && set < 4) {
            setStatus('already-add-btn')
            setContent('Удалить')
            set += 1
        } else if (set <= 4) {
            setStatus('add-btn')
            setContent('Добавить')
            set -= 1
        }
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
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
                <p><strong>{`${product.category} ${product.name}`}</strong></p>
                <p><strong>Размер:</strong> {product.size} </p>
                <p><strong>Описание:</strong> {product.description} </p>
                {/* <p><strong>Цена аренды:</strong> {product.rentPrice} Р</p> */}
                <p><strong>Цена:</strong> {product.price} Р</p>
                <Button className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                    onClick={onAddHandler}
                >
                    {content}
                </Button>
            </div>
        </div>
    );
};

export default ProductModal;
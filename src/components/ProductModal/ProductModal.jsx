import React from 'react';
import './ProductModal.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductModal = ({ product, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{product.name}</h2>

                {/* Добавляем карусель для фотографий */}
                {product.image.length > 1 ? (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        style={{ width: "100%", height: "auto" }}
                    >
                        {product.image.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`${product.name} - ${index + 1}`} className="product-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <img src={product.image[0]} alt={product.name} className="product-image" />
                )}

                <p><strong>Описание:</strong> {product.description}</p>
                <p><strong>Цена аренды:</strong> {product.rentPrice} Р</p>
            </div>
        </div>
    );
};

export default ProductModal;
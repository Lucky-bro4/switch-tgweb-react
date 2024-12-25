import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import Button from "../Button/Button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTelegram } from '../../hooks/useTelegram';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductModal = ({ product, onClose, onAdd, selectedCount, addedItems, setAddedItems }) => {

    const { tg } = useTelegram();

    const [activeIndex, setActiveIndex] = useState(0);
    const [status, setStatus] = useState('add-btn');
    const [content, setContent] = useState('Добавить в корзину');

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const onAddHandler = () => {    
        setAddedItems([...addedItems, product]);
        // tg.BottomButton [{
        //     type: 'main',
        // }]
        tg.BottomButton.setParams({
            type: 'main',
            text: 'Перейти в корзину',
            color: '#96E442'
        })
        tg.BottomButton.setParams({
            type: 'secondary',
            text: 'Удалить из корзины',
            position: 'right',
            color: '10, 15, 27'
        })

        changeButtonToCart();
  
    };          

    // const changeButtonT = () => {
    //     if (status === 'add-btn' && selectedCount < 4) {
    //         setStatus('already-add-btn')
    //         setContent('')
    //     } else if (selectedCount <= 4) {
    //         setStatus('add-btn')
    //         setContent('Добавить в корзину')
    //     }
    // };

    useEffect(() => {
        tg.MainButton.show();
        tg.MainButton.setParams({
            type: 'main',
            text: 'Добавить в корзину',
            color: '#E22D60'
        })
        
        tg.onEvent('mainButtonClicked', onAddHandler)
        return () => {
        tg.offEvent('mainButtonClicked', onAddHandler)
        }
        
    }, [onAddHandler])


    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{product.brand}</h2>

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
                                <img src={image} alt={`${product.brand} - ${index + 1}`} className="product-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div class="product-info">
                    <div class="column">
                        <p><strong>{`${product.gender} ${product.category} ${product.brand}`}</strong></p>
                        <p><strong>Бренд:</strong> {product.brand}</p>
                        <p><strong>Цена:</strong> {product.price} р.</p>
                        <p><strong>Состояние:</strong> {product.condition}</p>
                    </div>
            
                    <div class="column">
                        <p><strong>Замеры:</strong> {product.measurements}</p>
                        <p><strong>Размер бренда:</strong> {product.brandSize}</p>
                        <p><strong>Цвет:</strong> {product.color}</p>
                        <p><strong>О товаре:</strong> {product.description}</p>
                    </div>
                </div>
                <div className="buttons-container" >
                {/* style={{ display: tg.MainButton.isVisible ? 'flex' : 'none' }} */}
                    <button className="minus-button" onClick={() => setAddedItems(addedItems.filter(item => item !== product))}>
                        -
                    </button>
                    <button className="cart-button" onClick={onAddHandler}>
                        <span className="cart-icon"></span>
                        <span className="checkmark">✔</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
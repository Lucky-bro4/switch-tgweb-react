import React, { useState } from 'react';
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
            color: rgba(150, 228, 66)
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
        tg.BottomButton.show();
        tg.BottomButton.setParams({
            type: 'main',
            text: 'Добавить в корзину',
            color: rgba(226, 45, 96)
        })
        if (!closedChainOrder) {
            tg.onEvent('mainButtonClicked', onAddHandler)
            return () => {
            tg.offEvent('mainButtonClicked', onAddHandler)
            }
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

                <p><strong>{`${product.gender} ${product.category} ${product.brand}`}</strong></p>
                <p><strong>Бренд:</strong> {product.brand} Р</p>
                <p><strong>Цена:</strong> {product.price} Р</p>
                <p><strong>Состояние:</strong> {product.condition} </p>
                <p><strong>Замеры:</strong> {product.measurements} </p>
                <p><strong>Размер бренда:</strong> {product.brandSize} Р</p>
                <p><strong>Цвет:</strong> {product.color} Р</p>
                <p><strong>О товаре:</strong> {product.description} Р</p>
                <div className="buttons-container" style={{ display: tg.MainButton.isVisible() ? 'flex' : 'none' }}>
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
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useTelegram } from "../../hooks/useTelegram";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ProductItem.css';

const ProductItem = ({ product, className, onClick, onAdd, closedChainOrder }) => {

    const { favoriteItems, setFavoriteItems } = useContext(AppContext);

    const { tg, user } = useTelegram();

    const [isFavorite, setIsFavorite] = useState(false);
    // const [status, setStatus] = useState('add-btn')
    // const [content, setContent] = useState('Добавить')


    useEffect(() => {
        setIsFavorite(favoriteItems.includes(product.id));
    }, [favoriteItems, product.id]);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    // const handleAdd = (e) => {
    //     e.stopPropagation(); // Предотвращает распространение клика на родительский элемент
    //     if (selectedCount >= 4) {
    //         tg.alert('Вы не можете выбрать больше 4 товаров.');
    //         return;
    //     }
    //     onAdd(product);
    // };

    // const onAddHandler = () => {
    //     if (selectedCount <= 4) {
    //         onAdd(product)
    //         changeButton()
    //     }
    // }

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();

        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        setFavoriteItems([...favoriteItems, product]);

        // Обновить глобальный или серверный список избранного
        if (newFavoriteState) {
            setFavoriteItems([...favoriteItems, product.id]); // Добавляем ID продукта
        } else {
            setFavoriteItems(favoriteItems.filter(id => id !== product.id)); // Убираем ID продукта
        }

        try {
            // Запрос для обновления на сервере
            await fetch(`https://bottry-lucky-bro4.amvera.io/favorites/${product.id}`, {
                method: newFavoriteState ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId: user.id }),
            });
        } catch (error) {
            console.error('Error updating favorite status:', error);

            // Откат состояния при ошибке
            setIsFavorite(!newFavoriteState);
            if (!newFavoriteState) {
                setFavoriteItems([...favoriteItems, product.id]);
            } else {
                setFavoriteItems(favoriteItems.filter(id => id !== product.id));
            }
        }
    };


    return (
        <div key={product.id} className={'product ' + className} onClick={() => onClick(product)}>
            <div className="img-container">
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
                    onClick={handleFavoriteClick}
                >
                    <img 
                        src={isFavorite ? '/Images/icons/icon-already-add.png' : '/Images/icons/icon-not-add.png'} 
                        alt={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        className={isFavorite ? 'active' : ''}
                    />
                </div>
            </div>
            <div className='product-info'>
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

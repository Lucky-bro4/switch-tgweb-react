import React, { useState, useEffect } from 'react';
import './ProductItem.css';
import { useTelegram } from "../../hooks/useTelegram";


const ProductItem = ({ product, className, onClick, onAdd, closedChainOrder, selectedCount, favoriteItems, setFavoriteItems }) => {

    const { tg, user } = useTelegram();

    const [isFavorite, setIsFavorite] = useState(false);
    // const [status, setStatus] = useState('add-btn')
    // const [content, setContent] = useState('Добавить')


    useEffect(() => {
        setIsFavorite(favoriteItems.includes(product.id));
    }, [favoriteItems, product.id]);

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
                <img className="img" src={product.image[0]} alt={`${product.category} ${product.brand}`} />
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
                <div className={'title'}><p>{product.price} ₽</p></div>
                <div className={'title'}><p>{product.brand}</p></div>
                <div className={'title'}><p>{product.category}</p></div>
                <div className={'size'}><p>Размер: {product.brandSize}</p></div>
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

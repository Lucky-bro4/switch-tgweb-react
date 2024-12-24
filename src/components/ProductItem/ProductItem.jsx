import React, { useState, useEffect } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import { useTelegram } from "../../hooks/useTelegram";


const ProductItem = ({ product, className, onClick, onAdd, closedChainOrder, selectedCount, favoriteItems }) => {

    const { user } = useTelegram();

    const [isFavorite, setIsFavorite] = useState(false);
    const [status, setStatus] = useState('add-btn')
    const [content, setContent] = useState('Добавить')


    useEffect(() => {
        setIsFavorite(favoriteItems.includes(product.id));
    }, [favoriteItems, product.id]);

    const handleAdd = (e) => {
        e.stopPropagation(); // Предотвращает распространение клика на родительский элемент
        if (selectedCount >= 4) {
            alert('Вы не можете выбрать больше 4 товаров.');
            return;
        }
        onAdd(product);
    };

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

        // Обновить глобальный или серверный список избранного
        try {
            const response = await fetch(`https://bottry-lucky-bro4.amvera.io/favorites/${product.id}`, {
                method: newFavoriteState ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({chatId: user.id}),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }
    
            const data = await response.json();
            console.log('Favorite status updated successfully:', data);
        } catch (error) {
            console.error('Error updating favorite status:', error);
            // Revert state change in case of error
            setIsFavorite(!newFavoriteState);
        }
    };


    return (
        <div key={product.id} className={'product ' + className}>
            <div className="img-container">
                <img className="img" src={product.image[0]} alt={`${product.category} ${product.brand}`} />
                <div 
                    className="favorite-icon" 
                    onClick={handleFavoriteClick}
                >
                    <img 
                        src={isFavorite ? '/Images/icons/icon-already-add.png' : '/Images/icons/icon-not-add.png'} 
                        alt={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}    
                    />
                </div>
            </div>
            <div className={'title'}><p>{product.price}</p></div>
            <div className={'title'}><p>{product.brand}</p></div>
            <div className={'title'}><p>{product.category}</p></div>
            <div className={'size'}><p>Размер: {product.brandSize}</p></div>
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

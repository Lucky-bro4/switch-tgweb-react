import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';


const ProductItem = ({ product, className, onClick, onAdd, closedChainOrder, set }) => {

    const onAddHandler = () => {
        if (set <= 4) {
            onAdd(product)
            changeButton()
        }
    }
    
    const [status, setStatus] = useState('add-btn')
    const [content, setContent] = useState('Добавить')
    
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
        <div key={product.id} className={'product ' + className} onClick={onClick}>
            <div className="img-container">
                <img className="img" src={product.image[0]} alt={`${product.category} ${product.name}`} />
            </div>
            <div className={'title'}><h3>{`${product.category} ${product.name}`}</h3></div>
            <div className={'title'}><p>{product.price}</p></div>
            {/* <div className={'title'}>{product.category}</div> */}
            <div className={'size'}><p>Размер: {product.size}</p></div>
            {/* <Button className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                onClick={onAddHandler}
            >
                {content} за {product.rentPrice} Р
            </Button> */}
            <Button 
                className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                onClick={(e) => {
                    e.stopPropagination();
                    onAddHandler
                }}
            >
                {content} за {product.price} Р
            </Button>
            <div id='remove'>
                {changeButton}
            </div>        
        </div>
    );
};

export default ProductItem;

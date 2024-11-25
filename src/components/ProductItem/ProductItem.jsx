import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

let set = 0

const ProductItem = ({product, className, onClick, onAdd, closedChainOrder}) => {

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
                <img className="img" src={product.image} alt={`${product.category} ${product.name}`} />
            </div>
            <div className={'title'}><b>{product.name}</b></div>
            <div className={'title'}>{product.category}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'description'}>Размер: {product.size}</div>
            <Button className={`${status} ${closedChainOrder ? 'disabled' : ''}`}
                onClick={onAddHandler}
            >
                {content} за {product.rentPrice} Р
            </Button>
            <div id='remove'>
                {changeButton}
            </div>        
        </div>
    );
};

export default ProductItem;

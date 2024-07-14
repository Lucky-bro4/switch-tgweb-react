import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

let set = 0

const ProductItem = ({product, className, onAdd, chainOrder}) => {

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
        <div key={product.id} className={'product ' + className}>
            <img className={'img'} src={product.image} alt={product.category + ' ' + product.name} />
            <div className={'title'}><b>{product.category + ' ' + product.name}</b></div>
            <div className={'description'}>{product.description}</div>
            <div className={'description'}>Размер: {product.size}</div>
            <Button className={`${status} ${chainOrder ? 'disabled' : ''}`}
                onClick={chainOrder ? null : onAddHandler}
                disabled={chainOrder}
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

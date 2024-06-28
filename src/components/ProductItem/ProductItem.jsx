import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

let set = 0

const ProductItem = ({product, className, onAdd}) => {

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
        <div className={'product ' + className}>
            <img className={'img'} src={product.img} alt={product.title} />
            <div className={'title'}><b>{product.title}</b></div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={status} onClick={onAddHandler}>
                {content}
            </Button>
            <div id='remove'>
                {changeButton}
            </div>        
        </div>
    );
};

export default ProductItem;

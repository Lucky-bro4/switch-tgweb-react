import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';


const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
        changeButton();
    }
    
    const [status, setStatus] = useState('add-btn')
    const [content, setContent] = useState('Добавить')
    
    const changeButton = () => {
        if (status === 'add-btn') {
            setStatus('already-add-btn')
            setContent('Удалить')
        } else {
            setStatus('add-btn')
            setContent('Добавить')
        }
    }


    return (
        <div className={'product ' + className}>
            <a href={product.img}>
                <img className={'img'} src={product.img} alt={product.title} />
            </a>
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

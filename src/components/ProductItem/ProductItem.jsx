import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import {newItems} from '../ProductList/ProductList';


const ProductItem = ({product, className, onAdd, buttonStatus}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <img className={'img'} src={product.img} alt={product.title} />
            <div className={'title'}><b>{product.title}</b></div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={buttonStatus} onClick={onAddHandler}>
                Добавить
            </Button>
        </div>
    );
};

export default ProductItem;

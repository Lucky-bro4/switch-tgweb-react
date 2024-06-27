import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import './addButton'


const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }
    
    const [status, setStatus] = useState('add-btn', () => {
        if (currentStatus !== 'add-btn') {
            setStatus('already-add-btn')
            console.log(currentStatus)
        } else {
            setStatus('add-btn')
            console.log(currentStatus)
        }
    })

    // const [currentStatus, setStatus] = useState('add-btn')

    //     if (currentStatus !== 'add-btn') {
    //         setStatus('already-add-btn')
    //         console.log(currentStatus)
    //     } else {
    //         setStatus('add-btn')
    //         console.log(currentStatus)
    //     }

    return (
        <div className={'product ' + className}>
            <img className={'img'} src={product.img} alt={product.title} />
            <div className={'title'}><b>{product.title}</b></div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button 
                className={status}
                onClick={onAddHandler}
                whenAdd={setStatus}
            >
                Добавить
            </Button>
        </div>
    );
};

export default ProductItem;

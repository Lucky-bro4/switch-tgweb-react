import React from 'react';
import ProductItem from './ProductItem';

const addButton = (product) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <Button className='add-btn' onClick={onAddHandler}>
            Добавить
        </Button>
    );
};

export default addButton;
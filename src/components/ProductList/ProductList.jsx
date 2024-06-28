import React, {useMemo, useState} from 'react';
import './ProductList.css';
import ProductItem, {changeButton} from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

export let products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', img: '/Images/Одежда/pngtree-ladies-jeans-png-image_2400806.jpg'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', img: '/Images/Одежда/куртка.jpeg'},
    {id: '3', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '4', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

// export const addNewProduct = (newProduct) => {
//     return products.push(newProduct)
// }

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    // const onProductChange = useMemo(() => {
    //     console.log('OK')
    //     if (String(products.length + 1) !== newProduct.id) {
    //         return products.push(newProduct)
    //     }
    // }, [newProduct])


    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId, 
        }
        fetch('https://switchlarge-lucky-bro4.amvera.io/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded || newItems.length > 4) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else if (newItems.length > 4) {
            tg.showAlert('Вы можете выбрать максимум 4 вещи');
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Заказать за ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;

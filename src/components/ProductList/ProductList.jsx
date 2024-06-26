import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', img: '/Images/Одежда/синие_джинсы.jpeg'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', img: '/Images/Одежда/куртка.jpeg'},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', img: ''},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', img: ''},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', img: ''},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', img: ''},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', img: ''},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '9', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '10', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '11', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '12', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '13', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '14', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '15', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '16', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '17', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '18', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '19', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '20', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '21', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '22', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '23', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '24', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '25', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '26', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '27', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '28', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '29', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: ''},
    {id: '30', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', img: ''},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId, 
        }
        fetch('http://85.119.146.179:8000/web-data', {
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

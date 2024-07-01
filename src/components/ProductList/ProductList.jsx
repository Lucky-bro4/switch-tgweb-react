import React, {useState, useEffect} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const products = [{category: 'Куртка', 
    name: 'NONAME', 
    condition: 'Отличное', 
    price: 12000, 
    image: process.env.WEB_APP_URL + 'Images/Одежда/куртка.jpeg',
    status: 'available',
    available: Boolean(true)}]

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const getProducts = async () => {
        try {
            const response = await fetch('https://switchmain-lucky-bro4.amvera.io/products');
            const products = response.json();
            setProducts(products)
        } catch (e) {
            console.log('Ошибка при получении списка товаров:', e)
        }
    }
//
    useEffect(() => {
        getProducts();
    }, [])

    const onSendData = useCallback(() => {
        const data = {
            items: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId, 
        }
        fetch('https://switchmain-lucky-bro4.amvera.io/web-data', {
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
        

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        if (newItems.length > 4) {
            tg.showAlert('Вы можете выбрать максимум 4 вещи');
            acceptSuccess(newItems, success)
            newItems.pop();
        }
        
        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Заказать за ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.length > 0 ? (
                products.map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                ))
            ) : (
                <div className="no-products">
                    <p>Нет доступных продуктов</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;

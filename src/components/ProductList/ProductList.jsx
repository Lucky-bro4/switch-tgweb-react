import React, {useState, useEffect, useCallback} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";


const ProductList = () => {

    const {tg, queryId, user, userId} = useTelegram();

    const [products, setProducts] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [costs, setCosts] = useState(260)
    const [closedChainOrder, setClosedChainOrder] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`https://bottg-lucky-bro4.amvera.io/products?userId=${userId}`);
                const data = await response.json();
                console.log(data.products)
                setProducts(data.products)
                if (data.successOrder) {
                    setCosts(180)
                    if (data.chainOrder) {
                        setClosedChainOrder(true)
                    }
                }
            } catch (e) {
                console.log('Ошибка при получении списка товаров:', e)
            }
        }

        getProducts();
    }, [])


    const onSendData = useCallback(() => {
        
        const data = {
            items: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
            user
        }
        fetch('https://bottg-lucky-bro4.amvera.io/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {

        if (closedChainOrder) {

            tg.showAlert('Заказ вещей сейчас недоступен. Опция будет разблокирована за 2 часа до конца текущей аренды.');

        } else {

            const alreadyAdded = addedItems.find(item => item.id === product.id);
        
            let newItems = [];
            

            if(alreadyAdded) {
                newItems = addedItems.filter(item => item.id !== product.id);
            } else {
                newItems = [...addedItems, product];
                console.log(newItems)
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
                    text: `Заказать за ${getTotalPrice(newItems)} с доставкой`
                })
            }

        } 
    }

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.rentPrice
        }, costs)
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
                        closedChainOrder={closedChainOrder}
                    />
                ))
            ) : (
                <div className="no-products">
                    <p>Сейчас нет доступных вещей</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;

import React, {useState, useEffect, useCallback} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";


const ProductList = () => {

    const {tg, queryId, user} = useTelegram();

    const [products, setProducts] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [costs, setCosts] = useState(260)
    const [closedChainOrder, setClosedChainOrder] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            try {
                console.log('chatId: ', user)
                const response = await fetch(`https://bottg-lucky-bro4.amvera.io/products?chatId=${user.id}`);
                const data = await response.json();
                
                setProducts(data.products)
                if (data.successOrder.status === 'in delivery' || data.successOrder.status === 'order_confirm') {
                    setClosedChainOrder(true)
                    setCosts(180)
                    if (data.successOrder.comment === 'Аренда скоро закончится') {
                        setClosedChainOrder(false)
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

    const onShowAlert = useCallback(() => {
        tg.showAlert('Заказ вещей сейчас недоступен. Опция будет разблокирована за 3 часа до конца текущей аренды.');
    }, [])

    useEffect(() => {
        if (!closedChainOrder) {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
            tg.offEvent('mainButtonClicked', onSendData)
            }
        }
    }, [onSendData])

    const onAdd = (product) => {

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
        } else if (closedChainOrder) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Аренда за ${getTotalPrice(newItems)} Р с доставкой`,
                color: '#ccc'
            })
            tg.onEvent('mainButtonClicked', onShowAlert)
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Арендовать за ${getTotalPrice(newItems)} Р с доставкой`
            })
        } 
    }

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.rentPrice
        }, costs)
    }


    return (
        <div className={'list'}>
            {/* {products.length > 0 ? ( */}
                {products.map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                        closedChainOrder={closedChainOrder}
                    />
                ))}
            {/* ) : (
                <div className="no-products">
                    <p>Загрузка каталога</p>
                </div>
            )} */}
        </div>
    );
};

export default ProductList;

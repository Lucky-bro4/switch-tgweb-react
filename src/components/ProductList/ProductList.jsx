import React, {useState, useEffect, useCallback} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import ProductModal from "../ProductModal/ProductModal";
import { useNavigate } from "react-router-dom";


const ProductList = ({ addedItems, setAddedItems }) => {

    const {tg, queryId, user} = useTelegram();

    const [products, setProducts] = useState([]);
    // const [addedItems, setAddedItems] = useState([]);
    const [costs, setCosts] = useState(260)
    const [order, setOrder] = useState(0)
    const [closedChainOrder, setClosedChainOrder] = useState(false)
    const [newUser, setNewUser] = useState(false)
    const [alertShown, setAlertShown] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                console.log('chatId: ', user)
                const response = await fetch(`https://bottry-lucky-bro4.amvera.io/products?chatId=${user.id}`);
                const data = await response.json();
                
                setProducts(data.products)

                if (!data.customer.location && !data.customer.phone_number) {
                    setNewUser(true)
                }

                if (data.successOrder.status === 'in delivery' || data.successOrder.status === 'order_confirm') {
                    setCosts(180);
                    if (data.successOrder.comment === 'Аренда скоро закончится') {
                        setClosedChainOrder(false);
                    } else {
                        setClosedChainOrder(true);
                    }
                }

            } catch (e) {
                console.log('Ошибка при получении списка товаров:', e)
            }
        }

        getProducts();
    }, [])

    const onProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    }

    const onSendData = useCallback(() => {
        
        const data = {
            items: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
            user
        }
        fetch('https://bottry-lucky-bro4.amvera.io/web-data', {
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
        }


        if (newItems.length > 4) {
            tg.showAlert('Вы можете выбрать максимум 4 вещи');
            acceptSuccess(newItems, success)
            newItems.pop();
        } else if (newItems.length === 1 && newUser && !alertShown) {
            tg.showAlert('Стоимость аренды рассчитывается с учетом доставки. Чем больше вещей в заказе - тем выгоднее цена!')
            setAlertShown(true)
        }

        setOrder(newItems.length)
        setAddedItems(newItems)

        // if(newItems.length === 0) {
        //     tg.MainButton.hide();
        // } else if (closedChainOrder) {
        //     tg.MainButton.show()
        //     tg.MainButton.setParams({
        //         text: `Аренда за ${getTotalPrice(newItems)} Р`,
        //         color: '#ccc'
        //     })
        //     tg.onEvent('mainButtonClicked', onShowAlert)
        // } else {
        //     tg.MainButton.show();
        //     tg.MainButton.setParams({
        //         text: `Арендовать за ${getTotalPrice(newItems)} Р`
        //     })
        // } 

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Оформить заказ`
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
            {products.length > 0 ? (
                products.map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                        onAdd={onAdd}
                        selectedCount={order}
                        onClick={() => onProductClick(item)}
                        className={'item'}
                        closedChainOrder={closedChainOrder}
                    />
                ))
            ) : (
                <div className="no-products">
                    <p>Загрузка каталога</p>
                </div>
            )}
            {isModalOpen && selectedProduct && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={closeModal} 
                    onAdd={onAdd}
                    selectedCount={order}
                />
            )}

            {/* <div className="footer-panel">
                <button className="footer-button" onClick={() => navigate('/profile')}>
                    Профиль
                </button>
                <button className="footer-button" onClick={() => navigate('/favorites')}>
                    Избранное
                </button>
                <button className="footer-button" onClick={() => navigate('/cart')}>
                    Корзина
                </button>
            </div> */}
        </div>
    );
};

export default ProductList;

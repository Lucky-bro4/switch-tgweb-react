import React, {useState, useEffect, useCallback, useContext} from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { AppContext } from '../../context/AppContext';
import ProductModal from "../ProductModal/ProductModal";
import Header from "../Header/Header"
import './ProductList.css';

const ProductList = () => {

    const { products, filteredProducts, setFilteredProducts, addedItems, setAddedItems } = useContext(AppContext);

    const { tg, queryId, user } = useTelegram();

    

    // const [addedItems, setAddedItems] = useState([]);
    
    const [costs, setCosts] = useState(260)
    const [order, setOrder] = useState(0)
    const [closedChainOrder, setClosedChainOrder] = useState(false)
    const [newUser, setNewUser] = useState(false)

    const [alertShown, setAlertShown] = useState(false)

    // const [products, setProducts] = useState([]);
    // const [filteredProducts, setFilteredProducts] = useState(products || []);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({ query: '', filters: {}, gender: '' });

    // const { handleCartClick } = useCart({ addedItems, setAddedItems, user });

    const handleFilterChange = (params) => {
        setSearchParams(params);
    };

    // useEffect(() => {
    //     const getProducts = async () => {
    //         try {
    //             console.log('chatId: ', user)
    //             const response = await fetch(`https://bottry-lucky-bro4.amvera.io/products?chatId=${user.id}`);
    //             // const response = await fetch(`https://bottry-lucky-bro4.amvera.io/products`);
    //             const data = await response.json();
                
    //             if (data.products) {
    //                 setProducts(data.products);
    //                 setFilteredProducts(data.products);
    //             } else {
    //                 setProducts([]); // Если товаров нет, установить пустой массив
    //                 setFilteredProducts([]);
    //             }

    //             // if (data.customer.favorite_items) {
    //             //     setFavoriteItems(data.customer.favorite_items)
    //             // }
    //             // if (data.customer.cart_items) {
    //             //     setAddedItems(data.customer.cart_items)
    //             // }

    //             // if (!data.customer.location && !data.customer.phone_number) {
    //             //     setNewUser(true)
    //             // }

    //             // if (data.successOrder.status === 'in delivery' || data.successOrder.status === 'order_confirm') {
    //             //     setCosts(180);
    //             //     if (data.successOrder.comment === 'Аренда скоро закончится') {
    //             //         setClosedChainOrder(false);
    //             //     } else {
    //             //         setClosedChainOrder(true);
    //             //     }
    //             // }

    //             // Call applyFilters after setting products
    //             // applyFilters(searchParams);

    //         } catch (e) {
    //             console.log('Ошибка при получении списка товаров:', e)
    //         }
    //     }

    //     getProducts();
    // }, [user])

    useEffect(() => {
        applyFilters(searchParams);
    }, [searchParams]);

    const applyFilters = ({ query, filters }) => {
        let updatedProducts = products || [];
    
        if (filters?.category) {
            updatedProducts = updatedProducts.filter(product => product.category === filters.category);
        }
    
        if (filters?.priceRange) {
            updatedProducts = updatedProducts.filter(product => {
                switch (filters.priceRange) {
                case 'до 1000':
                    return product.price < 1000;
                case '1000-3000':
                    return product.price >= 1000 && product.price <= 3000;
                case '3000-5000':
                    return product.price > 3000 && product.price <= 5000;
                case 'от 5000':
                    return product.price > 5000;
                default:
                    return true;
                }
            });
        }

        if (filters?.gender) {
            updatedProducts = updatedProducts.filter(
                product => product.gender === filters.gender
            );
        }
 
        if (query) {
            updatedProducts = updatedProducts.filter(product =>
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        }
    
        setFilteredProducts(updatedProducts);
    };

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

    // useEffect(() => {
    //     if (!closedChainOrder) {
    //         tg.onEvent('mainButtonClicked', onSendData)
    //         return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //         }
    //     }
    // }, [onSendData])


    // const onAdd = (product) => {

    //     const alreadyAdded = addedItems.find(item => item.id === product.id);
    
    //     let newItems = [];
        
    //
    //     if(alreadyAdded) {
    //         newItems = addedItems.filter(item => item.id !== product.id);
    //     } else {
    //         newItems = [...addedItems, product];
    //     }


    //     if (newItems.length > 4) {
    //         tg.showAlert('Вы можете выбрать максимум 4 вещи');
    //         acceptSuccess(newItems, success)
    //         newItems.pop();
    //     } else if (newItems.length === 1 && newUser && !alertShown) {
    //         tg.showAlert('Стоимость аренды рассчитывается с учетом доставки. Чем больше вещей в заказе - тем выгоднее цена!')
    //         setAlertShown(true)
    //     }

    //     setOrder(newItems.length)
    //     setAddedItems(newItems)

    //     // if(newItems.length === 0) {
    //     //     tg.MainButton.hide();
    //     // } else if (closedChainOrder) {
    //     //     tg.MainButton.show()
    //     //     tg.MainButton.setParams({
    //     //         text: `Аренда за ${getTotalPrice(newItems)} Р`,
    //     //         color: '#ccc'
    //     //     })
    //     //     tg.onEvent('mainButtonClicked', onShowAlert)
    //     // } else {
    //     //     tg.MainButton.show();
    //     //     tg.MainButton.setParams({
    //     //         text: `Арендовать за ${getTotalPrice(newItems)} Р`
    //     //     })
    //     // } 

    //     if(newItems.length === 0) {
    //         tg.MainButton.hide();
    //     } else {
    //         tg.MainButton.show();
    //         tg.MainButton.setParams({
    //             text: `Посмотреть заказ`
    //         })
    //         tg.onEvent('mainButtonClicked', onShowAlert)
    //     } 

    // }

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.rentPrice
        }, costs)
    }


    return (
        <div>
            <Header />
            <SearchComponent onFilterChange={handleFilterChange} />
            <div className={'list'}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(item => (
                        <ProductItem
                            key={item.id}
                            product={item}
                            // onAdd={onAdd}
                            onClick={() => onProductClick(item)}
                            className={'item'}
                            closedChainOrder={closedChainOrder}
                            // favoriteItems={favoriteItems}
                            // setFavoriteItems={setFavoriteItems}
                        />
                    ))
                ) : (
                    <div className="no-products">
                        Не нашли товары по заданному условию 😞
                    </div>
                )}
            </div>
            {isModalOpen && selectedProduct && (
                <ProductModal
                    product={selectedProduct} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import Button from '../Button/Button';

const AdminPage = () => {
    
    const [id, setId] = useState(0)
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);
    const [rentPrice, setRentPrice] = useState(0);
    const [photo, setPhoto] = useState('/Images/Одежда/');
    const [status, setStatus] = useState('available');
    const [available, setAvailable] = useState(1);

    const [availableProducts, setAvailableProducts] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const [laundryProducts, setLaundryProducts] = useState([])
    const [clents, setClients] = useState([])
    const [orders, setOrders] = useState([])
    const [itemOrder, setItemOrders] = useState([])

    const [productUserId, changeUserId] = useState(0);

    const [orderId, changeOrderId] = useState(0);
    const [chatId, changeChatId] = useState('');

    const [orderItem1, setOrderItem1] = useState('');
    const [item1, setItem1] = useState(0);
    const [checkboxItem1, setCheckboxItem1] = useState(false);

    const [orderItem2, setOrderItem2] = useState('');
    const [item2, setItem2] = useState(0);
    const [checkboxItem2, setCheckboxItem2] = useState(false);

    const [orderItem3, setOrderItem3] = useState('');
    const [item3, setItem3] = useState(0);
    const [checkboxItem3, setCheckboxItem3] = useState(false);

    const [orderItem4, setOrderItem4] = useState('');
    const [item4, setItem4] = useState(0);
    const [checkboxItem4, setCheckboxItem4] = useState(false);

    const [comment, changeComment] = useState('');
    const [statusOrder, changestatusOrder] = useState('success');

    const [message, setMessage] = useState('');


    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeCondition = (e) => {
        setCondition(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeSize = (e) => {
        setSize(e.target.value);
    };

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const onChangeRentPrice = (e) => {
        setRentPrice(e.target.value);
    };

    const onChangePhoto = (e) => {
        setPhoto(e.target.value);
    };

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    };
    const onChangeAvailable = (e) => {
        setAvailable(e.target.value);
    };

    const ifChangeUserId = (e) => {
        changeUserId(e.target.value);
    };

    const onChangeOrderId = (e) => {
        changeOrderId(e.target.value);
    };
    const onChangeChatId = (e) => {
        changeChatId(e.target.value);
    };


    const changeItem1 = (id) => setItem1(id);
    const changeOrderItem1 = (text) => setOrderItem1(text);
    const changeItem2 = (id) => setItem2(id);
    const changeOrderItem2 = (text) => setOrderItem2(text);
    const changeItem3 = (id) => setItem3(id);
    const changeOrderItem3 = (text) => setOrderItem3(text);
    const changeItem4 = (id) => setItem4(id);
    const changeOrderItem4 = (text) => setOrderItem4(text);
    

    const onChangeCheckboxItem1 = () => {
        setCheckboxItem1(!checkboxItem1);
    };

    const onChangeCheckboxItem2 = () => {
        setCheckboxItem2(!checkboxItem2);
    };

    const onChangeCheckboxItem3 = () => {
        setCheckboxItem3(!checkboxItem3);
    };

    const onChangeCheckboxItem4 = () => {
        setCheckboxItem4(!checkboxItem4);
    };

    const onChangestatusOrder = (e) => {
        changestatusOrder(e.target.value);
    };

    const onChangeComment = (e) => {
        changeComment(e.target.value);
    };

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Ошибка отправки товара');
        }

        return response.json(); 
    };

    const sendData = async (e) => {
        e.preventDefault();

        const newProduct = {
            category: category,
            name: name,
            condition: condition,
            description: description,
            size: size,
            price: Number(price),
            rentPrice: Number(rentPrice),
            photo: photo
        };

        console.log(newProduct);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/newProduct', newProduct);
            console.log(data.message);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const getAllData = async (e) => {
 
        try {
            const response = await fetch('https://bottg-lucky-bro4.amvera.io/allData');
            const data = await response.json();
            setAvailableProducts(data.availableProducts)
            setOrderProducts(data.orderProducts)
            setLaundryProducts(data.laundryProducts)

            setClients(data.clients)
            setOrders(data.orders)
            setItemOrders(data.itemOrder)

        } catch (e) {
            console.log('Ошибка при получении списка данных:', e)
        }
    }

    const changeData = async (e) => {
        e.preventDefault();

        const changeProduct = {
            id: Number(id),
            category: category,
            name: name,
            condition: condition,
            description: description,
            size: size,
            price: Number(price),
            rentPrice: Number(rentPrice),
            photo: photo,
            status: status,
            available: Boolean(available),
            userId: Number(productUserId),
        };

        console.log(changeProduct);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/changeProduct', changeProduct);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const changeStatus = async (e) => {
        e.preventDefault();

        const changeProduct = {
            id: Number(id),
            status: status,
            available: Boolean(available),
            message: 'change_status'
        };

        console.log(changeProduct);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/changeProduct', changeProduct);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const deleteData = async (e) => {
        e.preventDefault();

        const deleteProduct = {
            id: Number(id),
        };

        console.log(deleteData);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/deleteProduct', deleteProduct);
            console.log(data.message);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const confirmStatusOrder = async (e) => {
        e.preventDefault();

        const items = {
            item1: Number(item1),
            checkboxItem1: checkboxItem1,
            item2: Number(item2),
            checkboxItem2: checkboxItem2,
            item3: Number(item3),
            checkboxItem3: checkboxItem3,
            item4: Number(item4), 
            checkboxItem4: checkboxItem4
        };

        const order = {
            orderId: orderId,
            chatId: chatId,
            items: items,
            statusOrder: statusOrder,
            comment: comment
        };

        console.log(order);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/statusOrder', order);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const downloadOrder = async (e) => {
        e.preventDefault();

        const order = {
            orderId: Number(orderId),
            chatId: chatId
        };
        console.log(order)
        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/order', order);
            console.log(data)

            if (data.products[0]) {
                changeItem1(data.products[0].id)
                changeOrderItem1(`ID продукта: ${data.products[0].id}; Название: ${data.products[0].category} ${data.products[0].name}`)
                console.log(item1)
            }
            if (data.products[1]) {
                changeItem2(data.products[1].id)
                changeOrderItem2(`ID продукта: ${data.products[1].id}; Название: ${data.products[1].category} ${data.products[1].name}`)
                console.log(item2)
            }
            if (data.products[2]) {
                changeItem3(data.products[2].id)
                changeOrderItem3((`ID продукта: ${data.products[2].id}; Название: ${data.products[2].category} ${data.products[2].name}`))
                console.log(item3)
            }
            if (data.products[3]) {
                changeItem4(data.products[3].id)
                changeOrderItem4((`ID продукта: ${data.products[3].id}; Название: ${data.products[3].category} ${data.products[3].name}`))
                console.log(item4)
            }
            if (data.products) {
                setMessage('Данные по заказу получены');
            } else {
                setMessage('Не удалось выгрузить данные по заказу');
            }
        } catch (e) {
            console.log('Ошибка при получении списка товаров:', e)
        }
    };

    useEffect(() => {
        getAllData();
    }, [])

    useEffect(() => {
        console.log("Item 1 updated:", item1);
    }, [item1]);
    
    useEffect(() => {
        console.log("Item 2 updated:", item2);
    }, [item2]);
    
    useEffect(() => {
        console.log("Item 3 updated:", item3);
    }, [item3]);
    
    useEffect(() => {
        console.log("Item 4 updated:", item4);
    }, [item4]);

    return (
        <div>
            <form className={"form"}>
                <h3>Добавление товара</h3>
                <input
                    className={'input'}
                    type="number"
                    placeholder={'Id'}
                    value={id}
                    onChange={onChangeId}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Category'}
                    value={category}
                    onChange={onChangeCategory}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Name'}
                    value={name}
                    onChange={onChangeName}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Condition'}
                    value={condition}
                    onChange={onChangeCondition}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Description'}
                    value={description}
                    onChange={onChangeDescription}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Size'}
                    value={size}
                    onChange={onChangeSize}
                />
                <div>
                    <input
                        className={'input'}
                        type="number"
                        placeholder={'Price'}
                        value={price}
                        onChange={onChangePrice}
                    /> Price
                </div>
                <div>
                    <input
                        className={'input'}
                        type="number"
                        placeholder={'RentPrice'}
                        value={rentPrice}
                        onChange={onChangeRentPrice}
                    /> Rent Price ( {price / 20 * 1.2 + 25} руб/день )
                </div>
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Photo'}
                    value={photo}
                    onChange={onChangePhoto}
                />
                <select value={status} onChange={onChangeStatus} className={'input'}>
                    <option value={'available'}>Доступен</option>
                    <option value={'reserved'}>Зарезервирован</option>
                    <option value={'in order'}>В заказе</option>
                </select>
                <select value={available} onChange={onChangeAvailable} className={'input'}>
                    <option value={1}>Доступен</option>
                    <option value={0}>Не доступен</option>
                </select>
                <div>
                    <Button className='btn-add-clothes' onClick={sendData}>
                        Добавить
                    </Button>
                    <Button className='btn-change-clothes' onClick={changeData}>
                        Изменить
                    </Button>
                    <Button className='btn-delete-clothes' onClick={deleteData}>
                        Удалить
                    </Button>
                    <Button className='btn-change-clothes' onClick={changeStatus}>
                        Изменить статус
                    </Button>
                </div>
            </form>
            <form className='form'>
                <h3>Подтверждение заказа</h3>
                <div>
                    <input
                        className={'input'}
                        type="number"
                        placeholder={'orderId'}
                        value={orderId}
                        onChange={onChangeOrderId}
                    />
                    <input
                        className={'input'}
                        type="text"
                        placeholder={'chatId'}
                        value={chatId}
                        onChange={onChangeChatId}
                    />
                </div>
                <div>
                    <div className="input-container">
                        <input
                            className={'inputItem'}
                            type="text"
                            placeholder={'item1'}
                            value={orderItem1}
                        />
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxItem1}
                            onChange={onChangeCheckboxItem1}
                            />
                            Товар 1 в заказе
                        </label>
                    </div>
                    <div className="input-container">
                        <input
                            className={'inputItem'}
                            type="text"
                            placeholder={'item2'}
                            value={orderItem2}
                        />
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxItem2}
                            onChange={onChangeCheckboxItem2}
                            />
                            Товар 2 в заказе
                        </label>
                    </div>
                    <div className="input-container">
                        <input
                            className={'inputItem'}
                            type="text"
                            placeholder={'item3'}
                            value={orderItem3}
                        />
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxItem3}
                            onChange={onChangeCheckboxItem3}
                            />
                            Товар 3 в заказе
                        </label>
                    </div>
                    <div className="input-container">
                        <input
                            className={'inputItem'}
                            type="text"
                            placeholder={'item4'}
                            value={orderItem4}
                        />
                        <label>
                            <input
                            type="checkbox"
                            checked={checkboxItem4}
                            onChange={onChangeCheckboxItem4}
                            />
                            Товар 4 в заказе
                        </label>
                    </div>
                </div>
                <select value={statusOrder} onChange={onChangestatusOrder} className={'input'}>
                    <option value={'success'}>Заказ принят полностью или частично</option>
                    <option value={'canceled'}>Отказ от заказа</option>
                    <option value={'closed'}>Завершить</option>
                </select>
                <input
                    className={'input-comment'}
                    type="text"
                    placeholder={'Comment'}
                    value={comment}
                    onChange={onChangeComment}
                />
                <div>
                    <Button className='btn-change-clothes' onClick={downloadOrder}>
                        Загрузить заказ
                    </Button>
                    <Button className='btn-confirm' onClick={confirmStatusOrder}>
                        Отправить
                    </Button>
                </div>
                {message && <p className='message'>{message}</p>}           
            </form>
            <div className='example'>
                <img className={'example_img'} src={photo} alt={name} />
                <div className={'example_name'}><b>{category + ' ' + name}</b></div>
                <div className={'example_description'}>{description}</div>
                <div className={'example_description'}>Размер: {size}</div>
            </div>
            <div>
                <h2>Список товаров</h2>
                <div className='list'>
                    <h3>Доступные сейчас товары</h3>
                    {availableProducts.map(availableItem => (
                    <div key={availableItem}>
                        {`${availableItem.id} `}
                        {`${availableItem.category} `}
                        {`${availableItem.name} `}
                        {`${availableItem.condition} `}
                        {`${availableItem.description} `}
                        {`${availableItem.size} `}
                        {`${availableItem.price} `}
                        {`${availableItem.rentPrice} `}
                        {`${availableItem.status} `}
                        {`${String(availableItem.available)}  `}
                    </div>
                    ))}
                </div>
                <div className='list'>
                    <h3>Товары в аренде</h3>
                    {orderProducts.map(orderItem => (
                    <div key={orderItem}>
                        {`${orderItem.id} `}
                        {`${orderItem.category} `}
                        {`${orderItem.name} `}
                        {`${orderItem.condition} `}
                        {`${orderItem.description} `}
                        {`${orderItem.size} `}
                        {`${orderItem.price} `}
                        {`${orderItem.rentPrice} `}
                        {`${orderItem.status} `}
                        {`${String(orderItem.available)}  `}
                        {`Пользователь: ${orderItem.userId} `}
                    </div>
                    ))}
                </div>
                <div className='list'>
                    <h3>Товары в прачечной</h3>
                    {laundryProducts.map(laundryItem => (
                    <div key={laundryItem}>
                        {`${laundryItem.id} `}
                        {`${laundryItem.category} `}
                        {`${laundryItem.name} `}
                        {`${laundryItem.condition} `}
                        {`${laundryItem.description} `}
                        {`${laundryItem.size} `}
                        {`${laundryItem.price} `}
                        {`${laundryItem.rentPrice} `}
                        {`${laundryItem.status} `}
                        {`${String(laundryItem.available)}  `}
                        {`Пользователь: ${laundryItem.userId} `}
                    </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Список клиентов</h2>
                {clents.map(client => (
                    <div key={client}>
                        {`${client.id} `}
                        {`${client.chatId} `}
                        {`${client.login} `}
                        {`${client.phone_number} `}
                        {`${client.location} `}
                        {/* {`Товары: ${item.userId} `} */}
                    </div>
                ))}
            </div>
            <div>
                <h2>Список заказов</h2>
                {orders.map(order => (
                    <div key={order}>
                        {`${order.id} `}
                        {`${order.status} `}
                        {`${order.comment} `}
                        {`Пользователь: ${order.userId} `}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
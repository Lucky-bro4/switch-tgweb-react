import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import Button from '../Button/Button';

const AdminPage = () => {
    
    const [id, setId] = useState(0)
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [photo, setPhoto] = useState('/Images/Одежда/');
    const [status, setStatus] = useState('available');
    const [available, setAvailable] = useState(1);

    const [products, setProducts] = useState([])
    const [clents, setClients] = useState([])

    const [productUserId, changeUserId] = useState(0);

    const [chatId, changeChatId] = useState('');
    const [item1, changeItem1] = useState(0);
    const [item2, changeItem2] = useState(0);
    const [item3, changeItem3] = useState(0);
    const [item4, changeItem4] = useState(0);
    const [statusOrder, changestatusOrder] = useState('confirm');

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

    const onChangePrice = (e) => {
        setPrice(e.target.value);
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

    const onChangeChatId = (e) => {
        changeChatId(e.target.value);
    };

    const onChangeItem1 = (e) => {
        changeItem1(e.target.value);
    };

    const onChangeItem2 = (e) => {
        changeItem2(e.target.value);
    };

    const onChangeItem3 = (e) => {
        changeItem3(e.target.value);
    };

    const onChangeItem4 = (e) => {
        changeItem4(e.target.value);
    };

    const onChangestatusOrder = (e) => {
        changestatusOrder(e.target.value);
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
            price: Number(price),
            photo: photo
        };

        console.log(newProduct);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/newProduct', newProduct);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const getAllData = async (e) => {
 
        try {
            const response = await fetch('https://bottg-lucky-bro4.amvera.io/allData');
            const data = await response.json();
            setProducts(data.products)
            setClients(data.clients)

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
            price: Number(price),
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

        const order = {
            chatId: chatId,
            item1: Number(item1),
            item2: Number(item2),
            item3: Number(item3),
            item4: Number(item4),
            statusOrder: statusOrder
        };

        console.log(order);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/statusOrder', order);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    useEffect(() => {
        getAllData();
    }, [])

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
                    type="number"
                    placeholder={'Price'}
                    value={price}
                    onChange={onChangePrice}
                />
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
                </div>
            </form>
            <form>
            <h3>Подтверждение заказа</h3>
                <input
                    className={'input'}
                    type="text"
                    placeholder={'chatId'}
                    value={chatId}
                    onChange={onChangeChatId}
                />
                <div>
                    <input
                        className={'inputItem'}
                        type="number"
                        placeholder={'item1'}
                        value={item1}
                        onChange={onChangeItem1}
                    />
                    <input
                        className={'inputItem'}
                        type="number"
                        placeholder={'item2'}
                        value={item2}
                        onChange={onChangeItem2}
                    />
                    <input
                        className={'inputItem'}
                        type="number"
                        placeholder={'item3'}
                        value={item3}
                        onChange={onChangeItem3}
                    />
                    <input
                        className={'inputItem'}
                        type="number"
                        placeholder={'item4'}
                        value={item4}
                        onChange={onChangeItem4}
                    />
                </div>
                <select value={statusOrder} onChange={onChangestatusOrder} className={'input'}>
                    <option value={'confirm'}>Принят</option>
                    <option value={'canceled'}>Отказ</option>
                </select>
                <Button className='btn-confirm' onClick={confirmStatusOrder}>
                    Отправить
                </Button>
            </form>
            <div className='example'>
                <img className={'example_img'} src={photo} alt={name} />
                <div className={'example_name'}><b>{category + ' ' + name}</b></div>
                <div className={'price'}>
                    <div className={'example_description'}>{description}</div>
                    <span>Стоимость: <b>{price}</b></span>
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
                <h2>Список товаров</h2>
                {products.map(item => (
                    <div key={item}>
                        {`${item.id} `}
                        {`${item.category} `}
                        {`${item.name} `}
                        {`${item.condition} `}
                        {`${item.description} `}
                        {`${item.price} `}
                        {`${item.status} `}
                        {`${String(item.available)}  `}
                        {`Пользователь: ${item.userId} `}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
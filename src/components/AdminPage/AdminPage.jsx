import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import Button from '../Button/Button';

const AdminPage = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [photo, setPhoto] = useState('Images/Одежда/');

    const [products, setProducts] = useState([])

    const [productId, changeId] = useState('');
    const [productCategory, changeCategory] = useState('');
    const [productName, changeName] = useState('');
    const [productCondition, changeCondition] = useState('');
    const [productDescription, changeDescription] = useState('');
    const [productPrice, changePrice] = useState(0);
    const [productPhoto, changePhoto] = useState('Images/Одежда/');
    const [productStatus, changeStatus] = useState('');
    const [productAvailable, changeAvailable] = useState(0);

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



    const ifChangeId = (e) => {
        changeId(e.target.value);
    };

    const ifChangeCategory = (e) => {
        changeCategory(e.target.value);
    };

    const ifChangeName = (e) => {
        changeName(e.target.value);
    };

    const ifChangeCondition = (e) => {
        changeCondition(e.target.value);
    };

    const ifChangeDescription = (e) => {
        changeDescription(e.target.value);
    };

    const ifChangePrice = (e) => {
        changePrice(e.target.value);
    };

    const ifChangePhoto = (e) => {
        changePhoto(e.target.value);
    };

    const ifChangeStatus = (e) => {
        changeStatus(e.target.value);
    };

    const ifChangeAvailable = (e) => {
        changeAvailable(e.target.value);
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

    const getAllProducts = async (e) => {
 
        try {
            const response = await fetch('https://bottg-lucky-bro4.amvera.io/allProducts');
            const products = await response.json();
            setProducts(products)

        } catch (e) {
            console.log('Ошибка при получении списка товаров:', e)
        }
    }

    const changeData = async (e) => {
        e.preventDefault();

        const changeProduct = {
            id: productId,
            category: productCategory,
            name: productName,
            condition: productCondition,
            description: productDescription,
            price: Number(productPrice),
            photo: productPhoto,
            status: productStatus,
            available: Boolean(productAvailable)
        };

        console.log(changeProduct);

        try {
            const data = await postData('https://bottg-lucky-bro4.amvera.io/changeProduct', changeProduct);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div>
            <form className={"form"} onSubmit={sendData}>
                <h3>Добавление товара</h3>
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
                <Button className='btn-add-clothes'>
                    Добавить
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
            <form className={"form"}>
                <div>
                    <h2>Список всех товаров</h2>
                </div>
                <div>
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
            </form>
            <form className={"form"} onSubmit={changeData}>
                <h2>Изменить данные товара товара</h2>
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Id'}
                    value={productId}
                    onChange={ifChangeId}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Category'}
                    value={productCategory}
                    onChange={ifChangeCategory}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Name'}
                    value={productName}
                    onChange={ifChangeName}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Condition'}
                    value={productCondition}
                    onChange={ifChangeCondition}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Description'}
                    value={productDescription}
                    onChange={ifChangeDescription}
                />
                <input
                    className={'input'}
                    type="number"
                    placeholder={'Price'}
                    value={productPrice}
                    onChange={ifChangePrice}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Photo'}
                    value={productPhoto}
                    onChange={ifChangePhoto}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Status'}
                    value={productStatus}
                    onChange={ifChangeStatus}
                />
                <input
                    className={'input'}
                    type="number"
                    placeholder={'Available'}
                    value={productAvailable}
                    onChange={ifChangeAvailable}
                />
                <Button className='btn-add-clothes'>
                    Изменить
                </Button>
            </form>
        </div>
    );
};

export default AdminPage;
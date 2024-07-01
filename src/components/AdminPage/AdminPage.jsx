import React, { useState } from 'react';
import './AdminPage.css';
import { products } from '../ProductList/ProductList';
import Button from '../Button/Button';

const AdminPage = () => {
    const [id, setId] = useState(String(products.length + 1));
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState('/Images/Одежда/');

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
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

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json(); 
    };

    const sendData = async (e) => {
        e.preventDefault(); // Отменить стандартное поведение формы

        const newProduct = {
            id: id,
            title: title,
            description: description,
            price: price,
            photo: photo
        };

        console.log(newProduct);

        try {
            const data = await postData('https://switchmain-lucky-bro4.amvera.io/newProduct', newProduct);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
        <div>
            <form className={"form"} onSubmit={sendData}>
                <h3>Добавление товара</h3>
                <input
                    className={'input'}
                    type="text"
                    placeholder={'id'}
                    value={id}
                    onChange={onChangeId}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Title'}
                    value={title}
                    onChange={onChangeTitle}
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
                <img className={'example_img'} src={photo} alt={title} />
                <div className={'example_title'}><b>{title}</b></div>
                <div className={'price'}>
                    <div className={'example_description'}>{description}</div>
                    <span>Стоимость: <b>{price}</b></span>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
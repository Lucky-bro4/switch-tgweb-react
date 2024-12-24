import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import './AdminPage.css';
import './AdminPreview.css';
import Button from '../Button/Button';

const AdminPage = () => {
    
    const [id, setId] = useState(0)
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [rentPrice, setRentPrice] = useState(0);
    const [condition, setCondition] = useState('');
    const [measurements, setMeasurements] = useState('');
    const [brandSize, setBrandSize] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [avitoUrl, setAvitoUrl] = useState('');
    // const [photo, setPhoto] = useState('/Images/Одежда/');

    const [photos, setPhotos] = useState([]);
    const [photoPaths, setPhotoPaths] = useState([]);


    const handlePhotoChange = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = files.map((file) => URL.createObjectURL(file));
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

        const newPhotoPaths = files.map((file) => file);
        setPhotoPaths((prevPaths) => [...prevPaths, ...newPhotoPaths]);
    };

    const handleRemovePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
        setPhotoPaths(photoPaths.filter((_, i) => i !== index));
    };


    const [status, setStatus] = useState('available');
    const [available, setAvailable] = useState(1);
    const [itemUserId, setItemUserId] = useState(0);
    const [itemOrderId, setItemOrderId] = useState(0);

    const [allProducts, setAllProducts] = useState([])
    const [availableProducts, setAvailableProducts] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const [laundryProducts, setLaundryProducts] = useState([])
    const [otherProducts, setOtherProducts] = useState([])

    const [clients, setClients] = useState([])
    const [orders, setOrders] = useState([])

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

//Изменение товара
    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeGender = (e) => {
        setGender(e.target.value);
    };

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const onChangeName = (e) => {
        setBrand(e.target.value);
    };

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const onChangeRentPrice = (e) => {
        setRentPrice(e.target.value);
    };
    
    const onChangeCondition = (e) => {
        setCondition(e.target.value);
    };
    
    const onChangeMeasurements = (e) => {
        setMeasurements(e.target.value);
    };

    const onChangeBrandSize = (e) => {
        setBrandSize(e.target.value);
    };

    const onChangeColor = (e) => {
        setColor(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeAvitoUrl = (e) => {
        setAvitoUrl(e.target.value);
    };



    // const onChangePhoto = (e) => {
    //     setPhoto(e.target.value);
    // };

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    };
    const onChangeAvailable = (e) => {
        setAvailable(e.target.value);
    };

    const onChangeItemUserId = (e) => {
        setItemUserId(e.target.value);
    };

    const onChangeItemOrderId = (e) => {
        setItemOrderId(e.target.value);
    };

//Подтверждение заказа
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
            gender: gender,
            category: category,
            brand: brand,
            price: Number(price),
            rentPrice: Number(rentPrice),
            condition: condition,
            measurements: measurements,
            brandSize: brandSize,
            color: color,
            description: description,
            avitoUrl: avitoUrl,
            status: status,
            available: available
        };

        console.log(newProduct);

        const productResponse = await fetch('https://bottry-lucky-bro4.amvera.io/newProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });

        const { itemId } = await productResponse.json();

        if (itemId && photos.length > 0){

            const formData = new FormData();
            photoPaths.forEach((file) => formData.append('photos', file));
            formData.append('itemId', String(itemId));

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
              }
            
            try {
                // Отправляем файлы на сервер
                const response = await fetch('https://bottry-lucky-bro4.amvera.io/upload', {
                    method: 'POST',
                    body: formData,
                });
        
                const data = await response.json();
                console.log('Ответ от сервера по фото:', data);
            } catch (error) {
                console.error('Ошибка при отправке данных по фото:', error);
            }
        }
    };

    const getAllData = async () => {
 
        try {
            const response = await fetch('https://bottry-lucky-bro4.amvera.io/allData');
            const data = await response.json();
            setAllProducts(data.allProducts)

            let available = []
            let order = []
            let laundry = []
            let other = []

            for (let i = 0; i < data.allProducts.length; i++) {
                if (data.allProducts[i].status === 'available' || data.allProducts[i].status === 'fake') {
                    available = [...available, data.allProducts[i]]  

                } else if (data.allProducts[i].status === 'in order') {
                    order = [...order, data.allProducts[i]]

                } else if (data.allProducts[i].status === 'in laundry') {
                    laundry = [...laundry, data.allProducts[i]]

                } else {
                    other = [...other, data.allProducts[i]]
                }
            }

            setAvailableProducts(available)
            setOrderProducts(order)
            setLaundryProducts(laundry)
            setOtherProducts(other)

            setClients(data.clients)
            setOrders(data.orders)

        } catch (e) {
            console.log('Ошибка при получении списка данных:', e)
        }
    }

    const changeData = async (e) => {
        e.preventDefault();

        const changeProduct = {
            id: Number(id),
            gender: gender,
            category: category,
            brand: brand,
            price: Number(price),
            rentPrice: Number(rentPrice),
            condition: condition,
            measurements: measurements,
            brandSize: brandSize,
            color: color,
            description: description,
            avitoUrl: avitoUrl,
            // photo: photos,
            status: status,
            available: Boolean(available),
            userId: itemUserId,
            orderId: itemOrderId
        };

        console.log(changeProduct);

        try {
            const data = await postData('https://bottry-lucky-bro4.amvera.io/changeProduct', changeProduct);
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
            const data = await postData('https://bottry-lucky-bro4.amvera.io/changeProduct', changeProduct);
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
            const data = await postData('https://bottry-lucky-bro4.amvera.io/deleteProduct', deleteProduct);
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
            const data = await postData('https://bottry-lucky-bro4.amvera.io/statusOrder', order);
            if (data.ok) {
                setMessage('Данные по заказу получены')
            }
        } catch (error) {
            console.error();
            setMessage(`Ошибка при отправке данных: ${error}`);
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
            const data = await postData('https://bottry-lucky-bro4.amvera.io/order', order);
            console.log(data)

            if (data.products[0]) {
                changeItem1(data.products[0].id)
                changeOrderItem1(`ID продукта: ${data.products[0].id}; Название: ${data.products[0].category} ${data.products[0].brand}`)
            }
            if (data.products[1]) {
                changeItem2(data.products[1].id)
                changeOrderItem2(`ID продукта: ${data.products[1].id}; Название: ${data.products[1].category} ${data.products[1].brand}`)
            }
            if (data.products[2]) {
                changeItem3(data.products[2].id)
                changeOrderItem3((`ID продукта: ${data.products[2].id}; Название: ${data.products[2].category} ${data.products[2].brand}`))
            }
            if (data.products[3]) {
                changeItem4(data.products[3].id)
                changeOrderItem4((`ID продукта: ${data.products[3].id}; Название: ${data.products[3].category} ${data.products[3].brand}`))
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
        getAllData()
    }, [])

    return (
        <div>
            <div class="admin-container">
                <div class="admin-form">
                    <form className="form">
                        <h3>Добавление товара</h3>
                        <input
                        className="input"
                        type="number"
                        placeholder="Id"
                        value={id}
                        onChange={onChangeId}
                        />
                        <select
                            name="Gender"
                            placeholder="Gender"
                            value={gender}
                            onChange={onChangeGender}
                            className="input"
                        >
                            <option value="Male">Мужское</option>
                            <option value="Female">Женское</option>
                        </select>
                        <input
                        className="input"
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={onChangeCategory}
                        />
                        <input
                        className="input"
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={onChangeName}
                        />
                        <input
                        className="input"
                        type="text"
                        placeholder="Condition"
                        value={condition}
                        onChange={onChangeCondition}
                        />
                        {/* <div className="measurements-input">
                            {(["Худи", "Свитшот", "Футболка", "Кофта", "Джемпер", "Куртка", "Зип-худи", "Топ", "Лонгслив"].includes(category)) && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Shoulders"
                                        value={measurements.shoulders || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, shoulders: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Sleeve Length"
                                        value={measurements.sleeveLength || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, sleeveLength: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Underarms"
                                        value={measurements.underarms || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, underarms: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Back Length"
                                        value={measurements.backLength || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, backLength: e.target.value })}
                                    />
                                </>
                            )}
                            {(["Штаны", "Джинсы", "Джоггеры"].includes(category)) && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Outer Leg Length"
                                        value={measurements.outerLegLength || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, outerLegLength: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Inner Leg Length"
                                        value={measurements.innerLegLength || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, innerLegLength: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Waist Width"
                                        value={measurements.waistWidth || ''}
                                        onChange={(e) => onChangeMeasurements({ ...measurements, waistWidth: e.target.value })}
                                    />
                                </>
                            )}
                            {(!["Худи", "Свитшот", "Футболка", "Кофта", "Джемпер", "Куртка", "Зип-худи", "Топ", "Лонгслив", "Штаны", "Джинсы", "Джоггеры"].includes(category)) && (
                                <textarea
                                    className="input"
                                    placeholder="Measurements"
                                    value={measurements.other || ''}
                                    onChange={(e) => onChangeMeasurements({ ...measurements, other: e.target.value })}
                                    rows="10"
                                    cols="50"
                                ></textarea>
                            )}
                        </div> */}
                        <textarea
                            className="input"
                            placeholder="Measurements"
                            value={measurements}
                            onChange={onChangeMeasurements}
                            rows="10"
                            cols="50"
                        ></textarea>
                        <input
                        className="input"
                        type="text"
                        placeholder="Brand size"
                        value={brandSize}
                        onChange={onChangeBrandSize}
                        />
                        <input
                        className="input"
                        type="text"
                        placeholder="Color"
                        value={color}
                        onChange={onChangeColor}
                        />
                        <input
                        className="input"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={onChangeDescription}
                        />
                        <input
                        className="input"
                        type="text"
                        placeholder="Avito Url"
                        value={avitoUrl}
                        onChange={onChangeAvitoUrl}
                        />
                        <div>
                        <input
                            className="input"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={onChangePrice}
                        /> Price
                        </div>
                        <div>
                        <input
                            className="input"
                            type="number"
                            placeholder="RentPrice"
                            value={rentPrice}
                            onChange={onChangeRentPrice}
                        /> Rent Price ( {price / 20 * 1.2 + 25} руб/день )
                        </div>
                        {/* <input
                        className="input"
                        type="text"
                        placeholder="Photo"
                        value={photo}
                        onChange={onChangePhoto}
                        /> */}
                        <div className="admin-panel">
                            <div className="photo-upload-section">
                                <h3>Загрузка фотографий товара</h3>
                                <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
                                <div className="photo-preview">
                                    {photos.length > 0 && (
                                        <>
                                            {photos.length === 1 ? (
                                                <div>
                                                    <img className="photo-preview-single" src={photos[0]} alt="Превью товара" />
                                                    <button onClick={() => handleRemovePhoto(index)}>Удалить</button>
                                                </div>
                                            ) : (
                                                <div className="photo-preview-collage">
                                                    {photos.map((photo, index) => (
                                                        <div key={index} className="photo-collage-item">
                                                            <img src={photo} alt={`Фото ${index + 1}`} />
                                                            <button onClick={() => handleRemovePhoto(index)}>Удалить</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <select value={status} onChange={onChangeStatus} className="input">
                            <option value="available">Доступен</option>
                            <option value="reserved">Зарезервирован</option>
                            <option value="in order">В заказе</option>
                            <option value="fake">Фэйк</option>
                        </select>
                        <select value={available} onChange={onChangeAvailable} className="input">
                            <option value={1}>Доступен</option>
                            <option value={0}>Не доступен</option>
                        </select>
                        <input
                        className="input"
                        type="text"
                        placeholder="UserId"
                        value={itemUserId}
                        onChange={onChangeItemUserId}
                        />
                        <input
                        className="input"
                        type="text"
                        placeholder="OrderId"
                        value={itemOrderId}
                        onChange={onChangeItemOrderId}
                        />
                        <div>
                        <Button className="btn-add-clothes" onClick={sendData}>
                            Добавить
                        </Button>
                        <Button className="btn-change-clothes" onClick={changeData}>
                            Изменить
                        </Button>
                        <Button className="btn-delete-clothes" onClick={deleteData}>
                            Удалить
                        </Button>
                        <Button className="btn-change-clothes" onClick={changeStatus}>
                            Изменить статус
                        </Button>
                        </div>
                    </form>
                </div>
                {/* <div class="admin-preview">
                    <div className="example">
                        <img className="example_img" src={photo} alt={brand} />
                        <div className="example_name"><b>{brand}</b></div>
                        <div className="example_name">{category}</div>
                        <div className="example_description">{description}</div>
                        <div className="example_description">Размер: {brandSize}</div>
                    </div>
                </div> */}
                <div className="admin-preview">
                    <div className="example">
                        <div className={`example_photos ${photos.length > 1 ? 'multiple' : 'single'}`}>
                            {photos.length === 1 ? (
                                <img className="example_img" src={photos[0]} alt={brand} />
                            ) : (
                                photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        className="example_img collage"
                                        src={photo}
                                        alt={`${brand} ${index + 1}`}
                                    />
                                ))
                            )}
                        </div>
                        <div className="example_name">
                            <b>{brand}</b>
                        </div>
                        <div className="example_description">{price}</div>
                        <div className="example_description">{brand}</div>
                        <div className="example_category">{category}</div>
                        <div className="example_size">Размер: {brandSize}</div>
                    </div>
                </div>
            </div>
            <form className="form">
                <h3>Подтверждение заказа</h3>
                <div>
                <input
                    className="input"
                    type="number"
                    placeholder="orderId"
                    value={orderId}
                    onChange={onChangeOrderId}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="chatId"
                    value={chatId}
                    onChange={onChangeChatId}
                />
                </div>
                <div>
                <div className="input-container">
                    <input
                    className="inputItem"
                    type="text"
                    placeholder="item1"
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
                    className="inputItem"
                    type="text"
                    placeholder="item2"
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
                    className="inputItem"
                    type="text"
                    placeholder="item3"
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
                    className="inputItem"
                    type="text"
                    placeholder="item4"
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
                <select value={statusOrder} onChange={onChangestatusOrder} className="input">
                <option value="success">Заказ принят полностью или частично</option>
                <option value="canceled">Отмена заказа</option>
                <option value="closed">Завершить заказ</option>
                <option value="renew">Продлить заказ</option>
                </select>
                <input
                className="input-comment"
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={onChangeComment}
                />
                <div>
                <Button className="btn-change-clothes" onClick={downloadOrder}>
                    Загрузить заказ
                </Button>
                <Button className="btn-confirm" onClick={confirmStatusOrder}>
                    Отправить
                </Button>
                </div>
                {message && <p className="message">{message}</p>}
            </form>
            <div>
                <h2>Список товаров</h2>
                <div className="adminList">
                <h3>Доступные сейчас товары</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Категория</th>
                        <th>Название</th>
                        <th>Состояние</th>
                        <th>Описание</th>
                        <th>Размер</th>
                        <th>Цена</th>
                        <th>Цена аренды</th>
                        <th>Статус</th>
                        <th>Первое фото</th>
                        <th>userId</th>
                        <th>orderId</th>
                    </tr>
                    </thead>
                    <tbody>
                    {availableProducts.map(availableItem => (
                        <tr key={availableItem.id}>
                        <td>{availableItem.id}</td>
                        <td>{availableItem.gender}</td>
                        <td>{availableItem.category}</td>
                        <td>{availableItem.brand}</td>
                        <td>{availableItem.price}</td>
                        <td>{availableItem.rentPrice}</td>
                        <td>{availableItem.condition}</td>
                        <td>{availableItem.measurements}</td>
                        <td>{availableItem.brandSize}</td>
                        <td>{availableItem.color}</td>
                        <td>{availableItem.description}</td>
                        <td>{availableItem.status}</td>
                        <td>{availableItem.image[0]}</td>
                        <td>{availableItem.userId}</td>
                        <td>{availableItem.orderId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="adminList">
                <h3>Товары в аренде</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Категория</th>
                        <th>Название</th>
                        <th>Состояние</th>
                        <th>Описание</th>
                        <th>Размер</th>
                        <th>Цена</th>
                        <th>Цена аренды</th>
                        <th>Пользователь</th>
                        <th>Заказ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderProducts.map(orderItem => (
                        <tr key={orderItem.id}>
                        <td>{orderItem.id}</td>
                        <td>{orderItem.category}</td>
                        <td>{orderItem.brand}</td>
                        <td>{orderItem.condition}</td>
                        <td>{orderItem.description}</td>
                        <td>{orderItem.brandSize}</td>
                        <td>{orderItem.price}</td>
                        <td>{orderItem.rentPrice}</td>
                        <td>{orderItem.userId}</td>
                        <td>{orderItem.orderId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="adminList">
                <h3>Товары в прачечной</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Категория</th>
                        <th>Название</th>
                        <th>Состояние</th>
                        <th>Описание</th>
                        <th>Размер</th>
                        <th>Пользователь</th>
                        <th>Заказ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {laundryProducts.map(laundryItem => (
                        <tr key={laundryItem.id}>
                        <td>{laundryItem.id}</td>
                        <td>{laundryItem.category}</td>
                        <td>{laundryItem.brand}</td>
                        <td>{laundryItem.condition}</td>
                        <td>{laundryItem.description}</td>
                        <td>{laundryItem.brandSize}</td>
                        <td>{laundryItem.userId}</td>
                        <td>{laundryItem.orderId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="adminList">
                <h3>Остальные товары</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Категория</th>
                        <th>Название</th>
                        <th>Состояние</th>
                        <th>Описание</th>
                        <th>Размер</th>
                        <th>Цена</th>
                        <th>Цена аренды</th>
                        <th>Статус</th>
                        <th>userId</th>
                        <th>orderId</th>
                    </tr>
                    </thead>
                    <tbody>
                    {otherProducts.map(otherItem => (
                        <tr key={otherItem.id}>
                        <td>{otherItem.id}</td>
                        <td>{otherItem.category}</td>
                        <td>{otherItem.brand}</td>
                        <td>{otherItem.condition}</td>
                        <td>{otherItem.description}</td>
                        <td>{otherItem.brandSize}</td>
                        <td>{otherItem.price}</td>
                        <td>{otherItem.rentPrice}</td>
                        <td>{otherItem.status}</td>
                        <td>{otherItem.userId}</td>
                        <td>{otherItem.orderId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h3>В видимости: {availableProducts.length + orderProducts.length + laundryProducts.length + otherProducts.length}</h3>
                <h3>Итого: {allProducts.length} на сумму {allProducts.map(item => item.price).reduce((total, price) => total + price, 0)} Р</h3>
                </div>
            </div>
            <div>
                <h2>Список клиентов</h2>
                <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Chat ID</th>
                    <th>Логин</th>
                    <th>Телефон</th>
                    <th>Локация</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.chatId}</td>
                        <td>{client.login}</td>
                        <td>{client.phone_number}</td>
                        <td>{client.location}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div>
                <h2>Список заказов</h2>
                <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Статус</th>
                    <th>Комментарий</th>
                    <th>Стоимость</th>
                    <th>Пользователь</th>
                    <th>Заказ "По цепочке"</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.status}</td>
                        <td>{order.comment}</td>
                        <td>{order.price}</td>
                        <td>{order.userId}</td>
                        <td>{order.chainOrder}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
// import React, {useState, useMemo} from 'react';
// import './AdminPage.css';
// import {products} from '../ProductList/ProductList'
// import Button from '../Button/Button';


// export let newProduct = {id: '', title: '', description: '', price: '', photo: ''}


// const AdminPage = () => {

//     const [id, setId] = useState(String(products.length + 1));
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [photo, setPhoto] = useState('/Images/Одежда/');

//     const onChangeId = (e) => {
//         setId(e.target.value)
//     }

//     const onChaneTitle = (e) => {
//         setTitle(e.target.value)
//     }

//     const onChangeDescription = (e) => {
//         setDescription(e.target.value)
//     }

//     const onChangePrice = (e) => {
//         setPrice(e.target.value)
//     }

//     const onChangePhoto = (e) => {
//         setPhoto(e.target.value)
//     }

//     const sendData = () => {
//         console.log(products)
//         newProduct = {
//             id: id,
//             title: title,
//             description: description,
//             price: price,
//             photo: photo
//         }
//         products.push(newProduct)
//         onProductChange
//         return products
//     }

//     // const handleSubmit = async (event) => {
//     //     event.preventDefault(); // Предотвращаем стандартную отправку формы

//     // try {
//     //     const response = await fetch('https://localhost:3000/', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify({products})
//     //     });

//     //     if (response.ok) {
//     //         console.log('Товар отправлен!')
//     //     } else {
//     //         console.error('Ошибка при обработке данных')
//     //     }
//     // } catch (error) {
//     //     console.error('Ошибка', error);
//     // }

//     // const onProductChange = useMemo(() => {
//     //     console.log('OK')
//     //     if (String(products.length + 1) === newProduct.id) {
//     //         return
//     //     }
//     // }, [products])

//     // const onSendData = useCallback(() => {
//     //     const data = {
//     //         products: addedItems,
//     //         totalPrice: getTotalPrice(addedItems),
//     //         queryId, 
//     //     }
//     //     fetch('https://switchlarge-lucky-bro4.amvera.io/web-data', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(data)
//     //     })
//     // }, [addedItems])

    
//     return (
//         <div>
//             <form className={"form"} onSubmit={sendData}>
//                 <h3>Добавление товара</h3>
//                 <input
//                     className={'input'}
//                     type="text"
//                     placeholder={'id'}
//                     value={id}
//                     onChange={onChangeId}
//                 />
//                 <input
//                     className={'input'}
//                     type="text"
//                     placeholder={'Title'}
//                     value={title}
//                     onChange={onChaneTitle}
//                 />
//                 <input
//                     className={'input'}
//                     type="text"
//                     placeholder={'Description'}
//                     value={description}
//                     onChange={onChangeDescription}
//                 />
//                 <input
//                     className={'input'}
//                     type="text"
//                     placeholder={'Price'}
//                     value={price}
//                     onChange={onChangePrice}
//                 />
//                 <input
//                     className={'input'}
//                     type="text"
//                     placeholder={'Photo'}
//                     value={photo}
//                     onChange={onChangePhoto}
//                 />
//                 <Button className='btn-add-clothes' onClick={sendData}>
//                     Добавить
//                 </Button>
//             </form>
//             <div className='example'>
//                 <img className={'img'} src={photo} alt={title} />
//                 <div className={'title'}><b>{title}</b></div>
//                 <div className={'price'}>
//                 <div className={'description'}>{description}</div>
//                     <span>Стоимость: <b>{price}</b></span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminPage;

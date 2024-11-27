import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    const [photos, setPhotos] = useState([]);
    // const [form, setForm] = useState({
    //     category: '',
    //     name: '',
    //     condition: '',
    //     description: '',
    //     size: '',
    //     price: '',
    //     rentPrice: '',
    // });

    //Связать передачу фотографий с AdminPage

    const handlePhotoChange = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = files.map((file) => URL.createObjectURL(file));
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setForm({ ...form, [name]: value });
    // };

    const handleRemovePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    return (
        <div className="admin-panel">
            {/* <div className="form-section">
                <h3>Добавление товара</h3>
                <input name="category" placeholder="Category" onChange={handleInputChange} />
                <input name="name" placeholder="Name" onChange={handleInputChange} />
                <input name="condition" placeholder="Condition" onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" onChange={handleInputChange}></textarea>
                <input name="size" placeholder="Size" onChange={handleInputChange} />
                <input name="price" type="number" placeholder="Price" onChange={handleInputChange} />
                <input name="rentPrice" type="number" placeholder="Rent Price" onChange={handleInputChange} />
            </div> */}

            <div className="photo-upload-section">
                <h3>Загрузка фотографий товара</h3>
                <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
                <div className="photo-preview">
                    {photos.length > 0 && (
                        <>
                            {photos.length === 1 ? (
                                <img className="photo-preview-single" src={photos[0]} alt="Превью товара" />
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
    );
};

export default AdminPanel;

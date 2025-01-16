import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import Footer from '../Footer/Footer';
import './Profile.css';

const Profile = () => {

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/');
    };

    const { tg, user } = useTelegram();

    const [measurements, setMeasurements] = useState({
        Плечи: '',
        sleeveLength: '',
        underarms: '',
        backLength: '',
        outerLegLength: '',
        innerLegLength: '',
        waistWidth: '',
    });
    
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        }
        tg.showAlert('Заполните параметры/замеры, чтобы видеть персонализированный каталог')
    }, [tg]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeasurements((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const data = {
                ...measurements,
                email,
            };
            const response = await fetch(`https://bottry-lucky-bro4.amvera.io/measurements/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            tg.showAlert('Данные успешно сохранены')
            
        } catch (error) {
            console.error('Error saving measurements:', error);
            tg.showAlert('Не удалось сохранить данные, возникла ошибка. Попробуйте позже')
        }
    };


    return (
        <div>
            <div className="profile-section">
                <h1>
                    <span className="catalog-icon" onClick = {handleHomeClick}>
                        <img 
                            src="/Images/mainLogo_withoutRental&Back.png" 
                            width={40} 
                            alt="Go to catalog" 
                            title="Go to Catalog"
                        />
                    </span>
                    Профиль
                </h1>
                <h3 className='user-info'>
                    {user.username}
                </h3>
                <div className="measurements">
                    <label>
                        <span>Плечи (см):</span>
                        <input
                            type="number"
                            name="shoulders"
                            value={measurements.shoulders}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Длина рукава (см):</span>
                        <input
                            type="number"
                            name="sleeveLength"
                            value={measurements.sleeveLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Подмышки (см):</span>
                        <input
                            type="number"
                            name="underarms"
                            value={measurements.underarms}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Длина по спине (см):</span>
                        <input
                            type="number"
                            name="backLength"
                            value={measurements.backLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Длина шва (внешнего) (см):</span>
                        <input
                            type="number"
                            name="outerLegLength"
                            value={measurements.outerLegLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Длина шва (внутреннего) (см):</span>
                        <input
                            type="number"
                            name="innerLegLength"
                            value={measurements.innerLegLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Ширина талии (см):</span>
                        <input
                            type="number"
                            name="waistWidth"
                            value={measurements.waistWidth}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="email-section">
                    <label>
                        Почта:
                        <input
                            type="email"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <button className="save-button" onClick={handleSave}>Сохранить</button>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;

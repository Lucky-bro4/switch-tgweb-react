import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import { AppContext } from '../../context/AppContext';
import Footer from '../Footer/Footer';
import './Profile.css';

const Profile = () => {

    const { customer } = useContext(AppContext);

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/');
    };

    const { tg, user } = useTelegram();

    const [measurements, setMeasurements] = useState({
        shoulders: '',
        sleeveLength: '',
        underarms: '',
        backLength: '',
        outerLegLength: '',
        innerLegLength: '',
        waistWidth: '',
    });
    
    const [email, setEmail] = useState('');

    useEffect(() => {

        if (Array.isArray(customer?.measurements) && customer.measurements.length === 7) {
            setMeasurements({
                shoulders: customer.measurements[0],
                sleeveLength: customer.measurements[1],
                underarms: customer.measurements[2],
                backLength: customer.measurements[3],
                outerLegLength: customer.measurements[4],
                innerLegLength: customer.measurements[5],
                waistWidth: customer.measurements[6],
            });
        }
    
        // Если есть email у customer, заполняем email
        if (customer?.email) {
            setEmail(customer.email);
        }

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
                    {user.username ? user.username : 'Путник'}
                </h3>
                <span>Замеры (см) - Beta</span>
                <div className="measurements">
                    <span>Верх</span>
                    <label>
                        <input
                            type="number"
                            name="shoulders"
                            placeholder="Плечи"
                            value={measurements.shoulders}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        {/* <span>Длина рукава (см):</span> */}
                        <input
                            type="number"
                            name="sleeveLength"
                            placeholder="Длина рукава"
                            value={measurements.sleeveLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        {/* <span>Подмышки (см):</span> */}
                        <input
                            type="number"
                            name="underarms"
                            placeholder="Подмышки"
                            value={measurements.underarms}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        {/* <span>Длина по спине (см):</span> */}
                        <input
                            type="number"
                            name="backLength"
                            placeholder="Длина по спине"
                            value={measurements.backLength}
                            onChange={handleChange}
                        />
                    </label>
                    <span>Низ</span>
                    <label>
                        {/* <span>Длина шва (внешнего) (см):</span> */}
                        <input
                            type="number"
                            name="outerLegLength"
                            placeholder="Длина шва (внешнего)"
                            value={measurements.outerLegLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        {/* <span>Длина шва (внутреннего) (см):</span> */}
                        <input
                            type="number"
                            name="innerLegLength"
                            placeholder="Длина шва (внутреннего)"
                            value={measurements.innerLegLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        {/* <span>Ширина талии (см):</span> */}
                        <input
                            type="number"
                            name="waistWidth"
                            placeholder="Ширина талии"
                            value={measurements.waistWidth}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="email-section">
                    <label>
                        Почта
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

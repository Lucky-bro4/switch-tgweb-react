import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useTelegram } from '../../hooks/useTelegram';

const Profile = () => {

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
        tg.showAlert('Заполните параметры/замеры, чтобы видеть персонализированный каталог')
    }, []);

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
            const response = await fetch('/api/save-measurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Measurements saved successfully!');
        } catch (error) {
            console.error('Error saving measurements:', error);
            alert('Failed to save measurements.');
        }
    };

    return (
        <div className="profile-section">
            <h1>
                <span className="catalog-icon" onClick={() => window.location.href = '/'}>
                    <img 
                        src="/Images/mainLogo_withoutRental&Back.png" 
                        width={40} 
                        alt="Go to catalog" 
                        title="Go to Catalog"
                    />
                </span>
                Профиль
            </h1>
            <div className='user-info'>
                ${user.nickname}
            </div>
            <div className="measurements">
                <label>
                    Shoulders (cm):
                    <input
                        type="number"
                        name="shoulders"
                        value={measurements.shoulders}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Sleeve Length (cm):
                    <input
                        type="number"
                        name="sleeveLength"
                        value={measurements.sleeveLength}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Underarms (cm):
                    <input
                        type="number"
                        name="underarms"
                        value={measurements.underarms}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Back Length (cm):
                    <input
                        type="number"
                        name="backLength"
                        value={measurements.backLength}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Outer Leg Length (cm):
                    <input
                        type="number"
                        name="outerLegLength"
                        value={measurements.outerLegLength}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Inner Leg Length (cm):
                    <input
                        type="number"
                        name="innerLegLength"
                        value={measurements.innerLegLength}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Waist Width (cm):
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
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="home-button" onClick={() => window.location.href = '/'}>Home</button>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
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
        alert('Telegram notification: Profile page opened');
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
            <h1>Profile Measurements</h1>
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

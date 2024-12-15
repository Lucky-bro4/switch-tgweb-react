import React from 'react';
import './Header.css';


import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`header ${isVisible ? 'visible' : 'hidden'}`} style={{ transition: 'top 0.3s' }}>
            <div className='mainLogo' style={{ opacity: 0.8 }}>
                <img src="/Images/mainLogo_withoutRental&Back.png" width={250} alt="Switch" />
                <h1 style={{ fontSize: '2.5rem', margin: 0, color: '#fff' }}>Switch</h1>
            </div>
            <div className='search-filter'>
                {/* Optional: Add the search and filter components here */}
            </div>
        </div>
    );
};

export default Header;


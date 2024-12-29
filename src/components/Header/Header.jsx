import React, { useState, useEffect } from 'react';
import './Header.css';


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
        console.log('Component mounted, adding scroll event listener.');
        window.addEventListener('scroll', handleScroll);
        return () => {
            console.log('Component unmounted, removing scroll event listener.');
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='header'>
            <img
                src="/Images/mainLogo_withoutRental&Back.png"
                width={150}
                alt="Swich"
                className="mainLogo"
            />
        </div>
    );
};

export default Header;


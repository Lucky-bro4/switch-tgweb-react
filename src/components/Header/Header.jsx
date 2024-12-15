import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        console.log('Scroll position:', window.scrollY);
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

    const backgroundColor = isVisible ? '#fff' : '#000';
    const textColor = isVisible ? '#000' : '#fff';

    console.log('Header visibility:', isVisible);

    return (
        <div className={`header ${isVisible ? 'visible' : 'hidden'}`} style={{ transition: 'top 0.3s', backgroundColor }}>
            <div className='mainLogo' style={{ opacity: 0.8 }}>
                <img src="/Images/mainLogo_withoutRental&Back.png" width={250} alt="Switch" />
                <h1 style={{ fontSize: '2.5rem', margin: 0, color: textColor }}>Switch</h1>
            </div>
            <div className='search-filter'>
                {/* Optional: Add the search and filter components here */}
            </div>
        </div>
    );
};

export default Header;

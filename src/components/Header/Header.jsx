import React, { useEffect } from 'react';

const Header = () => {

    useEffect(() => {
        console.log('Component mounted, adding scroll event listener.');
        window.addEventListener('scroll', handleScroll);
        return () => {
            console.log('Component unmounted, removing scroll event listener.');
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`header`}>
            <div className='mainLogo' style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <img src="/Images/mainLogo_withoutRental&Back.png" width={200} alt="Swich" />
            </div>
        </div>
    );
};

export default Header;


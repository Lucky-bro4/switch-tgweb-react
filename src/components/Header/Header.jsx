import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';


const Header = () => {

    return (
        <div className={'header'}>
            <div className='mainLogo'>
                <img src="/Images/mainLogo_withoutRental.jpeg" width={200} alt="Swich" />
                {/* <div className='tagline'>Осознанность.Скорость.Стиль.</div> */}
            </div>
            
        </div>
    );
};

export default Header;


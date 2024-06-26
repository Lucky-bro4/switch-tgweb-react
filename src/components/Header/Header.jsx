import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';


const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            {/* <Button className='closeButton' onClick={onClose}>Закрыть</Button> */}
            {/* <span className={'username'}>
                {user?.username}
            </span> */}
            <div className='mainLogo'>
                <img src="/Images/mainLogoLarge.png" width={200} alt="Swich" />
                {/* <div className='tagline'>Осознанность.Скорость.Стиль.</div> */}
            </div>
        </div>
    );
};

export default Header;


import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
        <Button onClick={onClose}>Закрыть</Button>
            {/* <span className={'username'}>
                {user?.username}
            </span> */}
            <div><img src="src\components\images\mainLogo.png" alt="Switch" /></div>
            <div >Осознанность.Скорость.Стиль.</div>
        </div>
    );
};

export default Header;

// className='header.mainLogo'
// className='header.tagline'
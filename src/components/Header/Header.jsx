import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
            <div><img className='mainLogo' src="src\components\images\mainLogo.png" alt="Switch" /></div>
            <div className='tagline'>Осознанность.Скорость.Стиль.</div>
        </div>
    );
};

export default Header;

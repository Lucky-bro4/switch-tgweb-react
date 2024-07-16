import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [quest1, setQuest1] = useState('');
    const [quest2, setQuest2] = useState('');
    const [quest3, setQuest3] = useState('');

    const [update, setUpdate] = useState('');
    const [grade, setGrade] = useState(5);
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            quest1,
            quest2,
            quest3,
            update,
            grade
        }
        tg.sendData(JSON.stringify(data));
    }, [quest1, quest2, quest3, update, grade])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить отзыв'
        })
    }, [])

    useEffect(() => {
        if(!quest1 && !quest2 && !quest3 && !update) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [quest1, quest2, quest3, update])

    const onChangeQuest1 = (e) => {
        setQuest1(e.target.value)
    }
    const onChangeQuest2 = (e) => {
        setQuest2(e.target.value)
    }
    const onChangeQuest3 = (e) => {
        setQuest3(e.target.value)
    }

    const onChangeUpdate = (e) => {
        setUpdate(e.target.value)
    }

    const onChangeGrade = (e) => {
        setGrade(e.target.value)
    }

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= grade ? 'filled' : ''}`}>&#9733;</span>
            );
        }
        return stars;
    };

return (
    <div className="form-container">
        <h3>Что вы думаете о Switch?</h3>
        <input
            className="input"
            type="text"
            placeholder="Что стоило бы улучшить в сервисе?"
            value={quest1}
            onChange={onChangeQuest1}
        />
        <input
            className="input"
            type="text"
            placeholder="Что мы могли бы улучшить в дизайне или навигации?"
            value={quest2}
            onChange={onChangeQuest2}
        />
        <input
            className="input"
            type="text"
            placeholder="Есть ли что-то еще, что вы бы хотели сообщить нам?"
            value={quest3}
            onChange={onChangeQuest3}
        />
        <div className="label">Вопрос о ваших предпочтениях</div>
        <input
            className="input"
            type="text"
            placeholder="Какой стиль в одежде вы предпочитаете?"
            value={update}
            onChange={onChangeUpdate}
        />
        <div className="label">Общая оценка</div>
        <input
                type="range"
                min="1"
                max="5"
                value={grade}
                onChange={onChangeGrade}
                className="slider"
            />
        <div className="stars">
            {renderStars()}
        </div>
    </div>
    );
};

export default Form;

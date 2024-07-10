import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [favor, setFavor] = useState('');
    const [update, setUpdate] = useState('');
    const [grade, setGrade] = useState(0);
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            favor,
            update,
            grade
        }
        tg.sendData(JSON.stringify(data));
    }, [favor, update, grade])

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
        if(!update) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [favor, update, grade])

    const onChangeFavor = (e) => {
        setFavor(e.target.value)
    }

    const onChangeUpdate = (e) => {
        setUpdate(e.target.value)
    }

    const onChangeGrade = (e) => {
        setGrade(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Что вы думаете о Switch?</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Что тебе не нравится / нравится в сервисе большего всего?'}
                value={favor}
                onChange={onChangeFavor}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Как ты думаешь, что стоило бы улучшить?'}
                value={update}
                onChange={onChangeUpdate}
            />
            <select value={grade} onChange={onChangeGrade} className={'select'}>
                <div>Оценка по 5-балльной шкале</div>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
    );
};

export default Form;

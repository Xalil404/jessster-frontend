import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "Сенсация: Местная знаменитость арестована за обучение енотов показывать «средний палец» в парках!",
        "Скандал: Сенатор пойман без штанов за трибуной, заявив, что это был «протест против строгих модных законов»!",
        "Шок: Техномагнат покупает сеть спортзалов и переименовывает их в «Залы добычи Sweatcoin»!",
        "Возмущение: Поп-звезда открывает арт-выставку с обнаженными статуями критиков под названием «Лузеры в мраморе»!",
        "Исследование: Инфлюенсер вызвал скандал, продавая «использованную» воду из ванной под видом «ремесленного бульона»!",
        "Позор: Спортсмен удален с матча за то, что показал рефери задницу, заявив, что это «творческое самовыражение»!",
        "Скандал: Тревел-блогер оштрафован за поездку на тележке для багажа по аэропорту с криком: «Это Убер для ленивых!»",
        "Катастрофа: Миллиардер представил ИИ, который оскорбляет мировых лидеров в Твиттере!",
        "Шок: Знаменитый шеф-повар утверждает, что новая диета из «пива и сожалений» — лучший способ очистки организма. Ученые в ужасе!",
        "Вирусный хит: Инфлюенсер выходит в прямой эфир, чтобы высмеивать кулинарные попытки подписчиков, сжигая их уверенность (и свою кухню)!"

    ];

    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        }, 3000); // Rotate every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [headlines.length]);

    return (
        <div 
            style={{
                backgroundColor: '#af1713',
                color: '#ffffff',
                padding: '15px 20px',
                borderRadius: '5px',
                marginBottom: '20px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                fontWeight: 'bold',
            }}
        >
            <span style={{ marginRight: '10px' }}>Срочные новости:</span>
            <span>{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;
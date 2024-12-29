import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "Срочные новости: Рынок достиг исторического максимума!",
    "Спорт: Местная команда выиграла чемпионат!",
    "Погода: Ожидаются сильные дожди в эти выходные.",
    "Технологии: Новый инструмент ИИ революционизирует отрасль.",
    "Развлечения: Фильм, получивший награды, дебютирует."
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
                backgroundColor: '#FF0000',
                color: '#000',
                padding: '10px 20px',
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
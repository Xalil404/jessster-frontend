import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "Новое законодательство требует от государственных служащих предоставлять результаты IQ для баллотирования на должность",
        "Уолл-стрит подтверждает, что цены на акции выдуманы из воздуха",
        "Покрытая граффити дверь кабинки общественного туалета была продана на аукционе произведений искусства за 95 миллионов долларов",
        "Ученые обнаружили прямую связь между веганством и принадлежностью к ЛГБТК",
        "Олимпийский комитет объявляет борьбу на пальцах ног официальным видом спорта",
        "Мелания Трамп призналась, что была российским шпионом КГБ!",
        "Сомали признана самым посещаемым туристическим направлением в 2025 году",
        "Правительственные чиновники признали, что высадка на Луну была снята в голливудской студии",
        "Исследование утверждает, что видеоигры увеличивают продолжительность жизни"
    ];

    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        }, 7000); // Rotate every 7 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [headlines.length]);

    return (
        <div className="breaking-news-banner"
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
                fontSize: '18px',
            }}
        >
            <span style={{ marginRight: '10px' }} className="breaking-news-title">Срочные новости:</span>
            <span className="breaking-news-text">{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;
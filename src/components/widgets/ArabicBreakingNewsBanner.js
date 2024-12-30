import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "أخبار عاجلة: السوق يصل إلى أعلى مستوى تاريخي!",
        "رياضة: فريق محلي يفوز بالبطولة!",
        "طقس: أمطار غزيرة متوقعة خلال عطلة نهاية الأسبوع.",
        "تكنولوجيا: أداة ذكاء اصطناعي جديدة تحدث ثورة في الصناعة.",
        "ترفيه: فيلم حائز على جوائز يبدأ عرضه."
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
            <span style={{ marginRight: '10px' }}>الأخبار العاجلة</span>
            <span>{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;
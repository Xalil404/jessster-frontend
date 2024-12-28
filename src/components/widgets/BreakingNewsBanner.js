import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "Breaking: Market reaches an all-time high!",
        "Sports: Local team wins championship!",
        "Weather: Heavy rain expected this weekend.",
        "Tech: New AI tool revolutionizes industry.",
        "Entertainment: Award-winning movie debuts."
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
            <span style={{ marginRight: '10px' }}>Breaking News:</span>
            <span>{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;

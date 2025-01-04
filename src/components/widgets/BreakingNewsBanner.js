import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "Melania Trump has confessed to being a KGB Russian spy!",
        "New legislation requires public servants to provide IQ scores to run for office",
        "Wall Street confirms stock prices are invented out of thin air ",
        "Graffiti covered public restroom stall door purchased for $95 million at art auction",
        "Scientists discover direct link between veganism and being an LGBTQ member ",
        "Olympic committee announces Toe Wrestling is an official sport",
        "Somalia ranks as the most visited tourist destination in 2025",
        "Government officials admit the moon landing was filmed in a Hollywood studio",
        "Study claims playing video games increases life expectancy"

    ];

    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        }, 7000); // Rotate every 7 seconds

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
            <span style={{ marginRight: '10px' }}>Breaking News:</span>
            <span>{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;

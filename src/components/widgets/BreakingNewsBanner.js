import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "Breaking: Local celebrity arrested for teaching raccoons to 'flip the bird' in public parks!",
        "Scandal: Senator caught pants-less at the podium, claims it was a 'protest against restrictive fashion laws'!",
        "Shocking: Tech mogul buys entire chain of gyms, renames them 'Sweatcoin Mining Facilities'!",
        "Outrage: Pop star's new art exhibit features nude statues of critics labeled 'Losers in Marble'!",
        "Study: Influencer sparks outrage after selling 'used' bathwater labeled as 'artisanal soup stock'!",
        "Disgrace: Pro athlete ejected for mooning the ref and blaming it on 'creative self-expression'!",
        "Scandal: Travel vlogger fined for riding a hotel luggage cart through the airport yelling, 'Uber for the lazy!'",
        "Disaster: Billionaire unveils AI that tweets profanity-laden insults at random world leaders!",
        "Shock: Celebrity chef claims new diet of 'beer and regret' is the ultimate cleanse—scientists horrified!",
        "Viral: Influencer goes live to roast followers’ cooking attempts, burns down their confidence (and her own kitchen)!"

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
            <span style={{ marginRight: '10px' }}>Breaking News:</span>
            <span>{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;

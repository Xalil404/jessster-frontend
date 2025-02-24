import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "تشريع جديد يلزم موظفي القطاع العام بتقديم درجات الذكاء للترشح للمناصب العامة",
        "وول ستريت تؤكد أن أسعار الأسهم تم اختراعها من الهواء",
        "باب حمام عام مغطى برسومات الجرافيتي تم شراؤه مقابل 95 مليون دولار في مزاد فني",
        "علماء يكتشفون علاقة مباشرة بين النباتية والانتماء لمجتمع المثليين",
        "اللجنة الأولمبية تعلن أن مصارعة أصابع القدم رياضة رسمية",
        "الصومال تحتل المرتبة الأولى كأكثر الوجهات السياحية زيارة هذا العام",
        "ميلانيا ترامب تعترف بأنها جاسوسة لصالح المخابرات الروسية",
        "مسؤولون حكوميون يعترفون بأن هبوط الإنسان على القمر تم تصويره في استوديو هوليوودي",
        "دراسة تزعم أن لعب ألعاب الفيديو يزيد من متوسط ​​العمر المتوقع"
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
            <span style={{ marginRight: '10px' }} className="breaking-news-title">  الأخبار العاجلة : </span>
            <span className="breaking-news-text">{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;
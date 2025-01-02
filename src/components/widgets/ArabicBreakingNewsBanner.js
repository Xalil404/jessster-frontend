import React, { useEffect, useState } from 'react';

const BreakingNewsBanner = () => {
    const headlines = [
        "عاجل: اعتقال شخصية مشهورة محلية لتعليم حيوانات الراكون كيفية تقديم 'الإصبع الأوسط' في الحدائق العامة!",
        "فضيحة: عضو مجلس الشيوخ يُضبط بدون بنطال على المنصة ويدعي أنها 'احتجاج على قوانين الموضة الصارمة'!",
        "صدمة: ملياردير تقني يشتري سلسلة كاملة من الصالات الرياضية ويعيد تسميتها إلى 'مراكز تعدين سويت كوين'!",
        "غضب: نجمة بوب تعرض تماثيل عارية للنقاد تحت عنوان 'الخاسرون في الرخام' في معرضها الفني الجديد!",
        "دراسة: ضجة بسبب مؤثرة تبيع 'ماء الحمام المستخدم' تحت وصفة 'مرق حرفي'!",
        "عار: استبعاد رياضي محترف بسبب تعريته أمام الحكم وادعائه بأنها 'تعبير إبداعي عن الذات'!",
        "فضيحة: مدوّن سفر يُغرّم بعد ركوبه عربة أمتعة في المطار وهو يهتف: 'أوبر للكسالى!'",
        "كارثة: ملياردير يكشف عن ذكاء اصطناعي يغرد إهانات مليئة بالشتائم لزعماء العالم بشكل عشوائي!",
        "صدمة: طاهٍ مشهور يدعي أن النظام الغذائي الجديد من 'البيرة والندم' هو أفضل طريقة للتطهير—العلماء في حالة ذهول!",
        "فيديو فيروسي: مؤثرة تبث مباشرة للسخرية من محاولات الطبخ للمتابعين، وتحرق ثقتهم (ومطبخها أيضًا)!"

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
            <span style={{ marginRight: '10px' }}>الأخبار العاجلة</span>
            <span>{headlines[currentHeadlineIndex]}</span>
        </div>
    );
};

export default BreakingNewsBanner;
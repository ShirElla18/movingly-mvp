const defaultTasks = [
    { id: 1, title: "מיון חפצים (לזרוק, לתרום, לארוז)", completed: false },
    { id: 2, title: "הזמנת קרטונים וחומרי אריזה", completed: false },
    { id: 3, title: "סגירת חברת הובלה", completed: false },
    { id: 4, title: "עדכון כתובת במשרד הפנים וברשויות", completed: false },
    { id: 5, title: "אריזת בגדי חורף/קיץ שלא בשימוש", completed: false },
    { id: 6, title: "העברת אינטרנט ותשתיות לדירה החדשה", completed: false },
    { id: 7, title: "ניקיון הדירה החדשה (לפני כניסה)", completed: false },
    { id: 8, title: "אריזת מטבח וכלים שבירים", completed: false },
    { id: 9, title: "הכנת תיק ציוד אישי ליום המעבר", completed: false },
    { id: 10, title: "קריאת מוני חשמל ומים בדירה הישנה", completed: false }
];

// רשימת הספקים
const providersData = [
    { 
        id: 1, 
        name: "הובלות המהירים", 
        role: "שירותי הובלה ואריזה", 
        rating: "⭐️⭐️⭐️⭐️⭐️ (124 דירוגים)", 
        phone: "050-1234567" 
    },
    { 
        id: 2, 
        name: "קלין-האוס", 
        role: "ניקיון דירות לפני מעבר", 
        rating: "⭐️⭐️⭐️⭐️ (89 דירוגים)", 
        phone: "052-7654321" 
    },
    { 
        id: 3, 
        name: "דוד ההנדימן", 
        role: "פירוק והרכבת רהיטים", 
        rating: "⭐️⭐️⭐️⭐️⭐️ (210 דירוגים)", 
        phone: "054-9876543" 
    },
    { 
        id: 4, 
        name: "ארגזים בע״מ", 
        role: "אספקת קרטונים עד הבית", 
        rating: "⭐️⭐️⭐️⭐️ (45 דירוגים)", 
        phone: "050-1112233" 
    }
];
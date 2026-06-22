const defaultTasks = [
    { id: 1, title: "עדכון כתובת במשרד הפנים וברשויות", completed: false, stage: "month" },
    { id: 2, title: "העברת אינטרנט ותשתיות לדירה החדשה", completed: false, stage: "month" },
    { id: 3, title: "סגירת חברת הובלה ושירותי אריזה", completed: false, stage: "month" },
    { id: 4, title: "הזמנת קרטונים וחומרי אריזה בדירוג גבוה", completed: false, stage: "month" },
    
    { id: 5, title: "מיון חפצים (לזרוק, לתרום, לארוז)", completed: false, stage: "week" },
    { id: 6, title: "אריזת בגדי חורף/קיץ שלא בשימוש", completed: false, stage: "week" },
    { id: 7, title: "ניקיון הדירה החדשה (לפני כניסת המובילים)", completed: false, stage: "week" },
    { id: 8, title: "אריזת מטבח וכלים שבירים (עטופים בפצפץ)", completed: false, stage: "week" },
    
    { id: 9, title: "הכנת תיק ציוד אישי ומסמכים ליום המעבר", completed: false, stage: "after" },
    { id: 10, title: "קריאת מוני חשמל ומים בדירה הישנה והחדשה", completed: false, stage: "after" }
];

// רשימת הספקים (Marketplace של שירותים)
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
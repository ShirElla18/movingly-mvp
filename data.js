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
        category: "הובלות",
        rating: "⭐️⭐️⭐️⭐️⭐️ (124 דירוגים)", 
        phone: "050-1234567",
        recommended: true
    },
    { 
        id: 2, 
        name: "קלין-האוס", 
        role: "ניקיון דירות לפני מעבר", 
        category: "ניקיון וסידור הבית",
        rating: "⭐️⭐️⭐️⭐️ (89 דירוגים)", 
        phone: "052-7654321",
        recommended: true
    },
    { 
        id: 3, 
        name: "דוד ההנדימן", 
        role: "פירוק והרכבת רהיטים", 
        category: "הנדימן ותחזוקה",
        rating: "⭐️⭐️⭐️⭐️⭐️ (210 דירוגים)", 
        phone: "054-9876543",
        recommended: true
    },
    { 
        id: 4, 
        name: "ארגזים בע״מ", 
        role: "אספקת קרטונים עד הבית", 
        category: "הובלות",
        rating: "⭐️⭐️⭐️⭐️ (45 דירוגים)", 
        phone: "050-1112233" 
    },
    { 
        id: 5, 
        name: "הובלות גל הזהב", 
        role: "הובלות דירות ומשרדים", 
        category: "הובלות",
        rating: "⭐️⭐️⭐️⭐️ (76 דירוגים)", 
        phone: "053-4445566" 
    },
    { 
        id: 6, 
        name: "פיני חשמלאי", 
        role: "חיבורי חשמל ותאורה בבית החדש", 
        category: "הנדימן ותחזוקה",
        rating: "⭐️⭐️⭐️⭐️⭐️ (98 דירוגים)", 
        phone: "052-3334411" 
    },
    { 
        id: 7, 
        name: "הנדימן 24/7", 
        role: "תיקונים ותליית מדפים ומסכים", 
        category: "הנדימן ותחזוקה",
        rating: "⭐️⭐️⭐️⭐️ (63 דירוגים)", 
        phone: "058-1239876" 
    },
    { 
        id: 8, 
        name: "אורגנייז עם רוני", 
        role: "סידור וארגון הבית לאחר המעבר", 
        category: "ניקיון וסידור הבית",
        rating: "⭐️⭐️⭐️⭐️⭐️ (152 דירוגים)", 
        phone: "054-7778899" 
    },
    { 
        id: 9, 
        name: "ספארקל ניקיון", 
        role: "ניקיון יסודי אחרי שיפוץ ומעבר", 
        category: "ניקיון וסידור הבית",
        rating: "⭐️⭐️⭐️⭐️ (54 דירוגים)", 
        phone: "050-6543210" 
    }
];
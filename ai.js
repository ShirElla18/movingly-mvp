 
// --- הגדרות API ---
// במערכת אמיתית, המפתח נשמר בשרת. עבור ה-MVP, נזין אותו כאן.
// אם תשאיר את המחרוזת ריקה (""), האפליקציה תשתמש במנגנון Fallback עם תשובות מוכנות מראש.
const OPENAI_API_KEY = ""; 

const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat-btn');
const chatHistory = document.getElementById('chat-history');
const quickReplies = document.querySelectorAll('.quick-reply-btn');

// פונקציה להוספת בועת צ'אט למסך
function addMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;
    bubble.innerText = text;
    chatHistory.appendChild(bubble);
    // גלילה אוטומטית למטה
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return bubble; // מחזיר את האלמנט כדי שנוכל לעדכן אותו (למשל בזמן טעינה)
}

// מנגנון תשובות חלופי (Fallback) במקרה שאין מפתח API
function getFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("כוסות") || lowerMessage.includes("שביר")) {
        return "מומלץ לעטוף כל כוס בנפרד בנייר אריזה או פצפצים, ולהניח אותן בעמידה בתוך קרטון קשיח כשיש חוצצים ביניהן.";
    }
    if (lowerMessage.includes("מוביל")) {
        return "כדאי לסגור מוביל לפחות 3-4 שבועות מראש, במיוחד בקיץ. בדוק את רשימת הספקים שלנו באפליקציה!";
    }
    if (lowerMessage.includes("ניקיון")) {
        return "רצוי לבצע ניקיון יסודי (או להזמין חברת ניקיון) יום או יומיים לפני ההובלה, כשהדירה עדיין ריקה.";
    }
    return "זאת שאלה מעולה! (הערת מערכת: מפתח ה-API לא הוזן, לכן זוהי תשובה אוטומטית. הכנס מפתח ב-ai.js כדי לשוחח עם ה-AI האמיתי).";
}

// פונקציית תקשורת מול OpenAI
async function fetchAIResponse(userMessage) {
    // 1. הוספת הודעת המשתמש למסך
    addMessage(userMessage, 'user');
    chatInput.value = ''; // ניקוי שורת ההקלדה
    
    // 2. הצגת הודעת "טעינה"
    const loadingBubble = addMessage("הבוט חושב...", "ai");

    // 3. בדיקה האם קיים מפתח API. אם לא -> הפעלת Fallback
    if (!OPENAI_API_KEY || OPENAI_API_KEY.trim() === "") {
        setTimeout(() => {
            loadingBubble.innerText = getFallbackResponse(userMessage);
        }, 1000); // דיליי קל ליצירת תחושה של צ'אט
        return;
    }

    // 4. שליחת הבקשה ל-OpenAI
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // מודל מהיר וזול
                messages: [
                    {
                        role: "system", 
                        content: "אתה יועץ לוגיסטי למעבר דירה של אפליקציית Movingly. ענה לשאלות המשתמש בצורה פרקטית, תמציתית ומרגיעה. הגבל את תשובתך ל-2-3 משפטים קצרים."
                    },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`שגיאת שרת: ${response.status}`);
        }

        const data = await response.json();
        const aiText = data.choices[0].message.content;
        
        // 5. עדכון הודעת הטעינה בתשובה האמיתית
        loadingBubble.innerText = aiText;

    } catch (error) {
        console.error("AI Error:", error);
        loadingBubble.innerText = "אופס! נראה שיש בעיית תקשורת. אנא בדוק את החיבור לאינטרנט או את מפתח ה-API שלך.";
    }
}

// --- מאזיני אירועים ---

// לחיצה על כפתור שלח
sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
        fetchAIResponse(text);
    }
});

// לחיצה על אנטר במקלדת
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// לחיצה על כפתורי בחירה מהירה (Quick Replies)
quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.innerText;
        fetchAIResponse(text);
    });
});
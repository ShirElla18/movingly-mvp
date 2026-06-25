
// --- חלק א': חלון מוטיבציה וזיקוקים (מופעל בסיום משימה) ---
function showMotivationPopup(taskTitle) {
  const popup = document.getElementById('motivation-popup');
  const msgEl = document.getElementById('popup-message');
  if (!popup) return;

  const messages = [
    `איזה יופי! המשימה "${taskTitle}" מאחוריך. את בדרך הנכונה! 💪`,
    `אלופה! השלמת את "${taskTitle}". קחי נשימה, הכל מתקדם לפי התוכנית 🏡`,
    `מעולה רעות! פחות דאגה אחת על הראש. "${taskTitle}" הושלמה בהצלחה ✨`,
    `כל הכבוד! עשית צעד חשוב עכשיו כשסיימת עם "${taskTitle}" 🚀`
  ];

  msgEl.innerText = messages[Math.floor(Math.random() * messages.length)];
  popup.classList.add('show');

  // זיקוקים מקצועיים בצבעי המותג Movingly
  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2F855A', '#1A365D', '#FDE8D9', '#E6FFFA'], 
      zIndex: 10000
    });
  }

  // סגירה אוטומטית חלקה
  setTimeout(() => { popup.classList.remove('show'); }, 4000);
}

// --- חלק ב': מערכת תזכורות חכמות (מופעלת בכניסה לאפליקציה) ---
function checkSmartReminders(diffDays) {
  const tasks = JSON.parse(localStorage.getItem('movingly_tasks'));
  if (!tasks) return;

  let reminderMsg = "";

  // שליפת הסטטוס של משימות קריטיות 
  const moversTask = tasks.find(t => t.title.includes("הובלה"));
  const boxesTask = tasks.find(t => t.title.includes("קרטונים"));

  // לוגיקה חכמה פרואקטיבית
  if (diffDays <= 14 && moversTask && !moversTask.completed) {
    reminderMsg = "רעות, נשארו פחות משבועיים למעבר! זה הזמן המדויק לסגור מוביל כדי להבטיח זמינות ומחיר טוב.";
  } else if (diffDays <= 7 && boxesTask && !boxesTask.completed) {
    reminderMsg = "שבוע למעבר הגדול! האם כבר הזמנת קרטונים וחומרי אריזה? אל תחכי לרגע האחרון.";
  } else if (diffDays > 0 && diffDays <= 30) {
    reminderMsg = "מעבר דירה הוא מרתון, לא ספרינט. קחי את הדברים בקצב שלך, אנחנו כאן לעשות לך סדר.";
  }

  // אם יש הודעה, נקפיץ אותה באלגנטיות קצת אחרי טעינת האפליקציה
  if (reminderMsg) {
    setTimeout(() => {
      document.getElementById('reminder-message').innerText = reminderMsg;
      document.getElementById('smart-reminder-toast').classList.add('show');
      
      // סגירה אוטומטית אחרי 8 שניות
      setTimeout(closeReminder, 8000);
    }, 2000); 
  }
}

// פונקציה לסגירת ההתראה החכמה
function closeReminder() {
  const toast = document.getElementById('smart-reminder-toast');
  if (toast) toast.classList.remove('show');
}







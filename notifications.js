// --- חלק א': חלון מוטיבציה וזיקוקים (מופעל בסיום משימה) ---
function showMotivationPopup(taskTitle) {
  const popup = document.getElementById('motivation-popup');
  const msgEl = document.getElementById('popup-message');
  if (!popup) return;

  const messages = [
    `איזה יופי! המשימה "${taskTitle}" מאחוריך. את בדרך הנכונה! 💪`,
    `אלופה! השלמת את "${taskTitle}". קחי נשימה, הכל מתקדם לפי התוכנית 🏡`,
    `מעולה! פחות דאגה אחת על הראש. "${taskTitle}" הושלמה בהצלחה ✨`,
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
    reminderMsg = " נשארו פחות משבועיים למעבר! זה הזמן המדויק לסגור מוביל כדי להבטיח זמינות ומחיר טוב.";
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

// --- חלק ג': מרכז התראות גלובלי (פעמון) ---
// מקור אמת יחיד להתראות: נגזר ממצב המשימות וה-countdown.
// התראות שנדחו (🔁) נשמרות לסשן הנוכחי בלבד.
const snoozedNotifications = new Set();

// חישוב מספר הימים עד המעבר (או null אם לא הוגדר תאריך)
function getDaysUntilMove() {
  const savedDate = localStorage.getItem('movingly_date');
  if (!savedDate) return null;
  const moveDate = new Date(savedDate);
  moveDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((moveDate - today) / (1000 * 60 * 60 * 24));
}

// בניית רשימת ההתראות הפעילות (כל התראה מקושרת למשימה כדי לאפשר אישור שמעדכן את ההתקדמות)
function buildNotifications() {
  const tasks = JSON.parse(localStorage.getItem('movingly_tasks')) || [];
  const diffDays = getDaysUntilMove();
  const notifications = [];

  const addForTask = (matcher, message) => {
    const task = tasks.find(t => t.title.includes(matcher) && !t.completed);
    if (!task) return;
    const id = `task-${task.id}`;
    if (notifications.some(n => n.id === id)) return; // מניעת כפילויות
    notifications.push({ id, taskId: task.id, message });
  };

  // לוגיקה פרואקטיבית מבוססת זמן + מצב משימה (כשאין תאריך – מציגים את הקריטיות)
  if (diffDays === null || diffDays <= 30) {
    addForTask('הובלה', 'זה הזמן המדויק לסגור חברת הובלה כדי להבטיח זמינות ומחיר טוב.');
  }
  if (diffDays === null || diffDays <= 14) {
    addForTask('קרטונים', 'כדאי להזמין קרטונים וחומרי אריזה — אל תחכה לרגע האחרון.');
    addForTask('כתובת', 'אל תשכח לעדכן את הכתובת ברשויות ובמשרד הפנים.');
  }
  if (diffDays === null || diffDays <= 7) {
    addForTask('מטבח', 'מומלץ להתחיל באריזת המטבח והכלים השבירים.');
  }

  return notifications.filter(n => !snoozedNotifications.has(n.id));
}

// רינדור תוכן בועת ההתראות + עדכון מחוון הספירה (Badge)
function renderNotifications() {
  const popover = document.getElementById('notif-popover');
  const badge = document.getElementById('notif-badge');
  if (!popover) return;

  const items = buildNotifications();

  if (badge) {
    badge.textContent = items.length ? String(items.length) : '';
    badge.style.display = items.length ? 'flex' : 'none';
  }

  if (!items.length) {
    popover.innerHTML = `<div class="notif-empty">אין התראות חדשות</div>`;
    return;
  }

  popover.innerHTML = items.map(item => `
    <div class="notif-item" data-id="${item.id}" data-task-id="${item.taskId}">
      <p class="notif-text">${item.message}</p>
      <div class="notif-actions">
        <button class="notif-btn notif-confirm" title="אישור ועדכון התקדמות" aria-label="אישור">✔️</button>
        <button class="notif-btn notif-snooze" title="דחייה למועד מאוחר יותר" aria-label="דחייה">🔁</button>
      </div>
    </div>
  `).join('');

  popover.querySelectorAll('.notif-confirm').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const taskId = Number(btn.closest('.notif-item').dataset.taskId);
      confirmNotification(taskId);
    });
  });
  popover.querySelectorAll('.notif-snooze').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      snoozeNotification(btn.closest('.notif-item').dataset.id);
    });
  });
}

// אישור (✔️): מסמן את המשימה כהושלמה ומעדכן את מד ההתקדמות דרך ההוק הגלובלי
function confirmNotification(taskId) {
  const tasks = JSON.parse(localStorage.getItem('movingly_tasks')) || [];
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
    localStorage.setItem('movingly_tasks', JSON.stringify(tasks));
  }
  if (typeof window.movinglyRefreshTasks === 'function') {
    window.movinglyRefreshTasks();
  }
  renderNotifications();
}

// דחייה (🔁): מסיר מהתצוגה הנוכחית בלבד (לא מסמן כהושלם)
function snoozeNotification(id) {
  snoozedNotifications.add(id);
  renderNotifications();
}

// פתיחה/סגירה של בועת ההתראות
function toggleBell() {
  const popover = document.getElementById('notif-popover');
  if (!popover) return;
  if (popover.hasAttribute('hidden')) {
    renderNotifications();
    popover.removeAttribute('hidden');
  } else {
    popover.setAttribute('hidden', '');
  }
}

// אתחול הפעמון
function initNotifications() {
  const bell = document.getElementById('notif-bell');
  const popover = document.getElementById('notif-popover');
  if (!bell || !popover) return;

  renderNotifications(); // עדכון ה-Badge כבר בכניסה

  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBell();
  });

  // סגירה בלחיצה מחוץ לבועה
  document.addEventListener('click', (e) => {
    if (!popover.hasAttribute('hidden') && !popover.contains(e.target) && e.target !== bell) {
      popover.setAttribute('hidden', '');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNotifications);
} else {
  initNotifications();
}
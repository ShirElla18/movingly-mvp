document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTasks();
    initProviders();
    initCountdown();
    initSettings();
});

// --- מערכת ניווט ---
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(!item.hasAttribute('data-target')) return; // עבור כפתור ההגדרות
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
            
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// --- ניהול משימות ורשימות לפי שלבים ---
function initTasks() {
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('movingly_tasks'));
    if (!tasks || tasks.length === 0) {
        tasks = [...defaultTasks];
        localStorage.setItem('movingly_tasks', JSON.stringify(tasks));
    }

    const renderTasks = () => {
        taskList.innerHTML = '';
        let completedCount = 0;

        const categories = {
            'month': { title: '📅 חודש לפני המעבר - טפסים ובירוקרטיה', className: 'stage-month' },
            'week': { title: '⏳ שבוע לפני המעבר - אריזה ומיון', className: 'stage-week' },
            'after': { title: '🏡 אחרי המעבר - יום המעבר והתאקלמות', className: 'stage-after' }
        };

        // יצירת מבנה הקטגוריות
        Object.keys(categories).forEach(stageKey => {
            const stageData = categories[stageKey];

            // נבדוק קודם אם יש משימות השייכות לשלב הזה, כדי לא לרנדר סתם קופסאות ריקות
            const hasTasksInStage = tasks.some(t => (t.stage || 'month') === stageKey);
            if (!hasTasksInStage) return;

            const stageSection = document.createElement('div');
            stageSection.className = `stage-section ${stageData.className}`;
            stageSection.innerHTML = `<h3 class="stage-title">${stageData.title}</h3><ul class="stage-sub-list" id="list-${stageKey}"></ul>`;
            taskList.appendChild(stageSection);
        });

        // מיון והזרקת המשימות לתוך תתי-הרשימות המתאימות
        tasks.forEach((task, index) => {
            if (task.completed) completedCount++;

            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.style.cursor = 'pointer'; // הפיכת כל השורה ללחיצה
            li.innerHTML = `
                <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
                <label for="task-${index}" style="cursor: pointer; flex: 1; padding-right: 5px;">
                    <span>${task.title}</span>
                </label>
            `;

            // האזנה לשינוי ישירות מהשורה כולה לחוויית שימוש נוחה בנייד
            li.querySelector('input').addEventListener('change', (e) => {
                tasks[index].completed = e.target.checked;
                localStorage.setItem('movingly_tasks', JSON.stringify(tasks));
                renderTasks(); 
            });

            const targetSection = document.getElementById(`list-${task.stage || 'month'}`);
            if (targetSection) targetSection.appendChild(li);
        });

        // עדכון אחוז ההתקדמות במד העליון
        const progressPercentage = Math.round((completedCount / tasks.length) * 100) || 0;
        document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;
        document.getElementById('progress-text').innerText = `${progressPercentage}% מההכנות הושלמו`;
    };

    renderTasks();

    // חשיפה עדינה לרענון חיצוני (למשל מאישור התראה בפעמון).
    // טוען מחדש את המשימות מ-localStorage כדי לשקף שינויים שנעשו מחוץ ל-closure.
    window.movinglyRefreshTasks = () => {
        tasks = JSON.parse(localStorage.getItem('movingly_tasks')) || tasks;
        renderTasks();
    };
}

// --- ספקים ושירותים (Marketplace בסגנון Netflix - Swimlanes) ---
function initProviders() {
    const container = document.getElementById('providers-container');
    if (!container) return;
    container.innerHTML = ''; // מניעת שכפול כרטיסים בריצה חוזרת

    // יצירת כרטיס ספק בודד (שומר על מבנה הכרטיס הקיים)
    const createSupplierCard = (provider) => {
        const div = document.createElement('div');
        div.className = 'supplier-card';
        div.innerHTML = `
            <div class="supplier-info">
                <h3>${provider.name}</h3>
                <p>📍 ${provider.role}</p>
                <div class="supplier-rating">${provider.rating}</div>
            </div>
            <div class="supplier-actions">
                <button class="supplier-btn" onclick="alert('מחייג ל-${provider.name}: ${provider.phone}')">📞 התקשר עכשיו</button>
                <button class="supplier-btn-outline" onclick="alert('פונקציית דירוג תפתח כאן')">✎ דרג ספק</button>
            </div>
        `;
        return div;
    };

    // יצירת שורת קטגוריה (Swimlane) עם קרוסלה אופקית
    const createSwimlane = (title, providers, isAi = false) => {
        const lane = document.createElement('div');
        lane.className = `swimlane ${isAi ? 'swimlane-ai' : ''}`;

        const heading = document.createElement('h3');
        heading.className = 'swimlane-title';
        heading.textContent = isAi ? `✨ ${title}` : title;
        lane.appendChild(heading);

        const track = document.createElement('div');
        track.className = 'swimlane-track';
        providers.forEach(p => track.appendChild(createSupplierCard(p)));
        lane.appendChild(track);

        return lane;
    };

    // השורה העליונה: מומלצים ע"י ה-AI (אוסף מכל הקטגוריות)
    const recommended = providersData.filter(p => p.recommended);
    if (recommended.length) {
        container.appendChild(createSwimlane('מומלצים עבורך ע"י ה-AI', recommended, true));
    }

    // שורה לכל קטגוריה, לפי הסדר המבוקש
    const categories = ['הובלות', 'הנדימן ותחזוקה', 'ניקיון וסידור הבית'];
    categories.forEach(cat => {
        const inCategory = providersData.filter(p => p.category === cat);
        if (inCategory.length) {
            container.appendChild(createSwimlane(cat, inCategory));
        }
    });
}

// --- הגדרות התראות ומוטיבציה ---
function initSettings() {
    const morning = document.getElementById('setting-morning');
    const evening = document.getElementById('setting-evening');
    const motivation = document.getElementById('setting-motivation');

    if (morning && evening && motivation) {
        const defaults = { morning: true, evening: true, motivation: false };
        const saved = JSON.parse(localStorage.getItem('movingly_settings')) || defaults;

        morning.checked = saved.morning;
        evening.checked = saved.evening;
        motivation.checked = saved.motivation;

        const persist = () => {
            localStorage.setItem('movingly_settings', JSON.stringify({
                morning: morning.checked,
                evening: evening.checked,
                motivation: motivation.checked
            }));
        };

        [morning, evening, motivation].forEach(el => el.addEventListener('change', persist));
    }

    // איפוס מלא של תהליך המעבר (לצורכי הצגת ה-MVP מההתחלה)
    const resetBtn = document.getElementById('reset-process-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const confirmed = confirm('לאפס את כל תהליך המעבר? כל הנתונים שהוגדרו (משימות ולוח התכנון, תאריך המעבר, מד ההתקדמות וההגדרות) יימחקו ויחזרו למצב התחלתי.');
            if (!confirmed) return;
            localStorage.removeItem('movingly_tasks');
            localStorage.removeItem('movingly_date');
            localStorage.removeItem('movingly_settings');
            location.reload();
        });
    }
}

// --- התראות וספירה לאחור ---
function initCountdown() {
    const dateInput = document.getElementById('move-date');
    const saveBtn = document.getElementById('save-date-btn');
    const banner = document.getElementById('countdown-banner');

    const savedDate = localStorage.getItem('movingly_date');
    if (savedDate) {
        dateInput.value = savedDate;
        updateBanner(savedDate);
    }

    saveBtn.addEventListener('click', () => {
        if (dateInput.value) {
            localStorage.setItem('movingly_date', dateInput.value);
            updateBanner(dateInput.value);
        }
    });

    function updateBanner(dateString) {
        const moveDate = new Date(dateString);
        moveDate.setHours(0, 0, 0, 0); 
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = moveDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        banner.style.display = 'block';
        
        if (diffDays > 0) {
            banner.innerText = `עוד ${diffDays} ימים למעבר!`;
        } else if (diffDays === 0) {
            banner.innerText = `היום המעבר! שיהיה בהצלחה!`;
        } else {
            banner.innerText = `עברו ${Math.abs(diffDays)} ימים מהמעבר.`;
        }
    }
}
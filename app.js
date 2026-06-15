document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTasks();
    initProviders();
    initCountdown();
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
            'month': { title: '📅 חודש לפני המעבר', className: 'stage-month' },
            'week': { title: '⏳ שבוע לפני המעבר', className: 'stage-week' },
            'after': { title: '🏡 אחרי המעבר', className: 'stage-after' }
        };


        Object.keys(categories).forEach(stageKey => {
            const stageData = categories[stageKey];

            const stageSection = document.createElement('div');
            stageSection.className = `stage-section ${stageData.className}`;
            stageSection.innerHTML = `<h3 class="stage-title">${stageData.title}</h3><ul class="stage-sub-list" id="list-${stageKey}"></ul>`;
            taskList.appendChild(stageSection);
        });

        // מיון המשימות לפי קטגוריות    
        tasks.forEach((task, index) => {
            if (task.completed) completedCount++;

            const li = document.createElement('li');

            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
                            <label for="task-${index}"><span>${task.title}</span></label>`;
            li.querySelector('input').addEventListener('change', (e) => {
                tasks[index].completed = e.target.checked;
                localStorage.setItem('movingly_tasks', JSON.stringify(tasks));
                renderTasks(); 
            });
            const targetSection = document.getElementById(`list-${task.stage || 'month'}`);
            if (targetSection) targetSection.appendChild(li);
        });


        const progressPercentage = Math.round((completedCount / tasks.length) * 100) || 0;
        document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;
        document.getElementById('progress-text').innerText = `${progressPercentage}% מההכנות הושלמו`;
    };

    renderTasks();
}

// --- ספקים (Marketplace) ---
function initProviders() {
    const container = document.getElementById('providers-container');
    
    providersData.forEach(provider => {
        const div = document.createElement('div');
        div.className = 'supplier-card';
        div.innerHTML = `
            <div class="supplier-info">
                <h3>${provider.name}</h3>
                <p>📍 תחומי פעילות מרכז</p>
                <div class="supplier-rating">${provider.rating}</div>
            </div>
            <div class="supplier-actions">
                <button class="supplier-btn" onclick="alert('מחייג ל-${provider.name}: ${provider.phone}')">📞 התקשר עכשיו</button>
                <button class="supplier-btn-outline" onclick="alert('פונקציית דירוג תפתח כאן')">✎ דרג ספק</button>
            </div>
        `;
        container.appendChild(div);
    });
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
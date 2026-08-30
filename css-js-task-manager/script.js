/* ======== Simple Kanban with localStorage ======== */

const STORAGE_KEY = 'dark_kanban_tasks_v1';

let tasks = []; // will hold task objects
const statuses = ['todo', 'inprogress', 'review', 'done'];

function uid() { return 't_' + Date.now() + '_' + Math.floor(Math.random() * 9999) }

/* Load + Save */
function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
        tasks = raw ? JSON.parse(raw) : [];
    } catch (e) { tasks = []; }
}
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }

/* Render */
function render() {
    statuses.forEach(s => {
        const list = document.getElementById('list-' + s);
        list.innerHTML = '';

        // Sort: starred first, then by createdAt
        const items = tasks
            .filter(t => t.status === s)
            .sort((a, b) => {
                if (b.starred === true && a.starred !== true) return 1;
                if (a.starred === true && b.starred !== true) return -1;
                return b.createdAt - a.createdAt;
            });

        items.forEach(t => {
            const card = document.createElement('div');
            card.className = 'card';
            card.draggable = true;
            card.dataset.id = t.id;
            card.innerHTML = `
                <div class="card-header">
                    <h3>${escapeHtml(t.title)}</h3>
                    <span class="star-icon" style="color:${t.starred ? 'gold' : '#dbe9f8a8'}" title="${t.starred ? 'Unstar' : 'Star'}">
                        ${t.starred ? '&#9733;' : '&#9734;'}
                    </span>
                </div>
                <p>${escapeHtml(t.desc || '')}</p>
                <div class="meta">
                    <span class="chip">${new Date(t.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
                    <div class="actions">
                        <button title="Mark Done" class="icon-btn mark-done"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="M293-288 100-482l50-50 143 142 51 51-51 51Zm204 0L303-482l51-51 143 143 324-324 51 51-375 375Zm0-203-51-51 172-172 51 51-172 172Z"/></svg></button>
                        <button title="Duplicate" class="icon-btn duplicate"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="M744-192H312q-29 0-50.5-21.5T240-264v-576q0-29 21.5-50.5T312-912h312l192 192v456q0 29-21.5 50.5T744-192ZM576-672v-168H312v576h432v-408H576ZM168-48q-29 0-50.5-21.5T96-120v-552h72v552h456v72H168Zm144-792v195-195 576-576Z"/></svg></button>
                        <button title="Move" class="icon-btn move-menu"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z"/></svg></button>
                        <button title="Delete" class="icon-btn delete"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></button>
                    </div>
                </div>
            `;
            list.appendChild(card);

            /* Drag events */
            card.addEventListener('dragstart', onDragStart);
            card.addEventListener('dragend', onDragEnd);

            /* Star toggle */
            card.querySelector('.star-icon').addEventListener('click', () => {
                t.starred = !t.starred;
                save();
                render();
            });

            /* Actions */
            card.querySelector('.mark-done').addEventListener('click', () => {
                updateTask(t.id, { status: 'done' });
                triggerConfetti();
            });
            card.querySelector('.duplicate').addEventListener('click', () => {
                const copy = { ...t, id: uid(), createdAt: Date.now(), title: t.title + ' (copy)' };
                tasks.push(copy);
                save();
                render();
            });
            card.querySelector('.delete').addEventListener('click', () => {
                if (confirm('Delete this task?')) {
                    tasks = tasks.filter(x => x.id !== t.id);
                    save();
                    render();
                }
            });

            /* Move menu */
            card.querySelector('.move-menu').addEventListener('click', (e) => {
                e.stopPropagation();
                showMoveMenu(e.currentTarget, t);
            });

            /* In-place edit */
            card.querySelector('h3').addEventListener('dblclick', () => {
                const newTitle = prompt('Edit title', t.title);
                if (newTitle != null) updateTask(t.id, { title: newTitle.trim() });
            });
            card.querySelector('p').addEventListener('dblclick', () => {
                const newDesc = prompt('Edit description', t.desc);
                if (newDesc != null) updateTask(t.id, { desc: newDesc.trim() });
            });

            /* Right-click delete */
            card.addEventListener('contextmenu', e => {
                e.preventDefault();
                if (confirm('Delete this task?')) {
                    tasks = tasks.filter(x => x.id !== t.id);
                    save();
                    render();
                }
            });
        });

        document.getElementById('count-' + s).textContent = items.length;
    });
}

/* Move menu function (fixed for mobile) */
let currentMoveMenu = null;

function showMoveMenu(btn, task) {
    closeMoveMenu();

    const menu = document.createElement('div');
    menu.className = 'move-popup';
    menu.dataset.taskId = task.id;

    statuses.forEach(st => {
        if (st !== task.status) {
            const item = document.createElement('div');
            item.textContent = 'Move to ' + formatStatus(st);
            item.addEventListener('click', () => {
                updateTask(task.id, { status: st });
                if (st === 'done') triggerConfetti();
                closeMoveMenu();
            });
            menu.appendChild(item);
        }
    });

    document.body.appendChild(menu);

    // Position correctly under clicked button
    const rect = btn.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = `${rect.bottom + window.scrollY + 5}px`;
    menu.style.left = `${rect.left + window.scrollX - 125}px`;

    currentMoveMenu = menu;

    setTimeout(() => {
        document.addEventListener('click', outsideClickHandler);
    }, 0);
}

function outsideClickHandler(e) {
    if (currentMoveMenu && !currentMoveMenu.contains(e.target) && !e.target.closest('.move-menu')) {
        closeMoveMenu();
    }
}

function closeMoveMenu() {
    if (currentMoveMenu) {
        currentMoveMenu.remove();
        currentMoveMenu = null;
        document.removeEventListener('click', outsideClickHandler);
    }
}

function formatStatus(s) {
    return s === 'todo' ? 'To Do' :
        s === 'inprogress' ? 'In Progress' :
        s === 'review' ? 'Review' : 'Done';
}

/* Helpers */
function escapeHtml(s) { if (!s) return ''; return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
function findTask(id) { return tasks.find(t => t.id === id) }
function updateTask(id, patch) {
    const t = findTask(id);
    if (!t) return;
    Object.assign(t, patch);
    save();
    render();
}

/* Add */
document.getElementById('addTask').addEventListener('click', () => {
    const title = document.getElementById('newTitle').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const status = document.getElementById('newStatus').value;
    if (!title) { alert('Please give a title'); return; }
    const task = { id: uid(), title, desc, status, createdAt: Date.now(), starred: false };
    tasks.push(task);
    save(); render();
    document.getElementById('newTitle').value = '';
    document.getElementById('newDesc').value = '';
});

/* Drag and drop handlers */
let draggedId = null;
function onDragStart(e) {
    draggedId = e.currentTarget.dataset.id;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.setData('text/plain', draggedId);
}
function onDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    draggedId = null;
}

/* Columns accept drops */
document.querySelectorAll('.column').forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();
        col.classList.add('over');
    });
    col.addEventListener('dragleave', e => col.classList.remove('over'));
    col.addEventListener('drop', e => {
        e.preventDefault();
        col.classList.remove('over');
        const id = e.dataTransfer.getData('text/plain') || draggedId;
        const target = col.dataset.status;
        const t = findTask(id);
        if (!t) return;
        const prevStatus = t.status;
        t.status = target;
        save(); render();
        if (target === 'done' && prevStatus !== 'done') triggerConfetti();
    });
});

/* Confetti */
function triggerConfetti() {
    const root = document.getElementById('confettiRoot');
    const colors = ['#7c5cff', '#60a5fa', '#34d399', '#f97316', '#f472b6', '#ffd166'];
    const total = 30 + Math.floor(Math.random() * 300);
    const width = window.innerWidth;

    for (let i = 0; i < total; i++) {
        const piece = document.createElement('div');
        piece.className = 'piece';
        const size = 6 + Math.floor(Math.random() * 10);
        piece.style.width = size + 'px';
        piece.style.height = (size * 0.6) + 'px';
        piece.style.left = Math.floor(Math.random() * width) + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        const dur = 1200 + Math.floor(Math.random() * 1200);
        piece.style.animationDuration = dur + 'ms';
        root.appendChild(piece);
        setTimeout(() => piece.remove(), dur + 200);
    }
}

/* Export / Import / Clear */
document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kanban-tasks.json'; document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
});

document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
});
document.getElementById('importFile').addEventListener('change', function () {
    const f = this.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const imported = JSON.parse(reader.result);
            if (!Array.isArray(imported)) throw new Error('Invalid file');
            imported.forEach(it => {
                it.id = it.id || uid();
                it.createdAt = it.createdAt || Date.now();
                if (typeof it.starred !== 'boolean') it.starred = false;
            });
            tasks = tasks.concat(imported);
            save(); render();
            alert('Imported ' + imported.length + ' tasks');
        } catch (e) {
            alert('Failed to import: ' + e.message);
        }
    };
    reader.readAsText(f);
});

document.getElementById('clearAll').addEventListener('click', () => {
    if (confirm('Clear all tasks?')) {
        tasks = []; save(); render();
    }
});

/* Enter key add */
document.getElementById('newTitle').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('addTask').click(); }
});

/* Init */
load();
render();


/* --------------------------------------------
    Keyboard Accessibility for Kanban Cards
   -------------------------------------------- */
let selectedCard = null;

// Select a card when clicked
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        if (selectedCard) selectedCard.style.outline = '';
        selectedCard = card;
        card.style.outline = '2px solid rgba(124,92,255,0.5)';
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        if (selectedCard) selectedCard.style.outline = '';
        selectedCard = null;
    }
});

// Move card with arrow keys
document.addEventListener('keydown', (e) => {
    if (!selectedCard) return;
    const id = selectedCard.dataset.id;
    const t = findTask(id);
    if (!t) return;

    const idx = statuses.indexOf(t.status);

    if (e.key === 'ArrowRight' && idx < statuses.length - 1) {
        moveCardWithAnimation(id, statuses[idx + 1]);
    }
    else if (e.key === 'ArrowLeft' && idx > 0) {
        moveCardWithAnimation(id, statuses[idx - 1]);
    }
});

// Helper to move card with animation
function moveCardWithAnimation(id, newStatus) {
    selectedCard.classList.add('card-moving');
    updateTask(id, { status: newStatus });

    // Delay to allow animation before removing class
    setTimeout(() => {
        if (selectedCard) {
            selectedCard.classList.remove('card-moving');
            selectedCard.style.outline = '2px solid rgba(124,92,255,0.5)';
        }
    }, 300);
}

// ── State ──────────────────────────────────────────────
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// ── DOM refs ───────────────────────────────────────────
const input        = document.getElementById('todo-input');
const prioritySel  = document.getElementById('priority-select');
const addBtn       = document.getElementById('add-btn');
const todoList     = document.getElementById('todo-list');
const itemsLeft    = document.getElementById('items-left');
const clearBtn     = document.getElementById('clear-completed');
const filterBtns   = document.querySelectorAll('.filter-btn');
const dateDisplay  = document.getElementById('date-display');

// ── Date display ───────────────────────────────────────
const now = new Date();
dateDisplay.textContent = now.toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// ── Helpers ────────────────────────────────────────────
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── Render ─────────────────────────────────────────────
function render() {
  const filtered = todos.filter(t => {
    if (currentFilter === 'active')    return !t.completed;
    if (currentFilter === 'completed') return  t.completed;
    return true;
  });

  todoList.innerHTML = '';

  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    const priorityLabels = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} aria-label="Toggle done" />
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <span class="priority-badge priority-${todo.priority}">${priorityLabels[todo.priority]}</span>
      <button class="delete-btn" title="Delete task">✕</button>
    `;

    // Toggle complete
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      todo.completed = !todo.completed;
      save();
      render();
    });

    // Delete
    li.querySelector('.delete-btn').addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      save();
      render();
    });

    todoList.appendChild(li);
  });

  // Items left count (always from all active, not filtered)
  const activeCount = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// ── Add todo ───────────────────────────────────────────
function addTodo() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return;
  }

  todos.unshift({
    id:        genId(),
    text,
    priority:  prioritySel.value,
    completed: false,
    createdAt: Date.now()
  });

  input.value = '';
  prioritySel.value = 'medium';
  save();
  render();
  input.focus();
}

// ── Events ─────────────────────────────────────────────
addBtn.addEventListener('click', addTodo);

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  save();
  render();
});

// ── Shake animation (for empty input) ─────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
  .shake { animation: shake 0.4s ease; border-color: #e74c3c !important; }
`;
document.head.appendChild(style);

// ── XSS helper ─────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Init ───────────────────────────────────────────────
render();

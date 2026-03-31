// ── State ──────────────────────────────────────────────
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// ── DOM refs ───────────────────────────────────────────
const input = document.getElementById("todo-input");
const prioritySel = document.getElementById("priority-select");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");
const dateDisplay = document.getElementById("date-display");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");

// ── Date display ───────────────────────────────────────
const now = new Date();
dateDisplay.textContent = now.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// ── Helpers ────────────────────────────────────────────
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Progress bar ───────────────────────────────────────
function updateProgress() {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  progressFill.style.width = pct + "%";
  progressText.textContent = `${completed} / ${total} done`;
}

// ── Render ─────────────────────────────────────────────
function render() {
  const filtered = todos.filter((t) => {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  todoList.innerHTML = "";

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;
    li.dataset.priority = todo.priority;

    const priorityLabels = { low: "Low", medium: "Medium", high: "High" };

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} aria-label="Toggle done" />
      <div class="custom-check ${todo.completed ? "checked" : ""}"></div>
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <span class="priority-badge priority-${todo.priority}">${priorityLabels[todo.priority]}</span>
      <button class="delete-btn" title="Delete task">✕</button>
    `;

    // Toggle via custom check
    const check = li.querySelector(".custom-check");
    const realCheck = li.querySelector('input[type="checkbox"]');

    check.addEventListener("click", () => {
      todo.completed = !todo.completed;
      save();
      render();
    });
    realCheck.addEventListener("change", () => {
      todo.completed = !todo.completed;
      save();
      render();
    });

    // Delete
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.style.animation = "itemOut 0.25s ease forwards";
      setTimeout(() => {
        todos = todos.filter((t) => t.id !== todo.id);
        save();
        render();
      }, 220);
    });

    todoList.appendChild(li);
  });

  // Items left
  const activeCount = todos.filter((t) => !t.completed).length;
  itemsLeft.innerHTML = `<strong>${activeCount}</strong> item${activeCount !== 1 ? "s" : ""} left`;

  updateProgress();
}

// ── Add todo ───────────────────────────────────────────
function addTodo() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 400);
    return;
  }

  todos.unshift({
    id: genId(),
    text,
    priority: prioritySel.value,
    completed: false,
    createdAt: Date.now(),
  });

  input.value = "";
  prioritySel.value = "medium";
  save();
  render();
  input.focus();
}

// ── Events ─────────────────────────────────────────────
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.completed);
  save();
  render();
});

// Delete exit animation
const exitStyle = document.createElement("style");
exitStyle.textContent = `
  @keyframes itemOut {
    to { opacity: 0; transform: translateX(30px) scale(0.95); }
  }
`;
document.head.appendChild(exitStyle);

// ── Init ───────────────────────────────────────────────
render();

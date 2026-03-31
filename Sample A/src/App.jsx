import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import AddTodoForm from './components/AddTodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import ProgressBar from './components/ProgressBar';

const DATE = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, editTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'active')    return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t =>  t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount    = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t =>  t.completed).length;

  return (
    /* ── Animated background blobs ── */
    <div className="relative min-h-screen bg-[#0b0f1a] flex justify-center items-start px-4 py-12 overflow-x-hidden">

      {/* Blob 1 */}
      <div className="pointer-events-none fixed top-[-140px] left-[-120px] w-[520px] h-[520px] rounded-full
        bg-violet-500/20 blur-[100px] animate-blobFloat" />
      {/* Blob 2 */}
      <div className="pointer-events-none fixed bottom-[-140px] right-[-100px] w-[480px] h-[480px] rounded-full
        bg-sky-400/15 blur-[100px] animate-blobFloat2" />

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-[580px] glass rounded-[28px]
        shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]
        overflow-hidden"
      >

        {/* ── Header ── */}
        <header className="relative px-7 pt-8 pb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400/15 to-sky-400/10 border-b border-white/[0.08]" />
          <div className="relative z-10">
            <h1 className="text-[2rem] font-extrabold tracking-tight flex items-center gap-3">
              <span className="animate-pulseSlow inline-block" style={{ filter: 'drop-shadow(0 0 10px rgba(167,139,250,0.8))' }}>✅</span>
              <span className="text-gradient">My Todo List</span>
            </h1>
            <p className="mt-1 text-[0.82rem] text-slate-500 font-medium">{DATE}</p>
            <ProgressBar total={todos.length} completed={completedCount} />
          </div>
        </header>

        {/* ── Add form ── */}
        <AddTodoForm onAdd={addTodo} />

        {/* ── Filters ── */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          onClearCompleted={clearCompleted}
        />

        {/* ── List ── */}
        <TodoList
          todos={filtered}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* ── Footer ── */}
        <footer className="flex justify-between items-center px-5 py-4
          bg-white/[0.03] border-t border-white/[0.06] text-[0.78rem]"
        >
          <span className="text-slate-500 font-medium">
            <span className="text-violet-400 font-bold">{activeCount}</span> item{activeCount !== 1 ? 's' : ''} left
          </span>
          <span className="text-slate-700 text-[0.72rem]">Double-click a task to edit</span>
        </footer>
      </div>
    </div>
  );
}

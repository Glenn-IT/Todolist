import { PRIORITY } from '../constants';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const p = PRIORITY[todo.priority];

  return (
    <li
      className={`
        group relative flex items-center gap-3 px-5 py-4
        border-b border-white/[0.04] last:border-b-0
        hover:bg-white/[0.03] transition-colors duration-150
        animate-slideIn
      `}
    >
      {/* Priority left bar */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full ${p.bar} shadow-lg ${p.glow}`}
      />

      {/* Custom checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle complete"
        className={`
          flex-shrink-0 w-[22px] h-[22px] rounded-[8px] border-2
          flex items-center justify-center transition-all duration-200
          ${todo.completed
            ? 'bg-gradient-to-br from-violet-400 to-sky-400 border-transparent shadow-[0_0_14px_rgba(167,139,250,0.5)]'
            : 'border-white/20 bg-white/[0.04] hover:border-violet-400 hover:bg-violet-400/10'
          }
        `}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-[#0b0f1a]" viewBox="0 0 12 9" fill="none">
            <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Text — double-click to edit */}
      <span
        className={`
          flex-1 text-[0.93rem] leading-relaxed font-[450] break-words
          transition-all duration-200
          ${todo.completed ? 'line-through text-slate-600' : 'text-slate-100'}
        `}
        title="Double-click to edit"
        onDoubleClick={() => {
          const val = window.prompt('Edit task:', todo.text);
          if (val && val.trim()) onEdit(todo.id, val.trim());
        }}
      >
        {todo.text}
      </span>

      {/* Priority badge */}
      <span
        className={`
          flex-shrink-0 text-[0.68rem] font-bold tracking-wider uppercase
          px-[10px] py-[4px] rounded-full border
          ${p.color} ${p.bg} ${p.border}
        `}
      >
        {p.label}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className={`
          flex-shrink-0 opacity-0 group-hover:opacity-100
          w-[30px] h-[30px] rounded-[8px] flex items-center justify-center
          bg-red-400/[0.08] border border-red-400/20 text-slate-500
          hover:bg-red-400/20 hover:border-red-400/40 hover:text-red-400
          hover:scale-110 hover:shadow-[0_0_12px_rgba(248,113,113,0.2)]
          transition-all duration-200 text-[0.85rem]
        `}
      >
        ✕
      </button>
    </li>
  );
}

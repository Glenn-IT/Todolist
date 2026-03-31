import { useState, useRef } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const handleAdd = () => {
    if (!text.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      inputRef.current?.focus();
      return;
    }
    onAdd(text.trim(), priority);
    setText('');
    setPriority('medium');
    inputRef.current?.focus();
  };

  return (
    <div className="flex gap-2 px-5 py-4 bg-white/[0.03] border-b border-white/[0.07]">
      <input
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        maxLength={120}
        placeholder="Add a new task..."
        className={`
          flex-1 px-4 py-[11px] rounded-[14px] text-[0.93rem] font-[450]
          bg-white/[0.07] border-[1.5px] border-white/10 text-slate-100
          placeholder:text-slate-600 outline-none
          focus:border-violet-400 focus:bg-violet-400/[0.08]
          focus:shadow-[0_0_0_4px_rgba(167,139,250,0.12)]
          transition-all duration-200
          ${shake ? 'animate-shake border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.15)]' : ''}
        `}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="
          px-3 py-[11px] rounded-[14px] text-[0.85rem] font-[500]
          bg-white/[0.07] border-[1.5px] border-white/10 text-slate-300
          outline-none cursor-pointer
          focus:border-violet-400 focus:shadow-[0_0_0_4px_rgba(167,139,250,0.12)]
          transition-all duration-200
          [&>option]:bg-slate-900
        "
      >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>

      <button
        onClick={handleAdd}
        className="
          px-5 py-[11px] rounded-[14px] font-bold text-[0.9rem] tracking-wide
          text-[#0b0f1a] btn-primary
          transition-all duration-200 whitespace-nowrap
        "
        style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', boxShadow: '0 4px 20px rgba(167,139,250,0.4)' }}
      >
        + Add
      </button>
    </div>
  );
}

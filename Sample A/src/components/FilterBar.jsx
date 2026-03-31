import { FILTERS } from '../constants';

const labels = { all: 'All', active: 'Active', completed: 'Completed' };

export default function FilterBar({ filter, setFilter, activeCount, onClearCompleted }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/[0.07]">
      <div className="flex gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-[6px] rounded-full text-[0.78rem] font-semibold tracking-wide
              border-[1.5px] transition-all duration-200
              ${filter === f
                ? 'bg-violet-400/20 border-violet-400/40 text-violet-300 shadow-[0_0_16px_rgba(167,139,250,0.15)]'
                : 'bg-white/[0.05] border-white/10 text-slate-500 hover:text-slate-300 hover:bg-white/[0.08]'
              }
            `}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      <button
        onClick={onClearCompleted}
        className="
          text-[0.75rem] font-semibold tracking-wide text-red-400
          px-3 py-[5px] rounded-full border border-red-400/25
          hover:bg-red-400/10 hover:shadow-[0_0_14px_rgba(248,113,113,0.2)]
          transition-all duration-200
        "
      >
        Clear done
      </button>
    </div>
  );
}

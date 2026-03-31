export default function ProgressBar({ total, completed }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mt-5">
      <div className="flex justify-between text-[0.74rem] text-slate-500 mb-[6px]">
        <span className="font-medium">Progress</span>
        <span className="text-violet-400 font-semibold">{completed} / {total} done</span>
      </div>
      <div className="h-[6px] rounded-full bg-white/[0.07] overflow-hidden">
        <div
          className="h-full rounded-full progress-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

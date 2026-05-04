const colors = {
  wood: 'from-emerald-300 to-lime-400',
  fire: 'from-rose-400 to-orange-400',
  earth: 'from-yellow-300 to-amber-500',
  metal: 'from-slate-100 to-zinc-400',
  water: 'from-cyan-300 to-blue-500',
};

export default function ElementGauge({ label, value, type }) {
  return (
    <div className="space-y-2 rounded-[8px] border border-white/10 bg-white/[0.06] p-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-white">{label}</span>
        <span className="text-[#e7c873]">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-black/30">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colors[type]} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

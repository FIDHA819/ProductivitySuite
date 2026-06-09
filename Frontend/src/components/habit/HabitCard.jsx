import { Trash2, CheckCircle2, Flame, Calendar } from "lucide-react";

const HabitCard = ({ habit, onDelete, onComplete }) => {
  const completionCount = habit.completedDates?.length || 0;
  
  // Dynamic progress percentage capping at 100%
  const progressPercent = Math.min(completionCount * 10, 100);

  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-purple-950/5">
      
      {/* Dynamic light accent bar on hover */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top Header Row */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-bold text-slate-200 tracking-tight group-hover:text-white transition-colors">
            {habit.name}
          </h3>
          
          {/* Badge Display */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            completionCount > 0 
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
              : "bg-slate-800 text-slate-500"
          }`}>
            <Flame size={14} className={completionCount > 0 ? "animate-pulse" : ""} />
            <span>{completionCount}d Streak</span>
          </div>
        </div>

        {/* Optional Description */}
        <p className="text-slate-400 text-sm mt-1.5 font-light line-clamp-2">
          {habit.description || "Consistent repetition forms permanent automation paths."}
        </p>

        {/* Progress System Metric */}
        <div className="mt-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar size={12} /> Milestone Progress
            </span>
            <span className="font-mono font-semibold text-purple-400">{progressPercent}%</span>
          </div>
          
          {/* Progress Outer Bar */}
          <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden p-[1px] border border-slate-900">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Action Footer */}
      <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-800/60">
        <button
          onClick={() => onComplete(habit._id)}
          className="flex-1 bg-slate-950 hover:bg-emerald-950/30 border border-slate-800 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all text-sm"
        >
          <CheckCircle2 size={16} />
          Check In
        </button>

        <button
          onClick={() => onDelete(habit._id)}
          className="bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 text-slate-500 hover:text-rose-400 p-2 rounded-xl active:scale-[0.97] transition-all"
          title="Archive Habit"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
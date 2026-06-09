import { useState } from "react";
import { Zap } from "lucide-react";

const HabitForm = ({ onAdd }) => {
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name });
    setName("");
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Habit Identity
        </label>
        <input
          type="text"
          placeholder="e.g., Read 10 Pages, Cold Shower"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-950/60 border border-slate-800 text-slate-200 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-600 focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/10"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <Zap size={16} />
        Initialize Routine
      </button>
    </form>
  );
};

export default HabitForm;
import { useEffect, useState } from "react";
import { PlusCircle, Flame, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

import HabitForm from "../../components/habit/HabitForm";
import HabitCard from "../../components/habit/HabitCard";

import {
  getHabits,
  createHabit,
  deleteHabit,
  completeHabit
} from "../../services/habitServices";

const HabitPage = ({goBack}) => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (data) => {
    await createHabit(data);
    fetchHabits();
  };

  const removeHabit = async (id) => {
    await deleteHabit(id);
    fetchHabits();
  };

  const markComplete = async (id) => {
    await completeHabit(id);
    fetchHabits();
  };

  // Quick stats calculation
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((acc, h) => acc + (h.completedDates?.length || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 selection:bg-purple-500 selection:text-white">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-medium text-sm tracking-wider uppercase mb-1">
              <Sparkles size={16} />
              Personal Growth Engine
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Habit Studio
            </h1>
              <button
            onClick={goBack}
            className="absolute top-20 left-(-20) text-sm font-medium text-slate-400 hover:text-slate-200 transition"
          >
            ← Back
          </button>
          </div>

          {/* Mini Stats Banner */}
          <div className="flex gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-2xl">
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Active</p>
              <p className="text-2xl font-bold text-purple-400">{totalHabits}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Total Hits</p>
              <p className="text-2xl font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp size={18} className="inline" /> {totalCompletions}
              </p>
            </div>
          </div>
        </header>

        {/* Main Grid Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-4 sticky top-8">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <PlusCircle size={20} className="text-purple-400" />
                <h2 className="text-xl font-bold tracking-tight text-slate-200">
                  Create New Habit
                </h2>
              </div>
              <HabitForm onAdd={addHabit} />
            </div>
          </div>

          {/* Right Column: Habit Cards Grid */}
          <div className="lg:col-span-8">
            {habits.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-850 rounded-2xl bg-slate-900/20">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                  🎯
                </div>
                <h3 className="text-lg font-medium text-slate-300">No habits tracked yet</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                  Use the creator tool on the left to initialize your first routine anchor.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habits.map((habit) => (
                  <HabitCard
                    key={habit._id}
                    habit={habit}
                    onDelete={removeHabit}
                    onComplete={markComplete}
                  />
                ))}

              </div>
            )}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default HabitPage;
import { useEffect, useState } from "react";
import { Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import TodoInput from "../../components/TodoInput";

function TodoApp({ goBack }) {
  const [todo, setTodo] = useState(() => {
    const storedTodo = localStorage.getItem("todo");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const addTodo = (text) => {
    setTodo([...todo, text]);
  };

  const deleteTodo = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 relative flex items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative z-10">
        
        {/* Header section */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              To-Do App
            </h1>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
              Day 1 React
            </span>
          </div>
          <p className="text-xs text-slate-400">Keep track of your tasks and daily execution lines.</p>
        </header>

        {/* Input box section */}
        <div className="mb-6">
          <TodoInput addTodo={addTodo} />
        </div>

        {/* List layout */}
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
          {todo.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
              <p className="text-sm text-slate-500">All caught up! No pending tasks.</p>
            </div>
          ) : (
            todo.map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-between bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-slate-500 w-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-slate-300 truncate font-medium">
                    {item}
                  </p>
                </div>

                <button
                  onClick={() => deleteTodo(index)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/5 opacity-80 group-hover:opacity-100 transition-all"
                  title="Delete item"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/60">
          <button
            onClick={goBack}
            className="w-full bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm font-medium py-2 px-4 rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

export default TodoApp;
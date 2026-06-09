import { useState } from "react";
import { Plus } from "lucide-react"; // Optional: for a nice icon

function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return; // Prevents adding empty tasks!
    addTodo(text);
    setText(""); // Clears the input box after adding
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()} // Allow pressing Enter to add
        className="flex-1 bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
      />
      <button
        onClick={handleAdd}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 rounded-xl transition-all active:scale-95 flex items-center gap-1 shadow-lg shadow-indigo-600/10"
      >
        <Plus size={18} />
        Add
      </button>
    </div>
  );
}

export default TodoInput;
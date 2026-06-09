import { forwardRef } from "react";

const CalculatorInput = forwardRef((props, ref) => {
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type="text"
        placeholder="Type expression (e.g., 2+3*5)"
        className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 rounded-xl px-4 py-3.5 text-right font-mono text-lg tracking-wider outline-none transition-all placeholder:text-slate-650 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
      />
    </div>
  );
});

CalculatorInput.displayName = "CalculatorInput";
export default CalculatorInput;
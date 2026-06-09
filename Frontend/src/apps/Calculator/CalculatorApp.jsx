import { useState, useRef } from "react";
import { ArrowLeft, Cpu, ToggleLeft, ToggleRight, Trash2, Hash } from "lucide-react";
import CalculatorInput from "../../components/CalculatorInput";

function Calculator({ goBack }) {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("state");
  const [refResult, setRefResult] = useState("");
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleClick = (val) => {
    setValue(value + val);
  };

  const calculate = () => {
    try {
      if (!value) return;
      // Using String wrapper to ensure it sets gracefully into state
      setValue(String(eval(value)));
    } catch (error) {
      setValue("Error");
    }
  };

  const clear = () => {
    setValue("");
  };

  const calculateRef = () => {
    try {
      if (!inputRef.current.value) return;
      const result = eval(inputRef.current.value);
      inputRef.current.value = result;
      setRefResult(result);
    } catch (error) {
      setRefResult("Error");
    }
  };

  const clearRef = () => {
    if (inputRef.current) inputRef.current.value = "";
    setRefResult("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 relative flex items-center justify-center">
      {/* Background radial accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative z-10">
        
        {/* Dynamic Widget Header */}
        <header className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <Cpu size={18} className="text-purple-400" /> Core Calc
            </h1>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">Day 2 Stack Experiment</p>
          </div>

          {/* Mode Switching Button */}
          <button
            onClick={() => setMode(mode === "state" ? "ref" : "state")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95 shadow-sm"
          >
            {mode === "state" ? (
              <>
                <ToggleLeft size={16} className="text-purple-400" />
                <span>State Mode</span>
              </>
            ) : (
              <>
                <ToggleRight size={16} className="text-indigo-400" />
                <span>Ref Mode</span>
              </>
            )}
          </button>
        </header>

        {/* ================= STATE MODE PANEL ================= */}
        {mode === "state" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Visual Screen Output */}
            <div className="bg-slate-950/90 border border-slate-850 rounded-xl p-4 flex flex-col justify-end items-end min-h-[72px] shadow-inner">
              <span className="text-xs font-mono text-purple-500 tracking-wider font-semibold uppercase mb-1">UseState Screen</span>
              <div className="text-2xl font-mono text-slate-100 truncate w-full text-right tracking-wide">
                {value || "0"}
              </div>
            </div>

            {/* Grid Keypad Section */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <button onClick={() => handleClick("1")} className="calc-btn">1</button>
              <button onClick={() => handleClick("2")} className="calc-btn">2</button>
              <button onClick={() => handleClick("3")} className="calc-btn">3</button>
              <button onClick={() => handleClick("+")} className="calc-btn-operator">+</button>

              {/* Row 2 */}
              <button onClick={() => handleClick("4")} className="calc-btn">4</button>
              <button onClick={() => handleClick("5")} className="calc-btn">5</button>
              <button onClick={() => handleClick("6")} className="calc-btn">6</button>
              <button onClick={() => handleClick("-")} className="calc-btn-operator">-</button>

              {/* Row 3 */}
              <button onClick={() => handleClick("7")} className="calc-btn">7</button>
              <button onClick={() => handleClick("8")} className="calc-btn">8</button>
              <button onClick={() => handleClick("9")} className="calc-btn">9</button>
              <button onClick={() => handleClick("*")} className="calc-btn-operator">×</button>

              {/* Row 4 */}
              <button onClick={() => handleClick("0")} className="calc-btn">0</button>
              <button onClick={clear} className="calc-btn-action text-rose-400 hover:bg-rose-950/20">C</button>
              <button onClick={() => handleClick("/")} className="calc-btn-operator">÷</button>
              <button onClick={calculate} className="bg-purple-600 hover:bg-purple-500 text-white font-mono text-xl font-bold rounded-xl transition-all active:scale-95 shadow-md shadow-purple-600/10">=</button>
            </div>
          </div>
        )}

        {/* ================= REF MODE PANEL ================= */}
        {mode === "ref" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-indigo-400 tracking-wider font-semibold uppercase ml-1">Direct Ref Input</span>
              <CalculatorInput ref={inputRef} />
            </div>

            {/* Ref Operational Stats Panel */}
            <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4 flex justify-between items-center">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Hash size={14} /> Cached Memory:
              </span>
              <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-md border border-indigo-500/10 min-w-16 text-center">
                {refResult !== "" ? refResult : "Null"}
              </span>
            </div>

            {/* Custom Control Layout */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={calculateRef}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all active:scale-95 text-sm"
              >
                Evaluate Element
              </button>
              <button
                onClick={focusInput}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 py-3 rounded-xl transition-all active:scale-95 text-sm"
              >
                Refocus Pointer
              </button>
              <button
                onClick={clearRef}
                className="col-span-2 bg-slate-950 hover:bg-rose-950/20 border border-slate-800 hover:border-rose-900/40 text-rose-400/80 hover:text-rose-400 py-2.5 rounded-xl transition-all active:scale-95 text-sm flex items-center justify-center gap-1"
              >
                <Trash2 size={14} /> Clear DOM Node
              </button>
            </div>
          </div>
        )}

        {/* Global Navigation Action Row */}
        <div className="mt-6 pt-4 border-t border-slate-800/60">
          <button
            onClick={goBack}
            className="w-full bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-medium py-2.5 px-4 rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <ArrowLeft size={13} />
            Exit Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default Calculator;
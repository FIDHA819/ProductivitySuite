import React, { useState } from "react";
import { ArrowLeft, Activity, Scale, Ruler } from "lucide-react";

interface BMICalculatorPageProps {
  goBack: () => void;
}

interface BMIResult {
  bmi: string;
  category: string;
  color: string;
  feedback: string;
  percentage: number;
}

type UnitMode = "metric" | "imperial";

export default function BMICalculatorPage({ goBack }: BMICalculatorPageProps) {
  const [unitMode, setUnitMode] = useState<UnitMode>("metric");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);

    if (isNaN(weightVal) || isNaN(heightVal) || weightVal <= 0 || heightVal <= 0) return;

    let bmi = 0;

    if (unitMode === "metric") {
      // Metric: weight (kg) / [height (m)]^2
      const heightInMeters = heightVal / 100;
      bmi = weightVal / (heightInMeters * heightInMeters);
    } else {
      // Imperial: 703 * weight (lbs) / [height (in)]^2
      bmi = (703 * weightVal) / (heightVal * heightVal);
    }

    let category = "";
    let color = "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
    let feedback = "";
    
    // Percent calculation for a safe dynamic progress UI bar gauge (capped between 15 and 40)
    const percentage = Math.min(Math.max(((bmi - 15) / (40 - 15)) * 100, 5), 100);

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-amber-400 border-amber-500/30 bg-amber-500/5";
      feedback = "Consider consulting a healthcare provider to evaluate your nutritional needs.";
    } else if (bmi < 25) {
      category = "Normal Weight";
      color = "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
      feedback = "Excellent! You are within a healthy, optimal weight range.";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-orange-400 border-orange-500/30 bg-orange-500/5";
      feedback = "Slightly above healthy parameters. Regular exercise and nutritional awareness are advised.";
    } else {
      category = "Obese";
      color = "text-rose-400 border-rose-500/30 bg-rose-500/5";
      feedback = "Elevated healthcare risk matrix. Highly recommend connecting with a clinical runtime expert.";
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      feedback,
      percentage
    });
  };

  const toggleUnit = (mode: UnitMode) => {
    setUnitMode(mode);
    setWeight("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Absolute Background Lighting Nodes */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        
        {/* Navigation Action */}
        <button
          onClick={goBack}
          className="group inline-flex items-center gap-2 mb-8 bg-slate-900/60 hover:bg-slate-900 backdrop-blur-md text-slate-400 hover:text-white border border-slate-800/80 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:-translate-x-0.5"
        >
          <ArrowLeft size={16} className="group-hover:text-blue-400 transition-colors" />
          Back to Dashboard
        </button>

        {/* Dynamic Calculator Container */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-850 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          <header className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold tracking-wider text-blue-400 uppercase mb-3 shadow-sm">
              <Activity size={13} />
              Biometrics Analyzer
            </div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              BMI Matrix Hub
            </h1>
          </header>

          {/* Unit Toggle Engine Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 border border-slate-850 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => toggleUnit("metric")}
              className={`py-2 text-xs font-mono rounded-lg transition-all duration-200 ${
                unitMode === "metric"
                  ? "bg-slate-800 text-blue-400 shadow-sm font-bold border border-slate-700/50"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              METRIC (KG/CM)
            </button>
            <button
              type="button"
              onClick={() => toggleUnit("imperial")}
              className={`py-2 text-xs font-mono rounded-lg transition-all duration-200 ${
                unitMode === "imperial"
                  ? "bg-slate-800 text-blue-400 shadow-sm font-bold border border-slate-700/50"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              IMPERIAL (LBS/IN)
            </button>
          </div>

          {/* Core Computational Form */}
          <form onSubmit={calculateBMI} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                Target Weight ({unitMode === "metric" ? "kilograms" : "pounds"})
              </label>
              <div className="relative">
                <Scale size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="number"
                  step="any"
                  required
                  placeholder={unitMode === "metric" ? "e.g., 72" : "e.g., 160"}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-blue-500/50 focus:outline-none transition-all duration-200 text-slate-100 placeholder-slate-600 font-medium text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                Target Height ({unitMode === "metric" ? "centimeters" : "inches"})
              </label>
              <div className="relative">
                <Ruler size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="number"
                  step="any"
                  required
                  placeholder={unitMode === "metric" ? "e.g., 175" : "e.g., 68"}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-blue-500/50 focus:outline-none transition-all duration-200 text-slate-100 placeholder-slate-600 font-medium text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-950/40 hover:shadow-indigo-900/30 transform active:scale-[0.99]"
            >
              Execute Biometric Calculation
            </button>
          </form>

          {/* Result Output System */}
          {result && (
            <div className={`mt-8 border rounded-xl p-5 sm:p-6 transition-all duration-300 animate-fadeIn ${result.color}`}>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-sm font-mono tracking-widest uppercase opacity-70">
                  Computed Output
                </h3>
                <span className="text-xs font-mono bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800">
                  v2.0.26
                </span>
              </div>
              
              <div className="flex items-center gap-6 my-3">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {result.bmi}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">BMI Score Index</div>
                </div>
                <div className="h-12 w-[1px] bg-slate-800" />
                <div>
                  <div className="text-lg sm:text-xl font-black tracking-wide text-slate-100">
                    {result.category}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">Classification Status</div>
                </div>
              </div>

              {/* Advanced Feature: Graphical Processing Bar */}
              <div className="w-full h-2 bg-slate-950/80 rounded-full my-4 overflow-hidden p-[1px] border border-slate-850">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out bg-current"
                  style={{ width: `${result.percentage}%` }}
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mt-2">
                {result.feedback}
              </p>
            </div>
          )}

        </div>

        {/* Matrix Metadata Footer */}
        <footer className="mt-8 text-center text-[10px] text-slate-700 font-mono tracking-widest uppercase">
          Dynamic Core Engine // Secure Processing Complete
        </footer>
      </div>
    </div>
  );
}
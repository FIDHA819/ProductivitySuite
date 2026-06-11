import { useState, useEffect, useRef } from "react";
// Import the external library components and base styles
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function PomodoroPage({ goBack }) {
  const FOCUS = 25 * 60;
  const SHORT = 5 * 60;
  const LONG = 15 * 60;

  const [seconds, setSeconds] = useState(FOCUS);
  const [maxSeconds, setMaxSeconds] = useState(FOCUS);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("Focus");
  
  // Advanced Analytics States
  const [sessions, setSessions] = useState(0);
  const [dailyFocusMinutes, setDailyFocusMinutes] = useState(0);
  const [weeklyFocusMinutes, setWeeklyFocusMinutes] = useState(0);
  const [streak, setStreak] = useState(0);

  const audioRef = useRef(
    new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg")
  );

  // 1. Initial Load: Retrieve Analytics from Local Storage
  useEffect(() => {
    const savedSessions = localStorage.getItem("pomodoroSessions");
    const savedDailyTime = localStorage.getItem("pomodoroDailyFocus");
    const savedWeeklyTime = localStorage.getItem("pomodoroWeeklyFocus");
    const savedStreak = localStorage.getItem("pomodoroStreak");
    const lastActiveDate = localStorage.getItem("pomodoroLastActiveDate");

    if (savedSessions) setSessions(Number(savedSessions));
    if (savedDailyTime) setDailyFocusMinutes(Number(savedDailyTime));
    if (savedWeeklyTime) setWeeklyFocusMinutes(Number(savedWeeklyTime));
    
    // Manage Streak calculation based on calendar days
    const todayStr = new Date().toDateString();
    if (savedStreak) {
      if (lastActiveDate === todayStr) {
        setStreak(Number(savedStreak));
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastActiveDate === yesterday.toDateString()) {
          setStreak(Number(savedStreak));
        } else {
          setStreak(0); // Streak broken if skipped a day
        }
      }
    }
  }, []);

  // 2. Persist updated values to Local Storage whenever analytics change
  useEffect(() => {
    localStorage.setItem("pomodoroSessions", sessions);
    localStorage.setItem("pomodoroDailyFocus", dailyFocusMinutes);
    localStorage.setItem("pomodoroWeeklyFocus", weeklyFocusMinutes);
    localStorage.setItem("pomodoroStreak", streak);
    localStorage.setItem("pomodoroLastActiveDate", new Date().toDateString());
  }, [sessions, dailyFocusMinutes, weeklyFocusMinutes, streak]);

  // Sync Timer with browser Tab Title
  useEffect(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    document.title = running ? `(${formatted}) Studio` : "Pomodoro Studio";
    return () => { document.title = "React App"; };
  }, [seconds, running]);

  // Main Core Engine Core Loop
  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          // Track accumulating exact minutes focused
          if (mode === "Focus" && (prev - 1) % 60 === 0) {
            setDailyFocusMinutes((d) => d + 1);
            setWeeklyFocusMinutes((w) => w + 1);
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (seconds === 0) {
      audioRef.current.play().catch((e) => console.log("Audio waiting for user interaction:", e));
      
      if (mode === "Focus") {
        setSessions((prev) => prev + 1);
        
        // Update streak logic
        const todayStr = new Date().toDateString();
        const lastActiveDate = localStorage.getItem("pomodoroLastActiveDate");
        if (lastActiveDate !== todayStr) {
          setStreak((prev) => prev + 1);
        } else if (streak === 0) {
          setStreak(1); // First session initialization
        }
      }
      setRunning(false);
    }

    return () => clearInterval(interval);
  }, [running, seconds, mode, streak]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const switchMode = (type) => {
    setMode(type);
    let targetSeconds = FOCUS;
    if (type === "Short Break") targetSeconds = SHORT;
    if (type === "Long Break") targetSeconds = LONG;

    setSeconds(targetSeconds);
    setMaxSeconds(targetSeconds);
    setRunning(false);
  };

  // Percentage logic for react-circular-progressbar (Value between 0 and 100)
  const percentage = (seconds / maxSeconds) * 100;

  // Determine path colors for the third-party library dynamically
  const getThemeColor = () => {
    if (mode === "Short Break") return "#2dd4bf"; // teal-400
    if (mode === "Long Break") return "#818cf8";  // indigo-400
    return "#f43f5e";                             // rose-500
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      
      {/* Visual background ambient glow points */}
      <div className="absolute -top-10 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* LEFT COLUMN: THE CORE TIMER COMPONENT */}
        <div className="md:col-span-7 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col items-center relative">
          <button
            onClick={goBack}
            className="absolute top-6 left-6 text-sm font-medium text-slate-400 hover:text-slate-200 transition"
          >
            ← Back
          </button>

          <h1 className="text-xl font-bold text-slate-400 mt-1 mb-6">Pomodoro Engine</h1>

          {/* Mode Selector Tabs */}
          <div className="flex bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 w-full mb-8">
            {["Focus", "Short Break", "Long Break"].map((type) => (
              <button
                key={type}
                onClick={() => switchMode(type)}
                className={`flex-1 text-xs md:text-sm py-2 px-1 rounded-lg font-medium transition-all ${
                  mode === type
                    ? "bg-slate-800 text-white border border-slate-700/50 shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Library Component Container Wrapper */}
          <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
            <CircularProgressbar
              value={percentage}
              strokeWidth={7}
              styles={buildStyles({
                // Color configuration
                pathColor: getThemeColor(),
                trailColor: "#1e293b", // Slate-800 track background
                strokeLinecap: "round",
                // Smooth rotational tracking transition
                pathTransitionDuration: 0.3,
              })}
            />

            {/* Centered Inner Text Overlay */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black tracking-tight tabular-nums text-white">
                {formatTime()}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">
                {running ? "Deep Focus" : "Paused"}
              </span>
            </div>
          </div>

          {/* Primary Functional Callout Actions */}
          <div className="flex gap-4 w-full">
            <button
              onClick={() => setRunning(!running)}
              className={`flex-1 font-semibold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-[0.98] ${
                running
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/10"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10"
              }`}
            >
              {running ? "Pause" : "Start Focus"}
            </button>
            <button
              onClick={switchMode.bind(null, mode)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3.5 px-5 rounded-2xl border border-slate-700/40 active:scale-[0.98] transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS PERFORMANCE METRICS */}
        <div className="md:col-span-5 flex flex-col gap-4">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Workspace Analytics</h2>
              <p className="text-xs text-slate-400">Real-time production metrics stored locally.</p>
            </div>
          </div>

          {/* Interactive Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            
            <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Completed</span>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-white tracking-tight">{sessions}</span>
                <span className="text-xs text-slate-500 block mt-1">sessions</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Current Streak</span>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-orange-400 tracking-tight">⚡ {streak}</span>
                <span className="text-xs text-slate-500 block mt-1">consecutive days</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Today's Focus</span>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-indigo-400 tracking-tight">{dailyFocusMinutes}</span>
                <span className="text-xs text-slate-500 block mt-1">active minutes</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Weekly Volume</span>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-teal-400 tracking-tight">
                  {(weeklyFocusMinutes / 60).toFixed(1)}
                </span>
                <span className="text-xs text-slate-500 block mt-1">hours total</span>
              </div>
            </div>

          </div>

          {/* Action to clear stats manually */}
          <button
            onClick={() => {
              if(confirm("Are you sure you want to completely clear your historical analytics?")) {
                localStorage.clear();
                setSessions(0);
                setDailyFocusMinutes(0);
                setWeeklyFocusMinutes(0);
                setStreak(0);
              }
            }}
            className="text-center text-xs text-slate-600 hover:text-rose-400 transition-colors py-2 cursor-pointer"
          >
            Clear Historical Analytics Data
          </button>

        </div>

      </div>
    </div>
  );
}

export default PomodoroPage;
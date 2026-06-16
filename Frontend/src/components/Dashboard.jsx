import { CheckSquare, Calculator, Wallet, Target, LayoutGrid, Link2, BookDown, QrCode, Clock, Contact2 ,Calendar,BookOpen,Weight} from "lucide-react";

function Dashboard({ 
  openTodo, 
  openCalculator, 
  openExpense, 
  openHabit, 
  openUrl, 
  openInvoice, 
  openQRCodeGenerator, 
  openPromodoroTimer,
  openContact,
  openAgeCalculator, 
  openStudentResult, 
  openBMICalculator 
}) {
  const apps = [
    {
      name: "Todo App",
      desc: "Manage tasks & daily goals",
      icon: <CheckSquare size={28} className="text-indigo-400" />,
      action: openTodo,
      accent: "hover:border-indigo-500/50 hover:shadow-indigo-950/20",
      bgGlow: "from-indigo-600/20 to-transparent",
    },
    {
      name: "Calculator",
      desc: "State & Ref execution matrices",
      icon: <Calculator size={28} className="text-purple-400" />,
      action: openCalculator,
      accent: "hover:border-purple-500/50 hover:shadow-purple-950/20",
      bgGlow: "from-purple-600/20 to-transparent",
    },
    {
      name: "Expense Tracker",
      desc: "Audit financial streams",
      icon: <Wallet size={28} className="text-emerald-400" />,
      action: openExpense,
      accent: "hover:border-emerald-400/50 hover:shadow-emerald-950/20",
      bgGlow: "from-emerald-600/20 to-transparent",
    },
    {
      name: "Habit Tracker",
      desc: "Build permanent automation loops",
      icon: <Target size={28} className="text-amber-400" />,
      action: openHabit,
      accent: "hover:border-amber-500/50 hover:shadow-amber-950/20",
      bgGlow: "from-amber-600/20 to-transparent",
    },
    {
      name: "URL Shortener",
      desc: "Condense and redirect routing paths",
      icon: <Link2 size={28} className="text-cyan-400" />,
      action: openUrl,
      accent: "hover:border-cyan-500/50 hover:shadow-cyan-950/20",
      bgGlow: "from-cyan-600/20 to-transparent",
    },
    {
      name: "Invoice Generator",
      desc: "Create and manage professional invoices",
      icon: <BookDown size={28} className="text-cyan-400" />,
      action: openInvoice,
      accent: "hover:border-cyan-500/50 hover:shadow-cyan-950/20",
      bgGlow: "from-cyan-600/20 to-transparent",
    },
    {
      name: "QR Code Generator",
      desc: "Create and manage QR codes for URLs and data",
      icon: <QrCode size={28} className="text-cyan-400" />,
      action: openQRCodeGenerator,
      accent: "hover:border-cyan-500/50 hover:shadow-cyan-950/20",
      bgGlow: "from-cyan-600/20 to-transparent",
    },
    {
      name: "Promodoro Timer",
      desc: "Manage time intervals for focused work sessions",
      icon: <Calendar size={28} className="text-rose-400" />,
      action: openPromodoroTimer,
      accent: "hover:border-rose-500/50 hover:shadow-rose-950/20",
      bgGlow: "from-rose-600/20 to-transparent",
    },
    {
      name: "Contact Manager", 
      desc: "Audit and organize network personnel profiles",
      icon: <Contact2 size={28} className="text-blue-400" />,
      action: openContact,
      accent: "hover:border-blue-500/50 hover:shadow-blue-950/20",
      bgGlow: "from-blue-600/20 to-transparent",
    },
     {
      name: "Age Calculator", 
      desc: "Calculate age based on birth date",
      icon: <Calendar size={28} className="text-green-400" />,
      action: openAgeCalculator,
      accent: "hover:border-green-500/50 hover:shadow-green-950/20",
      bgGlow: "from-green-600/20 to-transparent",
    },
    {
      name: "Student Result",
      desc: "Manage and view student academic performance",
      icon: <BookOpen size={28} className="text-amber-400" />,
      action: openStudentResult,
      accent: "hover:border-amber-500/50 hover:shadow-amber-950/20",
      bgGlow: "from-amber-600/20 to-transparent",
    },
    {
      name: "BMI Calculator", 
      desc: "Calculate Body Mass Index based on height and weight",
      icon: <Weight size={28} className="text-blue-400" />,
      action: openBMICalculator,
      accent: "hover:border-blue-500/50 hover:shadow-blue-950/20",
      bgGlow: "from-blue-600/20 to-transparent",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Absolute Background Lighting Nodes */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 text-center">
        {/* Main Header System */}
        <header className="mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold tracking-wider text-purple-400 uppercase mb-4 shadow-sm">
            <LayoutGrid size={13} />
            Control Hub Terminal
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            All-In-One Matrix
          </h1>
          <p className="text-slate-400 sm:text-lg mt-3 font-light max-w-md mx-auto">
            Select an active runtime engine module to initialize operation workspace.
          </p>
        </header>

        {/* Dynamic App Launcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {apps.map((app, idx) => (
            <button
              key={idx}
              onClick={app.action}
              className={`group relative text-left bg-slate-900/40 backdrop-blur-md border border-slate-850 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:bg-slate-900/60 shadow-xl ${app.accent}`}
            >
              {/* Internal subtle linear gradient glow on card hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br ${app.bgGlow} pointer-events-none`} />

              <div className="flex items-start gap-4 relative z-10">
                {/* Icon Container Wrapper */}
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {app.icon}
                </div>

                {/* Card Context Information */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-200 tracking-tight group-hover:text-white transition-colors flex items-center justify-between">
                    {app.name}
                    <span className="text-xs font-mono font-medium text-slate-600 group-hover:text-slate-400 transition-colors">
                      // 0{idx + 1}
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 font-light tracking-wide line-clamp-1">
                    {app.desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* System Diagnostics Footer */}
        <footer className="mt-16 text-xs text-slate-600 font-mono tracking-widest uppercase">
          Ecosystem Build v2.0.26 // Production Ready
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
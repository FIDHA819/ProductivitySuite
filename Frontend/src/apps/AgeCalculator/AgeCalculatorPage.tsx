import { useState, useEffect } from "react";

interface AgeData {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  daysToNextBirthday: number;
  isLeapYear: boolean;
  zodiac: string;
  birthYear: number;
}

interface AgeCalculatorPageProps {
  goBack: () => void;
}

function AgeCalculatorPage({ goBack }: AgeCalculatorPageProps) {
  // Separate states for granular, clean typing manipulation
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [ageData, setAgeData] = useState<AgeData | null>(null);

  // Auto-focus logic to jump across fields as the user types
  useEffect(() => {
    if (day.length === 2) {
      document.getElementById("month-input")?.focus();
    }
  }, [day]);

  useEffect(() => {
    if (month.length === 2) {
      document.getElementById("year-input")?.focus();
    }
  }, [month]);

  const getZodiacSign = (dayNum: number, monthNum: number): string => {
    const signs = [
      { name: "Capricorn", maxDate: "01-19" },
      { name: "Aquarius", maxDate: "02-18" },
      { name: "Pisces", maxDate: "03-20" },
      { name: "Aries", maxDate: "04-19" },
      { name: "Taurus", maxDate: "05-20" },
      { name: "Gemini", maxDate: "06-20" },
      { name: "Cancer", maxDate: "07-22" },
      { name: "Leo", maxDate: "08-22" },
      { name: "Virgo", maxDate: "09-22" },
      { name: "Libra", maxDate: "10-22" },
      { name: "Scorpio", maxDate: "11-21" },
      { name: "Sagittarius", maxDate: "12-21" },
    ];

    const formattedDate = `${String(monthNum).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    for (const sign of signs) {
      if (formattedDate <= sign.maxDate) return sign.name;
    }
    return "Capricorn";
  };

  const handleInputChange = (
    value: string,
    setter: (val: string) => void,
    maxLength: number
  ) => {
    // Only allow numbers
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= maxLength) {
      setter(cleanValue);
    }
  };

  const calculateAge = (): void => {
    setError("");
    
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!day || !month || !year || isNaN(d) || isNaN(m) || isNaN(y)) {
      setError("Please fill out all fields with valid numbers.");
      return;
    }

    if (m < 1 || m > 12) {
      setError("Month must be between 01 and 12.");
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();

    // Check if date is structurally valid (e.g., catching Feb 31st)
    if (birthDate.getFullYear() !== y || birthDate.getMonth() !== m - 1 || birthDate.getDate() !== d) {
      setError("Please enter a valid day for the selected month.");
      return;
    }

    if (birthDate > today) {
      setError("Birth date cannot be in the future!");
      return;
    }

    // Basic Age Calculation
    let calculatedYears = today.getFullYear() - birthDate.getFullYear();
    let calculatedMonths = today.getMonth() - birthDate.getMonth();
    let calculatedDays = today.getDate() - birthDate.getDate();

    if (calculatedDays < 0) {
      calculatedMonths--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      calculatedDays += previousMonth.getDate();
    }

    if (calculatedMonths < 0) {
      calculatedYears--;
      calculatedMonths += 12;
    }

    // Lifetime Stats
    const totalTimeDiff = today.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalTimeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalTimeDiff / (1000 * 60 * 60));

    // Next Birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const msToNextBirthday = nextBirthday.getTime() - today.getTime();
    const daysToNextBirthday = Math.ceil(msToNextBirthday / (1000 * 60 * 60 * 24));

    // Leap Year Check
    const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

    // Zodiac
    const zodiac = getZodiacSign(d, m);

    setAgeData({
      years: calculatedYears,
      months: calculatedMonths,
      days: calculatedDays,
      totalDays,
      totalHours,
      daysToNextBirthday,
      isLeapYear,
      zodiac,
      birthYear: y,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 selection:bg-blue-500/30">
      <button
        onClick={goBack}
        className="mb-6 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all rounded-xl text-sm font-medium flex items-center gap-2 text-slate-300"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          Age Calculator
        </h1>
        <p className="text-slate-400 mb-8 text-sm">
          Type or use numbers to discover deep insights about your lifetime.
        </p>

        {/* Improved Split-Input Field Component Container */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl mb-6">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Date of Birth
          </label>
          
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="grid grid-cols-3 gap-2 flex-1">
              {/* Day Input */}
              <div className="relative">
                <input
                  id="day-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => handleInputChange(e.target.value, setDay, 2)}
                  className="w-full p-3 text-center rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-700 text-lg font-mono"
                />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-slate-600 pointer-events-none">Day</span>
              </div>

              {/* Month Input */}
              <div className="relative">
                <input
                  id="month-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => handleInputChange(e.target.value, setMonth, 2)}
                  className="w-full p-3 text-center rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-700 text-lg font-mono"
                />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-slate-600 pointer-events-none">Month</span>
              </div>

              {/* Year Input */}
              <div className="relative">
                <input
                  id="year-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => handleInputChange(e.target.value, setYear, 4)}
                  className="w-full p-3 text-center rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-700 text-lg font-mono"
                />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-slate-600 pointer-events-none">Year</span>
              </div>
            </div>

            <button
              onClick={calculateAge}
              className="bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 text-md flex items-center justify-center"
            >
              Calculate
            </button>
          </div>

          {/* Validation Error Alert */}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fadeIn">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Results Panel */}
        {ageData && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-4 text-slate-300">Exact Age</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                  <span className="block text-3xl sm:text-4xl font-extrabold text-blue-400">{ageData.years}</span>
                  <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Years</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                  <span className="block text-3xl sm:text-4xl font-extrabold text-blue-400">{ageData.months}</span>
                  <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Months</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                  <span className="block text-3xl sm:text-4xl font-extrabold text-blue-400">{ageData.days}</span>
                  <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Days</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-sm font-medium text-slate-400">Next Birthday Countdown</span>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-indigo-400">
                    {ageData.daysToNextBirthday === 365 || ageData.daysToNextBirthday === 0 
                      ? "🎉 Today is the day!" 
                      : `${ageData.daysToNextBirthday} Days`}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Left until your next celebration.</p>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-sm font-medium text-slate-400">Zodiac Sign</span>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-purple-400">{ageData.zodiac}</span>
                  <p className="text-xs text-slate-500 mt-1">Based on your astrological birth window.</p>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 sm:col-span-2">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Lifetime Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Total Days</span>
                    <p className="text-xl font-bold text-emerald-400">{ageData.totalDays.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Total Hours</span>
                    <p className="text-xl font-bold text-emerald-400">{ageData.totalHours.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 sm:col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-400">Leap Year Check</span>
                  <p className="text-xs text-slate-500 mt-0.5">Was {ageData.birthYear} a leap year?</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                  ageData.isLeapYear 
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}>
                  {ageData.isLeapYear ? "Yes, Leap Year" : "No, Standard Year"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculatorPage;
import React, { useState } from "react";

// Define strict structure for an individual subject row
interface Subject {
  id: string;
  name: string;
  obtainedMark: string; // stored as string for fluid typing manipulation
  maxMark: string;      // custom maximum weight per subject
}

interface SubjectDetailsResult {
  name: string;
  mark: number;
  max: number;
  percentage: number;
  passed: boolean;
}

interface ResultSummary {
  totalObtained: number;
  totalMax: number;
  overallPercentage: number;
  grade: string;
  status: "PASS" | "FAIL";
  subjectDetails: SubjectDetailsResult[];
}

interface StudentResultPageProps {
  goBack: () => void;
}

function StudentResultPage({ goBack }: StudentResultPageProps) {
  const [name, setName] = useState<string>("");
  const [rollNo, setRollNo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<ResultSummary | null>(null);

  // Dynamic subjects array initialized with your default standard parameters
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "English", obtainedMark: "", maxMark: "100" },
    { id: "2", name: "Maths", obtainedMark: "", maxMark: "100" },
    { id: "3", name: "Science", obtainedMark: "", maxMark: "100" },
    { id: "4", name: "Social", obtainedMark: "", maxMark: "100" },
    { id: "5", name: "Computer", obtainedMark: "", maxMark: "100" },
  ]);

  // Handler to add a new blank custom subject row
  const addSubjectRow = () => {
    const newId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
    setSubjects([
      ...subjects,
      { id: newId, name: "", obtainedMark: "", maxMark: "100" },
    ]);
  };

  // Handler to remove a specific subject row
  const removeSubjectRow = (id: string) => {
    if (subjects.length <= 1) {
      setError("A report card requires at least one active subject course.");
      return;
    }
    setSubjects(subjects.filter((sub) => sub.id !== id));
  };

  // Generic updater to tweak name, obtained marks, or max marks inside array rows safely
  const updateSubjectField = (id: string, field: keyof Subject, value: string) => {
    setError("");
    setSubjects(
      subjects.map((sub) => {
        if (sub.id !== id) return sub;

        if (field === "obtainedMark" || field === "maxMark") {
          // Block alphanumeric text entry for score metrics
          const cleanVal = value.replace(/\D/g, "");
          return { ...sub, [field]: cleanVal };
        }

        return { ...sub, [field]: value };
      })
    );
  };

  const calculateResult = (): void => {
    setError("");

    // 1. Identity Validation
    if (!name.trim() || !rollNo.trim()) {
      setError("Please input valid Student Credentials.");
      return;
    }

    // 2. Dynamic Subject Entry Rows Validation
    for (const sub of subjects) {
      if (!sub.name.trim()) {
        setError("All subject rows must contain a Course Title.");
        return;
      }
      if (sub.obtainedMark === "" || sub.maxMark === "") {
        setError(`Please enter numerical marks configuration for "${sub.name}".`);
        return;
      }

      const obtained = Number(sub.obtainedMark);
      const max = Number(sub.maxMark);

      if (max <= 0) {
        setError(`Maximum marks for "${sub.name}" must be greater than 0.`);
        return;
      }
      if (obtained > max) {
        setError(`Obtained marks for "${sub.name}" cannot exceed its maximum limit (${max}).`);
        return;
      }
    }

    // 3. Process Evaluation Scores Across Asymmetric Weights
    const subjectDetails: SubjectDetailsResult[] = subjects.map((sub) => {
      const obtained = Number(sub.obtainedMark);
      const max = Number(sub.maxMark);
      const percentage = (obtained / max) * 100;
      
      // Pass metric set to 35% performance standard of its specific dynamic weight
      const passed = percentage >= 35; 

      return {
        name: sub.name.trim(),
        mark: obtained,
        max,
        percentage,
        passed,
      };
    });

    const totalObtained = subjectDetails.reduce((sum, item) => sum + item.mark, 0);
    const totalMax = subjectDetails.reduce((sum, item) => sum + item.max, 0);
    const overallPercentage = (totalObtained / totalMax) * 100;

    // Grade Matrix Mapping
    let grade = "F";
    if (overallPercentage >= 90) grade = "A+";
    else if (overallPercentage >= 80) grade = "A";
    else if (overallPercentage >= 70) grade = "B";
    else if (overallPercentage >= 60) grade = "C";
    else if (overallPercentage >= 50) grade = "D";

    const overallPassed = subjectDetails.every((sub) => sub.passed);

    setResult({
      totalObtained,
      totalMax,
      overallPercentage,
      grade,
      status: overallPassed ? "PASS" : "FAIL",
      subjectDetails,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 selection:bg-emerald-500/30">
      {/* Top Controls Layout */}
      <button
        onClick={goBack}
        className="mb-6 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all rounded-xl text-sm font-medium flex items-center gap-2 text-slate-300"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            Advanced Grade Sheet Builder
          </h1>
          <p className="text-slate-400 text-sm">
            Dynamically add or edit courses with variable weights to output adaptive percentage records.
          </p>
        </div>

        {/* Multi-Section Workspace Configuration Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
          
          {/* Inputs Section Control Center (Takes 3 Columns) */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Identity Segment Panel */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Student Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-teal-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Roll Number</label>
                <input
                  type="text"
                  placeholder="STU-101X"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-teal-500 transition-all text-sm font-mono"
                />
              </div>
            </div>

            {/* Dynamic Subject Builder Matrix Panel */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                  Courses & Variable Grading Scheme
                </h2>
                <button
                  onClick={addSubjectRow}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all rounded-lg text-xs font-bold text-teal-400 flex items-center gap-1.5"
                >
                  ➕ Add Subject
                </button>
              </div>

              {/* Dynamic Course Editor Row Headers */}
              <div className="hidden sm:grid grid-cols-12 gap-3 px-2 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                <div className="col-span-5">Subject Title</div>
                <div className="col-span-3 text-center">Marks Obtained</div>
                <div className="col-span-3 text-center">Max Potential</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {/* Subject Configuration Rows */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                {subjects.map((sub) => (
                  <div key={sub.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-950/40 p-2 sm:p-0 rounded-xl border border-slate-800/40 sm:border-none">
                    
                    {/* Course Title Edit Input */}
                    <div className="col-span-1 sm:col-span-5">
                      <span className="sm:hidden block text-[10px] text-slate-500 font-bold uppercase mb-1">Subject Name</span>
                      <input
                        type="text"
                        placeholder="Subject Name"
                        value={sub.name}
                        onChange={(e) => updateSubjectField(sub.id, "name", e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-teal-500 transition-all text-sm font-medium"
                      />
                    </div>

                    {/* Marks Obtained Value Entry */}
                    <div className="col-span-1 sm:col-span-3">
                      <span className="sm:hidden block text-[10px] text-slate-500 font-bold uppercase mb-1">Marks Obtained</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Score"
                        value={sub.obtainedMark}
                        onChange={(e) => updateSubjectField(sub.id, "obtainedMark", e.target.value)}
                        className="w-full p-2.5 text-center rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-teal-500 transition-all text-sm font-mono text-emerald-400"
                      />
                    </div>

                    {/* Out of How Much Mark (Max Possible Weight) Input */}
                    <div className="col-span-1 sm:col-span-3">
                      <span className="sm:hidden block text-[10px] text-slate-500 font-bold uppercase mb-1">Out Of (Max Marks)</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Out of"
                        value={sub.maxMark}
                        onChange={(e) => updateSubjectField(sub.id, "maxMark", e.target.value)}
                        className="w-full p-2.5 text-center rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-teal-500 transition-all text-sm font-mono text-slate-400"
                      />
                    </div>

                    {/* Trash Execution Node Trigger */}
                    <div className="col-span-1 sm:col-span-1 text-right flex justify-end">
                      <button
                        onClick={() => removeSubjectRow(sub.id)}
                        className="p-2.5 text-rose-500 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20 transition-all text-sm flex items-center justify-center"
                        title="Delete Course Row"
                      >
                        🗑️
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Form Actions Footnotes */}
              <button
                onClick={calculateResult}
                className="w-full mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 transition-all py-3.5 rounded-xl font-bold shadow-lg shadow-teal-950/40 text-sm tracking-wide"
              >
                Compile Variable Report Card
              </button>

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}
            </div>
          </div>

          {/* Metrics Results Side Panel Presentation (Takes 2 Columns) */}
          <div className="xl:col-span-2">
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Hero Summary Card */}
                <div className={`p-6 rounded-2xl border bg-gradient-to-br ${
                  result.status === "PASS"
                    ? "from-teal-950/40 to-slate-950 border-teal-500/30"
                    : "from-rose-950/40 to-slate-950 border-rose-500/30"
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
                        Compiled Result Card
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-tight truncate max-w-[180px] sm:max-w-none">{name}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Roll: {rollNo}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border ${
                      result.status === "PASS"
                        ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}>
                      {result.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-slate-800/60 text-center">
                    <div>
                      <span className="block text-2xl font-extrabold text-white font-mono">
                        {result.totalObtained}
                        <span className="text-[11px] text-slate-500 font-normal">/{result.totalMax}</span>
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Total Score</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-extrabold text-cyan-400 font-mono">{result.overallPercentage.toFixed(2)}%</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Percentage</span>
                    </div>
                    <div>
                      <span className={`block text-2xl font-black font-mono ${result.grade === "F" ? "text-rose-400" : "text-amber-400"}`}>{result.grade}</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Grade Assigned</span>
                    </div>
                  </div>
                </div>

                {/* Individual Breakdown Matrix Display */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                  <div className="p-4 bg-slate-800/40 border-b border-slate-800 grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="col-span-5">Course Title</span>
                    <span className="col-span-4 text-center">Ratio Scale</span>
                    <span className="col-span-3 text-right">Percent</span>
                  </div>
                  <div className="divide-y divide-slate-800/60 font-mono">
                    {result.subjectDetails.map((sub, idx) => (
                      <div key={idx} className="p-4 grid grid-cols-12 items-center text-sm">
                        <span className="col-span-5 font-sans font-medium text-slate-300 truncate pr-2">{sub.name}</span>
                        <span className="col-span-4 text-center font-bold text-slate-400 text-xs">
                          {sub.mark}<span className="text-slate-600 font-normal">/{sub.max}</span>
                        </span>
                        <div className="col-span-3 text-right flex flex-col items-end">
                          <span className={`font-bold ${sub.passed ? "text-emerald-400" : "text-rose-400"}`}>
                            {sub.percentage.toFixed(1)}%
                          </span>
                          <span className="text-[8px] uppercase tracking-wider font-bold text-slate-500 mt-0.5">
                            {sub.passed ? "Pass" : "Fail (Sub 35%)"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[300px] border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <p className="text-sm font-medium">Report Sheet Not Yet Generated</p>
                <p className="text-xs text-slate-600 max-w-xs mt-1">
                  Configure custom courses, individual weight ceilings, and marks to evaluate calculations.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentResultPage;
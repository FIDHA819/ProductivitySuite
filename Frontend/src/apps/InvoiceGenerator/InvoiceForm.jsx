import React, { useState, useEffect } from "react";
import { Calculator, Save, DollarSign, Percent } from "lucide-react";
import {
  createInvoice,
} from "../../services/InvoiceService";
function InvoiceForm({ onInvoiceCreated }) {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [tax, setTax] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [companyLogo, setCompanyLogo] = useState("");
  const [status, setStatus] = useState("Pending");

  // Automatically generate an invoice runtime ID string on mount
  useEffect(() => {
    const timestamp = Date.now().toString().slice(-6);
    setInvoiceNumber(`INV-${new Date().getFullYear()}-${timestamp}`);
  }, []);

  // Structural Math Computations
  const subtotal = hoursWorked * hourlyRate;
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoicePayload = {
      invoiceNumber,
      clientName,
      clientEmail,
      projectDesc,
      hoursWorked,
      hourlyRate,
      tax,
      currency,
      companyLogo,
      status,
      subtotal,
      taxAmount,
      total,
      date: new Date().toISOString(),
    };

    try {
  const response = await createInvoice(
  invoicePayload
);

onInvoiceCreated(response.data);
    } catch (err) {
      console.error("Transmission breakdown saving invoice record:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      {/* Input Matrices Block */}
      <div className="md:col-span-2 space-y-5 bg-slate-900/50 backdrop-blur-md border border-slate-850 p-6 rounded-2xl">
        <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2 mb-4">Parameters Assignment</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Invoice ID</label>
            <input type="text" readOnly value={invoiceNumber} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-emerald-400 font-mono focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Currency Core</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Client Identity</label>
            <input type="text" required placeholder="Acme Corp" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Client Comms Array (Email)</label>
            <input type="email" required placeholder="billing@acme.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Project Operational Scope</label>
          <textarea rows={3} required placeholder="Database architecture scaling and UI optimization deployments..." value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Hours Expended</label>
            <input type="number" min="0" step="0.5" value={hoursWorked} onChange={(e) => setHoursWorked(parseFloat(e.target.value) || 0)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Hourly Rate</label>
            <input type="number" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Tax Protocol (%)</label>
            <input type="number" min="0" max="100" value={tax} onChange={(e) => setTax(parseFloat(e.target.value) || 0)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Corporate Logo URL (Advanced)</label>
          <input type="url" placeholder="https://domain.com/assets/logo.png" value={companyLogo} onChange={(e) => setCompanyLogo(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50" />
        </div>
      </div>

      {/* Dynamic Computations Summary Dashboard Panel */}
      <div className="space-y-6 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 p-6 rounded-2xl h-fit">
        <div>
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2 mb-4">Calculation Engine</h2>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal Run:</span>
              <span className="text-slate-200">{currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax Offset:</span>
              <span className="text-amber-500/90">(+{tax}%) {currency} {taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold">
              <span className="text-slate-300">Net Total Yield:</span>
              <span className="text-emerald-400">{currency} {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Initial Status State</label>
            <div className="flex gap-2">
              {["Pending", "Paid"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`flex-1 py-2 text-xs font-mono rounded-xl border transition-all ${
                    status === st
                      ? st === "Paid"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-amber-500/20 border-amber-500 text-amber-400"
                      : "bg-slate-950 border-slate-850 text-slate-500"
                  }`}
                >
                  {st.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold py-3 px-4 rounded-xl transition-transform active:scale-95 shadow-lg shadow-emerald-500/10">
          <Save size={18} /> Commit Ledger Data
        </button>
      </div>
    </form>
  );
}

export default InvoiceForm;
import React, { useState, useEffect } from "react";
import { FilePlus, History, Search } from "lucide-react";
import {
  getInvoices,
  deleteInvoice,
  updateInvoiceStatus,
} from "../../services/invoiceService";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";

function InvoicePage({goBack}) {
  const [view, setView] = useState("create"); // "create" | "history"
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch invoices from MongoDB via your API
  const fetchInvoices = async () => {
    try {
   const res = await getInvoices();
setInvoices(res.data);
      
   
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleInvoiceCreated = (newInvoice) => {
    setInvoices([newInvoice, ...invoices]);
    setView("history");
  };

  const handleDeleteInvoice = async (id) => {
    try {
     await deleteInvoice(id);
      setInvoices(invoices.filter((inv) => inv._id !== id));
    } catch (err) {
      console.error("Failed to delete invoice:", err);
    }
  };

 const handleStatusChange = async (
  id,
  currentStatus
) => {
  const nextStatus =
    currentStatus === "Pending"
      ? "Paid"
      : "Pending";

  try {
    const res =
      await updateInvoiceStatus(
        id,
        nextStatus
      );

    setInvoices(
      invoices.map((inv) =>
        inv._id === id
          ? res.data
          : inv
      )
    );
  } catch (err) {
    console.error(
      "Failed to update status:",
      err
    );
  }
};

  // Advanced Feature: Real-time Client/Invoice Number filtering
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Invoice Core Engine
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Generate billing protocols and audit outgoing fiscal metrics.
            </p>
              <button
            onClick={goBack}
            className="absolute top-6 left-6 text-sm font-medium text-slate-400 hover:text-slate-200 transition"
          >
            ← Back
          </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setView("create")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "create" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FilePlus size={16} /> Create
            </button>
            <button
              onClick={() => setView("history")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "history" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <History size={16} /> Ledger
            </button>
          </div>
        </div>

        {/* Dynamic Workspace Resolution */}
        {view === "create" ? (
          <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
        ) : (
          <div>
            {/* Search Subbar */}
            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search ledger by client or invoice ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <InvoiceList
              invoices={filteredInvoices}
              onDelete={handleDeleteInvoice}
              onToggleStatus={handleStatusChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoicePage;
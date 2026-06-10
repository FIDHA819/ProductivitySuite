import React from "react";
import jsPDF from "jspdf";
import { Trash2, Download, Mail, RefreshCw, ExternalLink } from "lucide-react";

function InvoiceList({ invoices, onDelete, onToggleStatus }) {
  
  // Advanced Feature: Email trigger API dispatch pipeline
  const handleEmailInvoice = async (invoice) => {
    try {
      const response = await fetch(`/api/invoices/${invoice._id}/email`, { method: "POST" });
      if (response.ok) {
        alert(`Invoice array dispatched cleanly to ${invoice.clientEmail}`);
      }
    } catch (err) {
      console.error("Comms link error during mail execution:", err);
    }
  };

  // Advanced Feature: Native Browser Print engine payload constructor 
 const handleDownloadPDF = (invoice) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("INVOICE", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Invoice Number: ${invoice.invoiceNumber}`,
    20,
    40
  );

  doc.text(
    `Client Name: ${invoice.clientName}`,
    20,
    50
  );

  doc.text(
    `Client Email: ${invoice.clientEmail}`,
    20,
    60
  );

  doc.text(
    `Project: ${invoice.projectDesc}`,
    20,
    70
  );

  doc.text(
    `Hours Worked: ${invoice.hoursWorked}`,
    20,
    80
  );

  doc.text(
    `Hourly Rate: ${invoice.currency} ${invoice.hourlyRate}`,
    20,
    90
  );

  doc.text(
    `Subtotal: ${invoice.currency} ${invoice.subtotal}`,
    20,
    100
  );

  doc.text(
    `Tax (${invoice.tax}%): ${invoice.currency} ${invoice.taxAmount}`,
    20,
    110
  );

  doc.text(
    `Total: ${invoice.currency} ${invoice.total}`,
    20,
    120
  );

  doc.text(
    `Status: ${invoice.status}`,
    20,
    130
  );

  doc.save(
    `${invoice.invoiceNumber}.pdf`
  );
};

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
        <p className="text-slate-500 font-mono text-sm">No billing arrays initialized in local memory storage logs.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden backdrop-blur-md animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-xs uppercase text-slate-400">
              <th className="p-4">Reference Reference ID</th>
              <th className="p-4">Client Contact</th>
              <th className="p-4">Operational Summary</th>
              <th className="p-4">Financial Output</th>
              <th className="p-4">Status State</th>
              <th className="p-4 text-center">Execute Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {invoices.map((inv) => (
              <tr key={inv._id} className="hover:bg-slate-900/50 transition-colors group">
                <td className="p-4 font-mono font-medium text-emerald-400 whitespace-nowrap">
                  {inv.invoiceNumber}
                </td>
                <td className="p-4">
                  <div className="font-bold text-slate-200">{inv.clientName}</div>
                  <div className="text-xs text-slate-500 font-mono">{inv.clientEmail}</div>
                </td>
                <td className="p-4 max-w-xs truncate font-light text-slate-400">
                  {inv.projectDesc}
                </td>
                <td className="p-4 font-mono whitespace-nowrap font-semibold text-slate-200">
                  {inv.currency} {inv.total.toFixed(2)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <button
                    onClick={() => onToggleStatus(inv._id, inv.status)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-all ${
                      inv.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                    }`}
                    title="Click to toggle operational billing loop status"
                  >
                    <RefreshCw size={10} className="animate-spin-slow" />
                    {inv.status}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDownloadPDF(inv)}
                      className="p-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 rounded-lg transition-colors"
                      title="Generate and Download Document Print Asset Data"
                    >
                      <Download size={15} />
                    </button>
                    <button
                      onClick={() => handleEmailInvoice(inv)}
                      className="p-2 bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-purple-400 rounded-lg transition-colors"
                      title="Dispatch Invoice Direct Transmission Route File"
                    >
                      <Mail size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(inv._id)}
                      className="p-2 bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-rose-400 rounded-lg transition-colors"
                      title="Purge Invoice Matrix Index Block"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceList;
import React from "react";
import { Plus } from "lucide-react";

// 1. Define the interface for the component props
interface ContactFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// 2. Type-annotate the props using ContactFormProps
function ContactForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  onSubmit,
}: ContactFormProps) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-850 p-6 rounded-2xl shadow-xl">
      <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Plus size={18} className="text-blue-400" /> Initialize Entry
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@matrix.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Phone Comms
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-950/20 hover:shadow-blue-600/20"
        >
          <Plus size={16} /> Add Contact Node
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
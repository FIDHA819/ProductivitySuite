import { useState, useEffect } from "react";
import { ArrowLeft, Contact2, Search } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import {
  getContacts,
  createContact,
  deleteContact,
} from "../../services/ContactServices";

interface Contact {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface ContactPageProps {
  goBack: () => void;
}

function ContactPage({ goBack }: ContactPageProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await getContacts();
      setContacts(res.data || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createContact({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
    loadContacts();
  };

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    loadContacts();
  };

  // Run dynamic search filtering calculations on the active data layer
  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      (contact.email && contact.email.toLowerCase().includes(term)) ||
      (contact.phone && contact.phone.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 relative overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation Action */}
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 mb-8 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>

        {/* Section Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold tracking-wider text-blue-400 uppercase mb-3">
              <Contact2 size={13} />
              Data Directory Engine
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Contact Manager
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
              Create, audit, and manipulate active routing pipelines for personnel networks.
          </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search registry entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 backdrop-blur-sm border border-slate-850 rounded-xl pl-11 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
        </header>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <ContactForm 
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            phone={phone} setPhone={setPhone}
            onSubmit={handleSubmit}
          />
          
          <ContactList 
            contacts={filteredContacts} 
            loading={loading} 
            onDelete={handleDelete}
            isSearching={searchTerm.length > 0} 
          />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
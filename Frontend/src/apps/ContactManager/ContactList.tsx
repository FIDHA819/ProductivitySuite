import { Trash2 } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
  onDelete: (id: string) => void;
  isSearching: boolean; // Tells us whether search text is currently applied
}

function ContactList({ contacts, loading, onDelete, isSearching }: ContactListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center justify-between">
        <span>Active Terminal Registry</span>
        <span className="text-xs font-mono font-normal text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          Matches: {contacts.length}
        </span>
      </h2>

      {loading ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm font-mono animate-pulse">
          Synchronizing directory registers...
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm font-light">
          {isSearching 
            ? "No operational nodes match your keyword parameter scope." 
            : "No system contact modules detected. Create one on the left matrix panel."
          }
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="group relative bg-slate-900/20 border border-slate-850 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-200 group-hover:text-white tracking-tight truncate">
                  {contact.name}
                </h3>
                <div className="mt-2 space-y-1 text-sm font-light text-slate-400">
                  {contact.email && <p className="truncate font-mono text-xs text-slate-500">{contact.email}</p>}
                  {contact.phone && <p className="text-xs">{contact.phone}</p>}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-850/60 flex justify-end">
                <button
                  onClick={() => onDelete(contact._id)}
                  className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-all duration-200"
                  title="Purge Node"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;
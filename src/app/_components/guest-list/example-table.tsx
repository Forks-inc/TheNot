import { Home, Phone, Mail } from "lucide-react";

export default function ExampleTable() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 pointer-events-none opacity-50">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-950 border-b border-zinc-800">
            <th className="px-6 py-4 text-left">
              <input type="checkbox" className="h-5 w-5 rounded border-zinc-700 bg-zinc-900" checked disabled />
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Name</th>
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Contact</th>
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">RSVP Status</th>
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">My Notes</th>
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Gift</th>
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Thank You</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white/5 border-b border-zinc-900">
            <td className="px-6 py-4">
              <input type="checkbox" className="h-5 w-5 rounded border-zinc-700 bg-zinc-900" disabled />
            </td>
            <td className="px-6 py-4">
              <span className="text-sm font-semibold text-white">Example Guest</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2 text-zinc-600">
                <Home className="h-4 w-4 text-primary" />
                <Phone className="h-4 w-4" />
                <Mail className="h-4 w-4" />
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-tight">
                <div className="h-1 w-1 rounded-full bg-emerald-400" />
                Attending
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="text-xs text-zinc-500">Staying at Highline Hotel ...</span>
            </td>
            <td className="px-6 py-4">
              <span className="text-xs text-zinc-500">-</span>
            </td>
            <td className="px-6 py-4 text-right">
              <input type="checkbox" className="h-5 w-5 rounded border-zinc-700 bg-zinc-900" disabled />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

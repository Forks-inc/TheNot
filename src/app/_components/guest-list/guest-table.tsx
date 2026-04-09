"use client";

import { useEffect, useState } from "react";
import { useToggleGuestForm } from "../contexts/guest-form-context";
import { sharedStyles } from "~/app/utils/shared-styles";
import { api } from "~/trpc/react";
import { Home, Phone, Mail, ChevronDown, Trash2, Check, ArrowUpDown } from "lucide-react";
import { LoadingSpinner } from "../loaders";
import { motion, AnimatePresence } from "framer-motion";

import { type Dispatch, type SetStateAction } from "react";
import {
  type FormInvites,
  type Event,
  type Household,
  type HouseholdFormData,
  type Guest,
} from "~/app/utils/shared-types";
import { useRouter } from "next/navigation";

type GuestTableProps = {
  events: Event[];
  households: Household[];
  selectedEventId: string;
  setPrefillHousehold: Dispatch<SetStateAction<HouseholdFormData | undefined>>;
};

export default function GuestTable({
  events,
  households,
  selectedEventId,
  setPrefillHousehold,
}: GuestTableProps) {
  const [nameSort, setNameSort] = useState("none");
  const [partySort, setPartySort] = useState("none");
  const [sortedHouseholds, setSortedHouseholds] = useState(households);
  
  const selectedEvent = events.find((event) => event.id === selectedEventId);

  useEffect(() => {
    setSortedHouseholds(households);
  }, [households]);

  const toggleSort = (type: "name" | "party") => {
    if (type === "name") {
      const nextSort = nameSort === "none" ? "asc" : nameSort === "asc" ? "desc" : "none";
      setNameSort(nextSort);
      setSortedHouseholds(nextSort === "none" ? households : [...households].sort((a, b) => 
        nextSort === "asc" 
          ? a.guests[0]!.firstName.localeCompare(b.guests[0]!.firstName)
          : b.guests[0]!.firstName.localeCompare(a.guests[0]!.firstName)
      ));
    } else {
      const nextSort = partySort === "none" ? "asc" : partySort === "asc" ? "desc" : "none";
      setPartySort(nextSort);
      setSortedHouseholds(nextSort === "none" ? households : [...households].sort((a, b) => 
        nextSort === "asc" ? a.guests.length - b.guests.length : b.guests.length - a.guests.length
      ));
    }
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <th className="px-6 py-5 text-left">
              <input type="checkbox" className="h-5 w-5 rounded border-zinc-700 bg-zinc-900 text-primary focus:ring-primary/20 cursor-pointer transition-all" />
            </th>
            <th onClick={() => toggleSort("name")} className="px-6 py-5 text-left cursor-pointer group">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                Name <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th onClick={() => toggleSort("party")} className="px-6 py-5 text-left cursor-pointer group">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                Party <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Contact</th>
            
            {selectedEventId === "all" ? (
              events.map(event => (
                <th key={event.id} className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {event.name}
                </th>
              ))
            ) : (
              <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">RSVP</th>
            )}
            
            <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900">
          <AnimatePresence mode="popLayout">
            {sortedHouseholds.map((household, idx) => (
              <motion.tr 
                key={household.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => {
                  setPrefillHousehold({
                    householdId: household.id,
                    address1: household.address1 ?? undefined,
                    address2: household.address2 ?? undefined,
                    city: household.city ?? undefined,
                    state: household.state ?? undefined,
                    country: household.country ?? undefined,
                    zipCode: household.zipCode ?? undefined,
                    phone: household.phone ?? undefined,
                    email: household.email ?? undefined,
                    notes: household.notes ?? undefined,
                    gifts: household.gifts,
                    guestParty: household.guests.map(g => ({
                      guestId: g.id,
                      firstName: g.firstName,
                      lastName: g.lastName,
                      isPrimaryContact: g.isPrimaryContact,
                      invites: g.invitations?.reduce((acc, inv) => ({ ...acc, [inv.eventId]: inv.rsvp ?? "" }), {}) ?? {}
                    }))
                  });
                  // toggle logic handled by parent via prefill trigger or similar
                }}
              >
                <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                  <input type="checkbox" className="h-5 w-5 rounded border-zinc-700 bg-zinc-900 text-primary focus:ring-primary/20 cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    {household.guests.map((guest, i) => (
                      <span key={guest.id} className={`text-sm font-semibold ${i === 0 ? "text-white" : "text-zinc-500 text-xs"}`}>
                        {guest.firstName} {guest.lastName}
                        {guest.isPrimaryContact && <span className="ml-2 text-[8px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary uppercase font-black">Primary</span>}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-baseline gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                    <span className="text-sm font-black text-white italic">{household.guests.length}</span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Guests</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-zinc-600">
                    <Home className={`h-4 w-4 ${household.address1 ? "text-primary" : ""}`} />
                    <Phone className={`h-4 w-4 ${household.phone ? "text-primary" : ""}`} />
                    <Mail className={`h-4 w-4 ${household.email ? "text-primary" : ""}`} />
                  </div>
                </td>
                
                {selectedEventId === "all" ? (
                  events.map(event => (
                    <td key={event.id} className="px-6 py-4">
                       <div className="flex flex-col gap-2">
                        {household.guests.map(guest => {
                           const rsvp = guest.invitations?.find(i => i.eventId === event.id)?.rsvp;
                           return <RSVPBadge key={guest.id} rsvp={rsvp} />;
                        })}
                       </div>
                    </td>
                  ))
                ) : (
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                        {household.guests.map(guest => {
                           const rsvp = guest.invitations?.find(i => i.eventId === selectedEventId)?.rsvp;
                           return <RSVPBadge key={guest.id} rsvp={rsvp} />;
                        })}
                    </div>
                  </td>
                )}

                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-xl hover:bg-rose-500/10 text-zinc-600 hover:text-rose-500 transition-colors" onClick={e => e.stopPropagation()}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

function RSVPBadge({ rsvp }: { rsvp?: string | null }) {
  const styles = {
    "Attending": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Declined": "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "Invited": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Not Invited": "bg-zinc-800 text-zinc-500 border-zinc-700",
  }[rsvp ?? "Not Invited"] || "bg-zinc-800 text-zinc-500 border-zinc-700";

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-tight ${styles}`}>
      <div className={`h-1 w-1 rounded-full ${rsvp === "Attending" ? "bg-emerald-400" : rsvp === "Declined" ? "bg-rose-400" : "bg-current"}`} />
      {rsvp ?? "Not Invited"}
    </div>
  );
}

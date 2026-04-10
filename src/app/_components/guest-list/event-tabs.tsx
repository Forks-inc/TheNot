import Link from "next/link";
import { useToggleEventForm } from "../contexts/event-form-context";
import { sharedStyles } from "~/app/utils/shared-styles";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import { type Event } from "~/app/utils/shared-types";

type EventsTabsProps = {
  events: Event[];
  selectedEventId: string;
};

export default function EventsTabs({
  events,
  selectedEventId,
}: EventsTabsProps) {
  const toggleEventForm = useToggleEventForm();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-900 pb-8 mb-8">
      <div className="flex flex-wrap gap-2">
        <Link 
          href="?event=all" 
          scroll={false}
          className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
            selectedEventId === "all" 
              ? "bg-white text-black shadow-lg shadow-white/10" 
              : "bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800"
          }`}
        >
          Todos los invitados
        </Link>
        
        {events?.map((event) => (
          <Link
            key={event.id}
            href={`?event=${event.id}`}
            scroll={false}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              selectedEventId === event.id
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800"
            }`}
          >
            {event.name === "Wedding" ? "Boda" : event.name}
          </Link>
        ))}
      </div>

      <button
        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all active:scale-95 group text-xs font-black uppercase tracking-widest"
        onClick={() => toggleEventForm()}
      >
        <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
        <span>Nuevo Evento</span>
      </button>
    </div>
  );
}

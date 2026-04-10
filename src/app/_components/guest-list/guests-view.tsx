import { useEffect, useMemo, useState } from "react";
import { useToggleGuestForm } from "../contexts/guest-form-context";
import { useToggleEventForm } from "../contexts/event-form-context";
import { formatDateStandard } from "~/app/utils/helpers";
import { sharedStyles } from "~/app/utils/shared-styles";
import { Edit2, UserPlus, Download, Users, Home, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import GuestSearchFilter from "./guest-search-filter";
import GuestTable from "./guest-table";

import { type Dispatch, type SetStateAction } from "react";
import {
  type Event,
  type EventFormData,
  type Household,
  type HouseholdFormData,
} from "~/app/utils/shared-types";

type GuestsViewProps = {
  events: Event[];
  households: Household[];
  selectedEventId: string;
  setPrefillHousehold: Dispatch<SetStateAction<HouseholdFormData | undefined>>;
  setPrefillEvent: Dispatch<SetStateAction<EventFormData | undefined>>;
};

export default function GuestsView({
  events,
  households,
  selectedEventId,
  setPrefillHousehold,
  setPrefillEvent,
}: GuestsViewProps) {
  const toggleGuestForm = useToggleGuestForm();
  const [filteredHouseholds, setFilteredHouseholds] = useState(households);

  const totalGuests =
    useMemo(
      () =>
        filteredHouseholds?.reduce(
          (acc, household) => acc + household.guests.length,
          0,
        ),
      [filteredHouseholds],
    ) ?? 0;

  useEffect(() => {
    setFilteredHouseholds(households);
  }, [households]);

  return (
    <section className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        {selectedEventId === "all" ? (
          <DefaultTableHeader
            households={filteredHouseholds}
            totalGuests={totalGuests}
            numEvents={events.length}
          />
        ) : (
          <SelectedEventTableHeader
            totalGuests={totalGuests}
            households={filteredHouseholds}
            selectedEvent={events.find((event) => event.id === selectedEventId)}
            setPrefillEvent={setPrefillEvent}
          />
        )}

        <div className="flex items-center gap-3">
          <button className={sharedStyles.secondaryButton({ px: "px-6", py: "py-2.5" })}>
            <div className="flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" />
              <span>Exportar Lista</span>
            </div>
          </button>
          <button
            className={sharedStyles.primaryButton({ px: "px-6", py: "py-2.5" })}
            onClick={() => {
              setPrefillHousehold(undefined);
              toggleGuestForm();
            }}
          >
            <div className="flex items-center gap-2 text-sm">
              <UserPlus className="h-4 w-4" />
              <span>Agregar Invitado</span>
            </div>
          </button>
        </div>
      </motion.div>

      <div className="glass-card p-6 rounded-3xl space-y-8">
        <GuestSearchFilter
          setFilteredHouseholds={setFilteredHouseholds}
          households={households}
          events={events}
          selectedEventId={selectedEventId}
        />
        
        <div className="overflow-hidden rounded-2xl border border-zinc-800">
          <GuestTable
            events={events}
            households={filteredHouseholds}
            selectedEventId={selectedEventId}
            setPrefillHousehold={setPrefillHousehold}
          />
        </div>
      </div>
    </section>
  );
}

const DefaultTableHeader = ({
  households,
  numEvents,
  totalGuests,
}: {
  households: Household[];
  numEvents: number;
  totalGuests: number;
}) => {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-black italic tracking-tighter text-white">Lista de Invitados</h1>
      <div className="flex items-center gap-6 text-zinc-500">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span className="text-sm font-bold"><span className="text-white">{households.length}</span> Familias</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="text-sm font-bold"><span className="text-white">{totalGuests}</span> Invitados en Total</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-bold"><span className="text-white">{numEvents}</span> Eventos</span>
        </div>
      </div>
    </div>
  );
};

const SelectedEventTableHeader = ({
  totalGuests,
  households,
  selectedEvent,
  setPrefillEvent,
}: {
  totalGuests: number;
  households: Household[];
  selectedEvent: Event | undefined;
  setPrefillEvent: Dispatch<SetStateAction<EventFormData | undefined>>;
}) => {
  const toggleEventForm = useToggleEventForm();
  
  const guestResponses = useMemo(() => {
    const responses = { attending: 0, declined: 0, noResponse: 0 };
    households.forEach((household) => {
      household.guests.forEach((guest) => {
        const inv = guest.invitations?.find(i => i.eventId === selectedEvent?.id);
        if (!inv) return;
        if (inv.rsvp === "Attending") responses.attending++;
        else if (inv.rsvp === "Declined") responses.declined++;
        else responses.noResponse++;
      });
    });
    return responses;
  }, [households, selectedEvent]);

  if (!selectedEvent) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-black italic tracking-tighter text-white">
          {selectedEvent.name === "Wedding" ? "Boda" : selectedEvent.name}
        </h1>
        <button 
          onClick={() => {
            setPrefillEvent({
              eventName: selectedEvent.name,
              date: formatDateStandard(selectedEvent.date) ?? undefined,
              startTime: selectedEvent.startTime ?? undefined,
              endTime: selectedEvent.endTime ?? undefined,
              venue: selectedEvent.venue ?? undefined,
              attire: selectedEvent.attire ?? undefined,
              description: selectedEvent.description ?? undefined,
              eventId: selectedEvent.id,
            });
            toggleEventForm();
          }}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-primary transition-colors hover:border-primary/30"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-1">Total Invitados</span>
          <span className="text-xl font-bold text-white">{totalGuests}</span>
        </div>
        <div className="h-8 w-px bg-zinc-800" />
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500/80 mb-1">Asistirán</span>
            <span className="text-xl font-bold text-emerald-400">{guestResponses.attending}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-rose-500/80 mb-1">Declinaron</span>
            <span className="text-xl font-bold text-rose-400">{guestResponses.declined}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-1">Sin Respuesta</span>
            <span className="text-xl font-bold text-zinc-500">{guestResponses.noResponse}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

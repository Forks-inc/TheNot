import { useEffect, useState } from "react";
import { Search, Filter, Check, X, ChevronDown } from "lucide-react";

import { type Dispatch, type SetStateAction } from "react";
import { type Event, type Household } from "~/app/utils/shared-types";
import { useOuterClick } from "../hooks";
import { sharedStyles } from "~/app/utils/shared-styles";
import { motion, AnimatePresence } from "framer-motion";

type TSelectedRsvpFilter = {
  eventId: string;
  rsvpValue: string;
};

type GuestSearchFilterProps = {
  households: Household[];
  setFilteredHouseholds: Dispatch<SetStateAction<Household[]>>;
  events: Event[];
  selectedEventId: string;
};

export default function GuestSearchFilter({
  households,
  setFilteredHouseholds,
  events,
  selectedEventId,
}: GuestSearchFilterProps) {
  const [searchInput, setSearchInput] = useState("");
  const [showInvitationDropdown, setShowInvitationDropdown] = useState(false);
  const [selectedRsvpFilter, setSelectedRsvpFilter] =
    useState<TSelectedRsvpFilter | null>(null);
  const invitationFilterRef = useOuterClick(() =>
    setShowInvitationDropdown(false),
  );

  useEffect(() => {
    setSelectedRsvpFilter(null);
  }, [selectedEventId]);

  const eventsToMap =
    selectedEventId === "all"
      ? events
      : [events.find((event) => event.id === selectedEventId)];

  const filterHouseholds = (
    searchText: string,
    rsvpFilter: TSelectedRsvpFilter | null,
  ) => {
    const term = searchText.toLowerCase();
    setFilteredHouseholds(() =>
      households.filter((household) =>
        household.guests.some((guest) => {
          const nameMatch = guest.firstName.toLowerCase().includes(term) ||
                          guest.lastName.toLowerCase().includes(term);
          
          if (!rsvpFilter) return nameMatch;
          
          const rsvpMatch = guest.invitations?.some(
            (inv) =>
              inv.eventId === rsvpFilter.eventId &&
              inv.rsvp === rsvpFilter.rsvpValue,
          );
          
          return nameMatch && rsvpMatch;
        }),
      ),
    );
  };

  const filterHouseholdsBySearch = (searchText: string) => {
    setSearchInput(searchText);
    filterHouseholds(searchText, selectedRsvpFilter);
  };

  const filterHouseholdsByInvitation = ({
    eventId,
    rsvpValue,
  }: TSelectedRsvpFilter) => {
    setShowInvitationDropdown(false);
    setSelectedRsvpFilter({ eventId, rsvpValue });
    filterHouseholds(searchInput, { eventId, rsvpValue });
  };

  const clearFilters = () => {
    setFilteredHouseholds(households);
    setSearchInput("");
    setSelectedRsvpFilter(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          id="search-guests-input"
          className="h-12 w-64 md:w-80 rounded-2xl bg-zinc-900 border border-zinc-800 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
          placeholder="Buscar por nombre..."
          value={searchInput}
          onChange={(e) => filterHouseholdsBySearch(e.target.value)}
        />
      </div>

      <div className="relative" ref={invitationFilterRef}>
        <button
          onClick={() => setShowInvitationDropdown((prev) => !prev)}
          className={`h-12 flex items-center justify-between gap-4 px-5 rounded-2xl border transition-all active:scale-95 ${
            selectedRsvpFilter 
              ? "bg-primary/10 border-primary/30 text-primary" 
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {selectedRsvpFilter ? (
                selectedRsvpFilter.rsvpValue === "Invited" ? "Invitado" :
                selectedRsvpFilter.rsvpValue === "Attending" ? "Asistirá" :
                selectedRsvpFilter.rsvpValue === "Declined" ? "Declinó" :
                selectedRsvpFilter.rsvpValue === "Not Invited" ? "No invitado" :
                selectedRsvpFilter.rsvpValue
              ) : "Estado RSVP"}
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${showInvitationDropdown ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showInvitationDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 top-14 z-50 w-64 py-2 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-xl"
            >
              {eventsToMap?.map(
                (event) =>
                  event && (
                    <div key={event.id} className="px-2 py-1">
                      <div className="px-3 py-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                          {event.name === "Wedding" ? "Boda" : event.name}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {[
                          { key: "Invited", label: "Invitado" },
                          { key: "Attending", label: "Asistirá" },
                          { key: "Declined", label: "Declinó" },
                          { key: "Not Invited", label: "No invitado" }
                        ].map((rsvp) => (
                          <button
                            key={rsvp.key}
                            onClick={() => filterHouseholdsByInvitation({ eventId: event.id, rsvpValue: rsvp.key })}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`h-1.5 w-1.5 rounded-full ${sharedStyles.getRSVPcolor(rsvp.key)}`} />
                              <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{rsvp.label}</span>
                            </div>
                            {event.id === selectedRsvpFilter?.eventId && rsvp.key === selectedRsvpFilter?.rsvpValue && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(!!selectedRsvpFilter || searchInput !== "") && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-zinc-500 hover:text-rose-500 transition-colors"
        >
          <X className="h-4 w-4" />
          <span>Limpiar filtros</span>
        </button>
      )}
    </div>
  );
}

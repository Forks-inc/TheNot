import { sharedStyles } from "../../../utils/shared-styles";
import { Minus, User, Calendar } from "lucide-react";
import AnimatedInputLabel from "../animated-input-label";

import { type Dispatch, type SetStateAction } from "react";
import {
  type GuestFormData,
  type Event,
  type HouseholdFormData,
} from "../../../utils/shared-types";

type GuestNameFormProps = {
  events: Event[];
  guestIndex: number;
  guest: GuestFormData;
  setHouseholdFormData: Dispatch<SetStateAction<HouseholdFormData>>;
  setDeletedGuests: Dispatch<SetStateAction<number[]>>;
};

export const GuestNameForm = ({
  events,
  guestIndex,
  guest,
  setHouseholdFormData,
  setDeletedGuests,
}: GuestNameFormProps) => {
  const handleRemoveGuest = () => {
    setDeletedGuests((prev) => [...prev, guest.guestId ?? -1]);
    setHouseholdFormData((prev) => ({
      ...prev,
      guestParty: prev.guestParty.filter((_, i) => i !== guestIndex),
    }));
  };

  const handleSelectEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    event: Event,
    index: number,
  ) => {
    setHouseholdFormData((prev) => ({
      ...prev,
      guestParty: prev.guestParty.map((g, i) =>
        i === index
          ? {
              ...g,
              invites: {
                ...g.invites,
                [event.id]: e.target.checked ? "Invited" : "Not Invited",
              },
            }
          : g,
      ),
    }));
  };

  const handleNameChange = ({
    field,
    inputValue,
    guestIndex,
  }: {
    field: string;
    inputValue: string;
    guestIndex: number;
  }) => {
    setHouseholdFormData((prev) => ({
      ...prev,
      guestParty: prev.guestParty.map((g, i) =>
        i === guestIndex ? { ...g, [field]: inputValue } : g,
      ),
    }));
  };

  return (
    <div className="glass-card p-6 rounded-[2rem] bg-white/[0.02] border border-zinc-900 group relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-zinc-900 flex items-center justify-center">
            <User className="h-4 w-4 text-zinc-500" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Guest {guestIndex + 1}
          </span>
        </div>
        
        {guestIndex > 0 && (
          <button
            type="button"
            onClick={handleRemoveGuest}
            className="p-2 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 transition-all hover:text-white"
          >
            <Minus className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputLabel
          id={`guest${guestIndex}-firstName`}
          inputValue={guest.firstName}
          fieldName="firstName"
          labelText="First Name*"
          guestIndex={guestIndex}
          required={true}
          handleOnChange={handleNameChange}
        />
        <AnimatedInputLabel
          id={`guest${guestIndex}-lastName`}
          inputValue={guest.lastName}
          fieldName="lastName"
          labelText="Last Name*"
          guestIndex={guestIndex}
          required={true}
          handleOnChange={handleNameChange}
        />
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-3 w-3 text-primary" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Event Invitations</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {events?.map((event: Event) => (
            <label
              key={event.id}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer group/label ${
                ["Invited", "Attending", "Declined"].includes(guest.invites[event.id] ?? "")
                  ? "bg-primary/5 border-primary/20 text-white"
                  : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800"
              }`}
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 rounded-md border-zinc-800 bg-zinc-900 text-primary focus:ring-primary/20 cursor-pointer"
                  checked={["Invited", "Attending", "Declined"].includes(guest.invites[event.id] ?? "")}
                  onChange={(e) => handleSelectEvent(e, event, guestIndex)}
                />
              </div>
              <span className="text-xs font-bold transition-colors truncate">
                {event.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

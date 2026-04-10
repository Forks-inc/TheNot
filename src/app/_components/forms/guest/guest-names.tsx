import { sharedStyles } from "../../../utils/shared-styles";
import { Minus, User, Calendar, Check, X } from "lucide-react";
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
    isChecked: boolean,
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
                [event.id]: isChecked ? "Invited" : "Not Invited",
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
    <div className="glass-card p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group relative overflow-hidden">
      <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 blur-3xl -mr-16 -mt-16 rounded-full" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
            <User className="h-4 w-4 text-amber-200" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Invitado {guestIndex + 1}
          </span>
        </div>
        
        {guestIndex > 0 && (
          <button
            type="button"
            onClick={handleRemoveGuest}
            className="p-3 rounded-2xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 transition-all hover:text-white border border-rose-500/10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <AnimatedInputLabel
          id={`guest${guestIndex}-firstName`}
          inputValue={guest.firstName}
          fieldName="firstName"
          labelText="Nombre*"
          guestIndex={guestIndex}
          required={true}
          handleOnChange={handleNameChange}
        />
        <AnimatedInputLabel
          id={`guest${guestIndex}-lastName`}
          inputValue={guest.lastName}
          fieldName="lastName"
          labelText="Apellido*"
          guestIndex={guestIndex}
          required={true}
          handleOnChange={handleNameChange}
        />
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-px w-4 bg-amber-500/30" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Invitaciones a Eventos</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {events?.map((event: Event) => {
            const isInvited = ["Invited", "Attending", "Declined"].includes(guest.invites[event.id] ?? "");
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => handleSelectEvent(!isInvited, event, guestIndex)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group/item ${
                  isInvited
                    ? "bg-amber-500/10 border-amber-500/30 text-white shadow-lg shadow-amber-500/5"
                    : "bg-zinc-950/50 border-white/5 text-zinc-500 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all ${isInvited ? "bg-amber-400 border-amber-400 text-black" : "border-zinc-800 bg-zinc-900 group-hover/item:border-zinc-700"}`}>
                    {isInvited && <Check className="h-3.5 w-3.5 stroke-[4px]" />}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${isInvited ? "text-amber-200" : "text-zinc-600"}`}>
                    {event.name}
                  </span>
                </div>
                {isInvited && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-amber-500/50">Invitado</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

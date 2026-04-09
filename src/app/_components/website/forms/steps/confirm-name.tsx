"use client";

import { useState } from "react";
import {
  useRsvpForm,
  useUpdateRsvpForm,
} from "~/app/_components/contexts/rsvp-form-context";
import { Check, UserCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { type StepFormProps } from "~/app/utils/shared-types";

export default function ConfirmNameForm({ goNext, goBack }: StepFormProps) {
  const { matchedHouseholds } = useRsvpForm();
  const updateRsvpForm = useUpdateRsvpForm();
  const [selectedHouseholdId, setSelectedHouseholdId] = useState<string>();

  const onContinue = () => {
    const selectedHousehold = matchedHouseholds?.find(
      (household) => household.id === selectedHouseholdId,
    );
    const primaryContact = selectedHousehold?.guests.find(
      (guest) => guest.isPrimaryContact,
    );
    updateRsvpForm({
      selectedHousehold: Object.assign({ primaryContact }, selectedHousehold),
    });
    goNext && goNext();
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Verification</span>
        <h2 className="text-4xl font-black italic tracking-tighter text-white leading-tight">
          Select your<br />household.
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed font-light">
          We found several matches. Please confirm which household is yours to continue with your RSVP.
        </p>
      </div>

      <div className="space-y-3">
        {matchedHouseholds?.map((household) => {
          const isSelected = selectedHouseholdId === household.id;
          return (
            <motion.div
              key={household.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedHouseholdId(household.id)}
              className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? "bg-primary/5 border-primary/30"
                  : "bg-white/[0.02] border-zinc-900 lg:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? "bg-primary text-white" : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-400"
                }`}>
                  <UserCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className={`text-sm font-bold tracking-wide transition-colors ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}>
                    {household.guests
                      .map((guest) => `${guest.firstName} ${guest.lastName}`)
                      .join(", ")}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-0.5">
                    {household.guests.length} {household.guests.length === 1 ? 'Guest' : 'Guests'} Total
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-4 pt-4">
        <button
          type="button"
          disabled={!selectedHouseholdId}
          onClick={onContinue}
          className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all hover:text-white disabled:opacity-20 flex items-center justify-center gap-3 group"
        >
          <span>Continue RSVP</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        
        <button
          type="button"
          onClick={() => goBack && goBack()}
          className="w-full py-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Search Again</span>
        </button>
      </div>
    </div>
  );
}

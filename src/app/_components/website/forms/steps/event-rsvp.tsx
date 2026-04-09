"use client";

import { useState } from "react";
import { Calendar, Clock, Check, X, ArrowLeft, ArrowRight, User } from "lucide-react";
import { formatDateStandard } from "~/app/utils/helpers";
import {
  useRsvpForm,
  useUpdateRsvpForm,
} from "~/app/_components/contexts/rsvp-form-context";
import { motion, AnimatePresence } from "framer-motion";

import { type Dispatch, type SetStateAction } from "react";
import {
  type Guest,
  type Event,
  type StepFormProps,
  type RsvpFormResponse,
} from "~/app/utils/shared-types";

interface EventRsvpFormProps extends StepFormProps {
  event: Event;
  invitedGuests: Guest[];
}

export default function EventRsvpForm({
  goNext,
  goBack,
  event,
  invitedGuests,
}: EventRsvpFormProps) {
  const rsvpFormData = useRsvpForm();
  const updateRsvpForm = useUpdateRsvpForm();
  const [rsvpResponses, setRsvpResponses] = useState<RsvpFormResponse[]>([]);

  const onContinue = () => {
    updateRsvpForm({
      rsvpResponses: [...rsvpFormData.rsvpResponses, ...rsvpResponses],
    });
    goNext && goNext();
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Event Response</span>
        <h2 className="text-4xl font-black italic tracking-tighter text-white leading-tight capitalize">
          {event.name.toLowerCase()}
        </h2>
        {!!event.date && (
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="h-4 w-4 text-zinc-600" />
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">
                {formatDateStandard(event.date)}
              </span>
            </div>
            {event.startTime && (
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-4 w-4 text-zinc-600" />
                <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">
                  {event.startTime} {event.endTime && ` — ${event.endTime}`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {invitedGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-[2rem] bg-white/[0.02] border border-zinc-900 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-bold text-white text-sm">
                  {guest.firstName} {guest.lastName}
                </span>
              </div>
              
              <RsvpSelection
                eventId={event.id}
                guestId={guest.id}
                setRsvpResponses={setRsvpResponses}
                guestName={`${guest.firstName} ${guest.lastName}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="space-y-4 pt-4">
        <button
          type="button"
          disabled={rsvpResponses.length < invitedGuests.length}
          onClick={onContinue}
          className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all hover:text-white disabled:opacity-20 flex items-center justify-center gap-3 group"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        
        <button
          type="button"
          onClick={() => goBack && goBack()}
          className="w-full py-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}

function RsvpSelection({
  eventId,
  guestId,
  setRsvpResponses,
  guestName,
}: {
  eventId: string;
  guestId: number;
  setRsvpResponses: Dispatch<SetStateAction<RsvpFormResponse[]>>;
  guestName: string;
}) {
  const [rsvpSelection, setRsvpSelection] = useState<"Attending" | "Declined">();

  const handleOnSelect = (selection: "Attending" | "Declined") => {
    setRsvpSelection(selection);
    setRsvpResponses((prev) => {
      const existing = prev.find((r) => r.guestId === guestId);
      if (!existing) {
        return [...prev, { eventId, guestId, rsvp: selection, guestName }];
      }
      return prev.map((r) =>
        r.guestId === guestId ? { ...r, rsvp: selection } : r,
      );
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => handleOnSelect("Attending")}
        className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
          rsvpSelection === "Attending"
            ? "bg-primary border-primary text-white"
            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
        }`}
      >
        <Check className={`h-3 w-3 ${rsvpSelection === "Attending" ? "block" : "hidden"}`} strokeWidth={3} />
        Accept{rsvpSelection === "Attending" ? "ed" : ""}
      </button>
      <button
        type="button"
        onClick={() => handleOnSelect("Declined")}
        className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
          rsvpSelection === "Declined"
            ? "bg-rose-500 border-rose-500 text-white"
            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
        }`}
      >
        <X className={`h-3 w-3 ${rsvpSelection === "Declined" ? "block" : "hidden"}`} strokeWidth={3} />
        Decline{rsvpSelection === "Declined" ? "d" : ""}
      </button>
    </div>
  );
}

"use client";

import { useRsvpForm } from "../contexts/rsvp-form-context";
import { CheckCircle2, XCircle, ArrowLeft, Calendar as CalendarIcon, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { type Dispatch, type SetStateAction } from "react";
import { type Event, type RsvpFormResponse } from "~/app/utils/shared-types";

type RsvpConfirmationProps = {
  basePath: string;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export default function RsvpConfirmation({
  basePath,
  setCurrentStep,
}: RsvpConfirmationProps) {
  const rsvpFormData = useRsvpForm();
  const { groomFirstName, brideFirstName } = rsvpFormData.weddingData;

  return (
    <div className="flex flex-col space-y-12 pb-12 antialiased">
      <div className="text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 mb-4"
        >
          <Heart className="h-8 w-8 text-rose-400" />
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-black italic tracking-tighter text-white">
            ¡Todo listo! 
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto font-medium">
            Confirmamos tu asistencia para la boda de <span className="text-amber-200">{groomFirstName}</span> y <span className="text-amber-200">{brideFirstName}</span>. ¡Nos vemos pronto!
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Resumen de Confirmación</h3>
          <button
            type="button"
            className="text-[10px] font-black uppercase tracking-widest text-amber-200 hover:text-white transition-colors border-b border-amber-200/30 pb-1"
            onClick={() => setCurrentStep(3)}
          >
            Actualizar Respuesta
          </button>
        </div>

        <ul className="space-y-6">
          {rsvpFormData.weddingData.events?.map((event) => {
            const eventHasInvitedGuests = !!rsvpFormData.rsvpResponses.find(
              (response) => event.id === response.eventId,
            );
            if (!eventHasInvitedGuests) return null;
            return (
              <ConfirmationListItem
                key={event.id}
                event={event}
                rsvpResponses={rsvpFormData.rsvpResponses}
              />
            );
          })}
        </ul>
      </div>

      <div className="pt-8 space-y-4">
        <Link
          href={basePath}
          className="flex items-center justify-center gap-3 w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-200 transition-all active:scale-95 shadow-2xl shadow-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Inicio</span>
        </Link>
        <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">Hecho con TheNot Premium</p>
      </div>
    </div>
  );
}

const ConfirmationListItem = ({
  event,
  rsvpResponses,
}: {
  event: Event;
  rsvpResponses: RsvpFormResponse[];
}) => {
  return (
    <motion.li 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 space-y-6"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black italic text-white tracking-tight">{event.name}</h3>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <Sparkles className="h-3 w-3" />
            <span>Asignación Confirmada</span>
          </div>
        </div>
        <button 
          type="button" 
          className="p-3 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-500 hover:text-amber-200 transition-all"
          title="Agregar al Calendario"
        >
          <CalendarIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {rsvpResponses.map((response) => {
          if (response.eventId === event.id) {
            const isAttending = response.rsvp === "Attending";
            return (
              <div
                key={`${event.id}_${response.guestId}`}
                className="flex items-center gap-4 group"
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                  isAttending ? "bg-amber-500/10 border-amber-500/20 text-amber-200" : "bg-zinc-900/50 border-white/5 text-zinc-600"
                }`}>
                  {isAttending ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                </div>
                <span className={`text-sm font-bold tracking-tight transition-colors ${
                  isAttending ? "text-zinc-200" : "text-zinc-600 line-through decoration-zinc-800"
                }`}>
                  {response.guestName}
                </span>
                {isAttending && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-amber-500/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    Confirmado
                  </span>
                )}
              </div>
            );
          }
        })}
      </div>
    </motion.li>
  );
};

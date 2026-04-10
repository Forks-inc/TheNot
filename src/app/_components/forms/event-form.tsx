"use client";

import { useState } from "react";
import { useToggleEventForm } from "../contexts/event-form-context";
import { sharedStyles } from "../../utils/shared-styles";
import { X, Trash2, Calendar, MapPin, Shirt, Info, Save } from "lucide-react";
import DeleteConfirmation from "./delete-confirmation";
import DateInput from "./event/date-input";
import TimeSelections from "./event/time-selections";
import AnimatedInputLabel from "./animated-input-label";
import { motion, AnimatePresence } from "framer-motion";

import { type EventFormData } from "../../utils/shared-types";
import { useEventFormActions } from "../hooks/forms/useEventFormActions";
import SidePaneWrapper from "./wrapper";

type EventFormProps = {
  prefillFormData: EventFormData | undefined;
};

const defaultFormData = {
  eventName: "",
  date: undefined,
  startTime: undefined,
  endTime: undefined,
  venue: undefined,
  attire: undefined,
  description: undefined,
  eventId: "",
};

export default function EventForm({ prefillFormData }: EventFormProps) {
  const isEditMode = !!prefillFormData;
  const toggleEventForm = useToggleEventForm();

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [eventFormData, setEventFormData] = useState<EventFormData>(
    prefillFormData ?? defaultFormData,
  );

  const {
    createEvent,
    isCreatingEvent,
    updateEvent,
    isUpdatingEvent,
    deleteEvent,
    isDeletingEvent,
  } = useEventFormActions();

  const handleOnChange = ({
    field,
    inputValue,
  }: {
    field: string;
    inputValue: string;
  }) => {
    setEventFormData((prev) => {
      return {
        ...prev,
        [field]: inputValue,
      };
    });
  };

  const handleSaveEvent = () => {
    if (isEditMode) {
      updateEvent(eventFormData);
    } else {
      createEvent(eventFormData);
    }
  };

  const isProcessing = isCreatingEvent || isUpdatingEvent || isDeletingEvent;

  if (showDeleteConfirmation) {
    return (
      <DeleteConfirmation
        isProcessing={isProcessing}
        disclaimerText={
          "Al eliminar este evento, se quitará de tu sitio web y también se borrarán las listas de invitados, confirmaciones y platillos asociados."
        }
        noHandler={() => setShowDeleteConfirmation(false)}
        yesHandler={() => deleteEvent({ eventId: eventFormData.eventId })}
      />
    );
  }

  return (
    <SidePaneWrapper>
      <div className="h-full flex flex-col bg-zinc-950">
        <div className="flex items-center justify-between px-8 py-10 border-b border-white/5">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Gestión de Eventos</p>
            <h1 className="text-3xl font-black italic text-white tracking-tighter antialiased">
              {isEditMode ? "Editar Evento" : "Nuevo Evento"}
            </h1>
          </div>
          <button 
            onClick={() => toggleEventForm()}
            className="p-3 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white hover:border-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveEvent();
          }}
          className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10 pb-40"
        >
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Información General</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
            </div>

            <div className="space-y-5">
              <AnimatedInputLabel
                id="event-name"
                inputValue={eventFormData.eventName}
                fieldName="eventName"
                labelText="Nombre del Evento*"
                required={true}
                handleOnChange={handleOnChange}
              />
              
              <div className="grid grid-cols-1 gap-5">
                <DateInput
                  eventDate={eventFormData.date}
                  handleOnChange={handleOnChange}
                />
                
                <TimeSelections
                  startTime={eventFormData.startTime}
                  endTime={eventFormData.endTime}
                  handleOnChange={handleOnChange}
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Detalles Logísticos</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
            </div>

            <div className="space-y-5">
              <AnimatedInputLabel
                id="event-venue"
                inputValue={eventFormData.venue ?? ""}
                fieldName="venue"
                labelText="Lugar / Recinto"
                handleOnChange={handleOnChange}
              />
              <AnimatedInputLabel
                id="event-attire"
                inputValue={eventFormData.attire ?? ""}
                fieldName="attire"
                labelText="Código de Vestimenta"
                handleOnChange={handleOnChange}
              />
              <div className="relative group">
                <textarea
                  id="event-description"
                  placeholder=" "
                  value={eventFormData.description ?? ""}
                  onChange={(e) => handleOnChange({ field: "description", inputValue: e.target.value })}
                  className="peer block w-full rounded-2xl border border-white/5 bg-zinc-950/50 px-4 pb-3 pt-6 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-0 transition-all backdrop-blur-md min-h-[120px] resize-none"
                />
                <label 
                  htmlFor="event-description"
                  className="absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-[10px] font-black uppercase tracking-widest text-zinc-500 duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-amber-200"
                >
                  Notas / Información Adicional
                </label>
              </div>
            </div>
          </section>
        </form>

        <div className="absolute bottom-0 inset-x-0 p-8 pt-12 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent border-t border-white/5 space-y-4">
          <div className="flex gap-4">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => toggleEventForm()}
              className={sharedStyles.secondaryButton({ isLoading: isProcessing })}
            >
              Cancelar
            </button>
            <button
              id="save-event"
              type="submit"
              disabled={isProcessing}
              onClick={handleSaveEvent}
              className={`flex-1 flex items-center justify-center gap-3 ${sharedStyles.primaryButton({ isLoading: isProcessing })}`}
            >
              {isProcessing ? (
                <>
                  <div className="h-3 w-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Guardar Evento</span>
                </>
              )}
            </button>
          </div>
          
          {isEditMode && (
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setShowDeleteConfirmation(true)}
              className="w-full py-4 rounded-2xl border border-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500/5 hover:border-red-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span>Eliminar este evento permanentemente</span>
            </button>
          )}
        </div>
      </div>
    </SidePaneWrapper>
  );
}

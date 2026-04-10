"use client";

import { useToggleEventForm } from "../../contexts/event-form-context";
import { sharedStyles } from "../../../utils/shared-styles";
import { convertDate, formatDateHTML5 } from "~/app/utils/helpers";
import { CiLocationOn } from "react-icons/ci";
import { BsPencil } from "react-icons/bs";
import { TfiNewWindow } from "react-icons/tfi";
import CoverPhotoUploader from "../cover-photo-uploader";
import CoverPhotoImage from "../cover-photo-image";
import { motion } from "framer-motion";

import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Calendar, Clock, MapPin, Plus, Edit } from "lucide-react";

import { type Dispatch, type SetStateAction } from "react";
import {
  type Event,
  type EventFormData,
  type DashboardData,
} from "~/app/utils/shared-types";

type HomeContentProps = {
  dashboardData: DashboardData;
  events: Event[] | undefined;
  setPrefillEvent: Dispatch<SetStateAction<EventFormData | undefined>>;
  uploadImage: (formData: FormData) => Promise<{ ok: boolean }>;
  deleteImage: (imageKey: string) => Promise<{ ok: boolean }>;
};

export default function HomeContent({
  dashboardData,
  events,
  setPrefillEvent,
  uploadImage,
  deleteImage,
}: HomeContentProps) {
  const toggleEventForm = useToggleEventForm();

  const handleEditEvent = (event: Event) => {
    const standardDate = formatDateHTML5(event.date);

    setPrefillEvent({
      eventName: event.name,
      date: standardDate ?? undefined,
      startTime: event.startTime ?? undefined,
      endTime: event.endTime ?? undefined,
      venue: event.venue ?? undefined,
      attire: event.attire ?? undefined,
      description: event.description ?? undefined,
      eventId: event.id,
    });
    toggleEventForm();
  };

  return (
    <div className="space-y-12">
      <div className="px-10">
        {dashboardData?.weddingData.website.coverPhotoUrl ? (
          <CoverPhotoImage
            coverPhotoUrl={dashboardData.weddingData.website.coverPhotoUrl}
            deleteImage={deleteImage}
          />
        ) : (
          <CoverPhotoUploader uploadImage={uploadImage} />
        )}
      </div>

      <div className="px-10 space-y-8">
        <div className="border-l-2 border-amber-500/30 pl-8 space-y-3">
          <h2 className="text-3xl font-black italic text-white tracking-tighter">
            {dashboardData?.weddingData?.groomFirstName} <span className="text-amber-200 antialiased">&</span> {dashboardData?.weddingData?.brideFirstName}
          </h2>
          
          <div className="flex flex-wrap items-center gap-6 text-zinc-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500/50" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {dashboardData?.weddingData?.date?.standardFormat ?? "Fecha por anunciar"}
              </span>
            </div>
            
            {(dashboardData?.weddingData?.daysRemaining ?? 0) > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-zinc-800" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-200/60">
                  Faltan {dashboardData?.weddingData?.daysRemaining} días
                </span>
              </div>
            )}

            <button 
              onClick={toggleEventForm}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
            >
              <MapPin className="h-4 w-4 text-amber-500/50 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {dashboardData?.events?.[0]?.venue ?? "Agrega la ubicación"}
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Eventos de la Boda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -5 }}
                className="relative glass-card p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-amber-500/30 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-200/10 to-transparent" />
                
                <button
                  className="absolute right-6 top-6 p-3 rounded-2xl bg-zinc-950/50 border border-white/5 text-amber-200/50 hover:text-amber-200 hover:border-amber-500/30 transition-all"
                  onClick={() => handleEditEvent(event)}
                >
                  <Edit className="h-4 w-4" />
                </button>

                <div className="space-y-6">
                  <h3 className="text-xl font-black italic text-white tracking-tight uppercase antialiased pr-10">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-zinc-950/50 border border-white/5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {!!event.date ? convertDate(event.date) : "Sin fecha"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-zinc-950/50 border border-white/5">
                        <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {!!event.startTime ? event.startTime : "Sin hora"}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-zinc-950/50 border border-white/5 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-relaxed">
                        {event.venue ?? "Lugar por definir"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPrefillEvent(undefined);
                toggleEventForm();
              }}
              className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 border-dashed border-zinc-900 hover:border-amber-500/20 hover:bg-amber-500/5 transition-all gap-4 group min-h-[240px]"
            >
              <div className="p-4 rounded-full bg-zinc-900 border border-white/5 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all text-amber-200/20 group-hover:text-amber-200">
                <Plus className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-amber-200/80 transition-colors">
                Agregar Evento
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { sharedStyles } from "~/app/utils/shared-styles";
import { formatDateStandard } from "~/app/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Heart } from "lucide-react";

import { type WeddingPageData } from "~/app/utils/shared-types";

type WeddingPageProps = {
  weddingData: WeddingPageData;
  path: string;
};

export default function WeddingPageMobile({ weddingData, path }: WeddingPageProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-400 selection:bg-amber-500/30 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          {weddingData.website.coverPhotoUrl ? (
            <Image
              src={weddingData.website.coverPhotoUrl}
              fill
              className="object-cover"
              alt="Boda"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-zinc-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/40 to-zinc-950" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 text-center space-y-12 w-full"
        >
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-200/60 block">RESERVA LA FECHA</span>
            <h1 className="text-6xl font-black italic tracking-tighter text-white leading-[0.85] antialiased drop-shadow-xl">
              {weddingData.groomFirstName}<br />
              <span className="text-amber-200 font-normal text-4xl not-italic px-2">&</span><br />
              {weddingData.brideFirstName}
            </h1>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-16 bg-white/10" />
            <div className="text-center space-y-2">
              <p className="text-sm font-light tracking-[0.3em] text-zinc-200 uppercase">
                {weddingData.date?.standardFormat ?? "Fecha por anunciar"}
              </p>
              {weddingData.daysRemaining > 0 && (
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500/80">
                  FALTAN {weddingData.daysRemaining} DÍAS
                </p>
              )}
            </div>
            <div className="h-px w-16 bg-white/10" />
          </div>

          <div className="pt-2 px-2">
            <Navbar path={path} isRsvpEnabled={weddingData.website.isRsvpEnabled} />
          </div>

          {weddingData.website.isRsvpEnabled && (
            <div className="px-4 pt-4">
              <Link
                href={`${path}/rsvp`}
                className="flex items-center justify-center gap-4 w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-2xl shadow-white/5"
              >
                <span>Confirmar Asistencia</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="px-6 py-32 space-y-16">
        <div className="text-center space-y-4">
          <Heart className="h-5 w-5 text-rose-400/40 mx-auto" />
          <h2 className="text-3xl font-black italic tracking-tighter text-white">Eventos de Boda</h2>
          <div className="h-[1px] w-12 bg-amber-200/20 mx-auto" />
        </div>

        <div className="space-y-8">
          {weddingData.events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 relative overflow-hidden active:bg-white/[0.03] transition-colors"
            >
              <div className="space-y-8 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-200" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-black italic text-white tracking-tight leading-none">
                    {event.name}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Clock className="h-4 w-4 text-zinc-700" />
                      <span className="font-black tracking-[0.2em] uppercase text-[9px] text-zinc-400">
                        {event.startTime} {event.endTime && ` — ${event.endTime}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-4 w-4 text-zinc-700" />
                      <span className="text-[11px] font-medium text-zinc-500 leading-relaxed">{event.venue ?? "Lugar por confirmar"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-24 border-t border-white/5 text-center px-6 bg-black/40">
        <div className="space-y-12">
          <h2 className="text-6xl font-black italic tracking-tighter text-white opacity-20 group-hover:opacity-40 transition-opacity">
            {weddingData.groomFirstName?.[0] ?? ""} <span className="text-amber-200 font-normal">&</span> {weddingData.brideFirstName?.[0] ?? ""}
          </h2>
          <div className="space-y-6 max-w-[240px] mx-auto">
            <div className="flex items-center justify-center gap-3 opacity-10">
               <div className="h-px flex-1 bg-white" />
               <Sparkles className="h-3 w-3 text-white" />
               <div className="h-px flex-1 bg-white" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">Hecho con TheNot Premium</p>
            <p className="text-[10px] leading-relaxed">
              <Link href="/" className="text-zinc-500 underline underline-offset-8 decoration-white/5 active:text-amber-200">
                Crea tu propio sitio de boda exclusivo
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

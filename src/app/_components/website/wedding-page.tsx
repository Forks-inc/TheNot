"use client";

import { sharedStyles } from "~/app/utils/shared-styles";
import { formatDateStandard } from "~/app/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Heart, Sparkles } from "lucide-react";

import { type WeddingPageData } from "~/app/utils/shared-types";

type WeddingPageProps = {
  weddingData: WeddingPageData;
  path: string;
};

export default function WeddingPage({ weddingData, path }: WeddingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-400 selection:bg-amber-500/30 selection:text-white font-inter antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
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
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 text-center space-y-12"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="flex items-center justify-center gap-4 text-[10px] font-black uppercase text-amber-200/60"
            >
              <div className="h-px w-8 bg-amber-200/20" />
              RESERVA LA FECHA
              <div className="h-px w-8 bg-amber-200/20" />
            </motion.div>
            
            <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter text-white leading-none drop-shadow-2xl">
              {weddingData.groomFirstName} 
              <span className="text-amber-200 font-normal text-6xl md:text-8xl antialiased px-4 not-italic">&</span> 
              {weddingData.brideFirstName}
            </h1>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <div className="text-center space-y-3">
               <p className="text-xl md:text-3xl font-light tracking-[0.3em] text-zinc-200 uppercase">
                 {weddingData.date?.standardFormat ?? "Fecha por anunciar"}
               </p>
               {weddingData.daysRemaining > 0 && (
                  <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/80">
                    <Sparkles className="h-3 w-3" />
                    FALTAN {weddingData.daysRemaining} DÍAS
                  </div>
               )}
            </div>
          </div>

          <div className="pt-4">
            <Navbar path={path} isRsvpEnabled={weddingData.website.isRsvpEnabled} />
          </div>

          {weddingData.website.isRsvpEnabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`${path}/rsvp`}
                className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-200 transition-all hover:text-black group shadow-2xl shadow-white/5"
              >
                <span>Confirmar Asistencia</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Sigue bajando</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-amber-200/40 via-amber-200/10 to-transparent" />
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-8 py-40">
         <div className="mb-24 text-center space-y-4">
            <Heart className="h-6 w-6 text-rose-400/30 mx-auto" />
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white">Eventos de Boda</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Acompáñanos en este fin de semana inolvidable</p>
         </div>

         <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
         >
           {weddingData.events.map((event) => (
             <motion.div 
               key={event.id}
               variants={itemVariants}
               className="glass-card p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 group hover:border-amber-500/30 transition-all hover:bg-white/[0.03] relative overflow-hidden"
             >
               <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 blur-3xl -mr-16 -mt-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="space-y-8 relative z-10">
                 <div className="h-14 w-14 rounded-[1.25rem] bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:border-amber-500/20">
                   <Calendar className="h-6 w-6 text-amber-200" />
                 </div>
                 
                 <div className="space-y-4">
                   <h3 className="text-3xl font-black italic text-white tracking-tight leading-tight">
                     {event.name}
                   </h3>
                   
                   <div className="space-y-5 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-zinc-950 flex items-center justify-center text-zinc-600 group-hover:text-amber-200/60 transition-colors">
                          <Clock className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                          {event.startTime} {event.endTime && ` — ${event.endTime}`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-zinc-950 flex items-center justify-center text-zinc-600 group-hover:text-amber-200/60 transition-colors">
                          <MapPin className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-zinc-500 leading-relaxed max-w-[200px]">
                          {event.venue ?? "Lugar por confirmar"}
                        </span>
                      </div>
                   </div>
                 </div>
               </div>
             </motion.div>
           ))}
         </motion.div>
      </section>

      {/* Footer Branding */}
      <footer className="py-32 border-t border-white/5 text-center bg-black/40">
        <div className="space-y-12">
           <Link href="/" className="inline-block group">
             <h2 className="text-6xl font-black italic tracking-tighter text-white opacity-20 group-hover:opacity-40 transition-opacity">
               {weddingData.groomFirstName?.[0] ?? ""} <span className="text-amber-200 font-normal">&</span> {weddingData.brideFirstName?.[0] ?? ""}
             </h2>
           </Link>
           
           <div className="space-y-4 max-w-md mx-auto px-6">
             <div className="flex items-center justify-center gap-4 opacity-10">
               <div className="h-px flex-1 bg-white" />
               <Sparkles className="h-4 w-4 text-white" />
               <div className="h-px flex-1 bg-white" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Hecho con TheNot Premium</p>
             <p className="text-xs">
                <Link href="/" className="text-zinc-500 hover:text-amber-200 transition-all underline underline-offset-8 decoration-white/5 hover:decoration-amber-200/30">
                  Crea tu propio sitio de boda exclusivo
                </Link>
             </p>
           </div>
        </div>
      </footer>
    </main>
  );
}

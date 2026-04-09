"use client";

import { sharedStyles } from "~/app/utils/shared-styles";
import { formatDateStandard } from "~/app/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-400 selection:bg-primary/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          {weddingData.website.coverPhotoUrl ? (
            <Image
              src={weddingData.website.coverPhotoUrl}
              fill
              className="object-cover"
              alt="Background"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-black to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="z-10 text-center space-y-8"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary block">Save the Date</span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white leading-none">
              {weddingData.groomFirstName} <span className="text-primary font-normal text-5xl md:text-7xl antialiased">&</span> {weddingData.brideFirstName}
            </h1>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-20 bg-zinc-800" />
            <div className="text-center">
               <p className="text-lg md:text-2xl font-light tracking-[0.2em] text-zinc-300 uppercase">
                 {weddingData.date?.standardFormat ?? "Date To Be Announced"}
               </p>
               {weddingData.daysRemaining > 0 && (
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-2">
                    {weddingData.daysRemaining} Days To Go
                  </p>
               )}
            </div>
            <div className="h-px w-20 bg-zinc-800" />
          </div>

          <div className="pt-8">
            <Navbar path={path} isRsvpEnabled={weddingData.website.isRsvpEnabled} />
          </div>

          {weddingData.website.isRsvpEnabled && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`${path}/rsvp`}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors hover:text-white group"
              >
                <span>Confirm Attendance</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
         <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
         >
           {weddingData.events.map((event) => (
             <motion.div 
               key={event.id}
               variants={itemVariants}
               className="glass-card p-10 rounded-[2.5rem] bg-white/[0.03] border border-zinc-900 group hover:border-primary/30 transition-all hover:bg-white/[0.05]"
             >
               <div className="space-y-6">
                 <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Calendar className="h-6 w-6 text-primary" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-2xl font-black italic text-white tracking-tight capitalize">
                     {event.name.toLowerCase()}
                   </h3>
                   <div className="flex flex-col gap-3 pt-4">
                     <div className="flex items-center gap-3 text-sm">
                       <Clock className="h-4 w-4 text-zinc-600" />
                       <span className="font-bold tracking-widest uppercase text-[10px]">
                         {event.startTime} {event.endTime && ` — ${event.endTime}`}
                       </span>
                     </div>
                     <div className="flex items-center gap-3 text-sm">
                       <MapPin className="h-4 w-4 text-zinc-600" />
                       <span className="text-zinc-500">{event.venue ?? "Venue Details TBD"}</span>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>
           ))}
         </motion.div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-zinc-900 text-center">
        <div className="space-y-8">
           <h2 className="text-5xl font-black italic tracking-tighter text-white opacity-20">
             {weddingData.groomFirstName[0]} <span className="text-primary font-normal">&</span> {weddingData.brideFirstName[0]}
           </h2>
           <div className="space-y-2">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Built with TheNot</p>
             <p className="text-xs">
                <Link href="/" className="text-zinc-500 hover:text-white transition-colors underline underline-offset-4 decoration-primary/30">
                  Create your own premium wedding website
                </Link>
             </p>
           </div>
        </div>
      </footer>
    </main>
  );
}

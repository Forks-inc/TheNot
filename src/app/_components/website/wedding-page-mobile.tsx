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

export default function WeddingPageMobile({ weddingData, path }: WeddingPageProps) {
  return (
    <main className="min-h-screen bg-black text-zinc-400 selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
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
            <div className="w-full h-full bg-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center space-y-8 w-full"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block">Save the Date</span>
            <h1 className="text-5xl font-black italic tracking-tighter text-white leading-[0.9] antialiased">
              {weddingData.groomFirstName}<br />
              <span className="text-primary font-normal text-3xl not-italic">&</span><br />
              {weddingData.brideFirstName}
            </h1>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="h-px w-12 bg-zinc-800" />
            <div className="text-center">
              <p className="text-sm font-light tracking-[0.2em] text-zinc-300 uppercase">
                {weddingData.date?.standardFormat ?? "Date To Be Announced"}
              </p>
            </div>
            <div className="h-px w-12 bg-zinc-800" />
          </div>

          <div className="pt-4 px-2 overflow-x-auto">
            <Navbar path={path} isRsvpEnabled={weddingData.website.isRsvpEnabled} />
          </div>

          {weddingData.website.isRsvpEnabled && (
            <div className="px-6 pt-4">
              <Link
                href={`${path}/rsvp`}
                className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                <span>Confirm Attendance</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="px-6 py-20 space-y-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-zinc-900" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Weekend Events</h2>
          <div className="h-px flex-1 bg-zinc-900" />
        </div>

        <div className="space-y-6">
          {weddingData.events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2rem] bg-white/[0.03] border border-zinc-900"
            >
              <div className="space-y-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black italic text-white tracking-tight capitalize">
                    {event.name.toLowerCase()}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs">
                      <Clock className="h-4 w-4 text-zinc-700" />
                      <span className="font-bold tracking-widest uppercase text-[9px] text-zinc-400">
                        {event.startTime} {event.endTime && ` — ${event.endTime}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <MapPin className="h-4 w-4 text-zinc-700" />
                      <span className="text-zinc-500 leading-relaxed">{event.venue ?? "Venue Details TBD"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-zinc-900 text-center px-6">
        <div className="space-y-8">
          <h2 className="text-4xl font-black italic tracking-tighter text-white opacity-20">
            {weddingData.groomFirstName[0]} <span className="text-primary font-normal">&</span> {weddingData.brideFirstName[0]}
          </h2>
          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Built with TheNot</p>
            <p className="text-[10px] leading-relaxed">
              <Link href="/" className="text-zinc-500 underline underline-offset-4 decoration-primary/30">
                Create your own premium<br />wedding website
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

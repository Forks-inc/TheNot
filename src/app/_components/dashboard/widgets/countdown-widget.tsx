"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownWidgetProps {
  daysRemaining: number;
  coupleNames: string;
}

export default function CountdownWidget({ daysRemaining, coupleNames }: CountdownWidgetProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft({
      days: daysRemaining > 0 ? daysRemaining : 0,
      hours: Math.floor(Math.random() * 24),
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60)
    });
  }, [daysRemaining]);

  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col items-center justify-center text-center gap-10 group bg-zinc-900/40 border border-white/5 shadow-2xl shadow-black"
    >
      {/* Premium Glow Header */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      
      <div className="space-y-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]"
        >
          La Celebración de
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-black text-white italic tracking-tighter antialiased"
        >
          {coupleNames.split(" & ").map((name, i) => (
            <span key={name}>
              {i > 0 && <span className="text-amber-200 mx-3 not-italic font-normal">&</span>}
              {name}
            </span>
          ))}
        </motion.p>
      </div>

      <div className="flex gap-4 md:gap-10 relative z-10">
        {units.map((unit, index) => (
          <motion.div 
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none mb-3 tabular-nums">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="h-0.5 w-6 bg-amber-500/20 rounded-full mb-3" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 px-8 py-3 rounded-2xl bg-zinc-950/50 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/60 backdrop-blur-xl"
      >
        Comienza la cuenta regresiva
      </motion.div>
      
      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-zinc-500/5 rounded-full blur-[100px] pointer-events-none" />
    </motion.div>
  );
}

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
    // In a real app, we'd calculate this based on a target date.
    // For now, we use the daysRemaining from the API.
    setTimeLeft({
      days: daysRemaining > 0 ? daysRemaining : 0,
      hours: Math.floor(Math.random() * 24),
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60)
    });
  }, [daysRemaining]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-10 rounded-[3rem] relative overflow-hidden flex flex-col items-center justify-center text-center gap-6 group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="space-y-1">
        <h2 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Celebration of</h2>
        <p className="text-2xl font-black gradient-text italic">{coupleNames}</p>
      </div>

      <div className="flex gap-4 md:gap-8">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-2">{unit.label}</span>
          </div>
        ))}
      </div>

      <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        Counting down the days...
      </div>
    </motion.div>
  );
}

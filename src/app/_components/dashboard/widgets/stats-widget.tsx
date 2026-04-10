"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Mail } from "lucide-react";

interface StatsWidgetProps {
  totalGuests: number;
  attending: number;
  declined: number;
  invited: number;
}

export default function StatsWidget({ totalGuests, attending, declined, invited }: StatsWidgetProps) {
  const stats = [
    { 
      name: "Total Invitados", 
      value: totalGuests, 
      icon: Users, 
      color: "text-zinc-400", 
      accent: "from-zinc-500/20 to-transparent",
      shadow: "group-hover:shadow-zinc-500/10"
    },
    { 
      name: "Confirmados", 
      value: attending, 
      icon: UserCheck, 
      color: "text-amber-400", 
      accent: "from-amber-500/20 to-transparent",
      shadow: "group-hover:shadow-amber-500/20"
    },
    { 
      name: "Declinados", 
      value: declined, 
      icon: UserX, 
      color: "text-rose-400", 
      accent: "from-rose-500/20 to-transparent",
      shadow: "group-hover:shadow-rose-500/10"
    },
    { 
      name: "Pendientes", 
      value: invited, 
      icon: Mail, 
      color: "text-blue-400", 
      accent: "from-blue-500/20 to-transparent",
      shadow: "group-hover:shadow-blue-500/10"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`group relative overflow-hidden glass-card p-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 transition-all duration-500 hover:border-white/10 ${stat.shadow} hover:-translate-y-1`}
        >
          {/* Accent Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-zinc-950/50 ${stat.color} group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {stat.name}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-white italic tracking-tighter antialiased">
                {stat.value}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                Personas
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

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
    { name: "Total Guests", value: totalGuests, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Attending", value: attending, icon: UserCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { name: "Declined", value: declined, icon: UserX, color: "text-rose-400", bg: "bg-rose-400/10" },
    { name: "Still Pending", value: invited, icon: Mail, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 rounded-3xl group hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.name}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-white italic">{stat.value}</h3>
            <span className="text-xs text-zinc-500">People</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

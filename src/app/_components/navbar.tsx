"use client";

import { sharedStyles } from "../utils/shared-styles";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, Globe, Users, Calendar } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Website", href: "/wedding-website", icon: Globe },
    { name: "Guest List", href: "/guest-list", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
  ];

  return (
    <div className="flex w-full items-center justify-between px-10 py-6 bg-zinc-950/50 backdrop-blur-md border-b border-white/5 fixed top-0 z-50">
      <ul className="flex items-center gap-10">
        <div className="flex items-center gap-8">
          <li className="group transition-all">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-amber-200 transition-colors">
              Ideas y Consejos
            </Link>
          </li>
          <li className="group transition-all">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-amber-200 transition-colors">
              Regalos y Detalles
            </Link>
          </li>
        </div>
      </ul>
      <div className="flex items-center gap-6">
        {session === null ? (
          <Link 
            href="/api/auth/signin"
            className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-200 transition-all transform active:scale-95"
          >
            Iniciar Sesión
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              {user?.name}
            </span>
            <Link 
              href="/api/auth/signout"
              className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors"
            >
              Cerrar Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

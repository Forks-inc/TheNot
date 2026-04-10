"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const getNavLinks = (isRsvpEnabled: boolean) => {
  return [
    { title: "Inicio", subPath: "", isVisible: true },
    { title: "Nuestra Historia", subPath: "our-story", isVisible: true },
    { title: "Cortejo", subPath: "wedding-party", isVisible: true },
    { title: "Galería", subPath: "photos", isVisible: true },
    { title: "Preguntas", subPath: "q-a", isVisible: true },
    { title: "Viaje", subPath: "travel", isVisible: true },
    { title: "Actividades", subPath: "things-to-do", isVisible: true },
    { title: "Regalos", subPath: "registry", isVisible: true },
    { title: "Confirmar", subPath: "rsvp", isVisible: isRsvpEnabled },
  ];
};

export default function Navbar({
  path,
  isRsvpEnabled,
}: {
  path: string;
  isRsvpEnabled: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="my-12 w-full">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
        {getNavLinks(isRsvpEnabled).map((link) => {
          if (!link.isVisible) return null;
          
          const fullPath = `${path}${link.subPath ? `/${link.subPath}` : ""}`;
          const isActive = pathname === fullPath || (link.subPath === "" && pathname === path);

          return (
            <li key={link.title} className="relative group">
              <Link
                href={fullPath}
                className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${
                  isActive ? "text-amber-200" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {link.title}
              </Link>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-amber-200/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

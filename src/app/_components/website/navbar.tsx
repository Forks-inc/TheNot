"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const getNavLinks = (isRsvpEnabled: boolean) => {
  return [
    { title: "Home", subPath: "", isVisible: true },
    { title: "Our Story", subPath: "our-story", isVisible: true },
    { title: "Wedding Party", subPath: "wedding-party", isVisible: true },
    { title: "Photos", subPath: "photos", isVisible: true },
    { title: "Q + A", subPath: "q-a", isVisible: true },
    { title: "Travel", subPath: "travel", isVisible: true },
    { title: "Things to Do", subPath: "things-to-do", isVisible: true },
    { title: "Registry", subPath: "registry", isVisible: true },
    { title: "RSVP", subPath: "rsvp", isVisible: isRsvpEnabled },
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
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {getNavLinks(isRsvpEnabled).map((link) => {
          if (!link.isVisible) return null;
          
          const fullPath = `${path}${link.subPath ? `/${link.subPath}` : ""}`;
          const isActive = pathname === fullPath || (link.subPath === "" && pathname === path);

          return (
            <li key={link.title} className="relative group">
              <Link
                href={fullPath}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {link.title}
              </Link>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

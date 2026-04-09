import Link from "next/link";
import { sharedStyles } from "../utils/shared-styles";

export default function Footer() {
  return (
    <footer className={`${sharedStyles.desktopPaddingSides} py-12 border-t border-zinc-800 bg-black/50 backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center font-bold italic text-sm">T</div>
            <span className="text-xl font-bold tracking-tight text-white">TheNot</span>
          </div>
          <p className="text-sm text-zinc-500 max-w-xs">
            The premium way to plan your perfect day. Managing every detail so you can focus on the memories.
          </p>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tools</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/guest-list" className="hover:text-white transition-colors">Guest List</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors" />
            <div className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors" />
            <div className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors" />
          </div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
            © 2026 TheNot Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

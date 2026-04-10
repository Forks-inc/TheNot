import { Copy, Edit3, Eye, Share2, Check, ExternalLink } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { motion } from "framer-motion";

type DashboardHeaderProps = {
  websiteUrl: string | undefined;
  setShowWebsiteSettings: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardHeader({
  websiteUrl,
  setShowWebsiteSettings,
}: DashboardHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(websiteUrl ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 backdrop-blur-sm"
          >
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-ping absolute inset-0" />
              <div className="h-2 w-2 rounded-full bg-amber-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/80">Sitio Web Activo</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black italic tracking-tighter text-white leading-none"
          >
            Panel de <span className="text-amber-200 antialiased">Control</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-950/40 border border-white/5 backdrop-blur-md shadow-2xl shadow-black">
              <span className="text-xs font-mono text-zinc-500 select-all">{websiteUrl}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900/50 border border-white/5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-amber-500/30 transition-all active:scale-95 group"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 group-hover:text-amber-200 transition-colors" />}
                <span>{copied ? "¡Copiado!" : "Copiar Link"}</span>
              </button>
              
              <button
                onClick={() => setShowWebsiteSettings(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900/50 border border-white/5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-amber-500/30 transition-all active:scale-95 group"
              >
                <Edit3 className="h-3.5 w-3.5 group-hover:text-amber-200 transition-colors" />
                <span>Configurar</span>
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button className="px-8 py-4 rounded-full border border-white/10 font-black uppercase tracking-widest text-xs text-white hover:bg-white/5 transition-all transform active:scale-95 flex items-center gap-3">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </button>
          
          <a 
            href={websiteUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="px-10 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-amber-200 transition-all transform active:scale-95 shadow-xl shadow-white/5 flex items-center gap-3"
          >
            <Eye className="h-4 w-4" />
            <span>Ver Sitio en Vivo</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

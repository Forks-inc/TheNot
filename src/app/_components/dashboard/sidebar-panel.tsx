import { sharedStyles } from "../../utils/shared-styles";
import { Palette, Shield, ChevronRight, Settings } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";

type SidebarPanelProps = {
  setShowWebsiteSettings: Dispatch<SetStateAction<boolean>>;
};

export default function SidebarPanel({
  setShowWebsiteSettings,
}: SidebarPanelProps) {
  const sections = [
    {
      title: "Tu Tema",
      icon: Palette,
      actionText: "Explorar Temas",
      onClick: () => undefined,
    },
    {
      title: "Privacidad",
      icon: Shield,
      actionText: "Configurar",
      onClick: () => setShowWebsiteSettings(true),
    },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 px-2">Ajustes y Estilo</h3>
      
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          onClick={section.onClick}
          className="glass-card p-6 rounded-3xl cursor-pointer group hover:border-amber-500/50 transition-all active:scale-95 bg-zinc-900/40 border border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-amber-200 transition-colors">
              <section.icon className="h-5 w-5" />
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
          </div>
          
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">{section.title}</h4>
            <p className="text-xs text-zinc-500 group-hover:text-amber-200 transition-colors font-medium">
              {section.actionText}
            </p>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 rounded-3xl bg-amber-200/5 border border-amber-200/10"
      >
        <div className="flex items-center gap-3 text-amber-200 mb-3">
          <Settings className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Ayuda y Soporte</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          ¿Necesitas ayuda con tu sitio? Contacta a nuestro equipo de soporte premium.
        </p>
      </motion.div>
    </section>
  );
}

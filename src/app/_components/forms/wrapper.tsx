import { useDisablePageScroll } from "../hooks";
import { sharedStyles } from "~/app/utils/shared-styles";
import { motion, AnimatePresence } from "framer-motion";

type SidePaneWrapperProps = {
  children: React.ReactNode;
};

export default function SidePaneWrapper({ children }: SidePaneWrapperProps) {
  useDisablePageScroll();
  
  return (
    <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all"
        onClick={() => {}} // Optional: handle close on backdrop click if needed
      />
      
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        className={`relative h-full flex flex-col bg-zinc-950 border-l border-zinc-800 shadow-2xl overflow-y-auto custom-scrollbar ${sharedStyles.sidebarFormWidth}`}
      >
        <div className="relative h-fit min-h-screen">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

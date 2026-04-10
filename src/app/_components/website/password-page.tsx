"use client";

import { useState } from "react";
import { Lock, Unlock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { type Website } from "~/app/utils/shared-types";

type PasswordPageProps = {
  website: Website;
  setPasswordCookie: (value: string) => void;
};

export default function PasswordPage({
  website,
  setPasswordCookie,
}: PasswordPageProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const verifyPassword = async () => {
    if (website.password === passwordInput) {
      setIsUnlocking(true);
      // Brief delay for the animation
      setTimeout(() => {
        setPasswordCookie(passwordInput);
      }, 800);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden antialiased">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="inline-flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] mb-4 backdrop-blur-xl"
            >
              <AnimatePresence mode="wait">
                {isUnlocking ? (
                  <motion.div
                    key="unlock"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                  >
                    <Unlock className="h-6 w-6 text-amber-200" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="lock"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                  >
                    <Lock className="h-6 w-6 text-zinc-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-200/40 block">ACCESO EXCLUSIVO</span>
              <h1 className="text-6xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                Bienvenidos
              </h1>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-8 bg-white/[0.01] border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-2xl">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Ingresa el código de acceso</p>
              <div className="relative group">
                <input
                  type="password"
                  value={passwordInput}
                  placeholder="&bull; &bull; &bull; &bull; &bull;"
                  autoFocus
                  className="w-full bg-transparent border-b border-white/5 py-6 text-4xl font-light text-center text-white outline-none placeholder:text-zinc-800 focus:border-amber-200/50 transition-all tracking-[0.5em]"
                  onKeyDown={(e) => e.key === "Enter" && verifyPassword()}
                  onChange={(e) => {
                    setShowError(false);
                    setPasswordInput(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              onClick={verifyPassword}
              disabled={isUnlocking || !passwordInput}
              className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-200 hover:text-black transition-all flex items-center justify-center gap-4 group disabled:opacity-30 shadow-2xl shadow-white/5 active:scale-95"
            >
              <span>{isUnlocking ? 'ACCEDIENDO...' : 'ENTRAR AL SITIO'}</span>
              {!isUnlocking && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>

            <AnimatePresence>
              {showError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 text-center"
                >
                  Código incorrecto. Intenta de nuevo.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div className="pt-8">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-800">
              Midnight Premium &bull; MMXIV
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

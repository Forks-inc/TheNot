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
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] mb-4"
            >
              <AnimatePresence mode="wait">
                {isUnlocking ? (
                  <motion.div
                    key="unlock"
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 20, opacity: 0 }}
                  >
                    <Unlock className="h-6 w-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="lock"
                    initial={{ rotate: 20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -20, opacity: 0 }}
                  >
                    <Lock className="h-6 w-6 text-zinc-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 leading-relaxed">
              Private Event Access
            </h1>
            <h2 className="text-5xl font-black italic tracking-tighter text-white">
              The Not
            </h2>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="relative group">
              <input
                type="password"
                value={passwordInput}
                placeholder="Enter access code"
                autoFocus
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl font-light text-center text-white outline-none placeholder:text-zinc-700 focus:border-primary transition-all tracking-widest"
                onKeyDown={(e) => e.key === "Enter" && verifyPassword()}
                onChange={(e) => {
                  setShowError(false);
                  setPasswordInput(e.target.value);
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-primary"
                initial={{ width: 0 }}
                whileFocus={{ width: "100%" }}
              />
            </div>

            <button
              onClick={verifyPassword}
              disabled={isUnlocking || !passwordInput}
              className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
            >
              <span>{isUnlocking ? 'Unlocking...' : 'Unlock Experience'}</span>
              {!isUnlocking && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>

            <AnimatePresence>
              {showError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-black uppercase tracking-widest text-red-500 text-center"
                >
                  Incorrect code. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div className="pt-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-800">
              Midnight Premium &copy; 2024
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

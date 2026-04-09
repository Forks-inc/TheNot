"use client";

import { useState } from "react";
import { useRsvpForm } from "~/app/_components/contexts/rsvp-form-context";
import { Check, Mail, ArrowLeft, Send, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { type StepFormProps } from "~/app/utils/shared-types";

interface SendRsvpProps extends StepFormProps {
  isFetching: boolean;
}

export default function SendRsvp({ goBack, isFetching }: SendRsvpProps) {
  const { weddingData } = useRsvpForm();
  const [email, setEmail] = useState<string>("");
  const [showSendEmailConfirmation, setShowSendEmailConfirmation] =
    useState<boolean>(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
          <Send className="h-3 w-3" />
          Final Step
        </span>
        <h2 className="text-4xl font-black italic tracking-tighter text-white leading-tight">
          Ready to send<br />your RSVP?
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed font-light max-w-xs">
          Submit your response to {weddingData.groomFirstName} & {weddingData.brideFirstName}&apos;s wedding celebration.
        </p>
      </div>

      <div className="space-y-6">
        <label 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setShowSendEmailConfirmation(!showSendEmailConfirmation)}
        >
          <div className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all ${
            showSendEmailConfirmation 
              ? "bg-primary border-primary" 
              : "bg-zinc-900 border-zinc-800 group-hover:border-zinc-700"
          }`}>
            {showSendEmailConfirmation && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
            showSendEmailConfirmation ? "text-white" : "text-zinc-600 group-hover:text-zinc-500"
          }`}>
            Send me an email confirmation
          </span>
        </label>

        <AnimatePresence>
          {showSendEmailConfirmation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 transition-colors group-focus-within:text-primary" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-5 pl-14 pr-8 text-sm text-white placeholder:text-zinc-700 focus:border-primary outline-none transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 pt-4">
        <button
          type="submit"
          disabled={(showSendEmailConfirmation && email.length === 0) || isFetching}
          className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all hover:text-white disabled:opacity-20 flex items-center justify-center gap-3 group"
        >
          {isFetching ? (
            <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Submit RSVP</span>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => goBack && goBack()}
          className="w-full py-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Go Back</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-10">
        <ShieldCheck className="h-3 w-3 text-zinc-800" />
        <p className="text-[9px] font-bold text-zinc-800 uppercase tracking-widest">
          Secured by Midnight Premium
        </p>
      </div>
    </motion.div>
  );
}

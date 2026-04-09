"use client";

import { useState } from "react";
import {
  useRsvpForm,
  useUpdateRsvpForm,
} from "~/app/_components/contexts/rsvp-form-context";
import { api } from "~/trpc/react";
import { Search, Info, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { type StepFormProps } from "~/app/utils/shared-types";

export default function FindYourInvitationForm({ goNext }: StepFormProps) {
  const { weddingData } = useRsvpForm();
  const updateRsvpForm = useUpdateRsvpForm();
  const [name, setName] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const { refetch, isFetching } = api.household.findBySearch.useQuery(
    { searchText: name },
    {
      enabled: false,
      retry: false,
    },
  );

  const handleOnSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name || isFetching) return;
    
    void refetch().then((res) => {
      if (res.error ?? res.data?.length === 0) {
        setShowError(true);
      } else {
        updateRsvpForm({ matchedHouseholds: res.data });
        goNext && goNext();
      }
    });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Guest RSVP</span>
        <h2 className="text-4xl font-black italic tracking-tighter text-white leading-tight">
          Find your<br />invitation.
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed font-light">
          Enter your name to find your invitation. You&apos;ll be able to RSVP for your entire party.
        </p>
      </div>

      <form onSubmit={handleOnSearch} className="space-y-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl text-white placeholder:text-zinc-700 focus:border-primary outline-none transition-all"
            onChange={(e) => {
              if (showError) setShowError(false);
              setName(e.target.value);
            }}
            value={name}
            autoFocus
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-primary transition-colors">
            {isFetching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </div>
        </div>

        {showError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10"
          >
            <Info className="h-4 w-4 text-rose-500 mt-0.5" />
            <p className="text-xs text-rose-200/60 leading-relaxed">
              We couldn&apos;t find an invitation matching that name. Please try another spelling or contact the couple directly.
            </p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={!name || isFetching}
          className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all hover:text-white disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-black"
        >
          {isFetching ? "Searching..." : "Search Invitation"}
        </button>
      </form>
    </div>
  );
}

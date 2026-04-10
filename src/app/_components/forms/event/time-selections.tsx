"use client";

import { useEffect, useState } from "react";
import { generateTimes } from "~/app/utils/helpers";
import { useOuterClick } from "../../hooks";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TimeSelectionsProps = {
  startTime: string | undefined;
  endTime: string | undefined;
  handleOnChange: ({
    field,
    inputValue,
  }: {
    field: string;
    inputValue: string;
  }) => void;
};

export default function TimeSelections({
  startTime,
  endTime,
  handleOnChange,
}: TimeSelectionsProps) {
  const [showStartTimes, setShowStartTimes] = useState<boolean>(false);
  const [showEndTimes, setShowEndTimes] = useState<boolean>(false);
  const startTimeRef = useOuterClick(() => setShowStartTimes(false));
  const endTimeRef = useOuterClick(() => setShowEndTimes(false));

  return (
    <div className="flex gap-4">
      {/* Start Time */}
      <div className="relative w-1/2 group">
        <div
          ref={startTimeRef}
          onClick={() => {
            setShowStartTimes((prev) => !prev);
            setShowEndTimes(false);
          }}
          className={`relative h-14 w-full cursor-pointer flex items-center justify-between px-4 pb-1 pt-4 rounded-2xl border border-white/5 bg-zinc-950/50 backdrop-blur-md transition-all ${showStartTimes ? "border-amber-500/50 ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/5" : "hover:border-white/10"}`}
        >
          <span className={`absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${showStartTimes ? "text-amber-200" : "text-zinc-500"}`}>
            Hora de Inicio
          </span>
          <div className="flex items-center gap-3">
            <Clock className={`h-3.5 w-3.5 ${showStartTimes ? "text-amber-200" : "text-zinc-500"}`} />
            <span className={`text-sm ${startTime ? "text-white font-medium" : "text-zinc-600 font-black uppercase tracking-widest text-[10px]"}`}>
              {startTime ?? "Seleccionar"}
            </span>
          </div>
          {showStartTimes ? (
            <ChevronUp className="h-4 w-4 text-amber-200" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-600" />
          )}
        </div>
        <AnimatePresence>
          {showStartTimes && (
            <TimeDropdown
              field="startTime"
              selectedTime={startTime ?? ""}
              handleOnChange={handleOnChange}
              onClose={() => setShowStartTimes(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* End Time */}
      <div className="relative w-1/2 group">
        <div
          ref={endTimeRef}
          onClick={() => {
            setShowEndTimes((prev) => !prev);
            setShowStartTimes(false);
          }}
          className={`relative h-14 w-full cursor-pointer flex items-center justify-between px-4 pb-1 pt-4 rounded-2xl border border-white/5 bg-zinc-950/50 backdrop-blur-md transition-all ${showEndTimes ? "border-amber-500/50 ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/5" : "hover:border-white/10"}`}
        >
          <span className={`absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${showEndTimes ? "text-amber-200" : "text-zinc-500"}`}>
            Hora de Fin
          </span>
          <div className="flex items-center gap-3">
            <Clock className={`h-3.5 w-3.5 ${showEndTimes ? "text-amber-200" : "text-zinc-500"}`} />
            <span className={`text-sm ${endTime ? "text-white font-medium" : "text-zinc-600 font-black uppercase tracking-widest text-[10px]"}`}>
              {endTime ?? "Seleccionar"}
            </span>
          </div>
          {showEndTimes ? (
            <ChevronUp className="h-4 w-4 text-amber-200" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-600" />
          )}
        </div>
        <AnimatePresence>
          {showEndTimes && (
            <TimeDropdown
              field="endTime"
              selectedTime={endTime ?? ""}
              handleOnChange={handleOnChange}
              onClose={() => setShowEndTimes(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type TimeDropdownProps = {
  field: string;
  selectedTime: string;
  handleOnChange: ({
    field,
    inputValue,
  }: {
    field: string;
    inputValue: string;
  }) => void;
  onClose: () => void;
};

const TimeDropdown = ({
  field,
  selectedTime,
  handleOnChange,
  onClose,
}: TimeDropdownProps) => {
  const times = generateTimes();
  
  const handleChangeOption = (time: string) => {
    handleOnChange({ field, inputValue: time });
    onClose();
  };

  useEffect(() => {
    const el = document.querySelector(`.selected-${field}`);
    if (el) el.scrollIntoView({ block: 'center' });
  }, [field]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute left-0 top-[calc(100%+8px)] z-[100] h-64 w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 shadow-2xl shadow-black ring-1 ring-white/5"
    >
      <div className="h-full overflow-y-auto custom-scrollbar p-2 space-y-1">
        {times.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => handleChangeOption(time)}
            className={`w-full px-4 py-3 rounded-xl text-left text-xs transition-all flex items-center justify-between group/item ${selectedTime === time ? `selected-${field} bg-amber-500/10 text-amber-200 font-black` : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
          >
            <span className="tracking-widest capitalize">{time}</span>
            {selectedTime === time && <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

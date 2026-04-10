type DateInputProps = {
  eventDate: string | undefined;
  handleOnChange: ({
    field,
    inputValue,
  }: {
    field: string;
    inputValue: string;
  }) => void;
};

export default function DateInput({
  eventDate,
  handleOnChange,
}: DateInputProps) {
  return (
    <div className="relative group">
      <input
        id="event-date"
        type="date"
        required={(eventDate?.length ?? 0) > 0}
        value={eventDate}
        onChange={(e) =>
          handleOnChange({ field: "date", inputValue: e.target.value })
        }
        className="peer w-full rounded-2xl border border-white/5 bg-zinc-950/50 px-4 pb-3 pt-6 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-0 transition-all backdrop-blur-md"
      />
      <label
        htmlFor="event-date"
        className="absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-[10px] font-black uppercase tracking-widest text-zinc-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-amber-200"
      >
        Fecha
      </label>
    </div>
  );
}

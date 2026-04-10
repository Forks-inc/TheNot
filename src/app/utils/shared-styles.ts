const minPageWidth = "min-w-full";
const desktopPaddingSides = "px-6 md:px-20 lg:px-32";
const desktopPaddingSidesGuestList = "px-6 md:px-12";
const verticalDivider = "px-3 text-zinc-800";
const primaryColor = "amber-200";
const primaryColorHex = "rgba(253, 230, 138, 1)";
const sidebarFormWidth = "w-full lg:w-[500px]";
const ellipsisOverflow = "overflow-hidden overflow-ellipsis whitespace-nowrap";

const animatedInput =
  "peer block w-full rounded-2xl border border-white/5 bg-zinc-950/50 px-4 pb-3 pt-6 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-0 transition-all backdrop-blur-md";

const animatedLabel =
  "absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-[10px] font-black uppercase tracking-widest text-zinc-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-amber-200";

const requiredAsterisk =
  'after:ml-1 after:text-amber-500 after:content-["*"]';

type ButtonOptions = {
  px?: string;
  py?: string;
  isLoading?: boolean;
};

const primaryButton = (options?: ButtonOptions) => {
  options = { px: "px-10", py: "py-4", isLoading: false, ...options };
  const { px, py, isLoading } = options;
  const hover = isLoading ? "" : "hover:bg-amber-100 hover:shadow-2xl hover:shadow-amber-500/10";
  const bg = isLoading ? "bg-zinc-800" : "bg-white";
  const text = isLoading ? "text-zinc-600" : "text-black";
  const cursor = isLoading ? "cursor-not-allowed" : "cursor-pointer";

  return `rounded-full font-black uppercase tracking-widest text-[10px] transition-all transform active:scale-95 ${px} ${py} ${hover} ${bg} ${text} ${cursor}`;
};

const secondaryButton = (options?: ButtonOptions) => {
  options = { px: "px-10", py: "py-4", isLoading: false, ...options };
  const { px, py, isLoading } = options;
  const hover = isLoading ? "" : "hover:bg-white/5 hover:border-white/10";
  const cursor = isLoading ? "cursor-not-allowed" : "cursor-pointer";
  const border = isLoading ? "border-zinc-900" : "border-white/5";
  const text = isLoading ? "text-zinc-700" : "text-zinc-400";

  return `rounded-full border font-black uppercase tracking-widest text-[10px] transition-all transform active:scale-95 ${px} ${py} ${hover} ${cursor} ${border} ${text}`;
};

const getRSVPcolor = (rsvp: string | null | undefined) => {
  switch (rsvp) {
    case "Not Invited":
      return "bg-zinc-900";
    case "Invited":
      return "bg-zinc-800";
    case "Attending":
      return "bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.3)]";
    case "Declined":
      return "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]";
    default:
      return "bg-zinc-800";
  }
};

export const sharedStyles = {
  minPageWidth,
  desktopPaddingSides,
  desktopPaddingSidesGuestList,
  verticalDivider,
  primaryColor,
  primaryColorHex,
  sidebarFormWidth,
  ellipsisOverflow,
  animatedInput,
  animatedLabel,
  requiredAsterisk,
  primaryButton,
  secondaryButton,
  getRSVPcolor,
};

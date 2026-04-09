const minPageWidth = "min-w-full";
const desktopPaddingSides = "px-6 md:px-20 lg:px-32";
const desktopPaddingSidesGuestList = "px-6 md:px-12";
const verticalDivider = "px-3 text-zinc-700";
const primaryColor = "primary";
const primaryColorHex = "hsl(var(--primary))";
const sidebarFormWidth = "w-full lg:w-[450px]";
const ellipsisOverflow = "overflow-hidden overflow-ellipsis whitespace-nowrap";
const animatedInput =
  "peer block w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 pb-3 pt-5 text-sm text-white focus:border-primary focus:outline-none focus:ring-0 transition-all backdrop-blur-sm";
const animatedLabel =
  "absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-zinc-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary";
const requiredAsterisk =
  'after:ml-0.5 after:text-primary after:content-["*"]';

type ButtonOptions = {
  px?: string;
  py?: string;
  isLoading?: boolean;
};

const primaryButton = (options?: ButtonOptions) => {
  options = { px: "px-10", py: "py-3", isLoading: false, ...options };
  const { px, py, isLoading } = options;
  const hover = isLoading ? "" : "hover:brightness-110 hover:shadow-lg hover:shadow-primary/20";
  const bg = isLoading ? "bg-primary/50" : "bg-primary";
  const cursor = isLoading ? "cursor-not-allowed" : "cursor-pointer";

  return `rounded-full font-bold text-white transition-all transform active:scale-95 ${px} ${py} ${hover} ${bg} ${cursor}`;
};

const secondaryButton = (options?: ButtonOptions) => {
  options = { px: "px-10", py: "py-3", isLoading: false, ...options };
  const { px, py, isLoading } = options;
  const hover = isLoading ? "" : "hover:bg-white/5 hover:border-white/20";
  const cursor = isLoading ? "cursor-not-allowed" : "cursor-pointer";
  const border = isLoading ? "border-zinc-800" : "border-zinc-700";
  const text = isLoading ? "text-zinc-600" : "text-white";

  return `rounded-full border font-bold transition-all transform active:scale-95 ${px} ${py} ${hover} ${cursor} ${border} ${text}`;
};

const getRSVPcolor = (rsvp: string | null | undefined) => {
  switch (rsvp) {
    case "Not Invited":
      return "bg-zinc-700";
    case "Invited":
      return "bg-zinc-500";
    case "Attending":
      return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
    case "Declined":
      return "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]";
    default:
      return "bg-zinc-600";
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

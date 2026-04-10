import { sharedStyles } from "../../utils/shared-styles";
import { BiCollapseVertical } from "react-icons/bi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { RiExpandUpDownLine } from "react-icons/ri";

import { type Dispatch, type SetStateAction } from "react";

type DashboardControlsProps = {
  collapseSections: boolean;
  setCollapseSections: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardControls({
  collapseSections,
  setCollapseSections,
}: DashboardControlsProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex cursor-pointer items-center gap-2 group transition-all hover:text-amber-200">
        <HiOutlineArrowsUpDown size={18} className="text-zinc-500 group-hover:text-amber-200" />
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-amber-200">
          Reordenar
        </button>
      </div>
      <div
        className="flex cursor-pointer items-center gap-2 group transition-all hover:text-amber-200"
        onClick={() => setCollapseSections((prev) => !prev)}
      >
        {collapseSections ? (
          <>
            <RiExpandUpDownLine
              size={18}
              className="text-zinc-500 group-hover:text-amber-200"
            />
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-amber-200">
              Expandir Todo
            </button>
          </>
        ) : (
          <>
            <BiCollapseVertical
              size={18}
              className="text-zinc-500 group-hover:text-amber-200"
            />
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-amber-200">
              Colapsar Todo
            </button>
          </>
        )}
      </div>
    </div>
  );
}

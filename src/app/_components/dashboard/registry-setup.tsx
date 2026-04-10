"use client";

import { sharedStyles } from "../../utils/shared-styles";
import Link from "next/link";
import Image from "next/image";
import PresentsImage from "../images/Birthday-Present-PNG-Pic.png";

type RegistrySetupProps = {
  setShowRegistrySetup: (x: boolean) => void;
};

export default function RegistrySetup({
  setShowRegistrySetup,
}: RegistrySetupProps) {
  return (
    <section className="py-10">
      <div className="flex items-center gap-10 bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
          <Image
            alt="mesa de regalos"
            src={PresentsImage}
            width="130"
            height="130"
            priority={true}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-3xl font-black italic text-white tracking-tight">
            Configura tu <span className="text-amber-200">mesa de regalos</span>
          </h2>
          <p className="my-5 text-zinc-400 font-light leading-relaxed max-w-md">
            Comparte tu lista de deseos con tus invitados vinculando una mesa de regalos existente o creando una nueva.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/registry">
              <button
                className="px-8 py-3 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-amber-200 transition-all transform active:scale-95 shadow-xl shadow-white/5"
              >
                Comenzar
              </button>
            </Link>
            <button
              className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors"
              onClick={() => {
                localStorage.setItem("registrySectionStatus", "hidden");
                setShowRegistrySetup(false);
              }}
            >
              Quizás más tarde
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

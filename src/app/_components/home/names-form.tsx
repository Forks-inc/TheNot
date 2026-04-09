"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { LoadingSpinner } from "../loaders";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, LogOut, Sparkles } from "lucide-react";
import Image from "next/image";

export default function NamesForm() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoaded = status !== "loading";
  const isSignedIn = !!session;

  const createWebsite = api.website.create.useMutation({
    onSuccess: () => (window.location.href = "/dashboard"),
  });

  const [nameData, setNameData] = useState({
    firstName: "",
    lastName: "",
    partnerFirstName: "",
    partnerLastName: "",
  });

  const handleOnChange = (field: string, input: string) => {
    setNameData((prev) => ({
      ...prev,
      [field]: input,
    }));
  };

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  const isFormValid = 
    nameData.firstName && 
    nameData.lastName && 
    nameData.partnerFirstName && 
    nameData.partnerLastName;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 font-sans text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/Users/arturo/.gemini/antigravity/brain/0e907c3d-87b2-4975-ad36-72660ed969eb/wedding_hero_abstract_1775755343955.png"
          alt="Background"
          fill
          className="object-cover blur-md scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-amber-200/10 flex items-center justify-center border border-amber-200/20">
            <Heart className="h-4 w-4 text-amber-200 fill-amber-200/20" />
          </div>
          <span className="text-sm font-light tracking-widest uppercase text-zinc-400">
            Hola, <span className="text-white font-medium">{user.name?.split(" ")[0]}</span>
          </span>
        </div>
        <button 
          onClick={() => void signOut()}
          className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Cerrar Sesión
        </button>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="mb-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-200 to-amber-100 p-0.5 shadow-xl shadow-amber-200/10"
            >
              <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-zinc-950">
                <Sparkles className="h-8 w-8 text-amber-200" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-extralight tracking-tight md:text-5xl">
              ¡Bienvenidos, <span className="font-serif italic text-amber-100">tortolitos!</span>
            </h1>
            <p className="mt-4 text-zinc-400 font-light">
              Para comenzar, necesitamos saber quiénes son los protagonistas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/60">Tus Datos</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Tu Nombre</label>
                  <input
                    placeholder="Escribe tu nombre"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-zinc-700 transition-all focus:border-amber-200/50 focus:outline-none"
                    value={nameData.firstName}
                    onChange={(e) => handleOnChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Tu Apellido</label>
                  <input
                    placeholder="Escribe tu apellido"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-zinc-700 transition-all focus:border-amber-200/50 focus:outline-none"
                    value={nameData.lastName}
                    onChange={(e) => handleOnChange("lastName", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/60">Tu Pareja</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Su Nombre</label>
                  <input
                    placeholder="Escribe su nombre"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-zinc-700 transition-all focus:border-amber-200/50 focus:outline-none"
                    value={nameData.partnerFirstName}
                    onChange={(e) => handleOnChange("partnerFirstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Su Apellido</label>
                  <input
                    placeholder="Escribe su apellido"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-zinc-700 transition-all focus:border-amber-200/50 focus:outline-none"
                    value={nameData.partnerLastName}
                    onChange={(e) => handleOnChange("partnerLastName", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            className="mt-12 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              type="button"
              disabled={createWebsite.isLoading || !isFormValid}
              onClick={() =>
                createWebsite.mutate({
                  ...nameData,
                  basePath: window.location.origin,
                  email: user.email ?? "",
                })
              }
              className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-12 py-5 text-sm font-bold text-black transition-all hover:bg-zinc-200 hover:shadow-2xl hover:shadow-white/10 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {createWebsite.isLoading ? (
                <div className="flex items-center gap-3">
                  <LoadingSpinner />
                  <span>Creando magía...</span>
                </div>
              ) : (
                <>
                  ¡Crear nuestro sitio web!
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              The Not &bull; Midnight Premium Edition
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

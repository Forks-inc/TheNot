"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Heart, Calendar, Users, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function NonAuthenticatedView() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 font-sans text-white">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/Users/arturo/.gemini/antigravity/brain/0e907c3d-87b2-4975-ad36-72660ed969eb/wedding_hero_abstract_1775755343955.png"
          alt="Wedding Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full border border-gold-500/50 bg-gradient-to-tr from-zinc-900 to-zinc-800 flex items-center justify-center">
            <Heart className="h-5 w-5 text-amber-200 fill-amber-200/20" />
          </div>
          <span className="text-xl font-light tracking-widest uppercase">The Not</span>
        </div>
        <button
          onClick={() => void signIn()}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium transition-all hover:bg-white/20 active:scale-95"
        >
          Iniciar Sesión
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-200 uppercase"
        >
          <Sparkles className="h-3 w-3" />
          Premium Wedding Experience
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-5xl font-extralight tracking-tight md:text-7xl lg:text-8xl"
        >
          Diseña tu boda, <br />
          <span className="font-serif italic text-amber-100">momento a momento.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-xl text-lg text-zinc-400 font-light leading-relaxed"
        >
          Crea un sitio web elegante, gestiona tus invitados y simplifica tu RSVP. 
          Todo en un solo lugar, diseñado para una boda inolvidable en México.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => void signIn()}
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95"
          >
            Comienza Gratis
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold transition-all hover:bg-white/5 active:scale-95"
          >
            Ver Demos
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-32 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: <Calendar className="h-6 w-6 text-amber-200" />,
              title: "Sitio Web Personalizado",
              desc: "Plantillas elegantes de alta gama que reflejan tu estilo único."
            },
            {
              icon: <Users className="h-6 w-6 text-amber-200" />,
              title: "Gestión de Invitados",
              desc: "Lista de invitados inteligente con seguimiento de confirmaciones en tiempo real."
            },
            {
              icon: <Heart className="h-6 w-6 text-amber-200" />,
              title: "Confirmaciones (RSVP)",
              desc: "Experiencia de confirmación fluida y segura con protección de contraseña."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-md transition-all hover:border-amber-200/30 hover:bg-white/10"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 group-hover:bg-amber-100 group-hover:text-black transition-colors">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

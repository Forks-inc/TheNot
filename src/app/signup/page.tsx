"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signupMutation = api.user.signup.useMutation({
    onSuccess: async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Error al iniciar sesión automáticamente. Por favor intenta entrar manualmente.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      setError(err.message === "User already exists" ? "El usuario ya existe" : err.message);
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    signupMutation.mutate({ email, password, name });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 font-sans text-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/Users/arturo/.gemini/antigravity/brain/0e907c3d-87b2-4975-ad36-72660ed969eb/wedding_hero_abstract_1775755343955.png"
          alt="Bakground"
          fill
          className="object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/5 backdrop-blur-xl">
            <Heart className="h-8 w-8 text-amber-200 fill-amber-200/20" />
          </div>
          <h1 className="text-4xl font-extralight tracking-tight">Crea tu cuenta</h1>
          <p className="mt-3 text-zinc-400 font-light">
            Comienza a planear tu boda inolvidable hoy mismo.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1" htmlFor="name">
                  Nombre Completo
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-amber-200" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-2xl border border-white/10 bg-black/40 px-11 py-4 text-white placeholder-zinc-600 transition-all focus:border-amber-200/50 focus:outline-none focus:ring-1 focus:ring-amber-200/50"
                    placeholder="Ej. Arturo G."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1" htmlFor="email">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-amber-200" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-2xl border border-white/10 bg-black/40 px-11 py-4 text-white placeholder-zinc-600 transition-all focus:border-amber-200/50 focus:outline-none focus:ring-1 focus:ring-amber-200/50"
                    placeholder="amor@tnot.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-amber-200" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-2xl border border-white/10 bg-black/40 px-11 py-4 text-white placeholder-zinc-600 transition-all focus:border-amber-200/50 focus:outline-none focus:ring-1 focus:ring-amber-200/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <>
                  Registrarse
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/api/auth/signin"
              className="font-semibold text-amber-200/80 transition-colors hover:text-amber-200 underline underline-offset-4"
            >
              Inicia Sesión
            </Link>
          </div>
        </div>

        {/* Brand Decoration */}
        <div className="mt-12 flex items-center justify-center gap-4 text-zinc-600">
          <div className="h-px w-12 bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-widest">The Not Premium</span>
          <div className="h-px w-12 bg-zinc-800" />
        </div>
      </motion.div>
    </div>
  );
}

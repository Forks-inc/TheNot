"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, LogIn, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-transparent" />
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Por favor verifica tu correo y contraseña.");
        setLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 font-sans text-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/Users/arturo/.gemini/antigravity/brain/0e907c3d-87b2-4975-ad36-72660ed969eb/wedding_hero_abstract_1775755343955.png"
          alt="Background"
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
          <h1 className="text-4xl font-extralight tracking-tight">Bienvenido de nuevo</h1>
          <p className="mt-3 text-zinc-400 font-light">
            Ingresa para continuar gestionando tu gran día.
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
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500" htmlFor="password">
                    Contraseña
                  </label>
                  <Link href="#" className="text-[10px] font-bold text-amber-200/60 transition-colors hover:text-amber-200 uppercase tracking-widest">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
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
                  Iniciar Sesión
                  <LogIn className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.2em]">
              <span className="bg-[#0c0c0e] px-4 text-zinc-600">O continúa con</span>
            </div>
          </div>

          <button
            onClick={() => void signIn("github")}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-sm font-semibold transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </button>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/signup"
              className="font-semibold text-amber-200/80 transition-colors hover:text-amber-200 underline underline-offset-4"
            >
              Regístrate gratis
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

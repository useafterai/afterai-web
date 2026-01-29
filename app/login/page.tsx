"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/console";

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/session/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }
      if (data?.ok) {
        router.push(returnTo);
        return;
      }
      setError("Invalid credentials");
    } catch {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gold-500/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl border border-white/14 bg-white/[0.04]">
          <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
          <p className="text-muted mb-8">Welcome back</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">Email or username</label>
              <input
                type="text"
                value={formData.identifier}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setError(null);
                  setFormData({ ...formData, identifier: e.target.value });
                }}
                className="input-afterai"
                placeholder="Email or username"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setError(null);
                  setFormData({ ...formData, password: e.target.value });
                }}
                className="input-afterai"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Signing in..." : "Log In"}
              {!isSubmitting && <FiArrowRight />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark flex items-center justify-center">
          <p className="text-muted">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

/**
 * Signup submits to the AfterAI backend signup endpoint.
 * API base URL: NEXT_PUBLIC_API_BASE_URL (default https://api.useafter.ai)
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.useafter.ai";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload: { username: string; email: string; password: string; name?: string } = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };
    if (formData.fullName.trim()) {
      payload.name = formData.fullName.trim();
    }

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = typeof data?.detail === "string" ? data.detail : data?.detail?.[0]?.msg ?? "Signup failed. Please try again.";
        setError(msg);
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gold-500/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.08\'/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay" />
      </div>

      <header className="border-b border-white/8 bg-dark/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
          <Link href="/login" className="text-sm text-muted hover:text-white transition-colors">
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-[400px]">
          <div className="relative pl-5 py-8 pr-8 rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-purple-500/60 to-gold-500/40" />

            {success ? (
              <div className="space-y-6">
                <h1 className="text-xl font-bold">Check your email</h1>
                <p className="text-muted text-sm leading-relaxed">
                  We sent a verification link to <span className="text-white font-medium">{formData.email}</span>. Click it to verify your account and get your API key.
                </p>
                <p className="text-muted text-sm">
                  Already verified?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold mb-1">Create your account</h1>
                <p className="text-sm text-muted mb-6">Start monitoring your AI changes</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">
                      Username <span className="text-white/60">(required)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => { setError(null); setFormData({ ...formData, username: e.target.value }); }}
                      className={`input-afterai ${error ? "input-afterai--error" : ""}`}
                      placeholder="letters, numbers, _ -"
                      required
                      minLength={3}
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">
                      Email <span className="text-white/60">(required)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setError(null); setFormData({ ...formData, email: e.target.value }); }}
                      className={`input-afterai ${error ? "input-afterai--error" : ""}`}
                      placeholder="you@company.com"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">
                      Password <span className="text-white/60">(required)</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => { setError(null); setFormData({ ...formData, password: e.target.value }); }}
                      className={`input-afterai ${error ? "input-afterai--error" : ""}`}
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">
                      Full name <span className="text-white/50">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => { setError(null); setFormData({ ...formData, fullName: e.target.value }); }}
                      className={`input-afterai ${error ? "input-afterai--error" : ""}`}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </div>

                  {error && (
                    <p className="input-afterai-error-text" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-[#0b0b12] font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Creating account…" : "Sign Up"}
                    {!isSubmitting && <FiArrowRight />}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted2">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

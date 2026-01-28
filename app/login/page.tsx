"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dataRegion: "US",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/console-coming-soon");
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
              <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">Data Region</label>
              <select
                value={formData.dataRegion}
                onChange={(e) => setFormData({ ...formData, dataRegion: e.target.value })}
                className="input-afterai"
                required
              >
                <option value="US">United States</option>
                <option value="EU">European Union</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-afterai"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted2 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-afterai"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Signing in..." : "Log In"}
              {!isSubmitting && <FiArrowRight />}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/12"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-muted2">Or use SSO</span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 w-full px-4 py-3 rounded-lg border border-white/16 bg-white/5 text-muted2 cursor-not-allowed"
            >
              SAML SSO (Coming soon)
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-muted2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

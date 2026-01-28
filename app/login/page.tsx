"use client";

import { useState } from "react";
import Link from "next/link";
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
    
    // Stub: In production, call API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Redirect to app console
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.22\'/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay rotate-12" />
        <div className="absolute -left-72 -top-72 h-[820px] w-[820px] rounded-full bg-gradient-radial from-purple-500/30 to-transparent blur-[70px] opacity-28" />
        <div className="absolute -right-80 top-32 h-[820px] w-[820px] rounded-full bg-gradient-radial from-gold-500/30 to-transparent blur-[70px] opacity-28" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500 to-gold-500 shadow-lg" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 backdrop-blur-xl">
          <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
          <p className="text-muted mb-8">Welcome back</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Data Region</label>
              <select
                value={formData.dataRegion}
                onChange={(e) => setFormData({ ...formData, dataRegion: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-white/16 bg-black/22 text-white outline-none focus:border-purple-500/55 focus:ring-4 focus:ring-purple-500/16"
                required
              >
                <option value="US">United States</option>
                <option value="EU">European Union</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-white/16 bg-black/22 text-white outline-none focus:border-purple-500/55 focus:ring-4 focus:ring-purple-500/16"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-white/16 bg-black/22 text-white outline-none focus:border-purple-500/55 focus:ring-4 focus:ring-purple-500/16"
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

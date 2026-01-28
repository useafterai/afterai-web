"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FiCheck, FiCopy, FiAlertCircle } from "react-icons/fi";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.useafter.ai";

function ValidateContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<{
    tenant_id: string;
    api_key: string;
    message: string;
    plan: string;
    ace_used: number;
    ace_limit: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid or missing verification link.");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/validate/${encodeURIComponent(token)}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const json = await res.json().catch(() => ({}));

        if (cancelled) return;

        if (!res.ok) {
          const msg =
            typeof json?.detail === "string"
              ? json.detail
              : json?.detail?.[0]?.msg ?? "Verification failed. Please try again or sign up again.";
          setErrorMessage(msg);
          setStatus("error");
          return;
        }

        setData(json);
        setStatus("success");
      } catch (err) {
        if (!cancelled) {
          setErrorMessage("Network error. Please check your connection and try again.");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const copyApiKey = () => {
    if (!data?.api_key) return;
    navigator.clipboard.writeText(data.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="w-full max-w-[480px]">
          <div className="relative pl-5 py-8 pr-8 rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-purple-500/60 to-gold-500/40" />

            {status === "loading" && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold">Verifying your email…</h1>
                <p className="text-muted text-sm">Please wait.</p>
              </div>
            )}

            {status === "success" && data && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <FiCheck className="w-5 h-5 text-gold-500" />
                  </div>
                  <h1 className="text-xl font-bold">Account verified</h1>
                </div>
                <p className="text-muted text-sm">{data.message}</p>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted2 uppercase tracking-wider">API key</span>
                    <button
                      type="button"
                      onClick={copyApiKey}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5"
                    >
                      <FiCopy className="w-3.5 h-3.5" />
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 font-mono text-sm text-white break-all">
                    {data.api_key}
                  </div>
                  <p className="mt-2 text-xs text-muted2">
                    Store this key securely. It won’t be shown again.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="text-muted2">Plan: {data.plan}</span>
                  <span className="text-muted2">ACE: {data.ace_used} / {data.ace_limit}</span>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-[#0b0b12] font-bold hover:shadow-lg transition-all"
                >
                  Sign in
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h1 className="text-xl font-bold">Verification failed</h1>
                </div>
                <p className="text-muted text-sm">{errorMessage}</p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/14 bg-white/5 text-white font-semibold hover:bg-white/8 transition-all"
                >
                  Sign up again
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ValidatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark flex items-center justify-center">
          <p className="text-muted">Loading…</p>
        </div>
      }
    >
      <ValidateContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 py-12">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.22\'/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay rotate-12" />
        <div className="absolute -left-72 -top-72 h-[820px] w-[820px] rounded-full bg-gradient-radial from-purple-500/30 to-transparent blur-[70px] opacity-28" />
        <div className="absolute -right-80 top-32 h-[820px] w-[820px] rounded-full bg-gradient-radial from-gold-500/30 to-transparent blur-[70px] opacity-28" />
      </div>

      <Link href="/" className="flex items-center gap-3 mb-10 self-start">
        <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
        <span className="text-xl font-bold">AfterAI</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 text-xs font-bold mb-6">
          Enterprise
        </div>
        <h1 className="text-3xl font-bold mb-2">Talk to us</h1>
        <p className="text-muted mb-8">
          Send us a message and we&apos;ll get back to you.
        </p>

        {status === "success" ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-white font-medium mb-2">Message sent.</p>
            <p className="text-muted text-sm mb-6">We&apos;ll be in touch soon.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-sm font-medium text-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-muted mb-1.5">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-muted2 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-muted mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-muted2 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-muted mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-muted2 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-transparent resize-y min-h-[100px]"
                placeholder="Tell us about your team and what you're looking for…"
              />
            </div>
            {status === "error" && errorMessage && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-muted2 text-center">
          <Link href="/#pricing" className="text-gold-500 hover:text-gold-400 font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark">
            ← Back to pricing
          </Link>
        </p>
      </div>
    </div>
  );
}

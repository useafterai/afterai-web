"use client";

import React, { useRef, useState } from "react";

export default function DecisionCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    const behavior = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      el.scrollBy({ left: -el.offsetWidth * 0.85, behavior });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      el.scrollBy({ left: el.offsetWidth * 0.85, behavior });
    }
  };

  const handleScroll = () => {
    setHasInteracted(true);
  };

  return (
    <div className="motion-section-content relative">
      {/* 3-step carousel: ACE, AURA, PACR */}
      <div className="relative">
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Decision flow carousel"
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="decision-carousel -mx-6 flex overflow-x-auto overscroll-x-contain px-6 pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-dark md:-mx-4 md:gap-6 md:px-4 md:pb-4"
        >
          <BentoCard id="slide-ace" label="ACE (AI Change Event)" headline="The decision-worthy moment" copy="Pending (human attention) → confirmed (billable). Your change feed — not your hot path.">
            <ACEThumbnail />
          </BentoCard>
          <BentoCard id="slide-aura" label="AURA (AI Upgrade Risk Assessment)" headline="Risk attached to ACE" copy="Prospective, Diagnostic, Counterfactual. Confidence-weighted deltas.">
            <AURAThumbnail />
          </BentoCard>
          <BentoCard id="slide-pacr" label="PACR (Production AI Change Record)" headline="Durable decision record" copy="Decision to act or not act. AURA and ACE converge here." badge="Coming soon">
            <PACRThumbnail />
          </BentoCard>
        </div>

        {/* Mobile: right-edge gradient peek + Swipe hint (disappears after first interaction) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-dark/90 to-transparent md:hidden"
        />
        {!hasInteracted && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-dark/90 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm md:hidden">
            Swipe →
          </div>
        )}
      </div>

      {/* AIS transversal footer (beneath carousel) */}
      <div className="mt-6 rounded-lg border border-white/[0.08] bg-white/[0.015] px-4 py-3" aria-hidden>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div>
            <span className="text-xs font-medium text-muted2/90">AIS (AI Indicator Signals)</span>
            <p className="text-xs text-muted2/70 mt-0.5 max-w-xl">
              Continuous pre-decision signals that feed ACE, inform AURA, and are cited in PACR.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["drift", "regression", "disagreement", "staleness"].map((chip) => (
              <span key={chip} className="px-2 py-0.5 text-[10px] rounded border border-white/[0.08] bg-white/[0.03] text-muted2/90">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoCard({
  id,
  label,
  headline,
  copy,
  badge,
  children,
}: {
  id?: string;
  label: string;
  headline: string;
  copy: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="decision-carousel-card bento-card group flex w-[85vw] min-w-[280px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:w-[min(420px,72vw)] md:min-w-[320px]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="inline-flex px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-lg border border-white/10 bg-white/5 text-muted2 leading-tight">
          {label}
        </span>
        {badge && (
          <span className="px-2 py-1 text-xs rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 font-semibold flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-bold text-white mb-2">{headline}</h3>
      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{copy}</p>
      <div className="rounded-xl border border-white/10 bg-dark/60 overflow-hidden max-h-[180px]">
        {children}
      </div>
    </div>
  );
}

function ACEThumbnail() {
  const entries = [
    { status: "pending", chips: ["provider change", "risk: medium"] },
    { status: "confirmed", chips: ["prompt change", "owner: team-alpha"] },
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="text-[10px] font-semibold text-muted2 uppercase tracking-wide mb-2">Change Feed</div>
      {entries.map((e, i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[10px] font-semibold ${e.status === "pending" ? "text-muted2" : "text-gold-500/90"}`}>{e.status}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {e.chips.map((c) => (
              <span key={c} className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 text-muted2">{c}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AURAThumbnail() {
  const metrics = [
    { label: "Quality", before: "92", after: "94", delta: "+2" },
    { label: "Latency", before: "120ms", after: "95ms", delta: "-25" },
    { label: "Cost", before: "1.0x", after: "1.1x", delta: "+10%" },
  ];
  return (
    <div className="w-full p-3">
      <div className="text-[10px] font-semibold text-muted2 uppercase tracking-wide mb-2">Delta</div>
      <div className="rounded-lg border border-white/10 bg-white/[0.04] divide-y divide-white/10">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between py-2 px-2 text-[10px] first:pt-2 last:pb-2">
            <span className="text-muted2">{m.label}</span>
            <div className="flex items-center gap-2 tabular-nums">
              <span className="text-muted line-through">{m.before}</span>
              <span className="text-white font-medium">{m.after}</span>
              <span className="text-gold-500/90 font-semibold">{m.delta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PACRThumbnail() {
  const fields = ["Decision", "Owner", "Evidence", "Risk", "Scope"];
  return (
    <div className="w-full p-3">
      <div className="text-[10px] font-semibold text-muted2 uppercase tracking-wide mb-2">Record preview</div>
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5 space-y-1.5">
        {fields.map((f) => (
          <div key={f} className="flex justify-between text-[10px] py-0.5">
            <span className="text-muted2">{f}</span>
            <span className="text-muted">—</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck, FiChevronDown } from "react-icons/fi";

type CardId = "monitor" | "assess" | "enterprise";

type ExpandGroup = {
  heading: string;
  items: string[];
};

function ExpandGroupBlock({ heading, items }: ExpandGroup) {
  return (
    <div className="mb-4 last:mb-0">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/80 mb-2">
        {heading}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-muted2">
            <FiCheck className="mt-0.5 text-gold-500/80 flex-shrink-0 w-3.5 h-3.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingCardInner({
  id,
  title,
  price,
  priceSubline,
  tagline,
  bullets,
  expandedGroups,
  expanded,
  onToggle,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  featured,
}: {
  id: CardId;
  title: string;
  price: string;
  priceSubline?: string;
  tagline: string;
  bullets: string[];
  expandedGroups: ExpandGroup[];
  expanded: boolean;
  onToggle: () => void;
  ctaLabel: string;
  ctaHref?: string;
  ctaDisabled?: boolean;
  featured?: boolean;
}) {
  const panelId = `pricing-details-${id}`;
  const isOpen = expanded;

  return (
    <div
      className={`flex h-full flex-col p-6 rounded-xl border transition-all duration-200 ${
        featured
          ? "border-gold-500/30 bg-gradient-to-b from-white/10 to-white/5 hover:border-gold-500/40"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-xl">{title}</h3>
        {featured && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 flex-shrink-0">
            Available now
          </span>
        )}
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold">{price}</span>
        {priceSubline && (
          <p className="text-sm text-muted2 mt-1">{priceSubline}</p>
        )}
      </div>
      <p className="text-sm text-muted2 mb-4">{tagline}</p>

      {/* Collapsed: exactly 3 bullets — slightly larger than expanded */}
      <ul className="space-y-2 mb-4">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-muted">
            <FiCheck className="mt-0.5 text-gold-500 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Expand control */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="pricing-chevron flex items-center gap-2 text-xs font-medium text-muted2 hover:text-white transition-colors mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded"
      >
        See technical limits
        <FiChevronDown
          className={`w-4 h-4 transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {/* Expandable panel — accordion: only content area animates */}
      <div
        id={panelId}
        role="region"
        aria-label={`Technical limits for ${title}`}
        className={`pricing-expand-content grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-4 border-t border-white/10 space-y-4 opacity-100 transition-opacity duration-200">
            {expandedGroups.map((g) => (
              <ExpandGroupBlock
                key={g.heading}
                heading={g.heading}
                items={g.items}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA — static, always at bottom */}
      <div className="mt-6 pt-4 border-t border-white/8 flex flex-col flex-1 justify-end">
        <div className="w-full min-h-[48px] flex items-center justify-center rounded-lg">
          {ctaDisabled ? (
            <button
              type="button"
              disabled
              className="w-full min-h-[48px] flex items-center justify-center px-4 rounded-lg border border-dashed border-white/12 bg-white/[0.03] text-muted2 font-semibold text-[15px] cursor-not-allowed opacity-90"
              aria-disabled="true"
            >
              {ctaLabel}
            </button>
          ) : ctaHref ? (
            <Link
              href={ctaHref}
              className="w-full min-h-[48px] flex items-center justify-center px-4 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold text-[15px] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [expandedId, setExpandedId] = useState<CardId | null>(null);

  const handleToggle = (id: CardId) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="pricing" className="border-t border-white/8">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
        <span className="section-heading-anchor" aria-hidden="true" />
        <div className="p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 motion-section-heading">
              Start decision-grade AI change intelligence for free.
            </h2>
            <p className="text-muted motion-section-content">
              Monitor is live. Assess and Enterprise are coming soon.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch motion-section-content">
            <PricingCardInner
              id="monitor"
              title="Monitor"
              price="$0 / month"
              tagline="See AI systems change early."
              bullets={[
                "Unlimited AI Indicator Signals (AIS)",
                "Light AI change tracking",
                "1 preview AURA / month",
              ]}
              expandedGroups={[
                {
                  heading: "Usage & limits",
                  items: [
                    "25 ACE events / month",
                    "Unlimited AIS signals",
                  ],
                },
                {
                  heading: "Evaluation",
                  items: [
                    "1 preview AURA / month (lite depth, not exportable)",
                  ],
                },
                {
                  heading: "Add-ons",
                  items: [
                    "Lite AURA: $99 one-time / month (lite depth, not exportable)",
                  ],
                },
                {
                  heading: "Support",
                  items: ["Email support"],
                },
              ]}
              expanded={expandedId === "monitor"}
              onToggle={() => handleToggle("monitor")}
              ctaLabel="Get started"
              ctaHref="/signup"
              featured
            />

            <PricingCardInner
              id="assess"
              title="Assess"
              price="$250 / month"
              tagline="Evaluate AI changes before they ship."
              bullets={[
                "Everything in Monitor, plus",
                "Up to 100 AURAs / month",
                "Exportable results + advanced analytics",
              ]}
              expandedGroups={[
                {
                  heading: "Evaluation & reporting",
                  items: [
                    "Up to 100 full-depth AURA assessments / month",
                    "Exportable results (PDF/JSON)",
                    "Historical comparisons + baselines",
                  ],
                },
                {
                  heading: "Usage",
                  items: [
                    "1,000 ACEs / month",
                    "Unlimited AIS signals",
                  ],
                },
                {
                  heading: "Access & governance",
                  items: [
                    "SSO (single IdP)",
                    "Basic RBAC (Admin / Member / Viewer)",
                    "Limited audit log (7–14 days)",
                  ],
                },
                {
                  heading: "Support",
                  items: ["Priority support"],
                },
              ]}
              expanded={expandedId === "assess"}
              onToggle={() => handleToggle("assess")}
              ctaLabel="Coming soon"
              ctaDisabled
            />

            <PricingCardInner
              id="enterprise"
              title="Enterprise"
              price="Custom"
              priceSubline="Starts at $4,500/month"
              tagline="Make AI decisions defensible."
              bullets={[
                "Everything in Assess, plus",
                "Immutable PACRs + approvals",
                "Enterprise security & controls",
              ]}
              expandedGroups={[
                {
                  heading: "Records & accountability",
                  items: [
                    "Immutable PACRs",
                    "Approval metadata (who / when / why)",
                    "Retention policies",
                  ],
                },
                {
                  heading: "Security & isolation",
                  items: [
                    "Single-tenant eval compute (private / isolated)",
                    "Optional customer-managed keys (BYOK)",
                    "Full audit logs",
                  ],
                },
                {
                  heading: "Integrations & support",
                  items: [
                    "Custom integrations",
                    "SLA / dedicated support",
                  ],
                },
              ]}
              expanded={expandedId === "enterprise"}
              onToggle={() => handleToggle("enterprise")}
              ctaLabel="Talk to us"
              ctaHref="/signup"
            />
          </div>

          <p className="mt-6 text-center">
            <Link
              href="#pricing-specs"
              className="text-sm font-medium text-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded"
            >
              View full pricing specifications →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

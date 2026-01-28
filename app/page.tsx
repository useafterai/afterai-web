import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.22\'/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay rotate-12" />
        <div className="absolute -left-72 -top-72 h-[820px] w-[820px] rounded-full bg-gradient-radial from-purple-500/30 to-transparent blur-[70px] opacity-28 animate-float" />
        <div className="absolute -right-80 top-32 h-[820px] w-[820px] rounded-full bg-gradient-radial from-gold-500/30 to-transparent blur-[70px] opacity-28 animate-float" style={{ animationDelay: "2s", animationDuration: "12s" }} />
        <div className="absolute left-1/4 -bottom-[420px] h-[820px] w-[820px] rounded-full bg-gradient-radial from-purple-500/20 to-transparent blur-[70px] opacity-22 animate-float" style={{ animationDelay: "4s", animationDuration: "14s" }} />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark/55 border-b border-white/8">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#product" className="text-muted hover:text-white transition-colors">Product</Link>
            <Link href="#pricing" className="text-muted hover:text-white transition-colors">Pricing</Link>
            <Link href="#docs" className="text-muted hover:text-white transition-colors">Docs</Link>
            <Link href="/login" className="text-muted hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold hover:shadow-lg transition-all">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 text-xs font-bold mb-6">
              <span>Monitor Plan Available</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Production AI changes<br />require evidence.
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
              AfterAI helps teams running AI in production understand upgrade risk and drift — and keep a clear decision trail when changes matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-2"
              >
                Get started
                <FiArrowRight />
              </Link>
              <Link
                href="/console-coming-soon"
                className="px-8 py-4 rounded-xl border border-white/16 bg-white/5 text-white font-semibold hover:bg-white/8 transition-all"
              >
                Console (Coming Soon)
              </Link>
            </div>
          </div>

          {/* Value Tiles — AURA / ACE / PACR */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            <ValueTile
              title="AURA"
              subtitle="AI Upgrade Risk Assessment"
              description="Delta-focused evaluation before changes. Understand upgrade risk with confidence-weighted deltas across quality, cost, latency, stability, and safety."
            />
            <ValueTile
              title="ACE"
              subtitle="AI Change Event"
              description="Change-centric visibility and usage unit. Track every AI change event with full context and metadata."
            />
            <ValueTile
              title="PACR"
              subtitle="Production AI Change Record"
              description="Decision artifact for locked changes. Keep a clear, defensible trail when changes matter most."
              badge="Coming soon"
            />
          </div>

          {/* Distinct section: Deltas / Provider-Neutral / No Proxy */}
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-3">Built for production, not your hot path</h2>
                <p className="text-muted leading-relaxed">
                  AfterAI gives you confidence-weighted deltas, works with any provider, and never sits in front of your inference.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-4">
                <PillItem label="Confidence-weighted deltas" desc="Quality, cost, latency, stability, safety" />
                <PillItem label="Provider-neutral, out-of-band" desc="Fail-open; not in your inference path" />
                <PillItem label="No routing proxy" desc="Zero hot-path impact; capture without intercepting" />
              </div>
            </div>
          </div>

          {/* Pricing Teaser */}
          <div id="pricing" className="mt-24">
            <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 backdrop-blur-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Start monitoring for free</h2>
                <p className="text-muted">Monitor Plan includes ACE capture and basic visibility</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <PricingCard
                  name="Monitor"
                  price="$0"
                  period="month"
                  features={["25 ACE events/month", "Change Feed access", "Basic dashboards", "Email support"]}
                  highlighted
                />
                <PricingCard
                  name="Assess"
                  price="$99"
                  period="month"
                  features={["Unlimited ACE events", "Full AURA assessments", "Advanced analytics", "Priority support"]}
                  comingSoon
                />
                <PricingCard
                  name="Enterprise"
                  price="Custom"
                  period=""
                  features={["PACR access", "Custom integrations", "Dedicated support", "SLA guarantees"]}
                  comingSoon
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center text-sm text-muted2">
          <span>© {new Date().getFullYear()} AfterAI</span>
        </div>
      </footer>
    </div>
  );
}

function ValueTile({ title, subtitle, description, badge }: { title: string; subtitle: string; description: string; badge?: string }) {
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-gold-500/20 hover:bg-white/6 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted2 mb-3">{subtitle}</p>
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 font-semibold">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function PillItem({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
      <span className="text-sm font-semibold text-white flex-shrink-0">{label}</span>
      <span className="text-sm text-muted2">{desc}</span>
    </div>
  );
}

function PricingCard({ name, price, period, features, highlighted, comingSoon }: { name: string; price: string; period: string; features: string[]; highlighted?: boolean; comingSoon?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border ${highlighted ? "border-gold-500/30 bg-gradient-to-b from-white/10 to-white/5" : "border-white/10 bg-white/5"}`}>
      <h3 className="font-bold text-xl mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {period && <span className="text-muted2 ml-2">/{period}</span>}
      </div>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted">
            <FiCheck className="mt-0.5 text-gold-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {highlighted && (
        <Link
          href="/signup"
          className="mt-6 block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold hover:shadow-lg transition-all"
        >
          Get started
        </Link>
      )}
      {comingSoon && (
        <button
          type="button"
          disabled
          className="mt-6 w-full px-4 py-2 rounded-lg border border-white/12 bg-white/5 text-muted2 font-semibold cursor-not-allowed"
        >
          Coming soon
        </button>
      )}
    </div>
  );
}

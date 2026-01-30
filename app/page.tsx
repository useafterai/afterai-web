import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck, FiSlash } from "react-icons/fi";

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
            <Link href="#product" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Product</Link>
            <Link href="#pricing" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Pricing</Link>
            <Link href="#docs" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Docs</Link>
            <Link href="/login" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Sign in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* 1. Hero */}
        <section id="product" className="max-w-5xl mx-auto px-6 py-24 md:py-32 animate-fade-in-up section-with-anchor">
          <div className="text-center">
            <span className="section-heading-anchor block text-center mx-auto" aria-hidden="true" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 text-xs font-bold mb-6">
              <span>Monitor available now · More plans coming soon</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Production AI changes<br />require evidence.
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
              AfterAI gives platform teams upgrade risk, change visibility, and a defensible decision trail — without touching the inference path.
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
                See the console
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Problem framing */}
        <section className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 motion-section-heading">Upgrades shouldn&apos;t be a leap of faith.</h2>
            <div className="motion-section-content">
            <p className="text-muted leading-relaxed mb-4 max-w-3xl">
              Every model swap, prompt change, or config update is a decision. Without evidence, you&apos;re guessing on risk. AfterAI turns change into measurable upgrade risk and a clear decision trail so platform teams and leadership can move with confidence.
            </p>
            <p className="text-sm text-muted2 italic max-w-2xl">
              With faster model releases, provider deprecations, and agentic systems in production, AI change is now continuous — but approvals haven&apos;t caught up.
            </p>
            </div>
          </div>
        </section>

        {/* 3. Who it's for */}
        <section className="border-t border-white/8">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6 motion-section-heading">Built for platform teams who own AI in production.</h2>
            <div className="motion-section-content">
            <ul className="space-y-3 text-muted max-w-2xl mb-4">
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
                <span>Heads of AI Platform and ML Platform shipping model and pipeline changes.</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
                <span>Teams who need upgrade risk and change visibility — not another observability dashboard.</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
                <span>Organizations that need a clear, defensible answer when leadership asks what changed and why.</span>
              </li>
            </ul>
            <p className="text-sm text-muted2">If you don&apos;t run AI in production, this probably isn&apos;t for you.</p>
            </div>
          </div>
        </section>

        {/* 4. Core concepts — AURA, ACE, PACR */}
        <section className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <div className="motion-section-heading">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 mb-8 max-w-2xl transition-all hover:border-gold-500/20 focus-within:border-gold-500/20">
              <p className="font-semibold text-white mb-2">The decision moment</p>
              <p className="text-sm text-muted leading-relaxed">
                Every production AI change eventually reaches a point where someone must approve it — often with incomplete information. AfterAI is built specifically for that moment.
              </p>
            </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch motion-section-content">
              <ValueTile
                title="AURA"
                subtitle="AI Upgrade Risk Assessment"
                description="Delta-focused evaluation before you ship. Confidence-weighted deltas across quality, cost, latency, stability, and safety so you understand upgrade risk before it hits production."
              />
              <ValueTile
                title="ACE"
                subtitle="AI Change Event"
                description="Every change, one unit. Track model swaps, config changes, and pipeline updates with full context. Your change feed — not your hot path."
              />
              <ValueTile
                title="PACR"
                subtitle="Production AI Change Record"
                description="The durable artifact when a change is locked. A clear, auditable record for the changes that matter most."
                badge="Coming soon"
              />
            </div>
            <p className="text-sm text-muted2 mt-4">PACR is where AURA and ACE converge into a system of record.</p>
          </div>
        </section>

        {/* 5. What AfterAI is not — contrast beat, tied to Core Concepts */}
        <section className="border-t border-white/8">
          <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-10 md:pb-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-4 motion-section-heading">By contrast</p>
            <div className="max-w-2xl rounded-xl border border-white/10 bg-white/[0.04] p-8 md:p-10 motion-section-content">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                  <FiSlash className="w-5 h-5 text-muted2" aria-hidden />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">What AfterAI is not</h2>
                  <p className="text-sm text-muted2">Clear boundaries</p>
                </div>
              </div>
              <ul className="space-y-3 text-muted mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-gold-500/70 mt-0.5">×</span>
                  <span>Not request-level observability or logging.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500/70 mt-0.5">×</span>
                  <span>Not prompt tuning, routing, or automatic model switching.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500/70 mt-0.5">×</span>
                  <span>Not a compliance tool that shows up after decisions are already made.</span>
                </li>
              </ul>
              <p className="text-muted leading-relaxed border-t border-white/8 pt-6">
                AfterAI exists at the decision moment — when a change is proposed and someone has to say yes or no.
              </p>
            </div>
          </div>
        </section>

        {/* 6. How it works / architecture */}
        <section id="docs" className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4 motion-section-heading">Built for production, not your hot path.</h2>
            <div className="motion-section-content">
            <p className="text-muted leading-relaxed mb-8 max-w-2xl">
              AfterAI uses confidence-weighted deltas, works with any provider, and never sits in front of your inference. Capture change and risk out-of-band — no proxy, no routing, zero impact on latency.
            </p>
            <div className="flex flex-col sm:flex-row md:flex-wrap gap-4 mb-10">
              <PillItem label="Confidence-weighted deltas" desc="Quality, cost, latency, stability, safety" />
              <PillItem label="Provider-neutral, out-of-band" desc="Fail-open; not in your inference path" />
              <PillItem label="No routing proxy" desc="Zero hot-path impact; capture without intercepting" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-sm font-semibold text-muted2 uppercase tracking-wide mb-3">Before AfterAI</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Slack threads and screenshots</li>
                  <li>Metrics without context</li>
                  <li>&quot;It seemed fine&quot; approvals</li>
                  <li>No durable record</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wide mb-3">With AfterAI</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Explicit AI Change Events (ACE)</li>
                  <li>Measured upgrade risk (AURA)</li>
                  <li>Confidence-weighted deltas</li>
                  <li>Defensible decision trail</li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* 7. Pricing */}
        <section id="pricing" className="border-t border-white/8">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <div className="p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 backdrop-blur-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 motion-section-heading">Start monitoring for free.</h2>
                <p className="text-muted motion-section-content">Monitor is live. Assess and Enterprise are coming soon.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 items-stretch motion-section-content">
                <PricingCard
                  name="Monitor"
                  price="$0"
                  period="month"
                  features={["25 ACE events/month", "Change Feed, basic dashboards", "Email support", "1 preview AURA/month"]}
                  addOn="Need one full assessment now? Add one full AURA for $99 (one-time)."
                  ctaLabel="Get started"
                  ctaHref="/signup"
                  highlighted
                />
                <PricingCard
                  name="Assess"
                  price="$250"
                  period="month"
                  features={["Unlimited ACE", "Full AURA assessments", "Advanced analytics", "Priority support"]}
                  ctaLabel="Coming soon"
                  comingSoon
                />
                <PricingCard
                  name="Enterprise"
                  price="$4,500"
                  priceSub="or custom"
                  period="month"
                  features={["PACR", "Custom integrations", "Dedicated support", "SLA"]}
                  ctaLabel="Talk to us"
                  comingSoon
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Trust & coming-soon */}
        <section id="trust" className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <h2 className="text-2xl font-bold mb-4 motion-section-heading">Early access, real product.</h2>
            <div className="motion-section-content">
            <p className="text-muted leading-relaxed mb-6 max-w-2xl">
              AfterAI is in early access. Monitor is live — sign up, capture AI Change Events, and run a preview AURA on a real upgrade. We&apos;re building Assess and Enterprise with platform teams like yours.
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li className="flex items-center gap-2"><FiCheck className="text-gold-500 flex-shrink-0" /> Connect your first system</li>
              <li className="flex items-center gap-2"><FiCheck className="text-gold-500 flex-shrink-0" /> Capture AI Change Events (ACE)</li>
              <li className="flex items-center gap-2"><FiCheck className="text-gold-500 flex-shrink-0" /> See how often AI is actually changing</li>
              <li className="flex items-center gap-2"><FiCheck className="text-gold-500 flex-shrink-0" /> Run a preview AURA on a real upgrade</li>
            </ul>
            <p className="text-sm text-muted2 mb-6">No credit card required for Monitor. Provider-neutral — bring your own models and pipelines.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all">
                Get started free
              </Link>
              <Link href="/console-coming-soon" className="px-6 py-3 rounded-xl border border-white/16 bg-white/5 text-white font-semibold hover:bg-white/8 transition-all">
                Request a demo
              </Link>
            </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
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
    <div className="flex h-full flex-col p-6 rounded-xl border border-white/10 bg-white/5 hover:border-gold-500/20 hover:bg-white/6 transition-all duration-200 group hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted2 mb-3">{subtitle}</p>
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 font-semibold flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-muted leading-relaxed flex-1 min-h-0">{description}</p>
    </div>
  );
}

function PillItem({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 transition-all duration-200 hover:border-white/14 hover:bg-white/[0.07]">
      <span className="text-sm font-semibold text-white flex-shrink-0">{label}</span>
      <span className="text-sm text-muted2">{desc}</span>
    </div>
  );
}

type PricingCardProps = {
  name: string;
  price: string;
  priceSub?: string;
  period: string;
  features: string[];
  addOn?: string;
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  comingSoon?: boolean;
};

function PricingCard({ name, price, priceSub, period, features, addOn, ctaLabel, ctaHref, highlighted, comingSoon }: PricingCardProps) {
  return (
    <div className={`flex h-full flex-col p-6 rounded-xl border transition-all duration-200 ${highlighted ? "border-gold-500/30 bg-gradient-to-b from-white/10 to-white/5 hover:border-gold-500/40" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"}`}>
      <div className="flex-1 min-h-0 flex flex-col">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {priceSub && <span className="text-lg font-semibold text-muted2 ml-1">{priceSub}</span>}
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
        {addOn && (
          <p className="mt-4 text-xs text-muted2 border-t border-white/8 pt-4">{addOn}</p>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-white/8 flex items-end">
        <div className="w-full min-h-[48px] flex items-center justify-center rounded-lg">
          {highlighted && ctaHref && (
            <Link
              href={ctaHref}
              className="w-full min-h-[48px] flex items-center justify-center px-4 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold text-[15px] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              {ctaLabel ?? "Get started"}
            </Link>
          )}
          {comingSoon && (
            <button
              type="button"
              disabled
              className="w-full min-h-[48px] flex items-center justify-center px-4 rounded-lg border border-dashed border-white/12 bg-white/[0.03] text-muted2 font-semibold text-[15px] cursor-not-allowed opacity-90"
              aria-disabled="true"
            >
              {ctaLabel ?? "Coming soon"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

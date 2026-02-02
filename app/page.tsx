import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import PricingSection from "@/components/PricingSection";
import DecisionCarousel from "@/components/DecisionCarousel";

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
            <Link href="/faq" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">FAQ</Link>
            <Link href="#docs" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Docs</Link>
            <Link href="/security" className="text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Security</Link>
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

        {/* 4. Canonical flow — AIS → ACE → AURA → PACR */}
        <section id="decision-moment" className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <div className="motion-section-heading mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">The decision moment</h2>
              <p className="text-muted leading-relaxed max-w-2xl">
                Every production AI change — or decision not to change — eventually reaches a point where someone must act. AfterAI is built for that moment: from pre-decision signals to durable records.
              </p>
            </div>
            {/* 3-step carousel: ACE, AURA, PACR | AIS as transversal */}
            <DecisionCarousel />
            <p className="text-sm text-muted2 mt-6 motion-section-content">Canonical flow: AIS → ACE → (AURA + PACR). We support both planned changes and no-change scenarios: when drift is detected but you decide to defer, the record still exists.</p>
          </div>
        </section>

        {/* 5. How it works / architecture */}
        <section id="docs" className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4 motion-section-heading">Built for production, not your hot path.</h2>
            <div className="motion-section-content">
            <p className="text-muted leading-relaxed mb-8 max-w-2xl">
              AfterAI uses confidence-weighted deltas, works with any provider, and never sits in front of your inference. No inference-path instrumentation, no production traffic logging — controlled, offline evaluations only. Capture change and risk out-of-band; zero impact on latency.
            </p>
            <div className="flex flex-col sm:flex-row md:flex-wrap gap-4 mb-10">
              <PillItem label="No inference-path instrumentation" desc="Never in front of your inference" />
              <PillItem label="No production traffic logging" desc="Controlled, offline evaluations only" />
              <PillItem label="Provider-neutral, out-of-band" desc="Fail-open; no proxy, no routing" />
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
          </div>
        </section>

        {/* 7. Pricing — accordion cards, 3 bullets collapsed, expand for technical limits */}
        <PricingSection />

        {/* FAQ — first 4 + Why DIY + link to full FAQ */}
        <section id="faq" className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold mb-8 motion-section-heading">FAQ</h2>
            <div className="faq motion-section-content space-y-3">
              <details className="faqitem">
                <summary>How is this different from model evaluation tools?</summary>
                <div className="faq-answer">
                  Evaluation tools tell you which model performed better. AfterAI tells you whether a change should be approved, what the trade-offs are, and who approved it — and preserves that decision over time.
                </div>
              </details>
              <details className="faqitem">
                <summary>Is AfterAI observability?</summary>
                <div className="faq-answer">
                  No. AfterAI is not request-level observability, tracing, or logging. It operates at the change level, not the inference level.
                </div>
              </details>
              <details className="faqitem">
                <summary>Does AfterAI sit in the inference path?</summary>
                <div className="faq-answer">
                  No. AfterAI is completely out-of-band. It does not proxy traffic, route requests, or block production calls. Telemetry is asynchronous and designed to fail open.
                </div>
              </details>
              <details className="faqitem">
                <summary>Do you need to send prompts or model outputs?</summary>
                <div className="faq-answer">
                  No. AfterAI is metadata-first by default. Prompt and output capture is optional, sampled, and fully controllable with redaction and retention policies.
                </div>
              </details>
              <details className="faqitem">
                <summary>Why go with AfterAI instead of DIY?</summary>
                <div className="faq-answer">
                  Building change intelligence in-house means maintaining eval pipelines, escalation logic, and audit trails yourself. AfterAI gives you a canonical flow (AIS → ACE → AURA → PACR), consistent limits and billing, and a defensible decision trail without owning the full stack. You get decision-grade evidence and optional PACRs when you need them, without building observability or request-level telemetry.
                </div>
              </details>
            </div>
            <p className="mt-6 motion-section-content">
              <Link href="/faq" className="text-sm font-medium text-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
                See a full list of FAQ →
              </Link>
            </p>
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
            <p className="text-sm text-muted2 mb-6">No credit card required for Monitor. Provider-neutral — bring your own models and pipelines. Security is built in — same posture whether you use the console, API, or SDK. <Link href="/security" className="text-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded font-medium">Security overview →</Link></p>
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

        {/* Security */}
        <section id="security" className="border-t border-white/8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 section-with-anchor">
            <span className="section-heading-anchor" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 motion-section-heading">Security built for production.</h2>
            <div className="motion-section-content">
            <p className="text-muted leading-relaxed mb-4 max-w-2xl">
              The same authentication and access model applies whether you use the console, the API, or the SDK. We&apos;re built for teams who need a defensible, audit-friendly posture.
            </p>
            <p className="text-muted leading-relaxed mb-6 max-w-2xl">
              We never sit in your inference path; telemetry is out-of-band and designed to fail open.
            </p>
            <Link href="/security" className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
              Security overview
              <FiArrowRight />
            </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 9. Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted2">
          <span>© {new Date().getFullYear()} AfterAI</span>
          <div className="flex items-center gap-6">
            <Link href="/security" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Security</Link>
            <Link href="/privacy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Terms</Link>
          </div>
        </div>
      </footer>
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


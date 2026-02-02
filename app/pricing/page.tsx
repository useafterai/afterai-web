import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.22\'/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay rotate-12" />
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark/55 border-b border-white/8">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#pricing" className="text-muted hover:text-white transition-colors text-sm">
              Pricing cards
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold hover:shadow-lg transition-all text-sm">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8 transition-colors">
          ← Back to home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Full pricing specifications</h1>
        <p className="text-muted mb-12 max-w-2xl">
          Definitions, tier limits, and feature details. For a quick overview, see the <Link href="/#pricing" className="text-gold-500 hover:underline">pricing cards</Link> on the homepage.
        </p>

        <div className="space-y-12 text-sm text-muted">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-4">Definitions</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-medium text-white/90">AIS (AI Indicator Signals)</dt>
                <dd className="pl-4 mt-1">Pre-decision signals: drift, regression, disagreement, staleness. High-volume, non-billable, informational only.</dd>
              </div>
              <div>
                <dt className="font-medium text-white/90">ACE (AI Change Event)</dt>
                <dd className="pl-4 mt-1">Decision-worthy moment. States: pending (human attention) → confirmed (billable).</dd>
              </div>
              <div>
                <dt className="font-medium text-white/90">AURA</dt>
                <dd className="pl-4 mt-1">Risk assessment attached to an ACE. Modes: Prospective, Diagnostic, Counterfactual. Lite depth (preview) is not exportable; full-depth assessments are exportable on Assess and above.</dd>
              </div>
              <div>
                <dt className="font-medium text-white/90">PACR (Production AI Change Record)</dt>
                <dd className="pl-4 mt-1">Durable decision record. Immutable on Enterprise. May represent a decision to act or not act.</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-4">Tier summary</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li><strong className="text-white/90">Monitor:</strong> 1 AI system (additional systems require upgrade), 25 ACE/month, unlimited AIS, 1 preview AURA/month (lite depth). Add-on: Lite AURA $99 one-time/month (lite depth, not exportable).</li>
              <li><strong className="text-white/90">Assess:</strong> 1,000 ACEs/month, up to 100 full-depth AURAs/month, exportable results, SSO, RBAC, audit log 7–14 days.</li>
              <li><strong className="text-white/90">Enterprise:</strong> Everything in Assess plus PACR, single-tenant eval compute, BYOK, retention policies, custom integrations, SLA. Custom pricing (starts at $4,500/month).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-4">Features by tier</h2>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-white/90 mb-2">Monitor</h3>
                <p className="text-muted text-sm mb-2">1 AI system (additional systems require upgrade). The free tier lets you monitor one system at a time — for example one chatbot, one agent, or one pipeline. Light AI change tracking, unlimited AIS, 1 preview AURA/month (lite depth, not exportable). Email support. Add-on: Lite AURA $99 one-time/month for an extra lite-depth assessment (not exportable).</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-2">Assess</h3>
                <p className="text-muted text-sm">Everything in Monitor, plus up to 100 full-depth AURA assessments/month, exportable results (PDF/JSON), historical comparisons and baselines, 1,000 ACEs/month, SSO (single IdP), basic RBAC (Admin / Member / Viewer), limited audit log (7–14 days), priority support. No add-on or pay-per-AURA; full evaluation depth and export included.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-2">Enterprise</h3>
                <p className="text-muted text-sm">Everything in Assess, plus immutable PACRs, approval metadata (who / when / why), retention policies, single-tenant eval compute (private / isolated), optional customer-managed keys (BYOK), full audit logs, custom integrations, SLA and dedicated support. Custom pricing starting at $4,500/month.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/8 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center text-sm text-muted2">
          <span>© {new Date().getFullYear()} AfterAI</span>
        </div>
      </footer>
    </div>
  );
}

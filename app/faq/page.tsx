import Link from "next/link";
import Image from "next/image";

export default function FAQPage() {
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
            <Link href="/#faq" className="text-muted hover:text-white transition-colors text-sm">
              FAQ on home
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold hover:shadow-lg transition-all text-sm">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8 transition-colors">
          ← Back to home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h1>
        <p className="text-muted mb-12">
          Full list of FAQs. See also <Link href="/pricing" className="text-gold-500 hover:underline">pricing specifications</Link>.
        </p>

        <div className="faq space-y-3">
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
          <details className="faqitem">
            <summary>What is AfterAI not?</summary>
            <div className="faq-answer">
              AfterAI is not inference-path instrumentation — we never sit in front of your inference. It is not production traffic logging; evaluations are controlled and offline only. It is not request-level observability or telemetry. It is not prompt tuning, routing, or automatic model switching. It is not a compliance tool that shows up after decisions are already made. AfterAI uses controlled, offline evaluations only and exists at the decision moment — when a change is proposed (or drift is detected and you choose not to act) and someone has to say yes or no.
            </div>
          </details>
          <details className="faqitem">
            <summary>Can AfterAI automatically block or roll back changes?</summary>
            <div className="faq-answer">
              No. AfterAI never takes action in production. It produces evidence and decision options — humans remain accountable.
            </div>
          </details>
          <details className="faqitem">
            <summary>Is this a compliance or security product?</summary>
            <div className="faq-answer">
              No. Governance is an output, not an entry requirement. Teams adopt AfterAI to move faster, not to satisfy compliance checklists — but the artifacts it produces do hold up in audits.
            </div>
          </details>
          <details className="faqitem">
            <summary>Why not build this internally?</summary>
            <div className="faq-answer">
              Most teams do — until the first forced migration, incident, or audit. AfterAI standardizes how evidence is generated, compared, and preserved, so every approval isn&apos;t a bespoke process.
            </div>
          </details>
          <details className="faqitem">
            <summary>Can&apos;t we do this with docs and dashboards?</summary>
            <div className="faq-answer">
              Docs and dashboards capture outputs. AfterAI captures decisions: scope, evidence, trade-offs, confidence, and approvals — in a repeatable format.
            </div>
          </details>
          <details className="faqitem">
            <summary>Does AfterAI tune prompts or optimize models?</summary>
            <div className="faq-answer">
              No. AfterAI evaluates changes; it does not suggest or apply optimizations.
            </div>
          </details>
          <details className="faqitem">
            <summary>Does AfterAI route between models or providers?</summary>
            <div className="faq-answer">
              No. It is provider-neutral and intentionally avoids becoming part of the execution layer.
            </div>
          </details>
          <details className="faqitem">
            <summary>What kinds of changes does AfterAI cover?</summary>
            <div className="faq-answer">
              Model upgrades, prompt edits, configuration changes, safety policy updates, and forced migrations — anything where risk and accountability matter.
            </div>
          </details>
          <details className="faqitem">
            <summary>How hard is it to get started?</summary>
            <div className="faq-answer">
              Most teams start metadata-only with minimal integration. You can add deeper evaluation or content capture later as needed.
            </div>
          </details>
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

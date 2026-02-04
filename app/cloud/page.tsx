import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata = {
  title: "Multi-cloud D4 telemetry — Azure, AWS, GCP | AfterAI",
  description:
    "Ingest D4 metrics from Microsoft Azure, AWS, and Google Cloud with full CSP provenance. One platform, same provenance model, no lock-in.",
};

export default function CloudPage() {
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
            <Link href="/#product" className="text-muted hover:text-white transition-colors text-sm">
              Product
            </Link>
            <Link href="/#pricing" className="text-muted hover:text-white transition-colors text-sm">
              Pricing
            </Link>
            <Link href="/cloud" className="text-gold-500 font-medium text-sm">
              Cloud
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-semibold hover:shadow-lg transition-all text-sm">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
          ← Back to home
        </Link>

        {/* Hero */}
        <section className="mb-16 md:mb-20">
          <div className="section-heading-anchor mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            One platform for Azure, AWS, and GCP.
          </h1>
          <p className="text-xl text-muted max-w-2xl mb-8 leading-relaxed">
            Ingest D4 telemetry from Microsoft Azure, Amazon Web Services, and Google Cloud with full CSP provenance. Same provenance model across all three — you choose by cloud, not by vendor lock-in.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              Get started
              <FiArrowRight />
            </Link>
            <a
              href="https://github.com/useafterai/afterai-exporters/blob/main/docs/csp-quickstart.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/16 bg-white/5 text-white font-semibold hover:bg-white/8 transition-all inline-flex items-center gap-2"
            >
              CSP quickstart
            </a>
          </div>
        </section>

        {/* Supported providers — logos + one line each */}
        <section className="border-t border-white/8 pt-16 pb-12">
          <div className="section-heading-anchor mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Supported cloud providers</h2>
          <p className="text-muted mb-10 max-w-2xl">
            Real exporters for each provider. Install, configure resource and org/project IDs, run on a schedule — no JSON editing. The exporter stamps every signal with provenance; the API and storage expose it for filtering and querying.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <ProviderCard
              name="Microsoft Azure"
              logoSrc="/cloud-logos/azure.svg"
              logoAlt="Microsoft Azure"
              telemetry="Azure Monitor metrics"
              detail="afterai-export-azure-monitor — resource-id, subscription-id, tenant-id. source.csp_telemetry: azure.monitor.metrics"
            />
            <ProviderCard
              name="Amazon Web Services"
              logoSrc="/cloud-logos/aws.svg"
              logoAlt="Amazon Web Services"
              telemetry="AWS CloudWatch metrics"
              detail="afterai-export-cloudwatch — region, resource-id, account-id. source.csp_telemetry: aws.cloudwatch.metrics"
            />
            <ProviderCard
              name="Google Cloud"
              logoSrc="/cloud-logos/gcp.svg"
              logoAlt="Google Cloud"
              telemetry="GCP Cloud Monitoring"
              detail="afterai-export-gcp-monitoring — project-id, resource-id. source.csp_telemetry: gcp.monitoring.metrics"
            />
          </div>
        </section>

        {/* Messaging angles */}
        <section className="border-t border-white/8 py-16">
          <div className="section-heading-anchor mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Why multi-cloud provenance matters</h2>
          <div className="space-y-8">
            <AngleBlock
              title="No lock-in"
              body="The same provenance model across Azure, AWS, and GCP. Same source shape: csp, csp_telemetry, csp_org_id, csp_project_id, resource_id. Your queries and filters work the same no matter which cloud produced the signal."
            />
            <AngleBlock
              title="Out-of-band ingestion"
              body="Exporters run on a schedule (cron, CI). They pull metrics from each provider's API and write artifacts with source already filled. The runner POSTs to the AfterAI API. No hot-path instrumentation — zero impact on your inference path."
            />
            <AngleBlock
              title="Trustable attribution"
              body="Every signal carries source so you know which cloud resource produced it. The API and Azure Table Storage store these as first-class columns — filter and query by CSP, org, project, or resource_id in the portal and via the API (e.g. GET /signals/debug)."
            />
          </div>
        </section>

        {/* Flow + CTA */}
        <section className="border-t border-white/8 py-16">
          <div className="section-heading-anchor mb-4" />
          <h2 className="text-2xl font-bold mb-4">Simple flow</h2>
          <ul className="space-y-3 text-muted mb-8 max-w-2xl">
            <li className="flex items-start gap-2">
              <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
              <span>Install the exporter for your CSP (Azure, AWS, or GCP).</span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
              <span>Configure with resource ID and tenant/subscription/project IDs — no JSON editing.</span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
              <span>Exporter writes artifacts + manifest with source; runner POSTs to the AfterAI API.</span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="mt-1 text-gold-500 flex-shrink-0" />
              <span>See and filter by CSP provenance in the console and API.</span>
            </li>
          </ul>
          <p className="text-sm text-muted2 mb-6">
            Documented in the <strong className="text-white/80">CSP quickstart</strong> (who fills source, runner vs exporter) and <strong className="text-white/80">csp-provenance.md</strong> (canonical source schema and examples). <strong className="text-white/80">providers.md</strong> lists Azure Monitor, AWS CloudWatch, and GCP Monitoring as implemented with links to each package README.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all"
            >
              Get started free
            </Link>
            <a
              href="https://github.com/useafterai/afterai-exporters"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/16 bg-white/5 text-white font-semibold hover:bg-white/8 transition-all"
            >
              afterai-exporters on GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted2">
          <span>© {new Date().getFullYear()} AfterAI</span>
          <div className="flex items-center gap-6">
            <Link href="/cloud" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
              Cloud
            </Link>
            <Link href="/security" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
              Security
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProviderCard({
  name,
  logoSrc,
  logoAlt,
  telemetry,
  detail,
}: {
  name: string;
  logoSrc: string;
  logoAlt: string;
  telemetry: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-auto flex items-center justify-center shrink-0">
          <Image src={logoSrc} alt={logoAlt} width={120} height={40} className="h-8 w-auto object-contain object-left" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
      <p className="text-sm text-gold-500 mb-3">{telemetry}</p>
      <p className="text-sm text-muted2 mt-auto">{detail}</p>
    </div>
  );
}

function AngleBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.04] p-6">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-muted leading-relaxed">{body}</p>
    </div>
  );
}

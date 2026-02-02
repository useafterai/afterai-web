import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Security</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted mb-6">
            AfterAI is built for platform teams who need auditability and a defensible posture. The same security model applies whether you use the console, the API, or the SDK.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Authentication and access control</h2>
          <p className="text-muted mb-4">
            Access is token- and key-based, with fail-closed behavior and protected routes. The console uses a session JWT stored in an httpOnly cookie (HS256); unauthenticated users are redirected to login. The API accepts X-Tenant-Id with X-Api-Key, or a Bearer JWT for console-originated requests; the SDK sends the API key in request headers. Credentials are hashed at rest; configuration is environment-based. No secrets are embedded in images or source; required configuration is validated at startup and the application fails fast if it is missing.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Architecture and data</h2>
          <p className="text-muted mb-4">
            AfterAI is out-of-band by design. It does not sit in your inference path; there is no inference-path instrumentation and no production traffic in the hot path. Telemetry is asynchronous and designed to fail open. The system is metadata-first; prompt and output capture is optional, sampled, and controllable. Change and risk are captured out-of-band with zero impact on latency.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Operational security</h2>
          <p className="text-muted mb-4">
            Secrets and configuration are supplied via environment variables. The application fails fast on misconfiguration so that incomplete or insecure deployments do not start. We are committed to further hardening as we scale, including rate limiting, DDoS protection, and WAF where appropriate.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Related</h2>
          <p className="text-muted mb-6">
            <Link href="/" className="text-gold-500 hover:text-gold-400 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Product</Link>
            {" · "}
            <Link href="/privacy" className="text-gold-500 hover:text-gold-400 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Privacy</Link>
            {" · "}
            <Link href="/terms" className="text-gold-500 hover:text-gold-400 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded">Terms</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

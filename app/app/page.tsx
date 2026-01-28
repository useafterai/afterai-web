import Link from "next/link";
import { FiActivity, FiTrendingUp, FiArrowRight } from "react-icons/fi";

export default function AppHomePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Select your workflow</h1>
        <p className="text-muted">Choose how you want to start using AfterAI</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Start Monitoring Card */}
        <Link
          href="/app/change-feed"
          className="group p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 hover:border-gold-500/30 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
            <span className="px-3 py-1 rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 text-xs font-semibold">
              Free
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Start Monitoring</h2>
          <p className="text-muted mb-6 leading-relaxed">
            Begin capturing AI change events (ACE) and track changes across your AI systems. View your change feed, monitor drift, and access basic dashboards.
          </p>
          <div className="flex items-center gap-2 text-purple-400 group-hover:gap-4 transition-all font-semibold">
            Go to Change Feed
            <FiArrowRight />
          </div>
        </Link>

        {/* Run Assessment Card */}
        <Link
          href="/app/assessments"
          className="group p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 hover:border-purple-500/30 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-4">
              <FiTrendingUp className="w-6 h-6 text-dark" />
            </div>
            <span className="px-3 py-1 rounded-full border border-purple-500/22 bg-purple-500/10 text-purple-400 text-xs font-semibold">
              AURA
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Run an Assessment</h2>
          <p className="text-muted mb-6 leading-relaxed">
            Create an AI Upgrade Risk Assessment (AURA) to evaluate changes before deployment. Understand upgrade risk with confidence-weighted deltas.
          </p>
          <div className="flex items-center gap-2 text-gold-400 group-hover:gap-4 transition-all font-semibold">
            Go to Assessments
            <FiArrowRight />
          </div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/5">
        <h3 className="font-semibold mb-4">Quick Links</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/app/integrations"
            className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
          >
            <div className="font-semibold mb-1">Set up Integration</div>
            <div className="text-sm text-muted2">Connect your AI systems</div>
          </Link>
          <Link
            href="/app/api-keys"
            className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
          >
            <div className="font-semibold mb-1">Create API Key</div>
            <div className="text-sm text-muted2">Get your access token</div>
          </Link>
          <Link
            href="/app/billing"
            className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
          >
            <div className="font-semibold mb-1">View Usage</div>
            <div className="text-sm text-muted2">Check your quota</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

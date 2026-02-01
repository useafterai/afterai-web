"use client";

import { FiActivity } from "react-icons/fi";

/**
 * Signals (AIS) view.
 * AIS = AI Indicator Signals: pre-decision signals (drift, regression, disagreement, staleness).
 * High-volume, non-billable, informational only. Inputs to ACE escalation.
 */
export default function SignalsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Signals (AIS)</h1>
        <p className="text-muted">
          AI Indicator Signals — pre-decision signals that may escalate to decisions (ACE). High-volume, non-billable, informational only.
        </p>
      </div>

      <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-gold-500/30 flex items-center justify-center mx-auto mb-4">
          <FiActivity className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">AIS feed coming soon</h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          Signals (AIS) include baseline violation, evaluation regression, model disagreement spike, cost/latency deviation, and baseline staleness. They are stored separately from ACEs and feed into decision-worthy moments.
        </p>
        <p className="text-sm text-muted2">
          In the meantime, use <a href="/app/decisions" className="text-gold-500 hover:underline">Decisions (ACE)</a> to view and act on decision-worthy events.
        </p>
      </div>
    </div>
  );
}

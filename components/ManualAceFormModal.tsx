"use client";

/**
 * Day-0 manual ACE ingestion form (modal).
 * TODO: Semantic/AI assistant layer will attach here later (e.g. suggest change_type,
 * system, or prefill from context). Keep this form simple and form-based until then.
 */
import { useState } from "react";
import { FiX } from "react-icons/fi";

/** Friendly change type labels → API change_type */
export const CHANGE_TYPE_OPTIONS = [
  { label: "Prompt tweak", value: "prompt" },
  { label: "Model swap", value: "model" },
  { label: "Safety policy change", value: "guardrails" },
  { label: "Forced migration", value: "infra" },
] as const;

const SYSTEM_TYPES = [
  "chatbot",
  "agent",
  "rag",
  "classifier",
  "copilot",
  "batch",
  "other",
] as const;

const ENVIRONMENTS = ["dev", "test", "staging", "prod"] as const;

const INTENTS = [
  { label: "Proposed", value: "proposed" },
  { label: "Implemented", value: "implemented" },
  { label: "Observed", value: "observed" },
  { label: "Rolled back", value: "rolled_back" },
] as const;

const SEVERITIES = ["low", "medium", "high", "critical"] as const;
const BLAST_RADIUS = [
  "single_route",
  "single_app",
  "portfolio",
  "unknown",
] as const;
const CUSTOMER_IMPACT = ["none", "minor", "material", "unknown"] as const;

function nowRFC3339(): string {
  return new Date().toISOString();
}

function buildAcePayload(form: {
  changeType: string;
  systemId: string;
  systemName: string;
  systemType: string;
  environment: string;
  intent: string;
  reason: string;
  severity: string;
  blastRadius: string;
  customerImpact: string;
}): Record<string, unknown> {
  const occurredAt = nowRFC3339();
  const changeFingerprint = `manual-${Date.now()}-${form.systemId || "unknown"}`;
  return {
    schema_version: "1.0.0",
    occurred_at: occurredAt,
    system: {
      system_id: form.systemId || "manual-system",
      name: form.systemName || "Manual entry",
      type: form.systemType || "other",
    },
    environment: form.environment,
    source: {
      origin: "manual",
      actor: {
        actor_type: "human",
        display_name: "Console user",
      },
    },
    change: {
      change_type: form.changeType,
      intent: form.intent,
      reason: form.reason || undefined,
      baseline: {},
      candidate: {},
    },
    risk: {
      severity: form.severity,
      blast_radius: form.blastRadius,
      customer_impact: form.customerImpact,
    },
    fingerprints: {
      change_fingerprint: changeFingerprint,
    },
  };
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (aceId: string) => void;
};

export default function ManualAceFormModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [changeType, setChangeType] = useState("model");
  const [systemId, setSystemId] = useState("");
  const [systemName, setSystemName] = useState("");
  const [systemType, setSystemType] = useState<string>("other");
  const [environment, setEnvironment] = useState("prod");
  const [intent, setIntent] = useState("implemented");
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [blastRadius, setBlastRadius] = useState("single_app");
  const [customerImpact, setCustomerImpact] = useState("none");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = buildAcePayload({
        changeType,
        systemId: systemId.trim() || "manual-system",
        systemName: systemName.trim() || "Manual entry",
        systemType,
        environment,
        intent,
        reason: reason.trim(),
        severity,
        blastRadius,
        customerImpact,
      });
      const res = await fetch("/api/aces/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const d = data?.detail;
        const msg =
          typeof d === "string"
            ? d
            : d?.message || (d && JSON.stringify(d)) || "Failed to create ACE";
        setError(msg);
        return;
      }
      const aceId = data?.ace_id;
      if (aceId) {
        onSuccess(aceId);
        onClose();
      } else {
        setError("No ace_id in response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-white/14 bg-dark shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Log a change manually</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-muted2 mb-1">
              Change type
            </label>
            <select
              value={changeType}
              onChange={(e) => setChangeType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none"
              required
            >
              {CHANGE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted2 mb-1">
                System ID
              </label>
              <input
                type="text"
                value={systemId}
                onChange={(e) => setSystemId(e.target.value)}
                placeholder="e.g. support-copilot"
                className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white placeholder:text-muted2 focus:border-purple-500/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted2 mb-1">
                System name
              </label>
              <input
                type="text"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                placeholder="e.g. Support Copilot"
                className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white placeholder:text-muted2 focus:border-purple-500/50 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted2 mb-1">
              System type
            </label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white focus:border-purple-500/50 outline-none"
            >
              {SYSTEM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted2 mb-1">
              Environment
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white focus:border-purple-500/50 outline-none"
            >
              {ENVIRONMENTS.map((env) => (
                <option key={env} value={env}>
                  {env}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted2 mb-1">
              Intent
            </label>
            <select
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white focus:border-purple-500/50 outline-none"
            >
              {INTENTS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted2 mb-1">
              Reason <span className="text-muted2 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Brief reason for the change"
              className="w-full px-4 py-2.5 rounded-lg border border-white/14 bg-white/5 text-white placeholder:text-muted2 focus:border-purple-500/50 outline-none"
            />
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm font-medium text-muted2 mb-2">Risk</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-muted2 mb-1">
                  Severity
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-white/14 bg-white/5 text-white text-sm focus:border-purple-500/50 outline-none"
                >
                  {SEVERITIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted2 mb-1">
                  Blast radius
                </label>
                <select
                  value={blastRadius}
                  onChange={(e) => setBlastRadius(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-white/14 bg-white/5 text-white text-sm focus:border-purple-500/50 outline-none"
                >
                  {BLAST_RADIUS.map((b) => (
                    <option key={b} value={b}>
                      {b.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted2 mb-1">
                  Customer impact
                </label>
                <select
                  value={customerImpact}
                  onChange={(e) => setCustomerImpact(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-white/14 bg-white/5 text-white text-sm focus:border-purple-500/50 outline-none"
                >
                  {CUSTOMER_IMPACT.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-white/14 bg-white/5 hover:bg-white/8 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Log change"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

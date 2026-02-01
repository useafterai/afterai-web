"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiActivity, FiTrendingUp, FiFileText, FiDollarSign } from "react-icons/fi";

type AceDetail = {
  ace_id: string;
  status?: "pending" | "confirmed";
  received_at?: string;
  occurred_at?: string;
  system?: { system_id?: string; name?: string; type?: string };
  source?: {
    origin?: string;
    actor?: { actor_type?: string; display_name?: string };
    approval?: {
      rule_type?: string;
      approver_role?: string;
      approver_identity?: string;
      custom_rule_text?: string;
      notes?: string;
    };
  };
  change?: {
    change_type?: string;
    intent?: string;
    reason?: string;
    baseline?: Record<string, unknown>;
    candidate?: Record<string, unknown>;
    diff_summary?: string;
    model_change?: { before?: Record<string, unknown>; after?: Record<string, unknown> };
    prompt_change?: { before?: Record<string, unknown>; after?: Record<string, unknown> };
    inference_change?: { before?: Record<string, unknown>; after?: Record<string, unknown> };
    tooling_change?: { before?: Record<string, unknown>; after?: Record<string, unknown> };
    other_changes?: Array<{ category_key?: string; before?: { summary?: string }; after?: { summary?: string }; notes?: string }>;
  };
  risk?: { severity?: string; blast_radius?: string; customer_impact?: string };
  environment?: string;
  links?: { aura_id?: string; pacr_id?: string };
};

function formatChangeType(type: string): string {
  const map: Record<string, string> = {
    model: "Model swap",
    prompt: "Prompt tweak",
    guardrails: "Safety policy",
    infra: "Forced migration",
    retrieval: "Retrieval",
    tools: "Tools",
    eval: "Eval",
    vendor_blackbox: "Vendor",
  };
  return map[type] || type;
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function DecisionDetailPage() {
  const params = useParams();
  const aceId = params?.aceId as string | undefined;
  const [ace, setAce] = useState<AceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!aceId) {
      setLoading(false);
      setError("Missing ACE ID");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/aces/${encodeURIComponent(aceId)}`)
      .then(async (res) => {
        if (cancelled) return;
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(res.status === 404 ? "Decision not found" : "Failed to load");
          return;
        }
        if (data && data.ace_id) setAce(data);
        else setError("Invalid response");
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [aceId]);

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-muted">Loading…</div>
      </div>
    );
  }

  if (error || !ace) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Link
          href="/app/decisions"
          className="inline-flex items-center gap-2 text-muted hover:text-white mb-6"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Decisions
        </Link>
        <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
          {error || "Decision not found"}
        </div>
      </div>
    );
  }

  const isConfirmed = ace.status === "confirmed";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        href="/app/decisions"
        className="inline-flex items-center gap-2 text-muted hover:text-white mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Decisions
      </Link>

      {/* Billing boundary — visually clear when ACE is confirmed */}
      {isConfirmed && (
        <div className="mb-6 p-4 rounded-xl border-2 border-gold-500/40 bg-gold-500/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0">
            <FiDollarSign className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <div className="font-semibold text-gold-400">Billing boundary</div>
            <div className="text-sm text-muted">
              This ACE is <strong>confirmed</strong>. Confirmed ACEs are billable and count toward your usage.
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-gold-500/30 flex items-center justify-center flex-shrink-0">
          <FiActivity className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">
              {ace.system?.name || ace.system?.system_id || "Unknown system"}
            </h1>
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                isConfirmed
                  ? "border border-gold-500/30 bg-gold-500/10 text-gold-400"
                  : "border border-purple-500/30 bg-purple-500/10 text-purple-400"
              }`}
            >
              {ace.status === "confirmed" ? "Confirmed" : "Pending"}
            </span>
          </div>
          <div className="text-sm text-muted2">
            {formatChangeType(ace.change?.change_type || "—")}
            {ace.environment && ` · ${ace.environment}`}
          </div>
          <div className="text-xs text-muted2 mt-1 font-mono">
            {ace.ace_id}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <section className="p-4 rounded-xl border border-white/14 bg-white/5">
          <h2 className="text-sm font-semibold text-muted2 mb-3">When</h2>
          <div className="text-sm">
            Received: {formatDate(ace.received_at)}
            {ace.occurred_at && (
              <span className="text-muted2 ml-2">
                Occurred: {formatDate(ace.occurred_at)}
              </span>
            )}
          </div>
        </section>

        <section className="p-4 rounded-xl border border-white/14 bg-white/5">
          <h2 className="text-sm font-semibold text-muted2 mb-3">Change</h2>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-muted2">Type</dt>
            <dd>{formatChangeType(ace.change?.change_type || "—")}</dd>
            <dt className="text-muted2">Intent</dt>
            <dd>{ace.change?.intent ?? "—"}</dd>
            {ace.change?.reason && (
              <>
                <dt className="text-muted2">Reason</dt>
                <dd>{ace.change.reason}</dd>
              </>
            )}
          </dl>
          {ace.change?.model_change && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <h3 className="text-xs font-medium text-muted2 mb-2">Model change</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted2">Before:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.model_change.before ?? {}, null, 2)}</pre></div>
                <div><span className="text-muted2">After:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.model_change.after ?? {}, null, 2)}</pre></div>
              </div>
            </div>
          )}
          {ace.change?.prompt_change && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <h3 className="text-xs font-medium text-muted2 mb-2">Prompt change (metadata)</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted2">Before:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.prompt_change.before ?? {}, null, 2)}</pre></div>
                <div><span className="text-muted2">After:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.prompt_change.after ?? {}, null, 2)}</pre></div>
              </div>
            </div>
          )}
          {ace.change?.inference_change && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <h3 className="text-xs font-medium text-muted2 mb-2">Inference config change</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted2">Before:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.inference_change.before ?? {}, null, 2)}</pre></div>
                <div><span className="text-muted2">After:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.inference_change.after ?? {}, null, 2)}</pre></div>
              </div>
            </div>
          )}
          {ace.change?.tooling_change && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <h3 className="text-xs font-medium text-muted2 mb-2">Tooling change</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted2">Before:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.tooling_change.before ?? {}, null, 2)}</pre></div>
                <div><span className="text-muted2">After:</span> <pre className="mt-1 p-2 bg-black/20 rounded overflow-auto max-h-20">{JSON.stringify(ace.change.tooling_change.after ?? {}, null, 2)}</pre></div>
              </div>
            </div>
          )}
          {ace.change?.other_changes && ace.change.other_changes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <h3 className="text-xs font-medium text-muted2 mb-2">Other changes</h3>
              <ul className="space-y-2 text-xs">
                {ace.change.other_changes.map((o, i) => (
                  <li key={i} className="p-2 bg-black/20 rounded">
                    <span className="text-muted2">{o.category_key ?? "—"}:</span> Before: {o.before?.summary ?? "—"} → After: {o.after?.summary ?? "—"}
                    {o.notes && <span className="text-muted2 ml-2">({o.notes})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {ace.risk && (
          <section className="p-4 rounded-xl border border-white/14 bg-white/5">
            <h2 className="text-sm font-semibold text-muted2 mb-3">Risk</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted2">Severity</dt>
              <dd>{ace.risk.severity ?? "—"}</dd>
              <dt className="text-muted2">Blast radius</dt>
              <dd>{ace.risk.blast_radius?.replace(/_/g, " ") ?? "—"}</dd>
              <dt className="text-muted2">Customer impact</dt>
              <dd>{ace.risk.customer_impact ?? "—"}</dd>
            </dl>
          </section>
        )}

        {/* AURA — risk assessment attached to this ACE */}
        <section className="p-4 rounded-xl border border-white/14 bg-white/5">
          <h2 className="text-sm font-semibold text-muted2 mb-3 flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4" />
            AURA (risk assessment)
          </h2>
          <p className="text-sm text-muted mb-2">
            Risk assessment attached to this ACE. Modes: Prospective (planned change), Diagnostic (no-change drift), Counterfactual (what-if).
          </p>
          {ace.links?.aura_id ? (
            <Link
              href="/app/assessments"
              className="inline-flex items-center gap-2 text-sm text-gold-500 hover:underline"
            >
              View assessment
              <span className="font-mono text-muted2">{ace.links.aura_id.slice(0, 8)}…</span>
            </Link>
          ) : (
            <p className="text-sm text-muted2">
              No AURA linked yet. <Link href="/app/assessments" className="text-gold-500 hover:underline">Run an assessment</Link> to attach risk data.
            </p>
          )}
        </section>

        {/* PACR — durable decision record attached to this ACE */}
        <section className="p-4 rounded-xl border border-white/14 bg-white/5">
          <h2 className="text-sm font-semibold text-muted2 mb-3 flex items-center gap-2">
            <FiFileText className="w-4 h-4" />
            PACR (durable record)
          </h2>
          <p className="text-sm text-muted mb-2">
            Durable decision record. May represent a decision to act or not act.
          </p>
          {ace.links?.pacr_id ? (
            <Link
              href="/app/pacrs"
              className="inline-flex items-center gap-2 text-sm text-gold-500 hover:underline"
            >
              View record
              <span className="font-mono text-muted2">{ace.links.pacr_id.slice(0, 8)}…</span>
            </Link>
          ) : (
            <p className="text-sm text-muted2">
              No PACR linked. PACR is available on higher tiers.
            </p>
          )}
        </section>

        {ace.source && (
          <section className="p-4 rounded-xl border border-white/14 bg-white/5">
            <h2 className="text-sm font-semibold text-muted2 mb-3">Source</h2>
            <div className="text-sm">
              {ace.source.origin ?? "—"}
              {ace.source.actor?.display_name && (
                <span className="text-muted2 ml-2">
                  · {ace.source.actor.display_name}
                </span>
              )}
            </div>
            {ace.source.approval && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <h3 className="text-xs font-medium text-muted2 mb-2">Approval</h3>
                <dl className="grid grid-cols-2 gap-2 text-xs">
                  <dt className="text-muted2">Rule</dt>
                  <dd>{ace.source.approval.rule_type?.replace(/_/g, " ") ?? "—"}</dd>
                  {ace.source.approval.approver_role && (
                    <>
                      <dt className="text-muted2">Approver role</dt>
                      <dd>{ace.source.approval.approver_role}</dd>
                    </>
                  )}
                  {ace.source.approval.approver_identity && (
                    <>
                      <dt className="text-muted2">Approver</dt>
                      <dd>{ace.source.approval.approver_identity}</dd>
                    </>
                  )}
                  {ace.source.approval.custom_rule_text && (
                    <>
                      <dt className="text-muted2">Custom rule</dt>
                      <dd className="col-span-1">{ace.source.approval.custom_rule_text}</dd>
                    </>
                  )}
                  {ace.source.approval.notes && (
                    <>
                      <dt className="text-muted2">Notes</dt>
                      <dd>{ace.source.approval.notes}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

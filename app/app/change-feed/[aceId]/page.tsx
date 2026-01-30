"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiActivity } from "react-icons/fi";

type AceDetail = {
  ace_id: string;
  received_at?: string;
  occurred_at?: string;
  system?: { system_id?: string; name?: string; type?: string };
  source?: { origin?: string; actor?: { actor_type?: string; display_name?: string } };
  change?: {
    change_type?: string;
    intent?: string;
    reason?: string;
    baseline?: Record<string, unknown>;
    candidate?: Record<string, unknown>;
    diff_summary?: string;
  };
  risk?: { severity?: string; blast_radius?: string; customer_impact?: string };
  environment?: string;
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

export default function AceDetailPage() {
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
          setError(res.status === 404 ? "Change not found" : "Failed to load");
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
          href="/app/change-feed"
          className="inline-flex items-center gap-2 text-muted hover:text-white mb-6"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Change Feed
        </Link>
        <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
          {error || "Change not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        href="/app/change-feed"
        className="inline-flex items-center gap-2 text-muted hover:text-white mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Change Feed
      </Link>

      <div className="mb-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-gold-500/30 flex items-center justify-center flex-shrink-0">
          <FiActivity className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {ace.system?.name || ace.system?.system_id || "Unknown system"}
          </h1>
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
          </section>
        )}
      </div>
    </div>
  );
}

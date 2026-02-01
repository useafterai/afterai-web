"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiActivity, FiPlus, FiExternalLink, FiCheck, FiAlertCircle } from "react-icons/fi";
import ManualAceFormModal from "@/components/ManualAceFormModal";

type AceItem = {
  ace_id: string;
  status?: "pending" | "confirmed";
  received_at?: string;
  system?: { system_id?: string; name?: string; type?: string };
  change?: { change_type?: string; intent?: string };
  environment?: string;
};

type FeedResponse = {
  items?: AceItem[];
  count?: number;
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
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

type Tab = "pending" | "confirmed";

export default function DecisionsPage() {
  const [tab, setTab] = useState<Tab>("pending");
  const [items, setItems] = useState<AceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [justCreatedId, setJustCreatedId] = useState<string | null>(null);

  const fetchAces = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/aces?limit=50&status=${tab}`);
      const data: FeedResponse = await res.json().catch(() => ({}));
      setItems(data?.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchAces();
  }, [fetchAces]);

  const handleManualSuccess = (aceId: string) => {
    setJustCreatedId(aceId);
    setTab("pending");
    fetchAces();
  };

  const hasAces = items.length > 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Decisions (ACE)</h1>
          <p className="text-muted">
            Decision-worthy moments: Pending requires your attention; Confirmed is billable.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Log a change manually
        </button>
      </div>

      {/* Pending / Confirmed tabs — default Pending so users interact primarily with Pending ACEs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
        <button
          type="button"
          onClick={() => setTab("pending")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            tab === "pending"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              : "text-muted hover:bg-white/5 hover:text-white border border-transparent"
          }`}
        >
          <FiAlertCircle className="w-4 h-4" />
          Pending
          <span className="text-xs opacity-80">(needs attention)</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("confirmed")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            tab === "confirmed"
              ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
              : "text-muted hover:bg-white/5 hover:text-white border border-transparent"
          }`}
        >
          <FiCheck className="w-4 h-4" />
          Confirmed
          <span className="text-xs opacity-80">(billable)</span>
        </button>
      </div>

      {/* Post-submit confirmation */}
      {justCreatedId && (
        <div className="mb-6 p-4 rounded-xl border border-gold-500/30 bg-gold-500/10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gold-500">
            <FiCheck className="w-5 h-5" />
            <span className="font-semibold">Change logged</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/app/decisions/${justCreatedId}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/20 border border-gold-500/30 text-gold-400 hover:bg-gold-500/30 transition-colors font-medium"
            >
              View this decision
              <FiExternalLink className="w-4 h-4" />
            </Link>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/14 bg-white/5 text-muted cursor-not-allowed"
              title="Coming soon"
            >
              Run a preview assessment
              <span className="text-xs text-muted2">(coming soon)</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setJustCreatedId(null)}
            className="ml-auto text-sm text-muted2 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <div className="p-8 rounded-xl border border-white/14 bg-white/5 text-center text-muted">
          Loading decisions…
        </div>
      ) : hasAces ? (
        <div className="space-y-3">
          {items.map((ace) => (
            <Link
              key={ace.ace_id}
              href={`/app/decisions/${ace.ace_id}`}
              className="block p-4 rounded-xl border border-white/14 bg-white/5 hover:border-purple-500/30 hover:bg-white/8 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-gold-500/30 flex items-center justify-center">
                    <FiActivity className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {ace.system?.name || ace.system?.system_id || "Unknown system"}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          ace.status === "confirmed"
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
                      {ace.received_at && ` · ${formatDate(ace.received_at)}`}
                    </div>
                  </div>
                </div>
                <span className="text-muted2 text-sm font-mono">
                  {ace.ace_id.slice(0, 8)}…
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">
            {tab === "pending" ? "No pending decisions" : "No confirmed decisions"}
          </h2>
          <p className="text-muted mb-6">
            {tab === "pending"
              ? "Pending ACEs need your attention. Log a change manually or set up an integration to capture ACEs."
              : "Confirmed ACEs are billable. They appear here after a pending ACE is confirmed."}
          </p>
          {tab === "pending" && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all"
              >
                <FiPlus className="w-5 h-5" />
                Log a change manually
              </button>
              <Link
                href="/app/integrations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/14 bg-white/5 hover:bg-white/8 transition-all"
              >
                Set up Integration
              </Link>
            </div>
          )}
        </div>
      )}

      <ManualAceFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleManualSuccess}
      />
    </div>
  );
}

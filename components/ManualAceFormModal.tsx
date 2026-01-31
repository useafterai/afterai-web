"use client";

/**
 * Manual Change Log (ACE) — delta-first, production-only.
 * Categories: 4 default + Show more; Before/After side-by-side; approval required at submit.
 */
import { useState, useCallback } from "react";
import { FiX, FiChevronDown, FiChevronRight, FiCopy } from "react-icons/fi";
import {
  DEFAULT_CATEGORIES,
  SHOW_MORE_CATEGORIES,
  PROVIDERS_TOP_8,
  PROVIDERS_MORE,
  PROVIDER_LABELS,
  PROMPT_SURFACES,
  MAGNITUDE_OPTIONS,
  CHAT_HISTORY_MODES,
  ROUTING_CHANGED_OPTIONS,
  type AnyCategoryId,
  type ModelChange,
  type PromptChange,
  type InferenceChange,
  type ToolingChange,
  type GenericCategoryChange,
  type Approval,
  type ManualAcePayload,
} from "@/lib/ace-types";

const SYSTEM_TYPES = ["chatbot", "agent", "rag", "classifier", "copilot", "batch", "other"] as const;
const INTENTS = [
  { label: "Proposed", value: "proposed" },
  { label: "Implemented", value: "implemented" },
  { label: "Observed", value: "observed" },
  { label: "Rolled back", value: "rolled_back" },
] as const;
const SEVERITIES = ["low", "medium", "high", "critical"] as const;
const BLAST_RADIUS = ["single_route", "single_app", "portfolio", "unknown"] as const;
const CUSTOMER_IMPACT = ["none", "minor", "material", "unknown"] as const;
const APPROVAL_RULES = [
  { value: "single_approver", label: "Single approver" },
  { value: "majority_approval", label: "Majority approval" },
  { value: "unanimous_approval", label: "Unanimous approval" },
  { value: "custom", label: "Custom" },
] as const;

function nowRFC3339(): string {
  return new Date().toISOString();
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-white/14 bg-white/5 text-white text-sm placeholder:text-muted2 focus:border-purple-500/50 outline-none";
const labelClass = "block text-xs font-medium text-muted2 mb-1";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (aceId: string) => void;
};

export default function ManualAceFormModal({ open, onClose, onSuccess }: Props) {
  // System & risk
  const [systemId, setSystemId] = useState("");
  const [systemName, setSystemName] = useState("");
  const [systemType, setSystemType] = useState<string>("other");
  const [intent, setIntent] = useState("implemented");
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [blastRadius, setBlastRadius] = useState("single_app");
  const [customerImpact, setCustomerImpact] = useState("none");

  // Categories: at least one required
  const [selectedCategories, setSelectedCategories] = useState<Set<AnyCategoryId>>(new Set(["model_change"]));
  const [showMoreExpanded, setShowMoreExpanded] = useState(false);

  const toggleCategory = useCallback((id: AnyCategoryId) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size <= 1) return prev;
        next.delete(id);
      } else next.add(id);
      return next;
    });
  }, []);

  // Delta state per category
  const [modelChange, setModelChange] = useState<ModelChange>({
    before: {},
    after: {},
  });
  const [promptChange, setPromptChange] = useState<PromptChange>({
    before: {},
    after: { magnitude: "medium" },
  });
  const [inferenceChange, setInferenceChange] = useState<InferenceChange>({
    before: {},
    after: {},
  });
  const [toolingChange, setToolingChange] = useState<ToolingChange>({
    before: {},
    after: {},
  });
  const [otherChanges, setOtherChanges] = useState<Record<string, GenericCategoryChange>>({});

  // Approval step (shown when user clicks Create record)
  const [approvalStepOpen, setApprovalStepOpen] = useState(false);
  const [approval, setApproval] = useState<Approval>({
    rule_type: "single_approver",
    approver_role: "",
    approver_identity: "",
    custom_rule_text: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyBeforeToAfter = useCallback(
    (category: "model" | "prompt" | "inference" | "tooling") => {
      if (category === "model") setModelChange((m) => ({ before: m.before, after: { ...m.before } }));
      if (category === "prompt") setPromptChange((p) => ({ before: p.before, after: { ...p.before } }));
      if (category === "inference") setInferenceChange((i) => ({ before: i.before, after: { ...i.before } }));
      if (category === "tooling") setToolingChange((t) => ({ before: t.before, after: { ...t.before } }));
    },
    []
  );

  const buildPayload = useCallback((): ManualAcePayload | null => {
    const firstCategory = Array.from(selectedCategories)[0];
    const changeTypeMap: Record<string, string> = {
      model_change: "model",
      prompt_change: "prompt",
      inference_change: "infra",
      tooling_change: "tools",
      retrieval_change: "retrieval",
      safety_policy_change: "guardrails",
      post_processing_change: "infra",
      infra_runtime_change: "infra",
      data_knowledge_change: "infra",
      other: "infra",
    };
    const change_type = changeTypeMap[firstCategory] ?? "model";
    const changeFingerprint = `manual-${Date.now()}-${systemId.trim() || "unknown"}`;

    const change: ManualAcePayload["change"] = {
      change_type,
      intent,
      reason: reason.trim() || undefined,
      baseline: {},
      candidate: {},
    };
    if (selectedCategories.has("model_change")) change.model_change = modelChange;
    if (selectedCategories.has("prompt_change")) change.prompt_change = promptChange;
    if (selectedCategories.has("inference_change")) change.inference_change = inferenceChange;
    if (selectedCategories.has("tooling_change")) change.tooling_change = toolingChange;
    const otherList: GenericCategoryChange[] = [];
    for (const id of SHOW_MORE_CATEGORIES.map((c) => c.id)) {
      if (!selectedCategories.has(id)) continue;
      const o = otherChanges[id];
      if (!o?.before?.summary && !o?.after?.summary && !o?.notes) continue;
      otherList.push({
        category_key: id,
        before: { summary: o.before?.summary },
        after: { summary: o.after?.summary },
        notes: o.notes,
      });
    }
    if (otherList.length) change.other_changes = otherList;

    return {
      schema_version: "1.0.0",
      occurred_at: nowRFC3339(),
      environment: "production",
      system: {
        system_id: systemId.trim() || "manual-system",
        name: systemName.trim() || "Manual entry",
        type: systemType || "other",
      },
      source: {
        origin: "manual",
        actor: { actor_type: "human", display_name: "Console user" },
        approval,
      },
      change,
      risk: { severity, blast_radius: blastRadius, customer_impact: customerImpact },
      fingerprints: { change_fingerprint: changeFingerprint },
    };
  }, [
    selectedCategories,
    systemId,
    systemName,
    systemType,
    intent,
    reason,
    severity,
    blastRadius,
    customerImpact,
    approval,
    modelChange,
    promptChange,
    inferenceChange,
    toolingChange,
    otherChanges,
  ]);

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (selectedCategories.size === 0) {
      setError("Select at least one change category.");
      return;
    }
    setApprovalStepOpen(true);
  };

  const handleApprovalSubmit = async () => {
    if (approval.rule_type === "single_approver" && !approval.approver_role?.trim()) {
      setError("Approver role/title is required.");
      return;
    }
    if (approval.rule_type === "custom" && !approval.custom_rule_text?.trim()) {
      setError("Rule description is required.");
      return;
    }
    const payload = buildPayload();
    if (!payload) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/aces/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const d = data?.detail;
        const msg =
          typeof d === "string" ? d : d?.message || (d && JSON.stringify(d)) || "Failed to create ACE";
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
      <div className="w-full max-w-4xl rounded-xl border border-white/14 bg-dark shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Manual Change Log (ACE)</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {!approvalStepOpen ? (
          <form onSubmit={handleSubmitClick} className="p-6 space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* System (minimal) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>System ID</label>
                <input
                  type="text"
                  value={systemId}
                  onChange={(e) => setSystemId(e.target.value)}
                  placeholder="e.g. support-copilot"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>System name</label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  placeholder="e.g. Support Copilot"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>System type</label>
              <select value={systemType} onChange={(e) => setSystemType(e.target.value)} className={inputClass}>
                {SYSTEM_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Change categories: 4 default + Show more */}
            <div>
              <label className="block text-sm font-medium text-muted2 mb-2">Change categories (select at least one)</label>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_CATEGORIES.map(({ id, label }) => (
                  <label key={id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(id)}
                      onChange={() => toggleCategory(id)}
                      className="rounded border-white/20 bg-white/5"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setShowMoreExpanded((b) => !b)}
                  className="flex items-center gap-1 text-sm text-muted2 hover:text-white"
                >
                  {showMoreExpanded ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
                  Show more
                </button>
                {showMoreExpanded && (
                  <div className="flex flex-wrap gap-2 mt-2 pl-4">
                    {SHOW_MORE_CATEGORIES.map(({ id, label }) => (
                      <label key={id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.has(id)}
                          onChange={() => toggleCategory(id)}
                          className="rounded border-white/20 bg-white/5"
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Before/After panels per selected category */}
            {selectedCategories.has("model_change") && (
              <Section title="Model change" onCopyBeforeToAfter={() => copyBeforeToAfter("model")}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Provider</label>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {PROVIDERS_TOP_8.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() =>
                            setModelChange((m) => ({
                              ...m,
                              before: { ...m.before, provider: p },
                            }))
                          }
                          className={`px-2 py-1 rounded text-xs ${modelChange.before.provider === p ? "bg-purple-500/30 text-white" : "bg-white/5 text-muted2"}`}
                        >
                          {PROVIDER_LABELS[p] ?? p}
                        </button>
                      ))}
                      <select
                        className="ml-1 px-2 py-1 rounded text-xs bg-white/5 text-muted2"
                        value={modelChange.before.provider === "other_custom" || PROVIDERS_MORE.includes(modelChange.before.provider as any) ? modelChange.before.provider : ""}
                        onChange={(e) =>
                          setModelChange((m) => ({ ...m, before: { ...m.before, provider: e.target.value || undefined } }))
                        }
                      >
                        <option value="">More…</option>
                        {PROVIDERS_MORE.map((p) => (
                          <option key={p} value={p}>
                            {PROVIDER_LABELS[p] ?? p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      placeholder="Family"
                      value={modelChange.before.family ?? ""}
                      onChange={(e) => setModelChange((m) => ({ ...m, before: { ...m.before, family: e.target.value || undefined } }))}
                      className={inputClass}
                    />
                    <input
                      placeholder="Model ID"
                      value={modelChange.before.model_id ?? ""}
                      onChange={(e) => setModelChange((m) => ({ ...m, before: { ...m.before, model_id: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <input
                      placeholder="Deployment/alias (optional)"
                      value={modelChange.before.deployment_alias ?? ""}
                      onChange={(e) => setModelChange((m) => ({ ...m, before: { ...m.before, deployment_alias: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Provider</label>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {PROVIDERS_TOP_8.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() =>
                            setModelChange((m) => ({
                              ...m,
                              after: { ...m.after, provider: p },
                            }))
                          }
                          className={`px-2 py-1 rounded text-xs ${modelChange.after.provider === p ? "bg-purple-500/30 text-white" : "bg-white/5 text-muted2"}`}
                        >
                          {PROVIDER_LABELS[p] ?? p}
                        </button>
                      ))}
                      <select
                        className="ml-1 px-2 py-1 rounded text-xs bg-white/5 text-muted2"
                        value={modelChange.after.provider === "other_custom" || PROVIDERS_MORE.includes(modelChange.after.provider as any) ? modelChange.after.provider : ""}
                        onChange={(e) =>
                          setModelChange((m) => ({ ...m, after: { ...m.after, provider: e.target.value || undefined } }))
                        }
                      >
                        <option value="">More…</option>
                        {PROVIDERS_MORE.map((p) => (
                          <option key={p} value={p}>
                            {PROVIDER_LABELS[p] ?? p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      placeholder="Family"
                      value={modelChange.after.family ?? ""}
                      onChange={(e) => setModelChange((m) => ({ ...m, after: { ...m.after, family: e.target.value || undefined } }))}
                      className={inputClass}
                    />
                    <input
                      placeholder="Model ID"
                      value={modelChange.after.model_id ?? ""}
                      onChange={(e) => setModelChange((m) => ({ ...m, after: { ...m.after, model_id: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <input
                      placeholder="Deployment/alias (optional)"
                      value={modelChange.after.deployment_alias ?? ""}
                      onChange={(e) => setModelChange((m) => ({ ...m, after: { ...m.after, deployment_alias: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                  </div>
                </div>
              </Section>
            )}

            {selectedCategories.has("prompt_change") && (
              <Section title="Prompt change (metadata only)" onCopyBeforeToAfter={() => copyBeforeToAfter("prompt")}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-muted2 mb-2">Before</div>
                    <select
                      value={promptChange.before.surface ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, before: { ...p.before, surface: e.target.value || undefined } }))}
                      className={inputClass}
                    >
                      <option value="">Surface</option>
                      {PROMPT_SURFACES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Est. prompt tokens"
                      value={promptChange.before.est_prompt_tokens ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, before: { ...p.before, est_prompt_tokens: e.target.value ? parseInt(e.target.value, 10) : undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <textarea
                      placeholder="Notes"
                      value={promptChange.before.notes ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, before: { ...p.before, notes: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                      rows={2}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted2 mb-2">After</div>
                    <select
                      value={promptChange.after.surface ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, after: { ...p.after, surface: e.target.value || undefined } }))}
                      className={inputClass}
                    >
                      <option value="">Surface</option>
                      {PROMPT_SURFACES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Est. prompt tokens"
                      value={promptChange.after.est_prompt_tokens ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, after: { ...p.after, est_prompt_tokens: e.target.value ? parseInt(e.target.value, 10) : undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <input
                      type="number"
                      placeholder="Est. delta tokens"
                      value={promptChange.after.est_delta_tokens ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, after: { ...p.after, est_delta_tokens: e.target.value ? parseInt(e.target.value, 10) : undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <select
                      value={promptChange.after.magnitude ?? "medium"}
                      onChange={(e) => setPromptChange((p) => ({ ...p, after: { ...p.after, magnitude: e.target.value } }))}
                      className={`${inputClass} mt-1`}
                    >
                      {MAGNITUDE_OPTIONS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Notes"
                      value={promptChange.after.notes ?? ""}
                      onChange={(e) => setPromptChange((p) => ({ ...p, after: { ...p.after, notes: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                      rows={2}
                    />
                  </div>
                </div>
              </Section>
            )}

            {selectedCategories.has("inference_change") && (
              <Section title="Inference config change" onCopyBeforeToAfter={() => copyBeforeToAfter("inference")}>
                <div className="grid grid-cols-2 gap-4">
                  <InferenceColumn
                    delta={inferenceChange.before}
                    setDelta={(before) => setInferenceChange((i) => ({ ...i, before }))}
                    title="Before"
                  />
                  <InferenceColumn
                    delta={inferenceChange.after}
                    setDelta={(after) => setInferenceChange((i) => ({ ...i, after }))}
                    title="After"
                  />
                </div>
              </Section>
            )}

            {selectedCategories.has("tooling_change") && (
              <Section title="Tooling change" onCopyBeforeToAfter={() => copyBeforeToAfter("tooling")}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-muted2 mb-2">Before</div>
                    <input
                      placeholder="Toolset version"
                      value={toolingChange.before.toolset_version ?? ""}
                      onChange={(e) => setToolingChange((t) => ({ ...t, before: { ...t.before, toolset_version: e.target.value || undefined } }))}
                      className={inputClass}
                    />
                    <input
                      placeholder="Tools changed (comma-separated)"
                      value={toolingChange.before.tools_changed ?? ""}
                      onChange={(e) => setToolingChange((t) => ({ ...t, before: { ...t.before, tools_changed: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <select
                      value={toolingChange.before.routing_or_planner_changed ?? ""}
                      onChange={(e) => setToolingChange((t) => ({ ...t, before: { ...t.before, routing_or_planner_changed: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    >
                      <option value="">Routing/planner changed</option>
                      {ROUTING_CHANGED_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <textarea placeholder="Notes" value={toolingChange.before.notes ?? ""} onChange={(e) => setToolingChange((t) => ({ ...t, before: { ...t.before, notes: e.target.value || undefined } }))} className={`${inputClass} mt-1`} rows={2} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted2 mb-2">After</div>
                    <input
                      placeholder="Toolset version"
                      value={toolingChange.after.toolset_version ?? ""}
                      onChange={(e) => setToolingChange((t) => ({ ...t, after: { ...t.after, toolset_version: e.target.value || undefined } }))}
                      className={inputClass}
                    />
                    <input
                      placeholder="Tools changed (comma-separated)"
                      value={toolingChange.after.tools_changed ?? ""}
                      onChange={(e) => setToolingChange((t) => ({ ...t, after: { ...t.after, tools_changed: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    />
                    <select
                      value={toolingChange.after.routing_or_planner_changed ?? ""}
                      onChange={(e) => setToolingChange((t) => ({ ...t, after: { ...t.after, routing_or_planner_changed: e.target.value || undefined } }))}
                      className={`${inputClass} mt-1`}
                    >
                      <option value="">Routing/planner changed</option>
                      {ROUTING_CHANGED_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <textarea placeholder="Notes" value={toolingChange.after.notes ?? ""} onChange={(e) => setToolingChange((t) => ({ ...t, after: { ...t.after, notes: e.target.value || undefined } }))} className={`${inputClass} mt-1`} rows={2} />
                  </div>
                </div>
              </Section>
            )}

            {/* Show-more: generic before/after summary */}
            {SHOW_MORE_CATEGORIES.filter((c) => selectedCategories.has(c.id)).map(({ id, label }) => {
              const oc = otherChanges[id] ?? { category_key: id, before: {}, after: {} };
              return (
                <Section key={id} title={label}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Before summary</label>
                      <input
                        value={oc.before?.summary ?? ""}
                        onChange={(e) =>
                          setOtherChanges((o) => ({
                            ...o,
                            [id]: { ...(o[id] ?? oc), before: { summary: e.target.value || undefined } },
                          }))
                        }
                        className={inputClass}
                        placeholder="Short description"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>After summary</label>
                      <input
                        value={oc.after?.summary ?? ""}
                        onChange={(e) =>
                          setOtherChanges((o) => ({
                            ...o,
                            [id]: { ...(o[id] ?? oc), after: { summary: e.target.value || undefined } },
                          }))
                        }
                        className={inputClass}
                        placeholder="Short description"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className={labelClass}>Notes</label>
                    <input
                      value={oc.notes ?? ""}
                      onChange={(e) =>
                        setOtherChanges((o) => ({
                          ...o,
                          [id]: { ...(o[id] ?? oc), notes: e.target.value || undefined },
                        }))
                      }
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                </Section>
              );
            })}

            {/* Intent & reason */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Intent</label>
                <select value={intent} onChange={(e) => setIntent(e.target.value)} className={inputClass}>
                  {INTENTS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Reason (optional)</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Brief reason"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Risk */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm font-medium text-muted2 mb-2">Risk</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Severity</label>
                  <select value={severity} onChange={(e) => setSeverity(e.target.value)} className={inputClass}>
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Blast radius</label>
                  <select value={blastRadius} onChange={(e) => setBlastRadius(e.target.value)} className={inputClass}>
                    {BLAST_RADIUS.map((b) => (
                      <option key={b} value={b}>{b.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Customer impact</label>
                  <select value={customerImpact} onChange={(e) => setCustomerImpact(e.target.value)} className={inputClass}>
                    {CUSTOMER_IMPACT.map((c) => (
                      <option key={c} value={c}>{c}</option>
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
                disabled={selectedCategories.size === 0}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                Create record
              </button>
            </div>
          </form>
        ) : (
          /* Approval step */
          <div className="p-6 space-y-5">
            <h3 className="font-semibold">Approval</h3>
            <p className="text-sm text-muted2">Creating this manual ACE implies it was approved according to the rule below.</p>
            {error && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className={labelClass}>Approval rule (required)</label>
              <select
                value={approval.rule_type}
                onChange={(e) => setApproval((a) => ({ ...a, rule_type: e.target.value as Approval["rule_type"] }))}
                className={inputClass}
              >
                {APPROVAL_RULES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            {approval.rule_type === "single_approver" && (
              <>
                <div>
                  <label className={labelClass}>Approver role/title (required)</label>
                  <input
                    value={approval.approver_role ?? ""}
                    onChange={(e) => setApproval((a) => ({ ...a, approver_role: e.target.value || undefined }))}
                    className={inputClass}
                    placeholder="e.g. Tech Lead"
                  />
                </div>
                <div>
                  <label className={labelClass}>Approver name/email (optional)</label>
                  <input
                    value={approval.approver_identity ?? ""}
                    onChange={(e) => setApproval((a) => ({ ...a, approver_identity: e.target.value || undefined }))}
                    className={inputClass}
                    placeholder="e.g. name@company.com"
                  />
                </div>
              </>
            )}
            {approval.rule_type === "custom" && (
              <div>
                <label className={labelClass}>Rule description (required)</label>
                <textarea
                  value={approval.custom_rule_text ?? ""}
                  onChange={(e) => setApproval((a) => ({ ...a, custom_rule_text: e.target.value || undefined }))}
                  className={inputClass}
                  rows={3}
                  placeholder="Describe the approval rule"
                />
              </div>
            )}
            <div>
              <label className={labelClass}>Approval notes (optional)</label>
              <input
                value={approval.notes ?? ""}
                onChange={(e) => setApproval((a) => ({ ...a, notes: e.target.value || undefined }))}
                className={inputClass}
                placeholder="Short notes"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setApprovalStepOpen(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-white/14 bg-white/5 hover:bg-white/8 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleApprovalSubmit}
                disabled={submitting}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {submitting ? "Saving…" : "Save ACE"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  onCopyBeforeToAfter,
  children,
}: {
  title: string;
  onCopyBeforeToAfter?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl border border-white/14 bg-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {onCopyBeforeToAfter && (
          <button
            type="button"
            onClick={onCopyBeforeToAfter}
            className="flex items-center gap-1 text-xs text-muted2 hover:text-white"
          >
            <FiCopy className="w-3 h-3" />
            Copy Before → After
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function InferenceColumn({
  title,
  delta,
  setDelta,
}: {
  title: string;
  delta: import("@/lib/ace-types").InferenceChange["before"];
  setDelta: (d: import("@/lib/ace-types").InferenceChange["before"]) => void;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-muted2 mb-2">{title}</div>
      <div className="space-y-1">
        <input type="number" step="any" placeholder="temperature" value={delta.temperature ?? ""} onChange={(e) => setDelta({ ...delta, temperature: e.target.value ? parseFloat(e.target.value) : undefined })} className={inputClass} />
        <input type="number" step="any" placeholder="top_p" value={delta.top_p ?? ""} onChange={(e) => setDelta({ ...delta, top_p: e.target.value ? parseFloat(e.target.value) : undefined })} className={inputClass} />
        <input type="number" placeholder="max_tokens" value={delta.max_tokens ?? ""} onChange={(e) => setDelta({ ...delta, max_tokens: e.target.value ? parseInt(e.target.value, 10) : undefined })} className={inputClass} />
        <input type="number" step="any" placeholder="presence_penalty" value={delta.presence_penalty ?? ""} onChange={(e) => setDelta({ ...delta, presence_penalty: e.target.value ? parseFloat(e.target.value) : undefined })} className={inputClass} />
        <input type="number" step="any" placeholder="frequency_penalty" value={delta.frequency_penalty ?? ""} onChange={(e) => setDelta({ ...delta, frequency_penalty: e.target.value ? parseFloat(e.target.value) : undefined })} className={inputClass} />
        <input type="number" placeholder="seed" value={delta.seed ?? ""} onChange={(e) => setDelta({ ...delta, seed: e.target.value ? parseInt(e.target.value, 10) : undefined })} className={inputClass} />
        <div>
          <label className={labelClass}>Chat history (no content stored)</label>
          <select
            value={delta.chat_history?.mode ?? ""}
            onChange={(e) => setDelta({ ...delta, chat_history: { ...delta.chat_history, mode: e.target.value || undefined } })}
            className={inputClass}
          >
            <option value="">—</option>
            {CHAT_HISTORY_MODES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="n_turns"
            value={delta.chat_history?.n_turns ?? ""}
            onChange={(e) => setDelta({ ...delta, chat_history: { ...delta.chat_history, n_turns: e.target.value ? parseInt(e.target.value, 10) : undefined } })}
            className={`${inputClass} mt-1`}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Manual ACE types aligned with API/SDK schema.
 * Delta-first: before/after per category; production-only; approval at submit.
 */

// Default visible categories (choose at least 1)
export const DEFAULT_CATEGORIES = [
  { id: "model_change" as const, label: "Model change" },
  { id: "prompt_change" as const, label: "Prompt change" },
  { id: "inference_change" as const, label: "Inference config change" },
  { id: "tooling_change" as const, label: "Tooling change" },
] as const;

// Show more (collapsed by default)
export const SHOW_MORE_CATEGORIES = [
  { id: "retrieval_change" as const, label: "Retrieval change (RAG)" },
  { id: "safety_policy_change" as const, label: "Safety/policy change" },
  { id: "post_processing_change" as const, label: "Post-processing change" },
  { id: "infra_runtime_change" as const, label: "Infra/runtime change" },
  { id: "data_knowledge_change" as const, label: "Data/knowledge change" },
  { id: "other" as const, label: "Other" },
] as const;

export type DefaultCategoryId = (typeof DEFAULT_CATEGORIES)[number]["id"];
export type ShowMoreCategoryId = (typeof SHOW_MORE_CATEGORIES)[number]["id"];
export type AnyCategoryId = DefaultCategoryId | ShowMoreCategoryId;

// Model change
export interface ModelChangeDelta {
  provider?: string;
  family?: string;
  model_id?: string;
  deployment_alias?: string;
}
export interface ModelChange {
  before: ModelChangeDelta;
  after: ModelChangeDelta;
}

// Prompt change (metadata only)
export interface PromptChangeDelta {
  surface?: string;
  est_prompt_tokens?: number;
  est_delta_tokens?: number;
  magnitude?: string;
  notes?: string;
}
export interface PromptChange {
  before: PromptChangeDelta;
  after: PromptChangeDelta;
}

// Inference config (includes chat_history, no raw content)
export interface ChatHistoryConfig {
  mode?: string;
  n_turns?: number;
  notes?: string;
}
export interface InferenceChangeDelta {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  seed?: number;
  stop?: string[];
  chat_history?: ChatHistoryConfig;
  custom_params?: Record<string, { before?: string | number; after?: string | number }>;
}
export interface InferenceChange {
  before: InferenceChangeDelta;
  after: InferenceChangeDelta;
}

// Tooling change
export interface ToolingChangeDelta {
  toolset_version?: string;
  tools_changed?: string;
  routing_or_planner_changed?: string;
  notes?: string;
}
export interface ToolingChange {
  before: ToolingChangeDelta;
  after: ToolingChangeDelta;
}

// Show-more: generic before/after summary only
export interface GenericCategoryChange {
  category_key: string;
  before: { summary?: string };
  after: { summary?: string };
  notes?: string;
}

// Approval (required at submit)
export type ApprovalRuleType = "single_approver" | "majority_approval" | "unanimous_approval" | "custom";
export interface Approval {
  rule_type: ApprovalRuleType;
  approver_role?: string;
  approver_identity?: string;
  custom_rule_text?: string;
  notes?: string;
}

// API payload shape for manual ACE
export interface ManualAcePayload {
  schema_version: string;
  occurred_at: string;
  environment: "production";
  system: { system_id: string; name: string; type: string };
  source: {
    origin: "manual";
    actor: { actor_type: "human"; display_name: string };
    approval: Approval;
  };
  change: {
    change_type: string;
    intent: string;
    reason?: string;
    baseline: Record<string, unknown>;
    candidate: Record<string, unknown>;
    model_change?: ModelChange;
    prompt_change?: PromptChange;
    inference_change?: InferenceChange;
    tooling_change?: ToolingChange;
    other_changes?: GenericCategoryChange[];
  };
  risk: { severity: string; blast_radius: string; customer_impact: string };
  fingerprints: { change_fingerprint: string };
}

// Provider pills: top 8 + More dropdown
export const PROVIDERS_TOP_8 = [
  "openai",
  "anthropic",
  "google",
  "meta",
  "mistral",
  "cohere",
  "deepseek",
  "azure_openai",
] as const;
export const PROVIDERS_MORE = [
  "xai",
  "kimi_moonshot",
  "alibaba_qwen",
  "baidu_ernie",
  "tencent_hunyuan",
  "bytedance_doubao",
  "other_custom",
] as const;
export const PROVIDER_LABELS: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
  meta: "Meta",
  mistral: "Mistral",
  cohere: "Cohere",
  deepseek: "DeepSeek",
  azure_openai: "Azure OpenAI",
  xai: "xAI",
  kimi_moonshot: "Kimi (Moonshot)",
  alibaba_qwen: "Alibaba/Qwen",
  baidu_ernie: "Baidu/ERNIE",
  tencent_hunyuan: "Tencent/Hunyuan",
  bytedance_doubao: "ByteDance/Doubao",
  other_custom: "Other/Custom",
};

export const PROMPT_SURFACES = ["system", "developer", "tool", "retrieval-template", "other"] as const;
export const MAGNITUDE_OPTIONS = ["small", "medium", "large"] as const;
export const CHAT_HISTORY_MODES = ["off", "last_n_turns", "summary", "other"] as const;
export const ROUTING_CHANGED_OPTIONS = ["yes", "no", "unknown"] as const;

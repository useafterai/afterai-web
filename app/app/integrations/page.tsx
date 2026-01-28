"use client";

import { useState } from "react";
import { FiCheck, FiCopy, FiCode, FiKey } from "react-icons/fi";

const integrations = [
  { id: "openai", name: "OpenAI", icon: "🤖" },
  { id: "anthropic", name: "Anthropic", icon: "🧠" },
  { id: "langchain", name: "LangChain", icon: "🔗" },
  { id: "litellm", name: "LiteLLM", icon: "⚡" },
  { id: "llamaindex", name: "LlamaIndex", icon: "🦙" },
  { id: "manual", name: "Manual / API", icon: "📡" },
];

export default function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState(false);

  const handleIntegrationSelect = (id: string) => {
    setSelectedIntegration(id);
    setStep(2);
  };

  const handleCreateApiKey = () => {
    // Stub: Generate API key
    const generatedKey = `aa_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(generatedKey);
    setStep(3);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pythonCode = `from afterai import AfterAI

client = AfterAI(
    api_key="${apiKey || "YOUR_API_KEY"}",
    tenant_id="YOUR_TENANT_ID"
)

# Log an AI change event (ACE)
client.log_ace(
    system_id="my-ai-system",
    system_name="My AI System",
    change_type="model",
    occurred_at="2024-01-15T10:30:00Z"
)`;

  const typescriptCode = `import { AfterAI } from '@afterai/sdk';

const client = new AfterAI({
  apiKey: '${apiKey || "YOUR_API_KEY"}',
  tenantId: 'YOUR_TENANT_ID',
});

// Log an AI change event (ACE)
await client.logACE({
  systemId: 'my-ai-system',
  systemName: 'My AI System',
  changeType: 'model',
  occurredAt: '2024-01-15T10:30:00Z',
});`;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integrations / Tracing Projects</h1>
        <p className="text-muted">
          Log AI change events (ACE) and metadata to AfterAI. Prompts/outputs optional.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center gap-4">
        <StepIndicator step={1} currentStep={step} label="Choose Integration" />
        <div className="flex-1 h-px bg-white/12" />
        <StepIndicator step={2} currentStep={step} label="Create API Key" />
        <div className="flex-1 h-px bg-white/12" />
        <StepIndicator step={3} currentStep={step} label="Install & Configure" />
      </div>

      {/* Step 1: Choose Integration */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Choose your integration</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <button
                key={integration.id}
                onClick={() => handleIntegrationSelect(integration.id)}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-white/8 transition-all text-left group"
              >
                <div className="text-4xl mb-3">{integration.icon}</div>
                <div className="font-semibold mb-1">{integration.name}</div>
                <div className="text-sm text-muted2">Click to configure</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Create API Key */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Create API Key</h2>
          <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
            <p className="text-muted mb-6">
              Generate an API key for ACE capture. This key is used to authenticate your integration and log change events to AfterAI.
            </p>
            <button
              onClick={handleCreateApiKey}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FiKey className="w-5 h-5" />
              Generate API Key
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Install & Configure */}
      {step === 3 && apiKey && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-6">Install & Configure</h2>
            
            {/* API Key Display */}
            <div className="mb-6 p-4 rounded-lg border border-gold-500/30 bg-gold-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted2 mb-1">Your API Key</div>
                  <div className="font-mono text-sm break-all">{apiKey}</div>
                  <div className="text-xs text-muted2 mt-2">
                    ⚠️ This key will only be shown once. Save it securely.
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(apiKey)}
                  className="p-2 rounded-lg border border-white/16 bg-white/5 hover:bg-white/8 transition-all"
                >
                  <FiCopy className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Important Note */}
            <div className="mb-6 p-4 rounded-lg border border-purple-500/30 bg-purple-500/10">
              <div className="font-semibold mb-2">Out-of-band collection</div>
              <p className="text-sm text-muted">
                AfterAI uses fail-open architecture that doesn't sit in your inference path. Your production performance stays intact.
              </p>
            </div>

            {/* Python Installation */}
            <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FiCode className="w-5 h-5" />
                  Python
                </h3>
                <button
                  onClick={() => copyToClipboard(`pip install afterai\n\n${pythonCode}`)}
                  className="px-3 py-1.5 rounded-lg border border-white/16 bg-white/5 hover:bg-white/8 transition-all text-sm flex items-center gap-2"
                >
                  <FiCopy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted2 mb-2">Install:</div>
                <pre className="p-4 rounded-lg bg-black/40 border border-white/10 text-sm overflow-x-auto">
                  <code>pip install afterai</code>
                </pre>
                <div className="text-sm text-muted2 mt-4 mb-2">Usage:</div>
                <pre className="p-4 rounded-lg bg-black/40 border border-white/10 text-sm overflow-x-auto">
                  <code>{pythonCode}</code>
                </pre>
              </div>
            </div>

            {/* TypeScript Installation */}
            <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FiCode className="w-5 h-5" />
                  TypeScript / JavaScript
                </h3>
                <button
                  onClick={() => copyToClipboard(`npm install @afterai/sdk\n\n${typescriptCode}`)}
                  className="px-3 py-1.5 rounded-lg border border-white/16 bg-white/5 hover:bg-white/8 transition-all text-sm flex items-center gap-2"
                >
                  <FiCopy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted2 mb-2">Install:</div>
                <pre className="p-4 rounded-lg bg-black/40 border border-white/10 text-sm overflow-x-auto">
                  <code>npm install @afterai/sdk</code>
                </pre>
                <div className="text-sm text-muted2 mt-4 mb-2">Usage:</div>
                <pre className="p-4 rounded-lg bg-black/40 border border-white/10 text-sm overflow-x-auto">
                  <code>{typescriptCode}</code>
                </pre>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 text-gold-500 flex-shrink-0" />
                  <span>Install the SDK in your project</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 text-gold-500 flex-shrink-0" />
                  <span>Configure your API key and tenant ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 text-gold-500 flex-shrink-0" />
                  <span>Start logging ACE events from your AI systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 text-gold-500 flex-shrink-0" />
                  <span>View your change feed in the console</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step, currentStep, label }: { step: number; currentStep: number; label: string }) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
          isActive
            ? "bg-gradient-to-r from-purple-500 to-gold-500 text-dark"
            : isCompleted
            ? "bg-gold-500/20 text-gold-500 border border-gold-500/30"
            : "bg-white/5 text-muted border border-white/10"
        }`}
      >
        {isCompleted ? <FiCheck className="w-5 h-5" /> : step}
      </div>
      <span className={`text-xs ${isActive ? "text-white font-semibold" : "text-muted2"}`}>{label}</span>
    </div>
  );
}

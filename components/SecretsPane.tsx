"use client";

import { useState, useEffect, useCallback } from "react";
import { FiCopy, FiKey, FiRefreshCw } from "react-icons/fi";

type SessionMe = { tenant_id: string; email?: string | null; username?: string | null };

function copyToClipboard(text: string, onDone: () => void) {
  navigator.clipboard.writeText(text).then(onDone);
}

export default function SecretsPane() {
  const [session, setSession] = useState<SessionMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedTenant, setCopiedTenant] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [rotateError, setRotateError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/session/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SessionMe | null) => {
        if (!cancelled && data?.tenant_id) setSession(data);
      })
      .catch(() => {
        if (!cancelled) setSession(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRotate = useCallback(() => {
    setRotating(true);
    setRotateError(null);
    setNewApiKey(null);
    fetch("/api/session/rotate-api-key", { method: "POST" })
      .then((r) => r.json())
      .then((data: { api_key?: string; error?: string }) => {
        if (data.api_key) setNewApiKey(data.api_key);
        else setRotateError(data.error ?? "Rotate failed");
      })
      .catch(() => setRotateError("Request failed"))
      .finally(() => setRotating(false));
  }, []);

  if (loading || !session) return null;

  return (
    <div className="p-4 border-b border-white/8">
      <div className="px-3 mb-2 text-xs font-bold text-muted2 uppercase tracking-wider flex items-center gap-2">
        <FiKey className="w-3.5 h-3.5" />
        Secrets
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 space-y-3 p-3">
        {/* Tenant ID */}
        <div>
          <div className="text-xs text-muted2 mb-1">Tenant ID</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs font-mono truncate bg-dark/50 px-2 py-1.5 rounded border border-white/10">
              {session.tenant_id}
            </code>
            <button
              type="button"
              onClick={() => {
                copyToClipboard(session.tenant_id, () => {
                  setCopiedTenant(true);
                  setTimeout(() => setCopiedTenant(false), 2000);
                });
              }}
              className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-white transition-colors"
              title="Copy tenant ID"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
          {copiedTenant && (
            <div className="text-xs text-green-400 mt-1">Copied</div>
          )}
        </div>

        {/* API Key */}
        <div>
          <div className="text-xs text-muted2 mb-1">API Key</div>
          {newApiKey ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs font-mono truncate bg-dark/50 px-2 py-1.5 rounded border border-white/10 break-all">
                  {newApiKey}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(newApiKey, () => {
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    });
                  }}
                  className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-white transition-colors flex-shrink-0"
                  title="Copy API key"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-amber-400/90">
                Store this key securely. It won’t be shown again.
              </p>
              {copiedKey && (
                <div className="text-xs text-green-400">Copied</div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted2">
                Not shown after creation. Rotate to get a new key.
              </p>
              <button
                type="button"
                onClick={handleRotate}
                disabled={rotating}
                className="flex items-center gap-2 w-full justify-center px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium hover:bg-purple-500/30 disabled:opacity-50 transition-all"
              >
                <FiRefreshCw
                  className={`w-4 h-4 ${rotating ? "animate-spin" : ""}`}
                />
                {rotating ? "Rotating…" : "Rotate API key"}
              </button>
              {rotateError && (
                <div className="text-xs text-red-400">{rotateError}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApiKeysPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">API Keys</h1>
          <p className="text-muted">Manage your API keys for ACE capture</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all">
          Create API Key
        </button>
      </div>

      <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
        <div className="text-6xl mb-4">🔑</div>
        <h2 className="text-xl font-semibold mb-2">No API keys yet</h2>
        <p className="text-muted mb-6">
          Create an API key to start logging ACE events from your integrations.
        </p>
        <a
          href="/app/integrations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all"
        >
          Set up Integration
        </a>
      </div>
    </div>
  );
}

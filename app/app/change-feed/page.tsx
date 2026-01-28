export default function ChangeFeedPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Change Feed</h1>
        <p className="text-muted">View all AI change events (ACE) captured from your systems</p>
      </div>

      <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-xl font-semibold mb-2">No change events yet</h2>
        <p className="text-muted mb-6">
          Start logging ACE events from your integrations to see them here.
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

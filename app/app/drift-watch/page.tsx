export default function DriftWatchPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Drift Watch</h1>
        <p className="text-muted">Monitor AI system drift and quality degradation</p>
      </div>
      <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
        <div className="text-6xl mb-4">📉</div>
        <h2 className="text-xl font-semibold mb-2">No drift data yet</h2>
        <p className="text-muted">Start logging ACE events to track drift over time.</p>
      </div>
    </div>
  );
}

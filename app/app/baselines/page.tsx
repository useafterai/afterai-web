export default function BaselinesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Baselines</h1>
        <p className="text-muted">Manage baseline configurations for AURA assessments</p>
      </div>
      <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
        <div className="text-6xl mb-4">📐</div>
        <h2 className="text-xl font-semibold mb-2">No baselines yet</h2>
        <p className="text-muted">Create baselines to compare against when assessing changes.</p>
      </div>
    </div>
  );
}

export default function DashboardsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboards</h1>
        <p className="text-muted">Visualize your AI change intelligence data</p>
      </div>
      <div className="p-8 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-xl font-semibold mb-2">No dashboards yet</h2>
        <p className="text-muted">Create custom dashboards to visualize your change data.</p>
      </div>
    </div>
  );
}

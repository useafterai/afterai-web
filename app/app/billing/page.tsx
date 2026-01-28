export default function BillingPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Usage & Billing</h1>
        <p className="text-muted">Monitor your usage and manage your plan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
          <h2 className="font-semibold mb-4">Current Plan</h2>
          <div className="text-3xl font-bold mb-2">Monitor</div>
          <div className="text-muted mb-4">Free forever</div>
          <button className="w-full px-4 py-2 rounded-lg border border-white/16 bg-white/5 hover:bg-white/8 transition-all">
            Upgrade Plan
          </button>
        </div>

        <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
          <h2 className="font-semibold mb-4">Usage This Month</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted2">ACE Events</span>
                <span className="text-sm font-semibold">0 / 25</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-gold-500" style={{ width: "0%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted2">AURA Assessments</span>
                <span className="text-sm font-semibold">0 / 1 (Preview)</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-gold-500" style={{ width: "0%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

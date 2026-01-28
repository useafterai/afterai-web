export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
          <h2 className="font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full px-4 py-3 rounded-lg border border-white/16 bg-black/22 text-white outline-none focus:border-purple-500/55 focus:ring-4 focus:ring-purple-500/16"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Data Region</label>
              <select className="w-full px-4 py-3 rounded-lg border border-white/16 bg-black/22 text-white outline-none focus:border-purple-500/55 focus:ring-4 focus:ring-purple-500/16">
                <option value="US">United States</option>
                <option value="EU">European Union</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4">
          <h2 className="font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/16 bg-black/22 text-purple-500" />
              <span className="text-sm">Email notifications for important changes</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-white/16 bg-black/22 text-purple-500" />
              <span className="text-sm">Weekly usage summary</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

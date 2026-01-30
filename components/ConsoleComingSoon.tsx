"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function ConsoleComingSoon() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/session/logout", { method: "POST" });
    router.push("/console-coming-soon");
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.22\'/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay rotate-12" />
        <div className="absolute -left-72 -top-72 h-[820px] w-[820px] rounded-full bg-gradient-radial from-purple-500/30 to-transparent blur-[70px] opacity-28" />
        <div className="absolute -right-80 top-32 h-[820px] w-[820px] rounded-full bg-gradient-radial from-gold-500/30 to-transparent blur-[70px] opacity-28" />
      </div>

      <Link href="/" className="flex items-center gap-3 mb-12">
        <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
        <span className="text-xl font-bold">AfterAI</span>
      </Link>

      <div className="max-w-md text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500 text-xs font-bold mb-6">
          Coming soon
        </div>
        <h1 className="text-3xl font-bold mb-4">You&apos;re signed in</h1>
        <p className="text-muted mb-8">
          Console access is coming soon. We&apos;ll notify you when it&apos;s available.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/14 bg-white/5 text-white font-semibold hover:bg-white/8 transition-all"
        >
          <FiLogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

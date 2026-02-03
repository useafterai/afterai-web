"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import {
  FiHome,
  FiActivity,
  FiTrendingUp,
  FiFileText,
  FiSettings,
  FiCode,
  FiKey,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import SecretsPane from "@/components/SecretsPane";

type NavItem = {
  name: string;
  href: string;
  icon: IconType;
  badge?: string;
};

type NavSection = {
  name: string;
  section: true;
  items: NavItem[];
};

type NavEntry = NavItem | NavSection;

function isNavSection(entry: NavEntry): entry is NavSection {
  return "section" in entry && entry.section === true;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/session/logout", { method: "POST" });
    router.push("/console-coming-soon");
  };

  const navigation: NavEntry[] = [
    { name: "Home", href: "/app", icon: FiHome },
    {
      name: "OBSERVE",
      section: true,
      items: [
        { name: "Signals (AIS)", href: "/app/signals", icon: FiActivity },
        { name: "Decisions (ACE)", href: "/app/decisions", icon: FiActivity },
        { name: "Drift Watch", href: "/app/drift-watch", icon: FiTrendingUp },
        { name: "Dashboards", href: "/app/dashboards", icon: FiFileText },
      ],
    },
    {
      name: "ASSESS",
      section: true,
      items: [
        { name: "Assessments", href: "/app/assessments", icon: FiTrendingUp },
        { name: "Baselines", href: "/app/baselines", icon: FiFileText },
      ],
    },
    {
      name: "RECORD",
      section: true,
      items: [
        { name: "PACRs", href: "/app/pacrs", icon: FiFileText, badge: "Coming soon" },
      ],
    },
    {
      name: "DEVELOP",
      section: true,
      items: [
        { name: "Integrations", href: "/app/integrations", icon: FiCode },
        { name: "API Keys", href: "/app/api-keys", icon: FiKey },
      ],
    },
    {
      name: "ADMIN",
      section: true,
      items: [
        { name: "Usage & Billing", href: "/app/billing", icon: FiSettings },
        { name: "Settings", href: "/app/settings", icon: FiSettings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 border-r border-white/8 bg-dark/95 backdrop-blur-xl overflow-hidden flex-shrink-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-white/8 flex items-center justify-between">
            <Link href="/app" className="flex items-center gap-3">
              <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
              <span className="text-lg font-bold">AfterAI</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Space Selector */}
          <div className="p-4 border-b border-white/8">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-muted2 mb-1">AfterAI Space</div>
              <div className="font-semibold text-sm">oscarsk91</div>
            </div>
          </div>

          {/* Secrets: Tenant ID + API key (rotate) */}
          <SecretsPane />

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigation.map((entry) => {
              if (isNavSection(entry)) {
                return (
                  <div key={entry.name}>
                    <div className="px-3 mb-2 text-xs font-bold text-muted2 uppercase tracking-wider">
                      {entry.name}
                    </div>
                    <div className="space-y-1">
                      {entry.items.map((navItem) => (
                        <Link
                          key={navItem.href}
                          href={navItem.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                            pathname === navItem.href
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "text-muted hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <navItem.icon className="w-5 h-5" />
                          <span className="flex-1">{navItem.name}</span>
                          {navItem.badge && (
                            <span className="px-2 py-0.5 text-xs rounded-full border border-gold-500/22 bg-gold-500/10 text-gold-500">
                              {navItem.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              // Simple nav item
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    pathname === entry.href
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <entry.icon className="w-5 h-5" />
                  <span>{entry.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-white/8">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-gold-500 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">User</div>
                <div className="text-xs text-muted2 truncate">user@example.com</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-2 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-all text-left"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-white/8 bg-dark/95 backdrop-blur-xl flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">
              Monitor Plan
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

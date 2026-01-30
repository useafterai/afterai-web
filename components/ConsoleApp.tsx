"use client";

import AppShell from "./AppShell";
import AppHomeContent from "./AppHomeContent";

/**
 * Real console UI: app shell + workflow selector.
 * Rendered at /console when the signed-in user is in APPROVED_EMAILS.
 */
export default function ConsoleApp() {
  return (
    <AppShell>
      <AppHomeContent />
    </AppShell>
  );
}

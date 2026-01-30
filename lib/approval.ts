import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const COOKIE_NAME = "afterai_session";

/**
 * Returns the signed-in viewer's email from the session JWT, or null if not signed in / no email claim.
 * Server-only; uses existing session cookie and AFTERAI_AUTH_SECRET.
 */
export async function getViewerEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const secret = process.env.AFTERAI_AUTH_SECRET;
  if (!secret) return null;

  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    const raw = (payload as Record<string, unknown>).email ?? (payload as Record<string, unknown>).sub ?? (payload as Record<string, unknown>).identifier;
    return typeof raw === "string" && raw.trim() ? raw.trim() : null;
  } catch {
    return null;
  }
}

/**
 * True if the signed-in user's email is in APPROVED_EMAILS (comma-separated, case-insensitive).
 * Missing or empty env => false (default deny).
 */
export async function isApprovedEmail(): Promise<boolean> {
  const email = await getViewerEmail();
  if (!email) return false;

  const list = process.env.APPROVED_EMAILS;
  if (!list || typeof list !== "string" || !list.trim()) return false;

  const approved = list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const lower = email.toLowerCase();
  return approved.includes(lower);
}

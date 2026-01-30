/**
 * Server-side API base URL for proxying to the AfterAI backend.
 * Uses internal URL in production to bypass public gateway.
 */
export function getApiBase(): { base: string; error?: string } {
  const isProd = process.env.NODE_ENV === "production";
  const internal = process.env.AFTERAI_INTERNAL_API_BASE_URL?.trim();
  const publicBase =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://api.useafter.ai";

  if (isProd) {
    if (!internal) {
      return {
        base: "",
        error:
          "AFTERAI_INTERNAL_API_BASE_URL must be set in production for server-to-server requests.",
      };
    }
    return { base: internal.replace(/\/$/, "") };
  }

  return { base: (internal || publicBase).replace(/\/$/, "") };
}

export const COOKIE_NAME = "afterai_session";

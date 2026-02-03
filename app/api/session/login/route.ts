import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "afterai_session";
const MAX_AGE_DAYS = 7;
const MAX_AGE_SECONDS = MAX_AGE_DAYS * 24 * 60 * 60;
/** Backend login path (afterai-api POST /login). */
const BACKEND_LOGIN_PATH = "/login";
const BACKEND_TIMEOUT_MS = 15_000;

function getLoginApiBase(): { base: string; error?: string } {
  const isProd = process.env.NODE_ENV === "production";
  const internal = process.env.AFTERAI_INTERNAL_API_BASE_URL?.trim();
  const publicBase =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://api.useafter.ai";

  if (isProd) {
    if (!internal) {
      return {
        base: "",
        error:
          "AFTERAI_INTERNAL_API_BASE_URL must be set in production for server-to-server login (bypass Cloudflare).",
      };
    }
    return { base: internal.replace(/\/$/, "") };
  }

  return { base: (internal || publicBase).replace(/\/$/, "") };
}

function jsonResponse(payload: object, status: number) {
  return NextResponse.json(payload, { status });
}

/** POST only; proxies to backend POST /login. GET returns 405 so clients get a clear JSON response. */
export async function GET() {
  return jsonResponse(
    { ok: false, error: "Method not allowed. Use POST." },
    405
  );
}

export async function POST(request: NextRequest) {
  const { base, error } = getLoginApiBase();
  if (error) {
    return jsonResponse({ ok: false, error }, 503);
  }

  let body: { identifier?: string; password?: string; returnTo?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  const identifier =
    typeof body?.identifier === "string" ? body.identifier.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier || !password) {
    return jsonResponse({ ok: false, error: "Missing identifier or password" }, 401);
  }

  const url = `${base}${BACKEND_LOGIN_PATH}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timeoutId);
    const msg =
      e instanceof Error && e.name === "AbortError"
        ? "Login request timed out."
        : "Login service unavailable.";
    return jsonResponse({ ok: false, error: msg }, 503);
  } finally {
    clearTimeout(timeoutId);
  }

  let data: { token?: string } = {};
  try {
    const text = await res.text();
    if (text.trim()) {
      data = JSON.parse(text) as { token?: string };
    }
  } catch {
    // Backend returned non-JSON (e.g. 502/503 HTML)
    if (!res.ok) {
      return jsonResponse(
        { ok: false, error: "Login service returned an error." },
        res.status >= 500 ? 502 : 401
      );
    }
  }

  if (!res.ok) {
    return jsonResponse(
      { ok: false, error: (data as { error?: string }).error ?? "Invalid credentials" },
      401
    );
  }

  const token = data?.token;
  if (!token || typeof token !== "string") {
    return jsonResponse(
      { ok: false, error: "Invalid response from login service." },
      502
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });

  return response;
}

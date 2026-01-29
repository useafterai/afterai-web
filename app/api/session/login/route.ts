import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "afterai_session";
const MAX_AGE_DAYS = 7;
const MAX_AGE_SECONDS = MAX_AGE_DAYS * 24 * 60 * 60;

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

export async function POST(request: NextRequest) {
  const { base, error } = getLoginApiBase();
  if (error) {
    return NextResponse.json(
      { ok: false, error },
      { status: 503 }
    );
  }

  let body: { identifier?: string; password?: string; returnTo?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const identifier =
    typeof body?.identifier === "string" ? body.identifier.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier || !password) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const url = `${base}/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = data?.token;
  if (!token || typeof token !== "string") {
    return NextResponse.json({ ok: false }, { status: 502 });
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

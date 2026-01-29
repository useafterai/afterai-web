import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.AFTERAI_API_BASE_URL || // 👈 fallback just in case
  "https://api.useafter.ai";

const COOKIE_NAME = "afterai_session";
const MAX_AGE_DAYS = 7;
const MAX_AGE_SECONDS = MAX_AGE_DAYS * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  console.log("[session/login] API_BASE =", API_BASE); // 👈

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
    console.log("[session/login] missing identifier or password"); // 👈
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const url = `${API_BASE.replace(/\/$/, "")}/login`;
  console.log("[session/login] POST", url); // 👈

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  console.log("[session/login] backend status =", res.status); // 👈

  const data = await res.json().catch(() => ({}));
  console.log("[session/login] backend response =", data); // 👈

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = data?.token;
  if (!token || typeof token !== "string") {
    console.log("[session/login] missing token in response"); // 👈
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

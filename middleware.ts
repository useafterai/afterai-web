import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "afterai_session";

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = process.env.AFTERAI_AUTH_SECRET;
  if (!secret) return false;

  try {
    const key = new TextEncoder().encode(secret);
    await jwtVerify(token, key, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Email validation links: /signup/validate.html?token=... → /signup/validate
  if (path === "/signup/validate.html") {
    const url = new URL("/signup/validate", request.url);
    request.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
    return NextResponse.redirect(url);
  }

  const validSession = await hasValidSession(request);

  // /console-coming-soon: public; if authenticated, redirect to /console
  if (path === "/console-coming-soon") {
    if (validSession) return NextResponse.redirect(new URL("/console", request.url));
    return NextResponse.next();
  }

  // Protected: /app, /app/*, /console — require auth
  if (path === "/app" || path.startsWith("/app/") || path === "/console") {
    if (!validSession) {
      const login = new URL("/login", request.url);
      login.searchParams.set("returnTo", path);
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app", "/app/:path*", "/console", "/console-coming-soon", "/signup/validate.html"],
};

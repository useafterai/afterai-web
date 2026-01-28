import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Block /app and /app/* — no authenticated console access yet
  if (path === "/app" || path.startsWith("/app/")) {
    return NextResponse.redirect(new URL("/console-coming-soon", request.url));
  }
  // Email validation links use /signup/validate.html?token=... — redirect to Next.js route
  if (path === "/signup/validate.html") {
    const url = new URL("/signup/validate", request.url);
    request.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app", "/app/:path*", "/signup/validate.html"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Block /app and /app/* — no authenticated console access yet
  if (path === "/app" || path.startsWith("/app/")) {
    return NextResponse.redirect(new URL("/console-coming-soon", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app", "/app/:path*"],
};

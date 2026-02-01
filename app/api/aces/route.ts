import { NextRequest, NextResponse } from "next/server";
import { getApiBase, COOKIE_NAME } from "@/lib/api";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { base, error } = getApiBase();
  if (error) {
    return NextResponse.json({ error }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "50";
  const status = searchParams.get("status");
  const url = status
    ? `${base}/aces?limit=${limit}&status=${encodeURIComponent(status)}`
    : `${base}/aces?limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }
  return NextResponse.json(data);
}

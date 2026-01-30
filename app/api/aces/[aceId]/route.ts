import { NextRequest, NextResponse } from "next/server";
import { getApiBase, COOKIE_NAME } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ aceId: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { base, error } = getApiBase();
  if (error) {
    return NextResponse.json({ error }, { status: 503 });
  }

  const { aceId } = await params;
  if (!aceId) {
    return NextResponse.json({ error: "Missing aceId" }, { status: 400 });
  }

  const res = await fetch(`${base}/aces/${encodeURIComponent(aceId)}`, {
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

import { NextResponse } from "next/server";
import { getSessionPayload } from "@/lib/approval";

export async function GET() {
  const session = await getSessionPayload();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({
    tenant_id: session.tenant_id,
    email: session.email,
    username: session.username,
  });
}

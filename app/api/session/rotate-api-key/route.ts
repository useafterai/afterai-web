import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getApiBase } from "@/lib/api";

const COOKIE_NAME = "afterai_session";
const BACKEND_ROTATE_PATH = "/rotate-api-key";
const BACKEND_TIMEOUT_MS = 15_000;

export async function POST(_request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { base, error } = getApiBase();
  if (error) {
    return NextResponse.json({ error }, { status: 503 });
  }

  const url = `${base}${BACKEND_ROTATE_PATH}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timeoutId);
    const msg =
      e instanceof Error && e.name === "AbortError"
        ? "Request timed out."
        : "Rotate service unavailable.";
    return NextResponse.json({ error: msg }, { status: 503 });
  } finally {
    clearTimeout(timeoutId);
  }

  let data: { api_key?: string; message?: string; detail?: string } = {};
  try {
    const text = await res.text();
    if (text.trim()) data = JSON.parse(text) as typeof data;
  } catch {
    if (!res.ok) {
      return NextResponse.json(
        { error: "Rotate service returned an error." },
        res.status >= 500 ? 502 : 400
      );
    }
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: (data as { detail?: string }).detail ?? "Rotate failed" },
      res.status >= 500 ? 502 : res.status
    );
  }

  if (!data.api_key || typeof data.api_key !== "string") {
    return NextResponse.json(
      { error: "Invalid response from rotate service." },
      502
    );
  }

  return NextResponse.json({
    api_key: data.api_key,
    message: data.message ?? "Store your new API key securely. Your previous key is no longer valid.",
  });
}

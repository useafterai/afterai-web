import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// No runtime = "nodejs" here: Cloudflare Pages/Workers don't support it and fail to publish.
// On Vercel, API routes use Node by default. Use dynamic so responses aren't cached.
export const dynamic = "force-dynamic";

// Resend free plan: use onboarding@resend.dev until you verify your domain
const DEFAULT_FROM = "AfterAI Contact <onboarding@resend.dev>";
const DEFAULT_TO = "hello@useafter.ai";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email is not configured (RESEND_API_KEY missing)." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
  if (!toEmail || !toEmail.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Invalid CONTACT_TO_EMAIL." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email is required." },
      { status: 400 }
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    process.env.CONTACT_FROM?.trim() ||
    DEFAULT_FROM;
  const subject = `Enterprise inquiry${name ? ` – ${name}` : ""}`;
  const text = [
    name && `Name: ${name}`,
    `Email: ${email}`,
    "",
    message || "(No message)",
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      // Log server-side only; never expose Resend details or secrets to the client
      console.error("[contact] Resend send failed:", error.message || "unknown");
      return NextResponse.json(
        { ok: false, error: "Email send failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    const safeMessage = err instanceof Error ? err.message : "unknown";
    console.error("[contact] Resend send failed:", safeMessage);
    return NextResponse.json(
      { ok: false, error: "Email send failed." },
      { status: 502 }
    );
  }
}

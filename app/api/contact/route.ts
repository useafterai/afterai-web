import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "oscar@useafter.ai";

// Resend free plan: use onboarding@resend.dev until you verify your domain
const DEFAULT_FROM = "AfterAI Contact <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email is not configured (RESEND_API_KEY missing)." },
      { status: 503 }
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

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM?.trim() || DEFAULT_FROM;
  const subject = `Enterprise inquiry${name ? ` – ${name}` : ""}`;
  const text = [
    name && `Name: ${name}`,
    `Email: ${email}`,
    "",
    message || "(No message)",
  ]
    .filter(Boolean)
    .join("\n");

  const { data, error } = await resend.emails.send({
    from,
    to: TO_EMAIL,
    replyTo: email,
    subject,
    text,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to send email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: data?.id });
}

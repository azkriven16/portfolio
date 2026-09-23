"use server";

import { Resend } from "resend";
import { checkRateLimit, recordRateLimitSubmission } from "@/lib/db";
import { getClientIdentifier } from "@/lib/request";

export interface ContactFormState {
  error: string | null;
  success: boolean;
}

const RATE_LIMIT_SECONDS = 60;
const TO_EMAIL = "eugerbone@gmail.com";

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error(
        "RESEND_API_KEY is not set. Add it to .env.local (see todo/05-features.md F15).",
      );
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { error: null, success: true };
  }

  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const email = String(formData.get("email") ?? "").trim().slice(0, 254);
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);

  if (!name || !message) {
    return { error: "Name and message are required.", success: false };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email so I can reply.", success: false };
  }

  const identifier = await getClientIdentifier();
  const { allowed, retryAfterSeconds } = await checkRateLimit("contact", identifier, RATE_LIMIT_SECONDS);
  if (!allowed) {
    return { error: `Slow down — try again in ${retryAfterSeconds}s.`, success: false };
  }

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: "Portfolio contact form <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
    if (error) throw new Error(error.message);
    await recordRateLimitSubmission("contact", identifier);
  } catch {
    return { error: "Couldn't send your message. Try emailing directly instead.", success: false };
  }

  return { error: null, success: true };
}

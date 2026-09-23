"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { addGuestbookEntry, checkGuestbookRateLimit, recordGuestbookSubmission } from "@/lib/db";

export interface SignGuestbookState {
  error: string | null;
  success: boolean;
}

async function getClientIdentifier(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function signGuestbook(
  _prevState: SignGuestbookState,
  formData: FormData,
): Promise<SignGuestbookState> {
  // Honeypot: a hidden field real visitors never see or fill. Bots that
  // blindly fill every field trip it. Pretend success so we don't tip
  // them off that they were caught.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { error: null, success: true };
  }

  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  const message = String(formData.get("message") ?? "").trim().slice(0, 280);

  if (!name || !message) {
    return { error: "Name and message are required.", success: false };
  }

  const identifier = await getClientIdentifier();
  const { allowed, retryAfterSeconds } = await checkGuestbookRateLimit(identifier);
  if (!allowed) {
    return { error: `Slow down — try again in ${retryAfterSeconds}s.`, success: false };
  }

  try {
    await addGuestbookEntry(name, message);
    await recordGuestbookSubmission(identifier);
  } catch {
    return { error: "Couldn't save your message. Try again.", success: false };
  }

  revalidatePath("/guestbook");
  return { error: null, success: true };
}

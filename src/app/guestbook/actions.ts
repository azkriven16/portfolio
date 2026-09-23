"use server";

import { revalidatePath } from "next/cache";
import { addGuestbookEntry, checkRateLimit, recordRateLimitSubmission } from "@/lib/db";
import { getClientIdentifier } from "@/lib/request";

export interface SignGuestbookState {
  error: string | null;
  success: boolean;
}

const RATE_LIMIT_SECONDS = 30;

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
  const { allowed, retryAfterSeconds } = await checkRateLimit("guestbook", identifier, RATE_LIMIT_SECONDS);
  if (!allowed) {
    return { error: `Slow down — try again in ${retryAfterSeconds}s.`, success: false };
  }

  try {
    await addGuestbookEntry(name, message);
    await recordRateLimitSubmission("guestbook", identifier);
  } catch {
    return { error: "Couldn't save your message. Try again.", success: false };
  }

  revalidatePath("/guestbook");
  return { error: null, success: true };
}

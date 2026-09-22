"use server";

import { revalidatePath } from "next/cache";
import { addGuestbookEntry } from "@/lib/db";

export interface SignGuestbookState {
  error: string | null;
  success: boolean;
}

export async function signGuestbook(
  _prevState: SignGuestbookState,
  formData: FormData,
): Promise<SignGuestbookState> {
  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  const message = String(formData.get("message") ?? "").trim().slice(0, 280);

  if (!name || !message) {
    return { error: "Name and message are required.", success: false };
  }

  try {
    await addGuestbookEntry(name, message);
  } catch {
    return { error: "Couldn't save your message. Try again.", success: false };
  }

  revalidatePath("/guestbook");
  return { error: null, success: true };
}

import { headers } from "next/headers";

// Best-effort per-visitor identifier for server actions, used to key rate
// limits. Not authentication — just enough to slow down a naive script.
export async function getClientIdentifier(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

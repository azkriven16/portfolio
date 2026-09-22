import Link from "next/link";
import { getGuestbookEntries } from "@/lib/db";
import { GuestbookForm } from "./GuestbookForm";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
      <div className="pt-8">
        <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", letterSpacing: "0.08em" }}
          className="hover:!text-[var(--c-text-2)] transition-colors duration-150 mb-8 inline-block">
          ← back
        </Link>

        <h1 className="mb-2">Guestbook</h1>
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-8">
          Leave a message. Say hi. I read every one.
        </p>

        <GuestbookForm />

        <div style={{ borderTop: "1px solid var(--c-border-2)", paddingTop: "2rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", marginBottom: "1.5rem" }}>
            {entries.length} messages
          </p>
          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="flex gap-3">
                <div style={{
                  width: "2rem", height: "2rem", borderRadius: "50%",
                  background: "var(--c-surface)", border: "1px solid var(--c-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700, color: "var(--c-text-3)",
                  flexShrink: 0, fontFamily: "var(--font-mono)",
                }}>
                  {initials(entry.name)}
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--c-text-2)" }}>
                      {entry.name}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--c-text-4)" }}>
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--c-text-3)", lineHeight: "1.6" }}>
                    {entry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

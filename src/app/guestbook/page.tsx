import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getGuestbookEntries, getGuestbookCount, GUESTBOOK_PAGE_SIZE } from "@/lib/db";
import { GuestbookForm } from "./GuestbookForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Guestbook",
  description: "Leave a message and say hi.",
  path: "/guestbook",
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default async function GuestbookPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * GUESTBOOK_PAGE_SIZE;

  const [entries, total] = await Promise.all([
    getGuestbookEntries({ offset }),
    getGuestbookCount(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / GUESTBOOK_PAGE_SIZE));

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
      <div className="pt-8">
        <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", letterSpacing: "0.08em" }}
          className="hover:!text-[var(--c-text-2)] focus-visible:!text-[var(--c-text-2)] transition-colors duration-150 mb-8 inline-block">
          ← back
        </Link>

        <h1 className="mb-2">Guestbook</h1>
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-8">
          Leave a message. Say hi. I read every one.
        </p>

        <GuestbookForm />

        <div style={{ borderTop: "1px solid var(--c-border-2)", paddingTop: "2rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", marginBottom: "1.5rem" }}>
            {total} message{total !== 1 ? "s" : ""}
            {totalPages > 1 ? ` — page ${page} of ${totalPages}` : ""}
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

          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 mt-8">
              {page > 1 ? (
                <Link
                  href={page - 1 === 1 ? "/guestbook" : `/guestbook?page=${page - 1}`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-3)", letterSpacing: "0.04em" }}
                  className="hover:!text-[var(--c-text-2)] focus-visible:!text-[var(--c-text-2)] transition-colors duration-150"
                >
                  ← newer
                </Link>
              ) : (
                <span />
              )}
              {page < totalPages ? (
                <Link
                  href={`/guestbook?page=${page + 1}`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-3)", letterSpacing: "0.04em" }}
                  className="hover:!text-[var(--c-text-2)] focus-visible:!text-[var(--c-text-2)] transition-colors duration-150"
                >
                  older →
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

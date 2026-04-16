"use client";

import Link from "next/link";
import { useState } from "react";
import { guestbookEntries, type GuestbookEntry } from "@/data/guestbook";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const INPUT: React.CSSProperties = {
  width: "100%",
  background: "var(--c-surface)",
  border: "1px solid var(--c-border)",
  borderRadius: "0.4rem",
  padding: "0.55rem 0.75rem",
  fontSize: "0.88rem",
  color: "var(--c-text)",
  outline: "none",
  fontFamily: "var(--font-sans)",
  transition: "border-color 0.15s",
};

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(guestbookEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setEntries([{
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString().split("T")[0],
    }, ...entries]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex flex-col gap-3">
            <input type="text" placeholder="Your name" value={name}
              onChange={(e) => setName(e.target.value)} style={INPUT} required maxLength={60}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")} />
            <textarea placeholder="Leave a message..." value={message}
              onChange={(e) => setMessage(e.target.value)} rows={3}
              style={{ ...INPUT, resize: "none" }} required maxLength={280}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")} />
            <div className="flex items-center gap-3">
              <button type="submit" style={{
                background: "var(--c-btn-bg)", color: "var(--c-btn-fg)", border: "none",
                borderRadius: "0.4rem", padding: "0.5rem 1.25rem", fontSize: "0.82rem",
                fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--c-btn-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--c-btn-bg)")}>
                Sign Guestbook
              </button>
              {submitted && (
                <span style={{ fontSize: "0.8rem", color: "var(--c-success)", fontFamily: "var(--font-mono)" }}>
                  message sent!
                </span>
              )}
            </div>
          </div>
        </form>

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

"use client";

import { useState } from "react";

const INPUT: React.CSSProperties = {
  background: "var(--c-surface)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid var(--c-border)",
  borderRadius: "0.4rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.85rem",
  color: "var(--c-text)",
  outline: "none",
  fontFamily: "var(--font-sans)",
  minWidth: "220px",
  transition: "border-color 0.15s",
};

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-4">
      <h2 className="mb-1" style={{ fontSize: "1.1rem" }}>Newsletter</h2>
      <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-6">
        Occasional writing on web development, tools I&apos;m using, and things I&apos;m learning.
        No spam — unsubscribe anytime.
      </p>

      {submitted ? (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--c-success)" }}>
          you&apos;re on the list — thanks!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={INPUT}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")}
          />
          <button
            type="submit"
            style={{
              background: "var(--c-btn-bg)",
              color: "var(--c-btn-fg)",
              border: "none",
              borderRadius: "0.4rem",
              padding: "0.5rem 1.1rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--c-btn-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--c-btn-bg)")}
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}

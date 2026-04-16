"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const commands = [
  { label: "Home",        hint: "Go to homepage",         action: "/",           type: "nav" },
  { label: "Blog",        hint: "Read the blog",          action: "/blog",       type: "nav" },
  { label: "Guestbook",   hint: "Sign the guestbook",     action: "/guestbook",  type: "nav" },
  { label: "Projects",    hint: "Jump to projects",       action: "/#projects",  type: "nav" },
  { label: "Experience",  hint: "Jump to experience",     action: "/#experience",type: "nav" },
  { label: "Resume",      hint: "Open resume PDF",        action: "/resume.pdf", type: "link" },
  { label: "GitHub",      hint: "github.com/azkriven16",  action: "https://github.com/azkriven16",          type: "link" },
  { label: "LinkedIn",    hint: "linkedin.com/in/euger-bonete", action: "https://linkedin.com/in/euger-bonete", type: "link" },
  { label: "Email",       hint: "eugerbone@email.com",    action: "mailto:eugerbone@email.com", type: "link" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Open on ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.hint.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => setIndex(0), [query]);

  const run = (cmd: (typeof commands)[number]) => {
    setOpen(false);
    if (cmd.type === "link") {
      window.open(cmd.action, cmd.action.startsWith("http") ? "_blank" : undefined);
    } else {
      router.push(cmd.action);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[index]) run(filtered[index]);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "var(--c-bg)",
          border: "1px solid var(--c-border)",
          borderRadius: "0.6rem",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
          margin: "0 1rem",
        }}
      >
        {/* Search input */}
        <div style={{ borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "center", padding: "0 1rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ color: "var(--c-text-3)", flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search for a command..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "0.85rem 0.75rem",
              fontSize: "0.9rem",
              color: "var(--c-text)",
              fontFamily: "var(--font-sans)",
            }}
          />
          <kbd style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--c-text-4)", background: "var(--c-surface)",
            border: "1px solid var(--c-border)", borderRadius: "0.25rem",
            padding: "0.15rem 0.4rem",
          }}>esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <p style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "var(--c-text-4)", textAlign: "center" }}>
              No commands found.
            </p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.label}
                onClick={() => run(cmd)}
                onMouseEnter={() => setIndex(i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.65rem 1rem", border: "none", cursor: "pointer", textAlign: "left",
                  background: i === index ? "var(--c-surface)" : "transparent",
                  transition: "background 0.1s",
                }}
              >
                <span style={{ fontSize: "0.88rem", color: "var(--c-text)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                  {cmd.label}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--c-text-4)", fontFamily: "var(--font-mono)" }}>
                  {cmd.hint}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

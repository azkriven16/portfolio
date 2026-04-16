"use client";

import { useEffect, useState, useRef } from "react";
import rawStats from "@/data/stats.json";

const stats = [
  { value: String(rawStats.followers), label: "Followers" },
  { value: String(rawStats.repos),     label: "Repos" },
  { value: String(rawStats.stars),     label: "Stars" },
];

const sections = ["bio", "projects", "experience"];

function useActiveSection() {
  const [active, setActive] = useState("bio");

  useEffect(() => {
    const check = () => {
      const scrollTop = window.scrollY + window.innerHeight * 0.48;
      let found = "bio";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollTop) found = id;
      }
      setActive(found);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return progress;
}

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.58rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

export default function RightPanel() {
  const active = useActiveSection();
  const progress = useScrollProgress();
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="fixed z-40 hidden lg:flex flex-col items-center gap-6"
      style={{ right: "1.75rem", top: "50%", transform: "translateY(-50%)" }}
    >
      {/* Scroll progress track */}
      <div
        ref={trackRef}
        style={{
          width: "1px",
          height: "80px",
          background: "var(--c-border)",
          borderRadius: "1px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${progress * 100}%`,
          background: "var(--c-text-3)",
          borderRadius: "1px",
          transition: "height 0.1s linear",
        }} />
      </div>

      {/* Section dots */}
      <div className="flex flex-col items-center gap-3">
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={id}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            style={{
              width: active === id ? "6px" : "4px",
              height: active === id ? "6px" : "4px",
              borderRadius: "50%",
              background: active === id ? "var(--c-text-2)" : "var(--c-border)",
              transition: "all 0.2s ease",
              display: "block",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: "1px", height: "1.5rem", background: "var(--c-border)" }} />

      {/* Stats with corner brackets */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "0.6rem 0.4rem" }}>
        <span style={{ ...MONO, fontSize: "0.6rem", color: "var(--c-text-5)", position: "absolute", top: 0, right: 0, lineHeight: 1 }}>┐</span>
        <span style={{ ...MONO, fontSize: "0.6rem", color: "var(--c-text-5)", position: "absolute", bottom: 0, right: 0, lineHeight: 1 }}>┘</span>

        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span style={{
              ...MONO,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--c-text-2)",
              letterSpacing: "0.04em",
            }}>
              {value}
            </span>
            <span style={{
              ...MONO,
              fontSize: "0.52rem",
              color: "var(--c-text-4)",
              whiteSpace: "nowrap",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

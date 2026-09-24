"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { posts } from "@/data/posts";

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.58rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--c-text-3)",
  marginBottom: "0.35rem",
};

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.58rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

function useGuestbookCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/guestbook/count")
      .then((r) => r.json())
      .then((data: { count: number | null }) => setCount(data.count))
      .catch(() => {});
  }, []);

  return count;
}

const DIVIDER = (
  <div style={{ width: "1px", height: "1.5rem", background: "var(--c-border)", alignSelf: "center" }} />
);

function GitHubCommitsWithDividers({ username }: { username: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((r) => r.json())
      .then((events: { type: string; created_at: string }[]) => {
        const today = new Date().toISOString().slice(0, 10);
        const pushesToday = events.filter(
          (e) => e.type === "PushEvent" && e.created_at.slice(0, 10) === today,
        );
        setCount(pushesToday.length);
      })
      .catch(() => {});
  }, [username]);

  if (!count) return null;

  return (
    <>
      {DIVIDER}
      <div>
        <div style={LABEL}>GitHub / Today</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "2.4rem", fontWeight: 700, color: "var(--c-text-2)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {count}
          </span>
          <span style={{ ...MONO, fontSize: "0.52rem", color: "var(--c-text-4)" }}>
            push{count !== 1 ? "es" : ""}
          </span>
        </div>
      </div>
      {DIVIDER}
    </>
  );
}

function LiveClock() {
  const [time, setTime] = useState({ h: "", m: "", period: "" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = now.getMinutes().toString().padStart(2, "0");
      const period = now.getHours() >= 12 ? "PM" : "AM";
      setTime({ h: String(h), m, period });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.2rem",
        lineHeight: 1,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "2.4rem",
          fontWeight: 700,
          color: "var(--c-text-2)",
          letterSpacing: "-0.02em",
        }}
      >
        {time.h}:{time.m}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--c-text-4)",
          letterSpacing: "0.08em",
          marginLeft: "0.2rem",
        }}
      >
        {time.period}
      </span>
    </div>
  );
}

export default function FixedChrome() {
  const guestbookCount = useGuestbookCount();
  const pageStats = [
    { value: String(posts.length), label: "Blog", href: "/blog" },
    { value: guestbookCount === null ? "–" : String(guestbookCount), label: "Guestbook", href: "/guestbook" },
  ];

  return (
    <div
      className="fixed z-40 hidden lg:flex flex-col items-start"
      style={{ bottom: "2rem", left: "1.75rem", gap: "1.5rem" }}
    >
      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "1.5rem",
          background: "var(--c-border)",
          alignSelf: "center",
        }}
      />

      {/* Page stats — center */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "0.6rem 0.4rem",
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: "0.6rem",
            color: "var(--c-text-5)",
            position: "absolute",
            top: 0,
            left: 0,
            lineHeight: 1,
          }}
        >
          ┌
        </span>
        <span
          style={{
            ...MONO,
            fontSize: "0.6rem",
            color: "var(--c-text-5)",
            position: "absolute",
            bottom: 0,
            left: 0,
            lineHeight: 1,
          }}
        >
          └
        </span>

        {pageStats.map(({ value, label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <span
              style={{
                ...MONO,
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--c-text-2)",
                letterSpacing: "0.04em",
              }}
            >
              {value}
            </span>
            <span
              style={{
                ...MONO,
                fontSize: "0.52rem",
                color: "var(--c-text-4)",
                whiteSpace: "nowrap",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "1.5rem",
          background: "var(--c-border)",
          alignSelf: "center",
        }}
      />

      {/* Quote + sitemap */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: "0.48rem",
            color: "var(--c-text-5)",
            whiteSpace: "nowrap",
          }}
        >
          {"// Yare yare daze..."}
        </span>
        <Link
          href="/sitemap.xml"
          style={{
            ...MONO,
            fontSize: "0.48rem",
            color: "var(--c-text-5)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--c-text-3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--c-text-5)")
          }
        >
          /sitemap.xml
        </Link>
      </div>

      {/* Divider */}
      <GitHubCommitsWithDividers username="azkriven16" />

      {/* Clock + location — bottom */}
      <div>
        <div style={LABEL}>Local Time (UTC+8:00)</div>
        <LiveClock />
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          <span style={{ ...LABEL, marginBottom: 0 }}>Iloilo, PH → Remote</span>
          <span style={{ ...LABEL, marginBottom: 0 }}>
            Full-Stack Developer
          </span>
        </div>
      </div>
    </div>
  );
}

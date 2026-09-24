"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { posts } from "@/data/posts";
import rawStats from "@/data/stats.json";

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

const BAR_W = 7;
const BAR_GAP = 3;
const CHART_H = 34;

// "2025-11" -> "Nov 2025". UTC so server and client render the same string.
const monthLabel = (month: string) =>
  new Date(`${month}-01T00:00:00Z`).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// Contributions per month for the last 12 months, written daily by the
// update-stats workflow (GraphQL needs a token, so it can't run in the browser).
function GitHubActivity() {
  const months = rawStats.contributions;
  const [hovered, setHovered] = useState<number | null>(null);
  if (!months?.length) return null;

  const total = months.reduce((sum, m) => sum + m.count, 0);
  const max = Math.max(...months.map((m) => m.count), 1);
  const width = months.length * BAR_W + (months.length - 1) * BAR_GAP;
  const last = months.length - 1;
  const caption =
    hovered === null
      ? `${monthLabel(months[0].month)} – ${monthLabel(months[last].month)}`
      : `${monthLabel(months[hovered].month)}: ${months[hovered].count}${hovered === last ? " so far" : ""}`;

  return (
    <>
      {DIVIDER}
      <div>
        <div style={LABEL}>GitHub contributions</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.4rem", fontWeight: 700, color: "var(--c-text-2)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.6rem" }}>
          {total.toLocaleString("en-US")}
        </div>
        <svg
          width={width}
          height={CHART_H + 1}
          viewBox={`0 0 ${width} ${CHART_H + 1}`}
          aria-hidden="true"
          style={{ display: "block", overflow: "visible" }}
          onMouseLeave={() => setHovered(null)}
        >
          <line x1={0} x2={width} y1={CHART_H + 0.5} y2={CHART_H + 0.5} stroke="var(--c-border)" />
          {months.map((m, i) => {
            const x = i * (BAR_W + BAR_GAP);
            // Empty months keep a 1px stub so "zero" doesn't read as "missing".
            const h = m.count === 0 ? 1 : Math.max(3, (m.count / max) * CHART_H);
            const y = CHART_H - h;
            const r = Math.min(2, h / 2);
            const fill = hovered === i ? "var(--c-text)" : "var(--c-text-3)";
            return (
              <g key={m.month} onMouseEnter={() => setHovered(i)}>
                {/* Full-height hit area, wider than the bar. */}
                <rect x={x - BAR_GAP / 2} y={0} width={BAR_W + BAR_GAP} height={CHART_H} fill="transparent" />
                <path
                  d={`M${x},${CHART_H} V${y + r} Q${x},${y} ${x + r},${y} H${x + BAR_W - r} Q${x + BAR_W},${y} ${x + BAR_W},${y + r} V${CHART_H} Z`}
                  fill={fill}
                  style={{ transition: "fill 0.15s" }}
                />
              </g>
            );
          })}
        </svg>
        <div style={{ ...MONO, fontSize: "0.5rem", color: "var(--c-text-4)", marginTop: "0.4rem", textTransform: "none", letterSpacing: "0.04em" }}>
          {caption}
        </div>
        <ul className="sr-only">
          {months.map((m) => (
            <li key={m.month}>
              {monthLabel(m.month)}: {m.count} contributions
            </li>
          ))}
        </ul>
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
            color: "var(--c-text-4)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--c-text-2)")
          }
          onFocus={(e) =>
            (e.currentTarget.style.color = "var(--c-text-2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--c-text-4)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.color = "var(--c-text-4)")
          }
        >
          /sitemap.xml
        </Link>
      </div>

      {/* Divider */}
      <GitHubActivity />

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

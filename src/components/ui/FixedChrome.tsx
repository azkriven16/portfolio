"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

const pageStats = [
  { value: "4", label: "Blog", href: "/blog" },
  { value: "12", label: "Guestbook", href: "/guestbook" },
];

// WMO weather code → minimal label + ascii icon
const WMO_MAP: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear", icon: "○" },
  1: { label: "Mostly Clear", icon: "◎" },
  2: { label: "Partly Cloud", icon: "◑" },
  3: { label: "Overcast", icon: "●" },
  45: { label: "Fog", icon: "≡" },
  48: { label: "Fog", icon: "≡" },
  51: { label: "Drizzle", icon: "·" },
  53: { label: "Drizzle", icon: "·" },
  55: { label: "Drizzle", icon: "·" },
  61: { label: "Rain", icon: "▾" },
  63: { label: "Rain", icon: "▾" },
  65: { label: "Heavy Rain", icon: "▼" },
  80: { label: "Showers", icon: "▿" },
  81: { label: "Showers", icon: "▿" },
  82: { label: "Showers", icon: "▿" },
  95: { label: "Storm", icon: "↯" },
  96: { label: "Storm", icon: "↯" },
  99: { label: "Storm", icon: "↯" },
};

function WeatherWidget() {
  const [weather, setWeather] = useState<{
    temp: number;
    label: string;
    icon: string;
  } | null>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=10.72&longitude=122.56&current_weather=true",
    )
      .then((r) => r.json())
      .then((data) => {
        const cw = data.current_weather;
        const mapped = WMO_MAP[cw.weathercode] ?? { label: "—", icon: "?" };
        setWeather({
          temp: Math.round(cw.temperature),
          label: mapped.label,
          icon: mapped.icon,
        });
      })
      .catch(() => {});
  }, []);

  if (!weather) return null;

  return (
    <div>
      <div style={LABEL}>Iloilo Weather</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "2.4rem",
            fontWeight: 700,
            color: "var(--c-text-2)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {weather.temp}°
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            color: "var(--c-text-4)",
          }}
        >
          {weather.icon}
        </span>
      </div>
      <div
        style={{
          ...MONO,
          fontSize: "0.48rem",
          color: "var(--c-text-5)",
          marginTop: "0.2rem",
        }}
      >
        {weather.label}
      </div>
    </div>
  );
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
  return (
    <div
      className="fixed z-40 hidden lg:flex flex-col items-start"
      style={{ bottom: "2rem", left: "1.75rem", gap: "1.5rem" }}
    >
      {/* Weather — top */}
      <WeatherWidget />

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
          // Yare yare daze...
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

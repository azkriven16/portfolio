"use client";

import Link from "next/link";
import FuzzyText from "@/components/ui/FuzzyText";
import { useTheme } from "@/providers/ThemeProvider";

export default function NotFound() {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#e5e5e5" : "#111111";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--c-bg)", overflowX: "hidden", width: "100%" }}
    >
      <div style={{ width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FuzzyText
          fontSize="clamp(3.5rem, 22vw, 11rem)"
          fontWeight={900}
          color={color}
          baseIntensity={0.15}
          hoverIntensity={0.6}
          fuzzRange={10}
          enableHover
          glitchMode
          glitchInterval={3000}
          glitchDuration={150}
        >
          404
        </FuzzyText>
      </div>

      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--c-text-3)",
      }}>
        page not found
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          letterSpacing: "0.08em",
          color: "var(--c-text-4)",
          textDecoration: "none",
          borderBottom: "1px solid var(--c-border)",
          paddingBottom: "2px",
          transition: "color 0.15s, border-color 0.15s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "var(--c-text)";
          e.currentTarget.style.borderColor = "var(--c-text-3)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = "var(--c-text-4)";
          e.currentTarget.style.borderColor = "var(--c-border)";
        }}
      >
        ← back to home
      </Link>
    </main>
  );
}

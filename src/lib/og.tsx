import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const siteHost = SITE_URL.replace(/^https?:\/\//, "");

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// Shared dark-theme OG card. Colors are hardcoded (not CSS vars — Satori
// renders these standalone, outside the site's stylesheet) to match the
// site's dark theme, which is the default.
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#666666",
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#e5e5e5",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 32, color: "#aaaaaa", maxWidth: 900 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2a2a",
            paddingTop: 32,
            fontSize: 26,
            color: "#666666",
          }}
        >
          <div style={{ display: "flex" }}>{SITE_NAME}</div>
          <div style={{ display: "flex" }}>{siteHost}</div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}

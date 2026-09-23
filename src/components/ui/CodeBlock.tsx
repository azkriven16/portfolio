export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div style={{ position: "relative" }}>
      {lang && (
        <span
          style={{
            position: "absolute",
            top: "0.6rem",
            right: "0.85rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "var(--c-text-4)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {lang}
        </span>
      )}
      <pre
        style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "0.5rem",
          padding: "1rem",
          overflowX: "auto",
          fontSize: "0.82rem",
          lineHeight: "1.6",
          fontFamily: "var(--font-mono)",
          color: "var(--c-text-2)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

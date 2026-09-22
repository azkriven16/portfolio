import type { ReactNode } from "react";

// Minimal inline renderer for post copy: `code` spans and [text](https://url) links.
const TOKEN = /(`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;

export default function InlineMarkdown({ text }: { text: string }) {
  const nodes: ReactNode[] = text.split(TOKEN).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85em",
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "0.25rem",
            padding: "0.1rem 0.35rem",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="prose-link">
          {link[1]}
        </a>
      );
    }
    return part;
  });

  return <>{nodes}</>;
}

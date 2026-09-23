export default function TechTags({ tech, size = "md" }: { tech: string[]; size?: "sm" | "md" }) {
  const fontSize = size === "sm" ? "0.68rem" : "0.72rem";
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize,
            color: "var(--c-text-3)",
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "0.25rem",
            padding: "0.15rem 0.5rem",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

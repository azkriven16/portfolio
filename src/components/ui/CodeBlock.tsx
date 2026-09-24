import { bundledLanguages, codeToHtml } from "shiki";

// Highlighted at build time (blog posts are statically rendered), so no
// highlighter ships to the browser. Shiki emits both themes as CSS variables
// per token; globals.css picks one based on the <html> theme class.
export default async function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const language = lang && lang in bundledLanguages ? lang : "text";
  const html = await codeToHtml(code, {
    lang: language,
    // The "-default" variants keep comments readable on --c-surface in both themes.
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return (
    <div className="code-block" style={{ position: "relative" }}>
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { usesSections } from "@/data/uses";

export const metadata: Metadata = {
  title: "Uses — Euger Bonete Jr",
  description: "The editor, stack and services I build with.",
};

const LINK: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.72rem",
  letterSpacing: "0.04em",
};

export default function UsesPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
      <div className="pt-8">
        <Link
          href="/"
          className="transition-colors duration-150 mb-8 inline-block"
          style={{ ...LINK, color: "var(--c-text-4)", letterSpacing: "0.08em" }}
        >
          ← back
        </Link>

        <h1 className="mb-2">Uses</h1>
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-10">
          The editor, stack and services I build with.
        </p>

        <div className="space-y-10">
          {usesSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4" style={{ fontSize: "1rem" }}>{section.title}</h2>
              <ul className="space-y-3" style={{ listStyle: "none", paddingLeft: 0 }}>
                {section.items.map((item) => (
                  <li key={item.name} style={{ fontSize: "0.9rem", lineHeight: "1.65" }}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="prose-link">
                        {item.name}
                      </a>
                    ) : (
                      <span style={{ color: "var(--c-text)" }}>{item.name}</span>
                    )}
                    <span style={{ color: "var(--c-text-3)" }}> — {item.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

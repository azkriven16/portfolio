import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { sideProjects } from "@/data/side-projects";

export const metadata: Metadata = pageMetadata({
  title: "Side Projects",
  description: "Things I build for fun: apps, tools and experiments outside client work.",
  path: "/side-projects",
});

const LINK: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.72rem",
  letterSpacing: "0.04em",
};

export default function SideProjectsPage() {
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

        <h1 className="mb-2">Side Projects</h1>
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-10">
          Things I build for fun — apps, tools and experiments outside client work.
        </p>

        <ul className="space-y-10" style={{ listStyle: "none", paddingLeft: 0 }}>
          {sideProjects.map((project) => (
            <li key={project.title}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1.5">
                <h2 style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: 0 }}>{project.title}</h2>

                {project.status === "in-progress" && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: "var(--c-warn)",
                      background: "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      borderRadius: "0.25rem",
                      padding: "0.1rem 0.4rem",
                    }}
                  >
                    in progress
                  </span>
                )}

                <div className="flex items-center gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={LINK}
                    >
                      Live ↗
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={LINK}
                  >
                    Code ↗
                  </a>
                </div>
              </div>

              <p className="mb-3" style={{ color: "var(--c-text-3)", fontSize: "0.9rem", lineHeight: "1.75" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
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
            </li>
          ))}
        </ul>

        <hr />

        <p style={{ color: "var(--c-text-3)", fontSize: "0.85rem" }}>
          There&apos;s more on{" "}
          <a
            href="https://github.com/azkriven16"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}

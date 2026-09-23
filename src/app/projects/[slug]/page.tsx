import type { Metadata } from "next";
import { projects, projectSlug } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TechTags from "@/components/ui/TechTags";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p) === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Euger Bonete Jr`,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: "article" },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((p) => projectSlug(p) === slug);

  if (!project) notFound();

  return (
    <main className="max-w-2xl mx-auto px-6 pt-24 pb-32 md:pb-24">
      {/* Back */}
      <Link href="/#projects" className="prose-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
        ← back to projects
      </Link>

      {/* Title */}
      <h1 className="mt-8 mb-3">{project.title}</h1>

      {/* Links */}
      <div className="flex items-center gap-2 mb-6">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              borderRadius: "0.4rem",
              background: "var(--c-text)",
              color: "var(--c-bg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            </svg>
            Live site
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              borderRadius: "0.4rem",
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              textDecoration: "none",
              transition: "border-color 0.15s",
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            GitHub
          </a>
        )}
      </div>

      {/* Description */}
      <p style={{ color: "var(--c-text-3)", fontSize: "0.92rem", lineHeight: "1.75", marginBottom: "2rem" }}>
        {project.longDescription ?? project.description}
      </p>

      {/* Image */}
      {project.image && (
        <div style={{ borderRadius: "0.5rem", overflow: "hidden", border: "1px solid var(--c-border)", marginBottom: "2rem" }}>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={630}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      )}

      <hr />

      {/* Tech stack */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="mb-4" style={{ fontSize: "1rem" }}>Stack</h2>
        <TechTags tech={project.tech} />
      </div>

      <hr />

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <div>
          <h2 className="mb-4" style={{ fontSize: "1rem" }}>Features</h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: 0, listStyle: "none" }}>
            {project.features.map((f) => (
              <li
                key={f}
                style={{ color: "var(--c-text-3)", fontSize: "0.88rem", lineHeight: "1.6", display: "flex", gap: "0.6rem" }}
              >
                <span style={{ color: "var(--c-text-4)", flexShrink: 0 }}>—</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

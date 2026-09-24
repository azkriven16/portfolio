import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects, projectSlug } from "@/data/projects";
import TechTags from "@/components/ui/TechTags";

export const metadata: Metadata = {
  title: "Projects — Euger Bonete Jr",
  description: "Client work and products I've built with React, Next.js and TypeScript.",
};

export default function ProjectsPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
      <div className="pt-8">
        <Link
          href="/"
          className="transition-colors duration-150 mb-8 inline-block"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", letterSpacing: "0.08em" }}
        >
          ← back
        </Link>

        <h1 className="mb-2">Projects</h1>
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-10">
          Client work and products I&apos;ve built.
        </p>

        <ul className="space-y-8" style={{ listStyle: "none", paddingLeft: 0 }}>
          {projects.map((project) => (
            <li key={project.title}>
              <Link href={`/projects/${projectSlug(project)}`} className="post-link">
                {/* Flex lives on this wrapper: the unlayered `.post-link { display: block }`
                    would override a Tailwind `flex` utility on the link itself. */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
                  {project.image && (
                    // Decorative: the title next to it already names the project.
                    <div className="project-thumb shrink-0 sm:w-[168px]">
                      <Image
                        src={project.image}
                        alt=""
                        width={1200}
                        height={630}
                        sizes="(min-width: 640px) 168px, 100vw"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="post-title block mb-1">{project.title}</span>
                    <p style={{ color: "var(--c-text-3)", fontSize: "0.88rem", lineHeight: "1.6" }} className="mb-2">
                      {project.description}
                    </p>
                    <TechTags tech={project.tech} size="sm" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

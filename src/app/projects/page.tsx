import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { projects } from "@/data/projects";
import ProjectList, { ProjectListView } from "./ProjectList";

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

        <Suspense fallback={<ProjectListView items={projects} active={null} />}>
          <ProjectList />
        </Suspense>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects, projectSlug, type Project } from "@/data/projects";
import TechTags from "@/components/ui/TechTags";

// Only tags that actually narrow the list: shared by 2+ projects, but not all.
// Any other tag still works as a link (/projects?tag=GSAP).
const filterTags = (() => {
  const counts = new Map<string, number>();
  for (const p of projects) for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts]
    .filter(([, n]) => n >= 2 && n < projects.length)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
})();

function FilterBar({ active }: { active: string | null }) {
  const chips: [string | null, string, number][] = [
    [null, "All", projects.length],
    ...filterTags.map(([tag, n]): [string, string, number] => [tag, tag, n]),
  ];
  return (
    <nav aria-label="Filter projects by technology" className="flex flex-wrap gap-1.5 mb-8">
      {chips.map(([tag, label, n]) => (
        <Link
          key={label}
          href={tag ? `/projects?tag=${encodeURIComponent(tag)}` : "/projects"}
          replace
          scroll={false}
          aria-current={tag === active ? "page" : undefined}
          className="filter-chip"
        >
          {label} <span className="filter-chip-count">{n}</span>
        </Link>
      ))}
    </nav>
  );
}

// Renders on the server too: the Suspense fallback is the full, unfiltered
// list, so the static HTML (and no-JS visitors) always get every project.
export function ProjectListView({ items, active }: { items: Project[]; active: string | null }) {
  return (
    <>
      <FilterBar active={active} />
      {items.length === 0 ? (
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }}>
          No projects use {active}.{" "}
          <Link href="/projects" replace scroll={false} className="prose-link">
            Show all
          </Link>
        </p>
      ) : (
        <ul className="space-y-8" style={{ listStyle: "none", paddingLeft: 0 }}>
          {items.map((project) => (
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
      )}
    </>
  );
}

export default function ProjectList() {
  const active = useSearchParams().get("tag");
  const items = active ? projects.filter((p) => p.tech.includes(active)) : projects;
  return <ProjectListView items={items} active={active} />;
}

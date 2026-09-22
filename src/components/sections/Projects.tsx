"use client";

import { useRef } from "react";
import { GithubIcon, LinkIcon } from "lucide-animated";
import { projects, projectSlug } from "@/data/projects";
import Link from "next/link";

type AnimHandle = { startAnimation: () => void; stopAnimation: () => void };

function IconLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    { size?: number } & React.RefAttributes<AnimHandle>
  >;
}) {
  const ref = useRef<AnimHandle>(null);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: "var(--c-text-4)",
        transition: "color 0.15s",
        display: "flex",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--c-text-2)";
        ref.current?.startAnimation();
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--c-text-4)";
        ref.current?.stopAnimation();
      }}
    >
      <Icon ref={ref} size={14} />
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-4">
      <h2 className="mb-6">Projects</h2>

      <div className="space-y-10">
        {projects.map((project) => {
          const slug = projectSlug(project);
          return (
            <div key={project.title}>
              <div className="flex items-center gap-3 mb-1.5">
                <Link
                  href={`/projects/${slug}`}
                  style={{
                    color: "var(--c-text)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--c-text-3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--c-text)")
                  }
                >
                  {project.title}
                </Link>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <IconLink
                      href={project.github}
                      label="GitHub"
                      Icon={GithubIcon}
                    />
                  )}
                  {project.live && (
                    <IconLink
                      href={project.live}
                      label="Live site"
                      Icon={LinkIcon}
                    />
                  )}
                  {project.status === "in-progress" && (
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: "#f59e0b",
                      background: "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      borderRadius: "0.25rem",
                      padding: "0.1rem 0.4rem",
                    }}>
                      in progress
                    </span>
                  )}
                  {project.status === "not-started" && (
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: "var(--c-text-4)",
                      background: "var(--c-surface)",
                      border: "1px solid var(--c-border)",
                      borderRadius: "0.25rem",
                      padding: "0.1rem 0.4rem",
                    }}>
                      planned
                    </span>
                  )}
                </div>
              </div>

              <p
                className="mb-3"
                style={{
                  color: "var(--c-text-3)",
                  fontSize: "0.9rem",
                  lineHeight: "1.75",
                }}
              >
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

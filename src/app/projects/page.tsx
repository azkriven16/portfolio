import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => {
          const slug = project.title.toLowerCase().replace(/\s+/g, "-");
          return (
            <li key={project.title}>
              <Link href={`/projects/${slug}`}>
                <a className="text-blue-500 hover:underline text-lg font-medium">
                  {project.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

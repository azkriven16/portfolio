import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";
import { projects, projectSlug } from "@/data/projects";

export const alt = "Project — Euger Bonete Jr";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p) === slug);

  return renderOgImage({
    eyebrow: "Project",
    title: project?.title ?? "Project",
    subtitle: project?.description,
  });
}

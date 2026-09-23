import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Projects — Euger Bonete Jr";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Projects",
    title: "Client work and products",
    subtitle: "Built with React, Next.js and TypeScript.",
  });
}

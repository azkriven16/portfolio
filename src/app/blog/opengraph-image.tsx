import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Blog — Euger Bonete Jr";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Thoughts on web dev",
    subtitle: "React, Next.js, and building things.",
  });
}

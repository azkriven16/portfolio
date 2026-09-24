import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Uses — Euger Bonete Jr";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Uses",
    title: "What I build with",
    subtitle: "Editor, stack and services.",
  });
}

import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Side Projects — Euger Bonete Jr";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Side Projects",
    title: "Things I build for fun",
    subtitle: "Personal repos and experiments.",
  });
}

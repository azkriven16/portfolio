import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const alt = SITE_NAME;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Full-Stack Developer",
    title: SITE_NAME,
    subtitle: SITE_DESCRIPTION,
  });
}

import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

// A page's `openGraph` replaces the root layout's instead of merging with it,
// so every page sets the full set here: otherwise shares show the homepage's
// title, description and URL.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: SITE_NAME, title, description, url: path },
  };
}

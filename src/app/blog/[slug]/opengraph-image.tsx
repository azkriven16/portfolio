import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";
import { posts } from "@/data/posts";

export const alt = "Blog post — Euger Bonete Jr";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  return renderOgImage({
    eyebrow: "Blog",
    title: post?.title ?? "Blog post",
    subtitle: post?.description,
  });
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, readingTime } from "@/data/posts";
import type { Metadata } from "next";
import InlineMarkdown from "@/components/ui/InlineMarkdown";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Euger Bonete Jr`, description: post.description };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n\n");

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
      <div className="pt-8">
        <Link href="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", letterSpacing: "0.08em" }}
          className="transition-colors duration-150 mb-8 inline-block">
          ← blog
        </Link>

        <div className="mb-8">
          <h1 className="mb-2" style={{ fontSize: "1.6rem" }}>{post.title}</h1>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)" }}>
            {formatDate(post.date)} · {readingTime(post.content)} min read
          </span>
        </div>

        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} style={{ color: "var(--c-text-2)", fontSize: "0.95rem", lineHeight: "1.85" }}>
              <InlineMarkdown text={para} />
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}

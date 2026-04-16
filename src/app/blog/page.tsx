import Link from "next/link";
import { posts } from "@/data/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Euger Bonete Jr",
  description: "Thoughts on web development, React, and building things.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
      <div className="pt-8">
        <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", letterSpacing: "0.08em" }}
          className="transition-colors duration-150 mb-8 inline-block"
          onMouseEnter={undefined}
        >
          ← back
        </Link>

        <h1 className="mb-2">Blog</h1>
        <p style={{ color: "var(--c-text-3)", fontSize: "0.9rem" }} className="mb-10">
          Thoughts on web development, React, and building things.
        </p>

        <div className="space-y-8">
          {sorted.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-link">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <span className="post-title">{post.title}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--c-text-4)", flexShrink: 0 }}>
                  {formatDate(post.date)}
                </span>
              </div>
              <p style={{ color: "var(--c-text-3)", fontSize: "0.88rem", lineHeight: "1.6" }}>
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Hey, I&apos;m Euger 👋</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to my portfolio and blog.
      </p>

      {posts && posts.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>
          <div className="space-y-4 mb-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors"
              >
                <h3 className="font-medium">{post.title}</h3>
                <div className="flex gap-2 mt-1">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="text-sm underline underline-offset-4">
            View all posts →
          </Link>
        </>
      )}
    </main>
  );
}

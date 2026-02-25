import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Blog</h1>

      {blogs?.length === 0 && (
        <p className="text-gray-500">No posts yet.</p>
      )}

      <div className="space-y-6">
        {blogs?.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="block group">
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
              {blog.image_url && (
                <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:underline">{blog.title}</h2>
                <div className="flex gap-2 mt-2">
                  {blog.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
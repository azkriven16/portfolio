import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function BlogsAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Blogs</h1>
        <Link
          href="/dashboard/blogs/new"
          className="bg-black text-white rounded px-4 py-2 text-sm"
        >
          + New Post
        </Link>
      </div>

      {blogs?.length === 0 && (
        <p className="text-gray-500">
          No blog posts yet. Create your first one!!!!!!!!!
        </p>
      )}

      <div className="space-y-4">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-medium">{blog.title}</h2>
              <div className="flex gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${blog.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
                {blog.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/blog/${blog.slug}`}
                className="text-sm text-gray-500 hover:text-black"
              >
                View
              </Link>
              <Link
                href={`/dashboard/blogs/${blog.id}/edit`}
                className="text-sm text-gray-500 hover:text-black"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

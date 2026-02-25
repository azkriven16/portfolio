import { CommentSection } from "@/components/Comment";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!blog) notFound();

  return (
    <main className="max-w-3xl mx-auto p-8">
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="flex gap-2 mb-4">
        {blog.tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <CommentSection />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);
      supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          if (!data) return;
          setTitle(data.title);
          setSlug(data.slug);
          setContent(data.content ?? "");
          setTags(data.tags?.join(", ") ?? "");
          setImagePreview(data.image_url);
          setPublished(data.published);
        });
    });
  }, []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    let image_url = imagePreview;

    if (image) {
      const ext = image.name.split(".").pop();
      const filename = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filename, image);

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filename);
      image_url = urlData.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        content,
        image_url,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/blogs");
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-40 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nextjs, typescript, cloudflare"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          {content !== "" || id ? (
            <Editor content={content} onChange={setContent} />
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="text-sm">Published</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded p-2 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Blog Post"}
        </button>
      </form>
    </main>
  );
}
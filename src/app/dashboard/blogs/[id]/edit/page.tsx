"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { id: blogId } = await params;
      setId(blogId);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      // Check role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      setIsAdmin(profile?.role === "admin");

      // Load blog
      const { data: blog } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (!blog) { router.push("/dashboard/blogs"); return; }

      setTitle(blog.title);
      setSlug(blog.slug);
      setContent(blog.content ?? "");
      // Deduplicate tags when loading in case old data had dupes
      const loadedTags = [...new Set((blog.tags ?? []).map((t: string) => t.trim().toLowerCase()))];
      setTags(loadedTags.join(", "));
      setImagePreview(blog.image_url);
      setPublished(blog.published);
      setFetching(false);
    }

    load();
  }, []);

  function handleTagsChange(value: string) {
    const parts = value.split(",");
    // Deduplicate all completed tags (everything except what's currently being typed)
    const completed = parts
      .slice(0, -1)
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const unique = [...new Set(completed)];
    const current = parts[parts.length - 1]; // still being typed, don't touch it
    setTags([...unique, current].join(", "));
  }

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
        // Deduplicate + lowercase as a final safety net on submit
        tags: [...new Set(tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean))],
        published: isAdmin ? published : false,
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

  if (fetching) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Cover Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-40 w-full object-cover rounded-lg"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => handleTagsChange(e.target.value)}
            placeholder="nextjs, typescript, cloudflare"
          />
          <p className="text-xs text-muted-foreground">Comma separated — duplicates are removed automatically</p>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Editor content={content} onChange={setContent} />
        </div>

        {isAdmin ? (
          <div className="flex items-center gap-2 border rounded-lg p-3">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="published" className="text-sm font-medium">
              Published
            </label>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
            ✏️ Only admins can publish posts. Your changes will be saved as a draft.
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.push("/dashboard/blogs")}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Update Post"}
          </Button>
        </div>
      </form>
    </main>
  );
}
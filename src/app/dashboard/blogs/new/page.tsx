"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function NewBlogPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      setIsAdmin(data?.role === "admin");
    }
    checkRole();
  }, []);

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  }

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

    let image_url = null;

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

    const { error: insertError } = await supabase.from("blogs").insert({
      title,
      slug,
      content,
      image_url,
      // Deduplicate + lowercase as a final safety net on submit
      tags: [...new Set(tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean))],
      published: isAdmin ? published : false,
      author_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/blogs");
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>

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
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="My awesome post"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-awesome-post"
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
              Publish immediately
            </label>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
            ✏️ Your post will be saved as a draft. Only admins can publish posts.
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Blog Post"}
        </Button>
      </form>
    </main>
  );
}
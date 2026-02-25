"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { blogSchema, type BlogFormData } from "@/types/blog";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function NewBlogPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      tags: "",
      published: false,
    },
  });

  useEffect(() => {
    async function checkRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    setValue("title", value);
    setValue(
      "slug",
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      { shouldValidate: true },
    );
  }

  function handleTagsChange(value: string) {
    const parts = value.split(",");
    const completed = parts
      .slice(0, -1)
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const unique = [...new Set(completed)];
    const current = parts[parts.length - 1];
    setValue("tags", [...unique, current].join(", "));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function onSubmit(data: BlogFormData) {
    setServerError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    let image_url = null;

    if (image) {
      const ext = image.name.split(".").pop();
      const filename = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filename, image);
      if (uploadError) {
        setServerError(uploadError.message);
        return;
      }
      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filename);
      image_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("blogs").insert({
      title: data.title,
      slug: data.slug,
      content: data.content,
      image_url,
      tags: [
        ...new Set(
          (data.tags ?? "")
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean),
        ),
      ],
      published: isAdmin ? data.published : false,
      author_id: user.id,
    });

    if (insertError) {
      setServerError(insertError.message);
      return;
    }
    router.push("/dashboard/blogs");
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>

      {serverError && (
        <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md mb-4">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="My awesome post"
            className={errors.title ? "border-destructive" : ""}
            {...register("title", {
              onChange: (e) => handleTitleChange(e.target.value),
            })}
          />
          {errors.title && (
            <p className="text-xs text-destructive" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="my-awesome-post"
            className={`bg-muted ${errors.slug ? "border-destructive" : ""}`}
            {...register("slug")}
          />
          {errors.slug && (
            <p className="text-xs text-destructive" role="alert">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* Cover Image */}
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

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="nextjs, typescript, cloudflare"
            {...register("tags", {
              onChange: (e) => handleTagsChange(e.target.value),
            })}
          />
          <p className="text-xs text-muted-foreground">
            Comma separated — duplicates removed automatically
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label>Content</Label>
          <Editor
            content={watch("content")}
            onChange={(val) =>
              setValue("content", val, { shouldValidate: true })
            }
          />
          {errors.content && (
            <p className="text-xs text-destructive" role="alert">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Publish */}
        {isAdmin ? (
          <div className="flex items-center gap-2 border rounded-lg p-3">
            <input
              type="checkbox"
              id="published"
              className="rounded"
              {...register("published")}
            />
            <label
              htmlFor="published"
              className="text-sm font-medium cursor-pointer"
            >
              Publish immediately
            </label>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
            ✏️ Your post will be saved as a draft. Only admins can publish
            posts.
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Blog Post"}
        </Button>
      </form>
    </main>
  );
}

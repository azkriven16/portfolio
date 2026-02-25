import { z } from "zod/v3";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be under 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  published: z.boolean(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  image_url: string | null;
  tags: string[];
  published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
};

export type UserRole = "admin" | "author" | "reader";

export type Profile = {
  id: string;
  email: string | null;
  role: UserRole;
  created_at: string;
};

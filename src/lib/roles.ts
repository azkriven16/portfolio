import { createClient } from "@/lib/supabase/server";

export type UserRole = "admin" | "author" | "reader" | null;

export async function getUserRole(): Promise<UserRole> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (profile?.role as UserRole) ?? "reader";
}

export async function isAdmin(): Promise<boolean> {
  return (await getUserRole()) === "admin";
}

export async function isAuthorOrAbove(): Promise<boolean> {
  const role = await getUserRole();
  return role === "admin" || role === "author";
}
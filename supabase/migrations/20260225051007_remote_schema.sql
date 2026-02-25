
  create table "public"."blogs" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "slug" text not null,
    "content" text,
    "image_url" text,
    "tags" text[] default '{}'::text[],
    "published" boolean default false,
    "author_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."blogs" enable row level security;

CREATE UNIQUE INDEX blogs_pkey ON public.blogs USING btree (id);

CREATE UNIQUE INDEX blogs_slug_key ON public.blogs USING btree (slug);

alter table "public"."blogs" add constraint "blogs_pkey" PRIMARY KEY using index "blogs_pkey";

alter table "public"."blogs" add constraint "blogs_author_id_fkey" FOREIGN KEY (author_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."blogs" validate constraint "blogs_author_id_fkey";

alter table "public"."blogs" add constraint "blogs_slug_key" UNIQUE using index "blogs_slug_key";

grant delete on table "public"."blogs" to "anon";

grant insert on table "public"."blogs" to "anon";

grant references on table "public"."blogs" to "anon";

grant select on table "public"."blogs" to "anon";

grant trigger on table "public"."blogs" to "anon";

grant truncate on table "public"."blogs" to "anon";

grant update on table "public"."blogs" to "anon";

grant delete on table "public"."blogs" to "authenticated";

grant insert on table "public"."blogs" to "authenticated";

grant references on table "public"."blogs" to "authenticated";

grant select on table "public"."blogs" to "authenticated";

grant trigger on table "public"."blogs" to "authenticated";

grant truncate on table "public"."blogs" to "authenticated";

grant update on table "public"."blogs" to "authenticated";

grant delete on table "public"."blogs" to "service_role";

grant insert on table "public"."blogs" to "service_role";

grant references on table "public"."blogs" to "service_role";

grant select on table "public"."blogs" to "service_role";

grant trigger on table "public"."blogs" to "service_role";

grant truncate on table "public"."blogs" to "service_role";

grant update on table "public"."blogs" to "service_role";


  create policy "Authors can manage their blogs"
  on "public"."blogs"
  as permissive
  for all
  to public
using ((auth.uid() = author_id));



  create policy "Public can read published blogs"
  on "public"."blogs"
  as permissive
  for select
  to public
using ((published = true));



  create policy "Authenticated users can delete images bjsgsj_0"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using ((bucket_id = 'blog-images'::text));



  create policy "Authenticated users can delete images bjsgsj_1"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'blog-images'::text));



  create policy "Authenticated users can update images bjsgsj_0"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using ((bucket_id = 'blog-images'::text));



  create policy "Authenticated users can update images bjsgsj_1"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'blog-images'::text));



  create policy "Authenticated users can upload images bjsgsj_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'blog-images'::text));



  create policy "Public can view images bjsgsj_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'blog-images'::text));




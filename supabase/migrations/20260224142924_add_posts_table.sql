create table "public"."posts" (
  "id" uuid not null default gen_random_uuid(),
  "title" text not null,
  "content" text,
  "created_at" timestamp with time zone default now()
);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);
alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

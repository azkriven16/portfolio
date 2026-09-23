# euger — personal portfolio

Personal portfolio site built with Next.js 16, Tailwind CSS v4, and TypeScript. Features a dark-first design system, animated UI, a guestbook UI, and a blog.

## Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4 with CSS variables
- **Animations** — Motion, lucide-animated
- **Deployment** — Vercel

## Features

- Dark / light theme with CSS variable design tokens
- Fixed chrome sidebar with live clock and GitHub activity
- WebGL grain overlay via OGL
- Command palette (⌘K / Ctrl+K)
- Guestbook backed by Neon Postgres (`src/lib/db.ts`), with a honeypot field and
  a per-IP rate limit against spam
- Static blog with inline code/link support and reading-time estimates, sourced
  from `src/data/posts.ts`, plus an RSS feed at `/feed.xml`
- Project pages with detail view
- Vercel Analytics + Speed Insights
- `Person`/`WebSite` JSON-LD for richer search results
- Custom mobile tab bar with anchor-based active detection
- Fully responsive

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/             # Blog list + [slug] pages, feed.xml RSS route
│   ├── guestbook/        # Guestbook (Neon-backed, server actions)
│   ├── projects/[slug]/  # Project detail pages
│   └── side-projects/    # Featured side projects
├── components/
│   ├── sections/         # Page sections (Bio, Projects, Experience, Contact)
│   └── ui/               # Shared UI (Navbar, FixedChrome, RightPanel, Grain)
├── data/                 # Static data (projects, posts, experience, guestbook, stats)
├── lib/                  # Shared helpers and site constants
└── providers/            # Theme provider
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Canonical site URL for the sitemap, `robots.txt` and OpenGraph metadata. Defaults to `https://euger.vercel.app`. |
| `DATABASE_URL` | Neon Postgres connection string backing the guestbook (`src/lib/db.ts`). Without it, `/guestbook` and the guestbook count in `FixedChrome` error. Set via the Neon integration in Vercel's Storage tab, or manually at [neon.tech](https://neon.tech). |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key backing the contact form (`src/components/sections/contact-actions.ts`). Without it, submitting the form errors. Uses the shared `onboarding@resend.dev` sender, so no domain verification needed as long as messages are addressed to the account's own signup email. |

## Guestbook moderation

There's no admin UI. To remove an entry, open the Neon console (Vercel dashboard →
Storage → the connected database → Tables → `guestbook_entries`) and delete the row
directly, or run:

```sql
DELETE FROM guestbook_entries WHERE id = <id>;
```

Spam is filtered at submission time (honeypot field + a 30s per-IP rate limit in
`src/app/guestbook/actions.ts`), but nothing scans existing rows after the fact.

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT

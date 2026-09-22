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
- Guestbook UI (entries are client-side only for now — no database yet)
- Static blog with inline code and link support, sourced from `src/data/posts.ts`
- Project pages with detail view
- Custom mobile tab bar with anchor-based active detection
- Fully responsive

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/             # Blog list + [slug] pages
│   ├── guestbook/        # Guestbook (client-side state)
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

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT

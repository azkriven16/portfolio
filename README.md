# euger — personal portfolio

Personal portfolio site built with Next.js 16, Tailwind CSS v4, and TypeScript. Features a dark-first design system, animated UI, live guestbook, and a blog.

## Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4 with CSS variables
- **Animations** — Motion (Framer Motion), lucide-animated
- **Database** — NeonDB + Drizzle ORM (guestbook)
- **Deployment** — Vercel

## Features

- Dark / light theme with CSS variable design tokens
- Fixed chrome sidebar with live clock and GitHub activity
- WebGL grain overlay via OGL
- Command palette (⌘K)
- Live guestbook
- MDX-powered blog
- Project pages with detail view
- Custom mobile tab bar with anchor-based active detection
- Fully responsive

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/             # Blog list + [slug] pages
│   ├── guestbook/        # Live guestbook
│   └── projects/[slug]/  # Project detail pages
├── components/
│   ├── sections/         # Page sections (Bio, Projects, Experience, Contact)
│   ├── ui/               # Shared UI (Navbar, FixedChrome, RightPanel, Grain)
│   └── icons/            # Custom animated icons
├── data/                 # Static data (projects, posts, experience)
└── providers/            # Theme provider
```

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT

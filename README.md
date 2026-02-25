# Euger's Portfolio & Blog

A personal portfolio and blog built with Next.js 16, deployed on Cloudflare Workers, powered by Supabase for database, auth, and storage.

🌐 **Live:** [euger.euger.workers.dev](https://euger.euger.workers.dev) · **Staging:** [euger-dev.euger.workers.dev](https://euger-dev.euger.workers.dev)

---

## Tech Stack

| Layer           | Tool                              |
| --------------- | --------------------------------- |
| Framework       | Next.js 16                        |
| Hosting         | Cloudflare Workers (via OpenNext) |
| Database & Auth | Supabase                          |
| Storage         | Supabase Storage                  |
| UI              | shadcn/ui + Tailwind CSS          |
| Forms           | react-hook-form + Zod             |
| Editor          | TipTap (WYSIWYG)                  |
| CI/CD           | GitHub Actions                    |
| Package Manager | pnpm                              |

---

## Features

- 📝 Blog system with WYSIWYG editor and cover image uploads
- 🔐 Email/password auth with email verification via Resend
- 👥 Role-based access control (admin / author / reader)
- 🌙 Dark mode support
- ✅ Type-safe forms with Zod validation
- 🚀 Automated deployments to dev and prod via GitHub Actions
- 🗄️ Database migrations managed with Supabase CLI

---

## Project Structure

```
src/
├── app/
│   ├── blog/              # Public blog pages
│   ├── dashboard/         # Protected author/admin pages
│   └── login/             # Auth page
├── components/            # Shared UI components
├── lib/
│   └── supabase/          # Supabase client (server + client)
└── types/                 # Zod schemas and TypeScript types
supabase/
└── migrations/            # Database migration files
.github/
└── workflows/             # CI/CD pipelines
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Supabase account
- Cloudflare account

### 1. Clone the repo

```bash
git clone https://github.com/azkriven16/portfolio.git
cd portfolio
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your Supabase project URL and keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Also create `.dev.vars` for local Wrangler:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run locally

```bash
pnpm dev
```

### 4. Run on Cloudflare Workers locally

```bash
pnpm wrangler dev
```

---

## Deployment

Deployments are fully automated via GitHub Actions:

| Branch | Environment | URL                         |
| ------ | ----------- | --------------------------- |
| `dev`  | Staging     | euger-dev.euger.workers.dev |
| `main` | Production  | euger.euger.workers.dev     |

Push to `dev` → deploys to staging. Merge to `main` → deploys to production.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full git workflow.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the branching strategy, PR process, commit conventions, and database migration workflow.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

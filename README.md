# Portfolio & Blog

Personal portfolio and blog built with Next.js 16 on Cloudflare Workers.

🌐 [euger.euger.workers.dev](https://euger.euger.workers.dev)

## Stack

- **Next.js 16** — framework
- **Cloudflare Workers** — hosting via OpenNext
- **Supabase** — database, auth, storage
- **shadcn/ui** — components
- **Zod + react-hook-form** — form validation
- **TipTap** — blog editor

## Local Development
```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and fill in your Supabase URL and keys.

## Deployment

Push to `dev` → deploys to staging.
Merge to `main` → deploys to production.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

# Contributing & Git Workflow

This document describes the full development workflow for this project — branching strategy, commit conventions, PR process, and deployment pipeline.

---

## Branch Structure
```
main    ← production (euger.euger.workers.dev)
dev     ← staging (euger-dev.euger.workers.dev)
```

Feature branches are temporary and always deleted after merging.

---

## Starting New Work

Always branch off `dev`, never `main`.
```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| New feature | `feature/` | `feature/blog-comments` |
| Bug fix | `fix/` | `fix/image-upload-error` |
| UI changes | `ui/` | `ui/dashboard-redesign` |
| Config/CI | `chore/` | `chore/update-workflows` |

---

## Making Commits

Keep commits small and focused. Use conventional commit format:
```bash
git add .
git commit -m "type: short description"
```

### Commit Types

| Type | When to use |
|------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `ui:` | UI/style changes |
| `refactor:` | Code cleanup, no behavior change |
| `db:` | Database migrations |
| `chore:` | Config, CI, tooling |
| `docs:` | Documentation only |

---

## Opening a Pull Request

### Feature → Dev

Once your feature is ready:
```bash
git push origin feature/your-feature-name
```

Then on GitHub:
- Set **base:** `dev`, **compare:** `feature/your-branch`
- Fill in the PR template
- Click **Create pull request**

### PR Title Format
```
feat: add comment system to blog posts
fix: duplicate tags on blog save
```

### Before Merging

All of these must be green:
- ✅ Type Check & Lint
- ✅ Migrate Supabase (Dev)
- ✅ Deploy Cloudflare Worker (Dev)
- ✅ GitGuardian Security Check

---

## After PR Merges to Dev

### 1. Delete the feature branch
```bash
git push origin --delete feature/your-branch
git branch -d feature/your-branch
```

### 2. Pull latest dev locally
```bash
git checkout dev
git pull origin dev
```

---

## Merging Dev → Main (Production Deploy)
```bash
git checkout dev
git pull origin dev
git checkout main
git pull origin main
git merge dev
git push origin main
```

---

## Database Migrations

1. Make changes in the **dev Supabase dashboard** (never prod directly)
2. Pull the migration locally:
```bash
supabase db pull
```
3. Commit with your feature:
```bash
git add supabase/
git commit -m "db: add comments table with RLS policies"
```

> Never manually edit the prod Supabase schema. Always go through migrations.

---

## Environment Variables

When adding a new env var, update **all four places**:

| Where | Location |
|-------|---------|
| Local Next.js | `.env` |
| Local Wrangler | `.dev.vars` |
| GitHub Actions | Repo Settings → Secrets |
| Cloudflare Worker | `pnpm wrangler secret put VAR_NAME --env dev` + `--env production` |

---

## Full Workflow Summary
```
1.  git checkout dev && git pull origin dev
2.  git checkout -b feature/your-feature
3.  ... make changes ...
4.  git add . && git commit -m "feat: description"
5.  git push origin feature/your-feature
6.  Open PR: feature/your-feature → dev
7.  Wait for all checks to pass
8.  Merge PR
9.  git push origin --delete feature/your-feature
10. git branch -d feature/your-feature
11. git checkout dev && git pull origin dev
12. Test on https://euger-dev.euger.workers.dev
13. git checkout dev && git pull origin dev
14. git checkout main && git pull origin main
15. git merge dev && git push origin main
16. Wait for prod Actions to go green
17. Test on https://euger.euger.workers.dev
```

---

## Tech Stack Reference

| Tool | Purpose |
|------|---------|
| Next.js 16 | Frontend framework |
| Cloudflare Workers | Hosting (via OpenNext) |
| Supabase | Database, Auth, Storage |
| GitHub Actions | CI/CD |
| pnpm | Package manager |
| Zod + react-hook-form | Form validation |
| shadcn/ui | Component library |
| TipTap | WYSIWYG editor |

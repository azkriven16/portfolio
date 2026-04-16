# Portfolio — Overview

## Goals
- Build a personal portfolio website to showcase projects and experience
- Make a strong first impression for potential employers and collaborators
- Keep it fast, accessible, and easy to maintain

## Stack Decisions
| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR, great SEO, file-based routing |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Language | TypeScript | Type safety, better DX |
| Animations | Framer Motion | Smooth scroll-triggered animations |
| Icons | Lucide React | Clean, consistent icon set |
| Deployment | Vercel | Zero-config for Next.js, free tier |

## Sections
1. **Hero** — Name, title, tagline, CTA buttons
2. **Projects** — Card grid with tech tags, GitHub + live links
3. **Experience** — Vertical timeline of roles
4. **Contact** — Email + social links (GitHub, LinkedIn)

## Single-Page Layout
All sections live on one page (`/`) with smooth-scroll navigation via a sticky navbar. No routing needed beyond the root page.

## Content Strategy
Content is stored in TypeScript data files (`src/data/`), making it easy to update without touching component code.

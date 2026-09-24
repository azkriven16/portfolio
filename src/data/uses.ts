export interface UsesItem {
  name: string;
  description: string;
  href?: string;
}

export interface UsesSection {
  title: string;
  items: UsesItem[];
}

// Everything here is verifiable from this repo, the client projects in
// `projects.ts`, or the dev setup this site is built on. Hardware and
// personal apps are left out until Euger fills them in.
export const usesSections: UsesSection[] = [
  {
    title: "Editor & terminal",
    items: [
      {
        name: "VS Code",
        description: "Main editor.",
        href: "https://code.visualstudio.com",
      },
      {
        name: "WSL 2",
        description: "Linux on Windows. Development happens inside Ubuntu.",
        href: "https://learn.microsoft.com/windows/wsl/",
      },
      {
        name: "pnpm",
        description: "Package manager for this site.",
        href: "https://pnpm.io",
      },
      {
        name: "Claude Code",
        description: "AI pair programmer in the editor and terminal.",
        href: "https://claude.com/claude-code",
      },
    ],
  },
  {
    title: "Stack",
    items: [
      {
        name: "Next.js",
        description: "This site and four of the five client projects run on it.",
        href: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        description: "Strict mode on for this site.",
        href: "https://www.typescriptlang.org",
      },
      {
        name: "Tailwind CSS",
        description: "Styling. This site uses v4 with CSS-variable design tokens.",
        href: "https://tailwindcss.com",
      },
      {
        name: "Radix UI",
        description: "Accessible primitives. The navigation menu here is built on it.",
        href: "https://www.radix-ui.com",
      },
      {
        name: "Motion",
        description: "Animation, including the animated icons on this site.",
        href: "https://motion.dev",
      },
      {
        name: "Supabase",
        description: "Postgres and realtime for client apps like Viafide and Novu.",
        href: "https://supabase.com",
      },
      {
        name: "Claude API",
        description: "AI features in client work, like Novu's suggested replies.",
        href: "https://www.anthropic.com/api",
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        name: "Vercel",
        description: "Hosting for this site, plus Analytics and Speed Insights.",
        href: "https://vercel.com",
      },
      {
        name: "Neon",
        description: "Serverless Postgres behind the guestbook.",
        href: "https://neon.tech",
      },
      {
        name: "Resend",
        description: "Sends the contact form emails.",
        href: "https://resend.com",
      },
      {
        name: "Cloudflare",
        description: "Edge hosting for client sites like Viafide, Novu and Global Talent Portal.",
        href: "https://www.cloudflare.com",
      },
      {
        name: "GitHub Actions",
        description: "CI (lint, typecheck, build) on every PR, plus the daily stats job.",
        href: "https://github.com/features/actions",
      },
    ],
  },
  {
    title: "This site",
    items: [
      {
        name: "Geist & Geist Mono",
        description: "Typefaces, via next/font.",
        href: "https://vercel.com/font",
      },
      {
        name: "Lucide",
        description: "Icons, with lucide-animated for the hover animations.",
        href: "https://lucide.dev",
      },
    ],
  },
];

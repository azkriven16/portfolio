export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  tech: string[];
  github: string | null;
  live: string | null;
  image?: string;
  status?: "in-progress" | "not-started" | "completed";
  progress?: number;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI Invoice & Expense Tracker",
    description:
      "Upload receipts → AI extracts data → dashboard with charts & summaries.",
    longDescription:
      "A smart expense management tool where you upload receipt images and the AI automatically extracts vendor, amount, date, and category. All data flows into a dashboard with charts, monthly summaries, and export options.",
    features: [
      "Receipt upload with AI-powered data extraction via Claude API",
      "Automatic categorization of expenses",
      "Dashboard with charts and monthly summaries",
      "Supabase-backed storage and authentication",
      "Export to CSV",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Claude API", "Recharts"],
    github: null,
    live: null,
    status: "in-progress",
    progress: 5,
    featured: true,
  },
  {
    title: "AI Resume Tailor",
    description:
      "Paste a job description → AI rewrites your resume with a before/after diff.",
    longDescription:
      "Paste any job description and your existing resume — the AI rewrites your resume to match the role, highlighting relevant experience and keywords. Shows a clear before/after diff so you see exactly what changed.",
    features: [
      "Job description analysis and keyword extraction",
      "AI-powered resume rewriting via Claude API",
      "Side-by-side before/after diff view",
      "PostgreSQL storage for resume history",
      "Export to PDF",
    ],
    tech: ["Next.js", "TypeScript", "Claude API", "Prisma", "PostgreSQL"],
    github: null,
    live: null,
    status: "not-started",
    progress: 0,
  },
  {
    title: "Custom Component Library + CLI",
    description:
      "Your own design system — run a command to copy components into any project.",
    longDescription:
      "A fully documented component library with a CLI tool that lets you copy individual components directly into your project — no package install needed. Similar to shadcn/ui but fully custom-built.",
    features: [
      "CLI tool to copy components into any project",
      "Fully documented with Storybook",
      "VS Code extension for in-editor component browsing",
      "Tailwind CSS-based design tokens",
      "TypeScript-first with full type exports",
    ],
    tech: ["TypeScript", "Node.js CLI", "React", "Tailwind CSS", "Storybook"],
    github: null,
    live: null,
    status: "not-started",
    progress: 0,
  },
  {
    title: "Console Cleaner",
    description:
      "One command removes all console.log statements in the current file or workspace before committing.",
    longDescription:
      "A VS Code extension that finds and removes all console.log (and other console.*) statements from the current file or entire workspace with a single command. Perfect for cleaning up debug code before committing.",
    features: [
      "Remove console.log from current file or entire workspace",
      "Configurable — choose which console methods to target",
      "Preview mode shows what will be removed before applying",
      "Undo support via VS Code's native edit history",
    ],
    tech: ["TypeScript", "VS Code API"],
    github: null,
    live: null,
    status: "not-started",
    progress: 0,
  },
  {
    title: "Dead Import Detector",
    description:
      "Highlights unused imports at the top of a file and removes them all in one click.",
    longDescription:
      "A VS Code extension that statically analyzes your file and highlights imports that are never referenced in the code. Remove all dead imports in one click, keeping your files clean and build output lean.",
    features: [
      "Static analysis of import usage across the file",
      "Inline highlighting of unused imports",
      "One-click removal of all dead imports",
      "Works with TypeScript and JavaScript",
    ],
    tech: ["TypeScript", "VS Code API"],
    github: null,
    live: null,
    status: "not-started",
    progress: 0,
  },
];

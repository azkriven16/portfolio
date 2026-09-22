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
    title: "Viafide",
    description: "AI job board & talent marketplace",
    longDescription:
      "An AI-powered global job board connecting talent with opportunities through intelligent matching, skill verification, and merit-based hiring. Features neural job search, AI-assisted interview prep, company discovery, and a candidate resume builder.",
    features: [
      "AI-powered job matching and neural search interfaces enabling employers to discover talent based on deep skill requirements, not keywords.",
      "Candidate-facing resume builder, onboarding flow, and dashboard supporting applications globally with localized contract handling.",
      "Merit-based hiring features including masked profiles and skill verification for bias-free candidate discovery.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "GSAP", "Cloudflare"],
    github: null,
    live: "http://viafide.com/",
    status: "completed",
    featured: true,
  },
  {
    title: "Novu",
    description: "Real-time customer chat platform",
    longDescription:
      "A real-time customer chat platform and cost-effective alternative to Intercom and Crisp. Features live chat infrastructure, AI-generated response suggestions powered by Claude, team inboxes, a knowledge base, and embeddable chat widgets.",
    features: [
      "Real-time live chat infrastructure via Supabase Realtime enabling instant, bidirectional customer-to-agent messaging at scale.",
      "Claude API integration powering AI-assisted response suggestions and automated agent replies across support queues.",
      "Team dashboards, knowledge base, embeddable chat widget, and subscription payment flows via Dodo Payments for multi-tier SaaS access.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Claude AI", "Cloudflare"],
    github: null,
    live: "https://novu.so/",
    status: "completed",
  },
  {
    title: "Ciptax",
    description: "Browser-based tax calculator suite",
    longDescription:
      "A free, browser-based tax and compliance calculator suite covering Malta and Philippine tax regulations — including income tax, withholding tax, rental income, MP2 investments, and late penalty calculations. All computation runs entirely client-side with no backend or authentication required.",
    features: [
      "In-browser tax calculators covering Malta IRD and Philippine BIR regulations, each validated with Zod schemas and React Hook Form.",
      "Late penalty calculator handling Malta's interest rate transition and date-sensitive filing edge cases across multiple tax year windows.",
      "Next.js Turbopack build pipeline optimized for fast page loads with zero backend dependency.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion"],
    github: null,
    live: "https://www.ciptaxpro.com/",
    status: "completed",
  },
  {
    title: "Global Talent Portal",
    description: "Company website & landing page",
    longDescription:
      "A professional company website and landing page built for Global Talent Portal LLC — a global talent solutions company. Showcases their services and brand with a modern, responsive design deployed on Cloudflare's edge network.",
    features: [
      "Built the full company website for Global Talent Portal LLC, translating their brand identity into a polished web presence with service sections and client-facing content.",
      "Fully responsive, animated interface with Framer Motion and Tailwind CSS deployed on Cloudflare for fast global edge performance.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Three.js", "Drizzle ORM"],
    github: null,
    live: "https://globaltalentportal.com/",
    status: "completed",
  },
  {
    title: "Rocketshyft",
    description: "Workforce scheduling platform",
    longDescription:
      "An enterprise workforce scheduling platform that streamlines employee scheduling, shift management, and availability tracking for teams of all sizes. Fast, modular scheduling experience built with React, TypeScript, and Vite.",
    features: [
      "Interactive scheduling calendar interfaces enabling managers to assign and optimize shifts across complex employee availability constraints.",
      "Schedule state management handling multi-employee availability tracking and automatic shift conflict detection.",
      "Polished, accessible scheduling workflows reducing manual scheduling overhead across team operations.",
    ],
    tech: ["React", "TypeScript", "Vite"],
    github: null,
    live: "https://rocketshift.app/",
    status: "completed",
  },
];

export function projectSlug(project: Project) {
  return project.title.toLowerCase().replace(/\s+/g, "-");
}

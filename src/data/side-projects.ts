export interface SideProject {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  status?: "in-progress";
}

// Sourced from github.com/azkriven16 — repo READMEs and descriptions.
// `live` is only set where the deployed site responded when this list was written.
export const sideProjects: SideProject[] = [
  {
    title: "Animinji",
    description: "Full-stack anime streaming platform for browsing and watching anime.",
    tech: ["Next.js", "shadcn/ui", "Tailwind CSS", "Supabase", "tRPC", "TanStack Query"],
    github: "https://github.com/azkriven16/animinji",
    live: null,
  },
  {
    title: "Mihon Clone",
    description:
      "Free, open-source manga reader — a MangaDex client with a native desktop app (Tauri) and PWA support.",
    tech: ["Next.js", "TypeScript", "Tauri", "PWA"],
    github: "https://github.com/azkriven16/mihon-clone",
    live: "https://mihon-clone.vercel.app",
  },
  {
    title: "eugui",
    description:
      "A shadcn-style CLI for distributing React component libraries via copy-paste. Run one command and own the code — no runtime dependency.",
    tech: ["TypeScript", "Node.js", "CLI"],
    github: "https://github.com/azkriven16/eugui",
    live: null,
  },
  {
    title: "Paste2Image",
    description: "Paste clipboard content, preview it, and download it as a PNG.",
    tech: ["Next.js", "shadcn/ui", "Tailwind CSS", "html2canvas"],
    github: "https://github.com/azkriven16/paste2image",
    live: "https://paste2image.vercel.app",
  },
  {
    title: "ChatApp",
    description:
      "Real-time chat app with JWT authentication, image sharing, and message seen/delivered status.",
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com/azkriven16/chatapp",
    live: null,
  },
  {
    title: "CVSwift",
    description: "Free, open-source AI-powered resume builder and auditor.",
    tech: ["TypeScript", "Supabase", "OpenRouter"],
    github: "https://github.com/azkriven16/cvswift",
    live: null,
    status: "in-progress",
  },
];

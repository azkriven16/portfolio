export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const WORDS_PER_MINUTE = 200;

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export const posts: Post[] = [
  {
    slug: "why-i-love-nextjs",
    title: "Why I Love Next.js",
    date: "2025-03-10",
    description:
      "After building multiple projects with Next.js, here's why it remains my go-to framework for React development.",
    content: `Next.js has become my default choice for almost every new web project. The App Router made things click even more — layouts, loading states, and server components feel natural once you internalize the mental model.

What I appreciate most is the balance it strikes. You get SSR when you need it, static generation when performance matters, and client components when interactivity is required. You don't have to think about it too hard — the framework pushes you toward the right choice.

The developer experience is also hard to beat. Fast Refresh, TypeScript support out of the box, and Vercel's deployment pipeline make iteration fast. I can go from idea to deployed URL in minutes.

If you're still building SPAs with Create React App or Vite for content-heavy sites, give Next.js a real shot. The learning curve is gentle and the payoff is immediate.`,
  },
  {
    slug: "my-dev-journey",
    title: "My Development Journey",
    date: "2025-02-01",
    description:
      "5 years ago I wrote my first line of HTML. Here's what I've learned since then.",
    content: `I started coding around 2020. Like most people, I began with HTML and CSS — building ugly static pages and thinking they were cool. JavaScript came next, and it broke my brain in the best way possible.

React was the turning point. The component model changed how I think about building UIs. Suddenly everything was composable, reusable, and easier to reason about.

From there it snowballed — TypeScript for safety, Node.js for the backend, MongoDB and PostgreSQL for data. I interned at Digipay in 2022 where I got my first taste of a real codebase and an Agile team. Then freelanced on client projects, worked part-time at Rocketshyft, and graduated with my BSIT in 2025.

The biggest lesson: just build things. Read docs, watch tutorials, but at some point you have to sit down and write broken code until it works. That's where the real learning happens.`,
  },
  {
    slug: "building-eugergpt",
    title: "Building EugerGPT",
    date: "2025-01-15",
    description:
      "A breakdown of how I built my AI chatbot with Next.js, Gemini, and the AI SDK.",
    content: `EugerGPT started as a weekend experiment and ended up being one of my favourite projects.

The core stack is Next.js App Router, the Vercel AI SDK, and Google Gemini as the model. The AI SDK makes streaming responses surprisingly simple — you set up a route handler, define the model, and stream back the response. The client-side \`useChat\` hook handles the rest.

The tricky part was giving the chatbot context about me. I wrote a system prompt that includes my background, projects, and skills so it can answer questions about my work accurately. It's essentially a more conversational version of this portfolio.

A few things I learned: streaming UX matters a lot — showing tokens as they arrive feels much better than waiting for the full response. Also, Gemini's context window is generous, which helped keep the system prompt detailed without hitting limits.

The code is on GitHub if you want to dig in.`,
  },
  {
    slug: "freelancing-lessons",
    title: "What Freelancing Taught Me",
    date: "2024-11-20",
    description:
      "Client work is different from personal projects in ways nobody warns you about.",
    content: `Freelancing was my first real exposure to building software for other people — not for me, not for grades, but for a paying client with actual expectations.

The technical side was the easy part. The harder lessons were about communication. Scope creep is real. What starts as "a simple website" can quickly expand into a full-featured platform if you don't define boundaries early. Learn to write clear agreements about what's included.

Deadlines also hit differently when money is involved. I developed better habits around estimating time — always adding buffer, always communicating delays early rather than late.

Working on Viafide, Global Talent Portal, and Ciptax Pro pushed me to write cleaner code than I would for personal projects. Someone else has to maintain this. Future-me or another developer will read this. That mindset shift improved my code quality permanently.

If you're early in your career, I'd recommend taking at least one or two freelance projects. The discomfort of client expectations is one of the best growth accelerators I've experienced.`,
  },
];

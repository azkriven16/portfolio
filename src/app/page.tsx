import Bio from "@/components/sections/Bio";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import type { Metadata } from "next";

// Title, description and OpenGraph come from the root layout.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-32 md:pb-24">
      <Bio />
      <hr />
      <Projects />
      <hr />
      <Experience />
      <hr />
      <Contact />
      <hr />
      <footer className="pt-4 pb-2">
        <p className="text-xs" style={{ color: "var(--c-text-4)" }}>
          © 2026 Euger Bonete Jr
        </p>
      </footer>
    </main>
  );
}

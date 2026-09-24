"use client";

import { useRef } from "react";
import { GithubIcon, LinkedinIcon, MailCheckIcon } from "lucide-animated";

type AnimHandle = { startAnimation: () => void; stopAnimation: () => void };

function Badge({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="badge"
      >
        {children}
      </a>
    );
  return <span className="badge">{children}</span>;
}

function SocialLink({
  href,
  Icon,
  children,
  mail,
}: {
  href: string;
  Icon: React.ForwardRefExoticComponent<
    { size?: number } & React.RefAttributes<AnimHandle>
  >;
  children: React.ReactNode;
  mail?: boolean;
}) {
  const ref = useRef<AnimHandle>(null);
  return (
    <a
      href={href}
      target={mail ? undefined : "_blank"}
      rel={mail ? undefined : "noopener noreferrer"}
      className={
        mail
          ? "prose-link inline-flex items-center gap-1.5"
          : "social-link inline-flex items-center gap-1.5"
      }
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <Icon ref={ref} size={14} /> {children}
    </a>
  );
}

const T3 = { color: "var(--c-text-3)" } as React.CSSProperties;

export default function Bio() {
  return (
    <section id="bio" className="pt-8 pb-2">
      <h1 className="mb-2">Euger Bonete Jr</h1>

      <p className="mb-6" style={{ ...T3, fontSize: "0.95rem" }}>
        Full-Stack Developer · Iloilo, Philippines
      </p>

      <div className="space-y-2.5 mb-8" style={{ fontSize: "0.92rem", ...T3 }}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="shrink-0">Working as</span>
          <Badge>Freelance Developer</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="shrink-0">Skilled in</span>
          <Badge>React</Badge>
          <Badge>Next.js</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Tailwind CSS</Badge>
          <Badge>Node.js</Badge>
          <Badge>Supabase</Badge>
          <Badge>MongoDB</Badge>
          <Badge>Cloudflare</Badge>
        </div>
      </div>

      <div className="space-y-4" style={{ fontSize: "0.95rem" }}>
        <p>
          I started coding in 2021 and graduated with a Bachelor of Science
          in Information Technology in 2025. I specialize in React development,
          crafting beautiful and interactive digital experiences from creative
          concepts and business ideas.
        </p>
        <p>
          I leverage{" "}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            Next.js
          </a>
          , and{" "}
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            TypeScript
          </a>{" "}
          to write clean and maintainable code. I&apos;ve built production sites
          for clients across different industries as a freelancer — including{" "}
          <a
            href="https://viafide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            Viafide
          </a>
          ,{" "}
          <a
            href="https://globaltalentportal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            Global Talent Portal
          </a>
          , and{" "}
          <a
            href="https://www.ciptaxpro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            Ciptax Pro
          </a>{" "}
          — and interned at{" "}
          <a
            href="https://digipay.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            Digipay
          </a>
          .
        </p>
        <p>
          Outside of coding, I enjoy listening to music, watching anime, and
          getting lost in books. You can find my full project list{" "}
          <a href="#projects" className="prose-link">
            here
          </a>
          .
        </p>
      </div>

      <hr />

      <div className="space-y-3" style={{ fontSize: "0.92rem" }}>
        <p style={T3}>Find me on</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <SocialLink href="https://github.com/azkriven16" Icon={GithubIcon}>
            GitHub
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/euger-bonete"
            Icon={LinkedinIcon}
          >
            LinkedIn
          </SocialLink>
        </div>
        <span style={{ ...T3, display: "block" }}>
          Or mail me at{" "}
          <SocialLink
            href="mailto:eugerbone@gmail.com"
            Icon={MailCheckIcon}
            mail
          >
            eugerbone@gmail.com
          </SocialLink>
        </span>
      </div>
    </section>
  );
}

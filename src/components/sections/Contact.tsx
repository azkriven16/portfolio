"use client";

import { useRef } from "react";
import { GithubIcon, LinkedinIcon, MailCheckIcon } from "lucide-animated";

type AnimHandle = { startAnimation: () => void; stopAnimation: () => void };

function ContactLink({
  href,
  Icon,
  children,
  mail,
}: {
  href: string;
  Icon: React.ForwardRefExoticComponent<{ size?: number } & React.RefAttributes<AnimHandle>>;
  children: React.ReactNode;
  mail?: boolean;
}) {
  const ref = useRef<AnimHandle>(null);
  return (
    <a
      href={href}
      target={mail ? undefined : "_blank"}
      rel={mail ? undefined : "noopener noreferrer"}
      className="social-link inline-flex items-center gap-1.5"
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <Icon ref={ref} size={14} />
      {children}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-4">
      <h2 className="mb-6">Contact</h2>

      <div className="space-y-3" style={{ fontSize: "0.92rem", color: "var(--c-text-3)" }}>
        <p>
          I&apos;m open to freelance work, full-time roles, and interesting collaborations.
          Feel free to reach out — I&apos;ll get back to you as soon as I can.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
          <ContactLink href="mailto:eugerbone@gmail.com" Icon={MailCheckIcon} mail>
            eugerbone@gmail.com
          </ContactLink>
          <ContactLink href="https://github.com/azkriven16" Icon={GithubIcon}>
            GitHub
          </ContactLink>
          <ContactLink href="https://linkedin.com/in/euger-bonete" Icon={LinkedinIcon}>
            LinkedIn
          </ContactLink>
        </div>
      </div>
    </section>
  );
}

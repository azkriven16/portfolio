"use client";

import { useTheme } from "@/providers/ThemeProvider";
import {
  FileTextIcon,
  GithubIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
  TurkishLiraIcon,
} from "lucide-animated";
import {
  BookOpen,
  Briefcase,
  FlaskConical,
  FolderGit2,
  Mail,
  MessageSquare,
  PenLine,
  Rocket,
  Search,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type AnimHandle = { startAnimation: () => void; stopAnimation: () => void };

const navMenus = [
  {
    label: "Work",
    blurb: {
      eyebrow: "Selected work",
      Icon: Rocket,
      title: "Things I've shipped",
      text: "Production apps for real clients — job boards, chat platforms, tax tools and more.",
    },
    items: [
      { label: "Projects", href: "/#projects", Icon: FolderGit2, description: "Client work and products I've built" },
      { label: "Experience", href: "/#experience", Icon: Briefcase, description: "Roles and background" },
      { label: "Contact", href: "/#contact", Icon: Mail, description: "Get in touch" },
    ],
  },
  {
    label: "Explore",
    blurb: {
      eyebrow: "Off the clock",
      Icon: BookOpen,
      title: "Notes & hellos",
      text: "Writing about web dev and building things, plus a guestbook for anyone who wants to say hi.",
    },
    items: [
      { label: "Blog", href: "/blog", Icon: PenLine, description: "Notes on web development and building things" },
      { label: "Guestbook", href: "/guestbook", Icon: MessageSquare, description: "Leave a message and say hi" },
      { label: "Side Projects", href: "/side-projects", Icon: FlaskConical, description: "Apps and experiments for fun" },
    ],
  },
];

const ICON_BTN: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.9rem",
  height: "1.9rem",
  borderRadius: "0.35rem",
  color: "var(--c-text-3)",
  transition: "color 0.15s, background 0.15s",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

function AnimIconBtn({
  iconRef,
  href,
  external,
  label,
  onClick,
  children,
}: {
  iconRef: React.RefObject<AnimHandle | null>;
  href?: string;
  external?: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const enter = (e: React.SyntheticEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = "var(--c-text-2)";
    (e.currentTarget as HTMLElement).style.background = "var(--c-surface)";
    iconRef.current?.startAnimation();
  };
  const leave = (e: React.SyntheticEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = "var(--c-text-3)";
    (e.currentTarget as HTMLElement).style.background = "transparent";
    iconRef.current?.stopAnimation();
  };
  const focus = (e: React.FocusEvent<HTMLElement>) => {
    if (e.currentTarget.matches(":focus-visible")) enter(e);
  };

  if (onClick)
    return (
      <button
        aria-label={label}
        style={ICON_BTN}
        onClick={onClick}
        onMouseEnter={enter}
        onFocus={focus}
        onMouseLeave={leave}
        onBlur={leave}
      >
        {children}
      </button>
    );
  return (
    <a
      href={href}
      aria-label={label}
      style={ICON_BTN}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={enter}
      onFocus={focus}
      onMouseLeave={leave}
      onBlur={leave}
    >
      {children}
    </a>
  );
}

const ANCHOR_IDS = ["projects", "experience", "contact"];

function useActiveAnchor(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const check = () => {
      const scrollTop = window.scrollY + window.innerHeight * 0.48;
      let found: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollTop) found = id;
      }
      setActive(found);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

const bottomLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Guestbook", href: "/guestbook" },
  { label: "Home", href: "/", home: true },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const noopSubscribe = () => () => {};

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const activeAnchor = useActiveAnchor(ANCHOR_IDS);

  // Server renders "Ctrl K"; the client swaps in "⌘K" on Apple platforms after hydration.
  const shortcut = useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K"),
    () => "Ctrl K"
  );

  const logoRef = useRef<AnimHandle>(null);

  const resumeRef = useRef<AnimHandle>(null);
  const githubRef = useRef<AnimHandle>(null);
  const linkedinRef = useRef<AnimHandle>(null);
  const themeRef = useRef<AnimHandle>(null);

  const openPalette = () =>
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
    );

  const highlightSearch = (e: React.SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--c-text-2)";
    e.currentTarget.style.borderColor = "var(--c-text-3)";
  };
  const unhighlightSearch = (e: React.SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--c-text-3)";
    e.currentTarget.style.borderColor = "var(--c-border)";
  };

  return (
    <>
      {/* ── Top navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "var(--c-nav-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--c-border-2)",
        }}
      >
        <nav className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Left: logo + nav links */}
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/"
              aria-label="Home"
              style={{
                color: "var(--c-text-2)",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                padding: 0,
              }}
              onMouseEnter={() => logoRef.current?.startAnimation()}
              onFocus={() => logoRef.current?.startAnimation()}
              onMouseLeave={() => logoRef.current?.stopAnimation()}
              onBlur={() => logoRef.current?.stopAnimation()}
            >
              <TurkishLiraIcon ref={logoRef} size={20} />
            </Link>

            {/* Desktop nav menus */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navMenus.map(({ label, blurb, items }) => (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="nav-menu-grid">
                        <div className="nav-menu-blurb">
                          <span className="nav-menu-blurb-eyebrow">{blurb.eyebrow}</span>
                          <blurb.Icon size={22} aria-hidden="true" className="nav-menu-blurb-icon" />
                          <span className="nav-menu-blurb-title">{blurb.title}</span>
                          <span className="nav-menu-blurb-text">{blurb.text}</span>
                        </div>
                        <div className="nav-menu-items">
                          {items.map(({ label: itemLabel, href, Icon, description }) => (
                            <NavigationMenuLink key={href} asChild>
                              <Link href={href}>
                                <span className="nav-menu-icon">
                                  <Icon size={16} aria-hidden="true" />
                                </span>
                                <span className="nav-menu-text">
                                  <span className="nav-menu-link-title">{itemLabel}</span>
                                  <span className="nav-menu-link-desc">{description}</span>
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1 shrink-0">

            {/* ── Mobile-only socials (before search) ── */}
            <div className="flex sm:hidden items-center gap-1">
              <a href="/euger_bonete_resume_dev.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" style={ICON_BTN}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>
                </svg>
              </a>
              <a href="https://github.com/azkriven16" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={ICON_BTN}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/euger-bonete" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={ICON_BTN}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            {/* Separator: mobile only */}
            <div
              className="sm:hidden"
              style={{
                width: "1px",
                height: "1.1rem",
                background: "var(--c-border)",
                margin: "0 0.2rem",
              }}
            />

            {/* Search / ⌘K */}
            <button
              onClick={openPalette}
              aria-label="Search"
              className="p-1.5 lg:px-3 lg:py-1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "0.4rem",
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-3)",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={highlightSearch}
              onFocus={highlightSearch}
              onMouseLeave={unhighlightSearch}
              onBlur={unhighlightSearch}
            >
              <Search size={14} />
              <span className="hidden lg:inline">Search</span>
              <kbd
                className="hidden lg:inline"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--c-text-4)",
                  background: "var(--c-bg)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "0.2rem",
                  padding: "0.15rem 0.4rem",
                  lineHeight: 1,
                }}
              >
                {shortcut}
              </kbd>
            </button>

            {/* Separator + desktop socials */}
            <div
              className="hidden sm:block"
              style={{
                width: "1px",
                height: "1.1rem",
                background: "var(--c-border)",
                margin: "0 0.2rem",
              }}
            />

            <div className="hidden sm:flex items-center gap-1">
              <AnimIconBtn iconRef={resumeRef} href="/euger_bonete_resume_dev.pdf" external label="Resume">
                <FileTextIcon ref={resumeRef} size={14} />
              </AnimIconBtn>
              <AnimIconBtn
                iconRef={githubRef}
                href="https://github.com/azkriven16"
                external
                label="GitHub"
              >
                <GithubIcon ref={githubRef} size={15} />
              </AnimIconBtn>
              <AnimIconBtn
                iconRef={linkedinRef}
                href="https://linkedin.com/in/euger-bonete"
                external
                label="LinkedIn"
              >
                <LinkedinIcon ref={linkedinRef} size={15} />
              </AnimIconBtn>
            </div>

            <div
              className="hidden sm:block"
              style={{
                width: "1px",
                height: "1.1rem",
                background: "var(--c-border)",
                margin: "0 0.2rem",
              }}
            />

            <AnimIconBtn
              iconRef={themeRef}
              label="Toggle theme"
              onClick={toggle}
            >
              {theme === "dark" ? (
                <SunIcon ref={themeRef} size={18} />
              ) : (
                <MoonIcon ref={themeRef} size={18} />
              )}
            </AnimIconBtn>
          </div>
        </nav>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Elevated home button */}
        <Link
          href="/"
          aria-label="Home"
          style={{
            textDecoration: "none",
            position: "absolute",
            left: "50%",
            bottom: "env(safe-area-inset-bottom)",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          {(() => {
            const isHomeActive = pathname === "/" && !activeAnchor;
            return (
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: isHomeActive ? "var(--c-text)" : "var(--c-surface)",
                  border: "1px solid var(--c-border-2)",
                  color: isHomeActive ? "var(--c-bg)" : "var(--c-text-4)",
                  transition: "background 0.15s, color 0.15s",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  gap: "2px",
                }}
              >
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isHomeActive ? "var(--c-bg)" : "var(--c-text-4)"}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.45rem",
                    letterSpacing: "0.04em",
                    color: isHomeActive ? "var(--c-bg)" : "var(--c-text-4)",
                  }}
                >
                  Home
                </span>
              </span>
            );
          })()}
        </Link>

        {/* Nav bar */}
        <nav
          className="flex items-center justify-around"
          style={{
            background: "var(--c-nav-bg)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid var(--c-border-2)",
            height: "56px",
          }}
        >
          {bottomLinks.map(({ label, href, home }) => {
            if (home) return <div key={label} style={{ width: "64px" }} />;

            const anchor = href.includes("#") ? href.split("#")[1] : null;
            const isActive = anchor
              ? pathname === "/" && activeAnchor === anchor
              : pathname === href;
            const color = isActive ? "var(--c-text)" : "var(--c-text-3)";
            const Tag = anchor ? "a" : Link;

            return (
              <Tag
                key={label}
                href={href}
                style={{ textDecoration: "none" }}
                className="flex flex-col items-center gap-0.5 px-3 py-1"
              >
                <span style={{ color, transition: "color 0.15s", display: "flex" }}>
                  {label === "Blog" && (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                    </svg>
                  )}
                  {label === "Guestbook" && (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  )}
                  {label === "Projects" && (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="3" rx="2"/>
                      <path d="M8 21h8m-4-4v4"/>
                    </svg>
                  )}
                  {label === "Contact" && (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      <path d="m16 19 2 2 4-4"/>
                    </svg>
                  )}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.04em",
                    color,
                    transition: "color 0.15s",
                  }}
                >
                  {label}
                </span>
              </Tag>
            );
          })}
        </nav>
      </div>
    </>
  );
}

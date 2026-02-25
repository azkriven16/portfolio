"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"author" | "reader">("reader");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push("/dashboard");
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      if (data.user) {
        await supabase.from("profiles").update({ role }).eq("id", data.user.id);
      }
      setMessage("Check your email to confirm your account!");
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
        }

        @media (max-width: 768px) {
          .login-root {
            grid-template-columns: 1fr;
          }
          .login-panel-left {
            display: none !important;
          }
          .login-panel-right {
            padding: 2rem !important;
          }
        }

        /* ── Left panel ── */
        .login-panel-left {
          position: relative;
          overflow: hidden;
          background: #0d0d0d;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3rem;
        }

        .login-panel-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 20% 20%, rgba(212,175,100,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 80% 70%, rgba(212,175,100,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 90% 40% at 50% 100%, rgba(212,175,100,0.12) 0%, transparent 50%);
          animation: pulseGlow 8s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          0%   { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1;   transform: scale(1.05); }
        }

        /* Grid lines */
        .login-panel-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,175,100,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,100,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .left-content {
          position: relative;
          z-index: 2;
          animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .left-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #d4af64;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .left-headline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 4vw, 3.8rem);
          line-height: 1.1;
          color: #f5f0e8;
          margin: 0 0 1.5rem;
          font-weight: 700;
        }

        .left-headline em {
          font-style: italic;
          color: #d4af64;
        }

        .left-sub {
          font-size: 0.9rem;
          color: rgba(245,240,232,0.45);
          line-height: 1.7;
          max-width: 28ch;
          font-weight: 300;
        }

        .left-divider {
          width: 40px;
          height: 1px;
          background: #d4af64;
          margin: 2rem 0;
          opacity: 0.6;
        }

        /* Floating badge */
        .left-badge {
          position: absolute;
          top: 3rem;
          left: 3rem;
          z-index: 3;
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: #f5f0e8;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .left-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af64;
          animation: blink 2.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* Decorative circles */
        .deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(212,175,100,0.15);
          pointer-events: none;
        }

        .deco-ring-1 {
          width: 320px; height: 320px;
          top: -80px; right: -80px;
        }

        .deco-ring-2 {
          width: 200px; height: 200px;
          top: 0px; right: -20px;
          border-color: rgba(212,175,100,0.08);
        }

        .deco-ring-3 {
          width: 500px; height: 500px;
          bottom: -200px; left: -150px;
          border-color: rgba(212,175,100,0.05);
        }

        /* ── Right panel ── */
        .login-panel-right {
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 4rem;
          position: relative;
        }

        .login-panel-right::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #d4af64, #c49b4a, #d4af64);
        }

        .form-wrap {
          width: 100%;
          max-width: 380px;
          animation: fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .form-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d4af64;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0d0d0d;
          margin: 0 0 0.4rem;
          line-height: 1.2;
        }

        .form-subtitle {
          font-size: 0.85rem;
          color: #7a6e5e;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        /* Feedback banners */
        .feedback-error {
          font-size: 0.8rem;
          color: #b03a2e;
          background: rgba(176,58,46,0.08);
          border-left: 2px solid #b03a2e;
          padding: 0.65rem 0.85rem;
          border-radius: 2px;
          margin-bottom: 1.25rem;
        }

        .feedback-success {
          font-size: 0.8rem;
          color: #2e6b4f;
          background: rgba(46,107,79,0.08);
          border-left: 2px solid #2e6b4f;
          padding: 0.65rem 0.85rem;
          border-radius: 2px;
          margin-bottom: 1.25rem;
        }

        /* Field group */
        .field-group {
          margin-bottom: 1.25rem;
        }

        .field-label {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0d0d0d;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .field-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #c8bfb0;
          padding: 0.65rem 0;
          font-size: 0.95rem;
          color: #0d0d0d;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: #b0a898;
        }

        .field-input:focus {
          border-bottom-color: #d4af64;
        }

        /* Role selector */
        .role-label {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0d0d0d;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .role-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .role-card {
          border: 1.5px solid #c8bfb0;
          padding: 0.85rem 1rem;
          cursor: pointer;
          transition: all 0.18s ease;
          background: transparent;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }

        .role-card:hover {
          border-color: #d4af64;
        }

        .role-card.active {
          border-color: #d4af64;
          background: rgba(212,175,100,0.07);
        }

        .role-card-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: #0d0d0d;
          display: block;
          margin-bottom: 0.2rem;
        }

        .role-card-desc {
          font-size: 0.72rem;
          color: #7a6e5e;
          font-weight: 300;
        }

        /* Divider */
        .form-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .form-divider-line {
          flex: 1;
          height: 1px;
          background: #d9d3c9;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          background: #0d0d0d;
          color: #f5f0e8;
          border: none;
          padding: 0.9rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #d4af64;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .submit-btn:hover::after {
          transform: translateX(0);
        }

        .submit-btn:hover {
          color: #0d0d0d;
        }

        .submit-btn span {
          position: relative;
          z-index: 1;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn:disabled::after {
          display: none;
        }

        /* Toggle mode */
        .mode-toggle {
          font-size: 0.8rem;
          color: #7a6e5e;
          text-align: center;
        }

        .mode-toggle button {
          background: none;
          border: none;
          color: #0d0d0d;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          padding: 0;
        }

        .mode-toggle button:hover {
          color: #d4af64;
        }
      `}</style>

      <div className="login-root">
        {/* ── Left panel ── */}
        <div className="login-panel-left">
          <div className="deco-ring deco-ring-1" />
          <div className="deco-ring deco-ring-2" />
          <div className="deco-ring deco-ring-3" />

          <div className="left-badge">
            <span className="left-badge-dot" />
            Euger
          </div>

          <div className="left-content">
            <p className="left-eyebrow">Portfolio & Blog</p>
            <h1 className="login-panel-left-headline left-headline">
              Where <em>ideas</em><br />find their voice.
            </h1>
            <div className="left-divider" />
            <p className="left-sub">
              A space for long-form writing, project showcases, and thoughts worth sharing with the world.
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="login-panel-right">
          <div className="form-wrap">
            <p className="form-eyebrow">
              {mode === "login" ? "Welcome back" : "Get started"}
            </p>
            <h2 className="form-title">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="form-subtitle">
              {mode === "login"
                ? "Enter your credentials to continue"
                : "Choose your role and join the community"}
            </p>

            {error && <div className="feedback-error">{error}</div>}
            {message && <div className="feedback-success">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  className="field-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="field-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
              </div>

              {mode === "signup" && (
                <>
                  <label className="role-label">I want to join as</label>
                  <div className="role-grid">
                    <button
                      type="button"
                      className={`role-card ${role === "reader" ? "active" : ""}`}
                      onClick={() => setRole("reader")}
                    >
                      <span className="role-card-title">Reader</span>
                      <span className="role-card-desc">Browse &amp; discover content</span>
                    </button>
                    <button
                      type="button"
                      className={`role-card ${role === "author" ? "active" : ""}`}
                      onClick={() => setRole("author")}
                    >
                      <span className="role-card-title">Author</span>
                      <span className="role-card-desc">Write &amp; submit drafts</span>
                    </button>
                  </div>
                </>
              )}

              <div className="form-divider">
                <div className="form-divider-line" />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span>
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Sign In →"
                    : "Create Account →"}
                </span>
              </button>
            </form>

            <p className="mode-toggle">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError(null);
                  setMessage(null);
                }}
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"author" | "reader">("reader");
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", role: "reader" },
  });

  const isSubmitting =
    mode === "login"
      ? loginForm.formState.isSubmitting
      : signupForm.formState.isSubmitting;

  async function onLogin(data: LoginFormData) {
    setServerError(null);
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      setServerError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function onSignup(data: SignupFormData) {
    setServerError(null);
    setServerMessage(null);
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(error.message);
      return;
    }
    if (authData.user) {
      await supabase
        .from("profiles")
        .update({ role })
        .eq("id", authData.user.id);
    }
    setServerMessage("Check your email to confirm your account!");
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setServerError(null);
    setServerMessage(null);
    loginForm.reset();
    signupForm.reset();
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
          .login-root { grid-template-columns: 1fr; }
          .login-panel-left { display: none !important; }
          .login-panel-right { padding: 2rem !important; }
        }

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

        .left-headline em { font-style: italic; color: #d4af64; }

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

        .left-badge {
          position: absolute;
          top: 3rem; left: 3rem;
          z-index: 3;
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: #f5f0e8;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .left-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #d4af64;
          animation: blink 2.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .deco-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(212,175,100,0.15);
          pointer-events: none;
        }

        .deco-ring-1 { width: 320px; height: 320px; top: -80px; right: -80px; }
        .deco-ring-2 { width: 200px; height: 200px; top: 0; right: -20px; border-color: rgba(212,175,100,0.08); }
        .deco-ring-3 { width: 500px; height: 500px; bottom: -200px; left: -150px; border-color: rgba(212,175,100,0.05); }

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

        .field-group { margin-bottom: 1.25rem; }

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

        .field-input::placeholder { color: #b0a898; }
        .field-input:focus { border-bottom-color: #d4af64; }
        .field-input.error { border-bottom-color: #b03a2e; }

        .field-error {
          font-size: 0.72rem;
          color: #b03a2e;
          margin-top: 0.35rem;
        }

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

        .role-card:hover { border-color: #d4af64; }
        .role-card.active { border-color: #d4af64; background: rgba(212,175,100,0.07); }
        .role-card-title { font-size: 0.85rem; font-weight: 500; color: #0d0d0d; display: block; margin-bottom: 0.2rem; }
        .role-card-desc { font-size: 0.72rem; color: #7a6e5e; font-weight: 300; }

        .form-divider { display: flex; align-items: center; margin: 2rem 0; }
        .form-divider-line { flex: 1; height: 1px; background: #d9d3c9; }

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

        .submit-btn:hover::after { transform: translateX(0); }
        .submit-btn:hover { color: #0d0d0d; }
        .submit-btn span { position: relative; z-index: 1; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .submit-btn:disabled::after { display: none; }

        .mode-toggle { font-size: 0.8rem; color: #7a6e5e; text-align: center; }

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

        .mode-toggle button:hover { color: #d4af64; }
      `}</style>

      <div className="login-root">
        {/* Left panel */}
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
            <h1 className="left-headline">
              Where <em>ideas</em>
              <br />
              find their voice.
            </h1>
            <div className="left-divider" />
            <p className="left-sub">
              A space for long-form writing, project showcases, and thoughts
              worth sharing with the world.
            </p>
          </div>
        </div>

        {/* Right panel */}
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

            {serverError && <div className="feedback-error">{serverError}</div>}
            {serverMessage && (
              <div className="feedback-success">{serverMessage}</div>
            )}

            {mode === "login" ? (
              <form onSubmit={loginForm.handleSubmit(onLogin)}>
                <div className="field-group">
                  <label className="field-label" htmlFor="login-email">
                    Email address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`field-input ${loginForm.formState.errors.email ? "error" : ""}`}
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="field-error">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`field-input ${loginForm.formState.errors.password ? "error" : ""}`}
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="field-error">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="form-divider">
                  <div className="form-divider-line" />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Signing in..." : "Sign In →"}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={signupForm.handleSubmit(onSignup)}>
                <div className="field-group">
                  <label className="field-label" htmlFor="signup-email">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`field-input ${signupForm.formState.errors.email ? "error" : ""}`}
                    {...signupForm.register("email")}
                  />
                  {signupForm.formState.errors.email && (
                    <p className="field-error">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={`field-input ${signupForm.formState.errors.password ? "error" : ""}`}
                    {...signupForm.register("password")}
                  />
                  {signupForm.formState.errors.password && (
                    <p className="field-error">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <label className="role-label">I want to join as</label>
                <div className="role-grid">
                  <button
                    type="button"
                    className={`role-card ${role === "reader" ? "active" : ""}`}
                    onClick={() => {
                      setRole("reader");
                      signupForm.setValue("role", "reader");
                    }}
                  >
                    <span className="role-card-title">Reader</span>
                    <span className="role-card-desc">
                      Browse &amp; discover content
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`role-card ${role === "author" ? "active" : ""}`}
                    onClick={() => {
                      setRole("author");
                      signupForm.setValue("role", "author");
                    }}
                  >
                    <span className="role-card-title">Author</span>
                    <span className="role-card-desc">
                      Write &amp; submit drafts
                    </span>
                  </button>
                </div>

                <div className="form-divider">
                  <div className="form-divider-line" />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? "Creating account..." : "Create Account →"}
                  </span>
                </button>
              </form>
            )}

            <p className="mode-toggle">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button type="button" onClick={switchMode}>
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

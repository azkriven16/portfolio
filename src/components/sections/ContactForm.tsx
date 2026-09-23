"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage, type ContactFormState } from "./contact-actions";

const INPUT: React.CSSProperties = {
  width: "100%",
  background: "var(--c-surface)",
  border: "1px solid var(--c-border)",
  borderRadius: "0.4rem",
  padding: "0.55rem 0.75rem",
  fontSize: "0.88rem",
  color: "var(--c-text)",
  outline: "none",
  fontFamily: "var(--font-sans)",
  transition: "border-color 0.15s",
};

const initialState: ContactFormState = { error: null, success: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="pt-2">
      {/* Honeypot: hidden from real visitors, bots fill it blindly. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            style={INPUT}
            required
            maxLength={80}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--c-border)")}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            style={INPUT}
            required
            maxLength={254}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--c-border)")}
          />
        </div>
        <textarea
          name="message"
          placeholder="What's on your mind?"
          rows={4}
          style={{ ...INPUT, resize: "none" }}
          required
          maxLength={2000}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--c-border)")}
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            style={{
              background: "var(--c-btn-bg)", color: "var(--c-btn-fg)", border: "none",
              borderRadius: "0.4rem", padding: "0.5rem 1.25rem", fontSize: "0.82rem",
              fontWeight: 600, cursor: pending ? "default" : "pointer", fontFamily: "var(--font-sans)",
              transition: "background 0.15s", opacity: pending ? 0.7 : 1,
            }}
            onMouseEnter={(e) => !pending && (e.currentTarget.style.background = "var(--c-btn-hover)")}
            onMouseLeave={(e) => !pending && (e.currentTarget.style.background = "var(--c-btn-bg)")}
          >
            {pending ? "Sending..." : "Send message"}
          </button>
          {state.success && (
            <span style={{ fontSize: "0.8rem", color: "var(--c-success)", fontFamily: "var(--font-mono)" }}>
              message sent!
            </span>
          )}
          {state.error && (
            <span style={{ fontSize: "0.8rem", color: "var(--c-error, #e5484d)", fontFamily: "var(--font-mono)" }}>
              {state.error}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { signGuestbook, type SignGuestbookState } from "./actions";

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

const initialState: SignGuestbookState = { error: null, success: false };

export function GuestbookForm() {
  const [state, formAction, pending] = useActionState(signGuestbook, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="mb-12">
      {/* Honeypot: hidden from real visitors, bots fill it blindly. Never remove
          the name/tabIndex/autoComplete combo below — that's what keeps it invisible
          to people while still being a normal field to a scripted form-filler. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          style={INPUT}
          required
          maxLength={60}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--c-text-3)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--c-border)")}
        />
        <textarea
          name="message"
          placeholder="Leave a message..."
          rows={3}
          style={{ ...INPUT, resize: "none" }}
          required
          maxLength={280}
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
            {pending ? "Sending..." : "Sign Guestbook"}
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

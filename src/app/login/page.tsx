"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleSignUp() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setError("Check your email to confirm your account!");
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && (
          <p className="mb-4 text-sm text-red-500">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white rounded p-2 mb-2 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full border border-gray-300 rounded p-2 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </main>
  );
}
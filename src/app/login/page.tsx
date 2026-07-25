"use client";

// NOTE:
// This is a starter replacement scaffold for src/app/login/page.tsx.
// It preserves your existing NextAuth flow while you continue styling.
// Replace or extend as needed.

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0d1117] grid lg:grid-cols-2">
      <section className="hidden lg:flex flex-col items-center justify-center p-12 bg-[#111827]">
        <Image
          src="/piazza-navona-logo.png"
          alt="CocoaPass"
          width={260}
          height={260}
          priority
        />
        <h1 className="mt-8 text-5xl font-black text-green-400">CocoaPass</h1>
        <p className="mt-4 text-xl text-gray-300 text-center">
          Chain Visibility & Traceability Platform
        </p>
      </section>

      <section className="flex items-center justify-center p-8">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl bg-[#161b22] p-8 shadow-2xl"
        >
          <div className="flex justify-center lg:hidden mb-6">
            <Image
              src="/piazza-navona-logo.png"
              alt="CocoaPass"
              width={160}
              height={160}
              priority
            />
          </div>

          <h2 className="text-3xl font-bold text-white text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-400 mt-2 mb-8">
            Secure access for authorized personnel
          </p>

          <label className="block text-sm text-gray-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            className="w-full rounded-lg border border-gray-700 bg-[#0d1117] p-4 text-white mb-5"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <label className="block text-sm text-gray-300 mb-2">
            Password
          </label>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-700 bg-[#0d1117] p-4 pr-16 text-white"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className="flex items-center gap-2 text-gray-300 mb-6">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e)=>setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          {error && (
            <div className="mb-4 rounded-lg border border-red-600 bg-red-950 p-3 text-red-300">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-green-600 p-4 font-bold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Powered by Piazza Navona Nigeria Ltd.
          </p>
        </form>
      </section>
    </main>
  );
}

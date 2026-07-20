"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0d1117] flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-[#161b22] p-10 rounded-2xl w-[420px] shadow-2xl"
      >

        <h1 className="text-4xl font-black text-green-400 mb-8 text-center">
          CocoaPass Login
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 rounded-lg bg-[#0d1117] text-white mb-5 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-lg bg-[#0d1117] text-white mb-5 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-lg font-bold text-xl"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>
    </main>
  );
}
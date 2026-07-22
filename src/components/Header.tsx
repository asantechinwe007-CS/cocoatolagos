"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-gray-800 bg-[#111827] flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">
            {(session?.user as any)?.name ?? "User"}
          </p>

          <p className="text-xs text-gray-400 uppercase">
            {(session?.user as any)?.role ?? ""}
          </p>
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
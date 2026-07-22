import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize() {
        // Real authentication happens in auth.ts
        // Middleware only needs this placeholder.
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
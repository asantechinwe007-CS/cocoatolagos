import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";

import bcrypt from "bcrypt";
import pool from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 LIMIT 1",
            [credentials.email]
          );

          if (result.rows.length === 0) {
            return null;
          }

          const user = result.rows[0];

          if (user.status !== "active") {
            return null;
          }

          const validPassword = await bcrypt.compare(
            credentials.password as string,
            user.password_hash
          );

          if (!validPassword) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.full_name,
            email: user.email,
            role: user.role,
            status: user.status,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).role = (user as any).role;
        (token as any).status = (user as any).status;
      }

      return token;
    },

    async session({ session, token }) {
      (session.user as any).role = (token as any).role;
      (session.user as any).status = (token as any).status;

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
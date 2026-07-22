import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
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

        const result = await pool.query(
          "SELECT * FROM users WHERE email=$1 LIMIT 1",
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
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.status = (user as any).status;
      }

      return token;
    },

    async session({ session, token }) {
      (session.user as any).role = token.role;
(session.user as any).status = token.status;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
});
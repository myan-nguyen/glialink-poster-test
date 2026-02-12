import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Future-proofing notes:
// - Later, you’ll add adapter + DB (Prisma/Supabase/etc).
// - You can also extend session/jwt callbacks to include user profile fields.

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" }, // easy now; can change when you add DB adapter
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session, token }) {
      // Make user.id available later if you store it
      if (session.user) {
        // @ts-expect-error - add proper type extension later
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

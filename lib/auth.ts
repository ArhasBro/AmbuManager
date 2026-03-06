import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

type TokenExtras = {
  role?: Role;
  companyId?: string;
};

function isRole(v: unknown): v is Role {
  return typeof v === "string" && (Object.values(Role) as string[]).includes(v);
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(1),
        });

        const parsed = schema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            companyId: true,
          },
        });

        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
          role: user.role,
          companyId: user.companyId ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // 1) Au login (user présent) => hydrate le token
      if (user) {
        const u = user as unknown as { role?: unknown; companyId?: unknown };

        if (isRole(u.role)) token.role = u.role;
        if (isNonEmptyString(u.companyId)) token.companyId = u.companyId;

        return token;
      }

      // 2) Requêtes suivantes (user absent) => si companyId/role manquent, on recharge depuis DB
      const t = token as typeof token & TokenExtras;

      const hasCompanyId = isNonEmptyString(t.companyId);
      const hasRole = isRole(t.role);

      const userId = typeof token.sub === "string" ? token.sub : null;
      if (!userId) return token;

      if (!hasCompanyId || !hasRole) {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true, companyId: true },
        });

        if (dbUser) {
          if (!hasRole) t.role = dbUser.role;
          if (!hasCompanyId && isNonEmptyString(dbUser.companyId)) t.companyId = dbUser.companyId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const t = token as typeof token & TokenExtras;

        session.user.id = typeof token.sub === "string" ? token.sub : undefined;
        session.user.role = isRole(t.role) ? t.role : undefined;
        session.user.companyId = isNonEmptyString(t.companyId) ? t.companyId : undefined;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
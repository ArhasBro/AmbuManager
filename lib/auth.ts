import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { PlatformRole, Role } from "@prisma/client";

type TokenExtras = {
  role?: Role;
  platformRole?: PlatformRole;
  companyId?: string;
};

function isRole(v: unknown): v is Role {
  return typeof v === "string" && (Object.values(Role) as string[]).includes(v);
}

function isPlatformRole(v: unknown): v is PlatformRole {
  return typeof v === "string" && (Object.values(PlatformRole) as string[]).includes(v);
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
            platformRole: true,
            companyId: true,
            isActive: true,
          },
        });

        if (!user || !user.isActive) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
          role: user.role ?? undefined,
          platformRole: user.platformRole ?? undefined,
          companyId: user.companyId ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // 1) Au login (user présent) => hydrate le token
      if (user) {
        const u = user as unknown as { role?: unknown; platformRole?: unknown; companyId?: unknown };

        if (isRole(u.role)) token.role = u.role;
        else delete token.role;

        if (isPlatformRole(u.platformRole)) token.platformRole = u.platformRole;
        else delete token.platformRole;

        if (isNonEmptyString(u.companyId)) token.companyId = u.companyId;
        else delete token.companyId;

        return token;
      }

      // 2) Requêtes suivantes (user absent) => on recharge uniquement si le scope n'est pas déjà cohérent
      const t = token as typeof token & TokenExtras;

      const hasPlatformRole = isPlatformRole(t.platformRole);
      const hasCompanyId = isNonEmptyString(t.companyId);
      const hasRole = isRole(t.role);

      const userId = typeof token.sub === "string" ? token.sub : null;
      if (!userId) return token;

      const needsTenantHydration = !hasPlatformRole && (!hasCompanyId || !hasRole);
      const needsPlatformHydration = !hasPlatformRole && !hasRole && !hasCompanyId;

      if (needsTenantHydration || needsPlatformHydration) {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true, platformRole: true, companyId: true },
        });

        if (dbUser) {
          if (isRole(dbUser.role)) t.role = dbUser.role;
          else delete t.role;

          if (isPlatformRole(dbUser.platformRole)) t.platformRole = dbUser.platformRole;
          else delete t.platformRole;

          if (isNonEmptyString(dbUser.companyId)) t.companyId = dbUser.companyId;
          else delete t.companyId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const t = token as typeof token & TokenExtras;
        const platformRole = isPlatformRole(t.platformRole) ? t.platformRole : undefined;

        session.user.id = typeof token.sub === "string" ? token.sub : undefined;
        session.user.role = isRole(t.role) ? t.role : undefined;
        session.user.platformRole = platformRole;
        session.user.companyId = isNonEmptyString(t.companyId) ? t.companyId : undefined;
        session.user.isGlobalSupport = platformRole === PlatformRole.SUPPORT;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

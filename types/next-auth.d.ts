import "next-auth";
import "next-auth/jwt";
import type { PlatformRole, Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      role?: Role;
      platformRole?: PlatformRole;
      companyId?: string;
      isGlobalSupport?: boolean;
    };
  }

  interface User {
    id: string;
    role?: Role;
    platformRole?: PlatformRole;
    companyId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    platformRole?: PlatformRole;
    companyId?: string;
  }
}

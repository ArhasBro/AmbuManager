import { getServerSession } from "next-auth/next";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { forbidden, ok, serverError, unauthorized } from "@/lib/api/response";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.companyId) {
    return unauthorized();
  }

  if (session.user.role !== Role.ADMIN) {
    return forbidden();
  }

  try {
    const companies = await prisma.company.count();
    const users = await prisma.user.count();

    return ok({
      counts: { companies, users },
    });
  } catch (e) {
    return serverError(e);
  }
}

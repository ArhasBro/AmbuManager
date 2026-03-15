import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { updateCompanyProfileBodySchema } from "@/lib/validators/company-profile";

function canManageCompanyProfile(role?: string) {
  return role === "ADMIN" || role === "GERANT";
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;

  if (!userId || !companyId) return unauthorized();
  if (!canManageCompanyProfile(role)) return forbidden();

  const jsonBody: unknown = await req.json().catch(() => null);
  const parsed = updateCompanyProfileBodySchema.safeParse(jsonBody);
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  try {
    const company = await prisma.company.update({
      where: { id: companyId },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        managerNames: true,
        address: true,
        phone: true,
        siret: true,
        updatedAt: true,
      },
    });

    return ok({
      ...company,
      updatedAt: company.updatedAt.toISOString(),
    });
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    return serverError(mapped ?? getErrorMessage(e));
  }
}

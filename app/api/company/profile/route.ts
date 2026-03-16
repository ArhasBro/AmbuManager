import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { updateCompanyProfileBodySchema } from "@/lib/validators/company-profile";

type CompanyProfileRow = {
  id: string;
  name: string;
  managerNames: string | null;
  address: string | null;
  phone: string | null;
  siret: string | null;
  updatedAt: Date | string;
};

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

function toIsoString(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
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
    const rows = await prisma.$queryRaw<CompanyProfileRow[]>`
      UPDATE "Company"
      SET
        "name" = ${parsed.data.name},
        "managerNames" = ${parsed.data.managerNames},
        "address" = ${parsed.data.address},
        "phone" = ${parsed.data.phone},
        "siret" = ${parsed.data.siret},
        "updatedAt" = NOW()
      WHERE "id" = ${companyId}
      RETURNING
        "id",
        "name",
        "managerNames",
        "address",
        "phone",
        "siret",
        "updatedAt"
    `;

    const company = rows[0];
    if (!company) return notFound();

    return ok({
      id: company.id,
      name: company.name,
      managerNames: company.managerNames ?? "",
      address: company.address ?? "",
      phone: company.phone ?? "",
      siret: company.siret ?? "",
      updatedAt: toIsoString(company.updatedAt),
    });
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    return serverError(mapped ?? getErrorMessage(e));
  }
}

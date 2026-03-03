import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ok, badRequest, unauthorized, forbidden, serverError } from "@/lib/api/response";
import { requireRole } from "@/lib/rbac";
import { serializeDates } from "@/lib/serializers";
import { z } from "zod";

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
});

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) return unauthorized();

  // ✅ RBAC (Phase actuelle) : ADMIN + GERANT uniquement
  if (!requireRole(session.user.role, ["ADMIN", "GERANT"])) return forbidden();

  const companyId = session.user.companyId;

  const url = new URL(req.url);
  const parsed = listQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) return badRequest("Invalid query", parsed.error.flatten());

  const { limit } = parsed.data;

  try {
    const users = await prisma.user.findMany({
      where: { companyId },
      orderBy: { name: "asc" },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ok(users.map(serializeDates));
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}
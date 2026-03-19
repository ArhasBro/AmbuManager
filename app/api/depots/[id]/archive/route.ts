import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { requireRole } from "@/lib/rbac";
import { serializeDates } from "@/lib/serializers";
import { archiveDepot } from "@/lib/services/depots/archive-depot";

const ALLOWED_ROLES = ["ADMIN", "GERANT"];

const paramsSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!requireRole(role, ALLOWED_ROLES)) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  try {
    const depot = await archiveDepot({
      id: parsedParams.data.id,
      companyId,
      actorUserId,
      actorPlatformRole: platformRole,
    });

    if (!depot) return notFound();

    return ok(serializeDates(depot));
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();

    return serverError(mapped ?? getErrorMessage(e));
  }
}

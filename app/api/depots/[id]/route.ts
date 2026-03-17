import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { requireRole } from "@/lib/rbac";
import { serializeDates } from "@/lib/serializers";
import { updateDepot } from "@/lib/services/depots/update-depot";
import { updateDepotBodySchema } from "@/lib/validators/depot";

const ALLOWED_ROLES = ["ADMIN", "GERANT"];

const paramsSchema = z.object({
  id: z.string().uuid(),
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

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;

  if (!companyId) return unauthorized();
  if (!requireRole(role, ALLOWED_ROLES)) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  const jsonBody: unknown = await req.json().catch(() => null);
  const parsedBody = updateDepotBodySchema.safeParse(jsonBody);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const depot = await updateDepot({
      id: parsedParams.data.id,
      companyId,
      name: parsedBody.data.name,
      address: parsedBody.data.address,
    });

    if (!depot) return notFound();

    return ok(serializeDates(depot));
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un dépôt portant ce nom existe déjà dans cette société." });
    }

    return serverError(mapped ?? getErrorMessage(e));
  }
}

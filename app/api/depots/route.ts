import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { badRequest, conflict, forbidden, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { canManageDepots } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { createDepot } from "@/lib/services/depots/create-depot";
import { createDepotBodySchema } from "@/lib/validators/depot";

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageDepots(actorUserId, role, platformRole))) return forbidden();

  const jsonBody: unknown = await req.json().catch(() => null);
  const parsed = createDepotBodySchema.safeParse(jsonBody);
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  try {
    const depot = await createDepot({
      companyId,
      name: parsed.data.name,
      address: parsed.data.address,
      actorUserId,
      actorPlatformRole: platformRole,
    });

    return ok(serializeDates(depot), 201);
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un dépôt portant ce nom existe déjà dans cette société." });
    }

    return serverError(mapped ?? getErrorMessage(e));
  }
}

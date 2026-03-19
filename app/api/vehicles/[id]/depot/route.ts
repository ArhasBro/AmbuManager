import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { canManageVehicles } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { assignVehicleDepot } from "@/lib/services/vehicles/assign-vehicle-depot";
import { assignVehicleDepotBodySchema } from "@/lib/validators/vehicle";

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

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageVehicles(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsedBody = assignVehicleDepotBodySchema.safeParse(body);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const result = await assignVehicleDepot({
      vehicleId: parsedParams.data.id,
      companyId,
      depotId: parsedBody.data.depotId,
      actorUserId,
      actorPlatformRole: platformRole,
    });

    if (result.status === "VEHICLE_NOT_FOUND") return notFound();
    if (result.status === "DEPOT_NOT_FOUND") return notFound();

    return ok(serializeDates(result.vehicle));
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { deleteUserAbsence, updateUserAbsence } from "@/lib/services/users/user-absence";
import { updateUserAbsenceBodySchema } from "@/lib/validators/user-absence";

const paramsSchema = z
  .object({
    id: z.string().uuid(),
    absenceId: z.string().uuid(),
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

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string; absenceId: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  const jsonBody: unknown = await req.json().catch(() => null);
  const parsedBody = updateUserAbsenceBodySchema.safeParse(jsonBody);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const result = await updateUserAbsence({
      companyId,
      userId: parsedParams.data.id,
      absenceId: parsedParams.data.absenceId,
      actorUserId,
      reason: parsedBody.data.reason,
      startAt: parsedBody.data.startAt,
      endAt: parsedBody.data.endAt,
    });

    if (result.status === "USER_NOT_FOUND" || result.status === "ABSENCE_NOT_FOUND") return notFound();
    if (result.status === "INVALID_INTERVAL") {
      return badRequest("VALIDATION_ERROR", { message: "L'intervalle d'indisponibilité est invalide." });
    }
    if (result.status === "OVERLAP") {
      return conflict("ABSENCE_OVERLAP", {
        message: "Une indisponibilité se chevauche déjà sur cet intervalle.",
        conflict: serializeDates(result.conflict),
      });
    }

    return ok(serializeDates(result.absence));
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string; absenceId: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  try {
    const result = await deleteUserAbsence({
      companyId,
      userId: parsedParams.data.id,
      absenceId: parsedParams.data.absenceId,
      actorUserId,
    });

    if (result.status === "USER_NOT_FOUND" || result.status === "ABSENCE_NOT_FOUND") return notFound();

    return ok({
      deleted: true,
      absence: serializeDates(result.absence),
    });
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

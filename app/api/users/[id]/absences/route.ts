import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { createUserAbsence, listUserAbsences } from "@/lib/services/users/user-absence";
import { createUserAbsenceBodySchema, listUserAbsencesQuerySchema } from "@/lib/validators/user-absence";

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

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
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

  const url = new URL(req.url);
  const parsedQuery = listUserAbsencesQuerySchema.safeParse({
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });
  if (!parsedQuery.success) return badRequest("VALIDATION_ERROR", parsedQuery.error.flatten());

  try {
    const result = await listUserAbsences({
      companyId,
      userId: parsedParams.data.id,
      from: parsedQuery.data.from,
      to: parsedQuery.data.to,
      limit: parsedQuery.data.limit,
    });

    if (result.status === "USER_NOT_FOUND") return notFound();

    return ok({
      items: result.items.map(serializeDates),
      filters: {
        from: parsedQuery.data.from ? parsedQuery.data.from.toISOString() : null,
        to: parsedQuery.data.to ? parsedQuery.data.to.toISOString() : null,
        limit: parsedQuery.data.limit,
      },
    });
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
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
  const parsedBody = createUserAbsenceBodySchema.safeParse(jsonBody);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const result = await createUserAbsence({
      companyId,
      userId: parsedParams.data.id,
      reason: parsedBody.data.reason,
      startAt: parsedBody.data.startAt,
      endAt: parsedBody.data.endAt,
    });

    if (result.status === "USER_NOT_FOUND") return notFound();
    if (result.status === "INVALID_INTERVAL") {
      return badRequest("VALIDATION_ERROR", { message: "L'intervalle d'indisponibilité est invalide." });
    }
    if (result.status === "OVERLAP") {
      return conflict("ABSENCE_OVERLAP", {
        message: "Une indisponibilité se chevauche déjà sur cet intervalle.",
        conflict: serializeDates(result.conflict),
      });
    }

    return ok(serializeDates(result.absence), 201);
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { canManageTemplates } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { archiveTemplate } from "@/lib/services/templates/archive-template";

const paramsSchema = z
  .object({
    id: z.string().trim().min(1, "id required"),
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
  if (!(await canManageTemplates(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  try {
    const template = await archiveTemplate({
      id: parsedParams.data.id,
      companyId,
    });

    if (!template) return notFound();

    return ok(serializeDates(template));
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

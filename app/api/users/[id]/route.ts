import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";
import { updateUserBodySchema } from "@/lib/validators/user";

const paramsSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  companyId: true,
  depotId: true,
  depot: {
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} as const;

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
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsedBody = updateUserBodySchema.safeParse(body);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: parsedParams.data.id,
        companyId,
        isActive: true,
        platformRole: null,
        role: { not: null },
      },
      select: {
        id: true,
      },
    });

    if (!existingUser) return notFound();

    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        ...(parsedBody.data.name !== undefined ? { name: parsedBody.data.name } : {}),
        ...(parsedBody.data.email !== undefined ? { email: parsedBody.data.email } : {}),
        ...(parsedBody.data.role !== undefined ? { role: parsedBody.data.role } : {}),
      },
      select: userSelect,
    });

    return ok(serializeDates(updatedUser));
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un utilisateur avec cet email existe déjà." });
    }

    return serverError(mapped ?? getErrorMessage(e));
  }
}

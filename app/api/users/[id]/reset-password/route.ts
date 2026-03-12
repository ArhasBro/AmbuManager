import bcrypt from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { requireRole } from "@/lib/rbac";
import { serializeDates } from "@/lib/serializers";

const resetPasswordBodySchema = z
  .object({
    newPassword: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
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

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;

  if (!actorUserId || !companyId) return unauthorized();
  if (!requireRole(role, ["ADMIN", "GERANT"])) return forbidden();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON");
  }

  const parsed = resetPasswordBodySchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid body", parsed.error.flatten());

  const { id: targetUserId } = await ctx.params;
  if (!targetUserId) return badRequest("Missing user id");
  if (targetUserId === actorUserId) {
    return badRequest("Self password change is out of scope for this route");
  }

  try {
    const targetUser = await prisma.user.findFirst({
      where: {
        id: targetUserId,
        companyId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!targetUser) return notFound();

    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { id: targetUser.id },
      data: { password: hashedPassword },
      select: {
        id: true,
        updatedAt: true,
      },
    });

    return ok(
      serializeDates({
        id: updatedUser.id,
        updatedAt: updatedUser.updatedAt,
      })
    );
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

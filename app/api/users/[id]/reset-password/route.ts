import bcrypt from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { canManageUsers } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { writePersonalDataAudit } from "@/lib/services/audit/personal-data-audit";
import { passwordPolicySchema } from "@/lib/security/password-policy";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

const resetPasswordBodySchema = z
  .object({
    newPassword: passwordPolicySchema,
    confirmPassword: passwordPolicySchema,
  })
  .strict()
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
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsed = resetPasswordBodySchema.safeParse(body);
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const { id: targetUserId } = await ctx.params;
  if (!targetUserId) return badRequest("BAD_REQUEST", { message: "Missing user id" });
  if (targetUserId === actorUserId) {
    return badRequest("BAD_REQUEST", { message: "Self password change is out of scope for this route" });
  }

  try {
    const targetUser = await prisma.user.findFirst({
      where: {
        id: targetUserId,
        companyId,
        isActive: true,
        platformRole: null,
        role: { not: null },
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

    const updatedUser = await prisma.$transaction(async (tx) => {
      await tx.user.updateMany({
        where: {
          id: targetUser.id,
          companyId,
          isActive: true,
          platformRole: null,
          role: { not: null },
        },
        data: { password: hashedPassword },
      });

      const user = await tx.user.findFirst({
        where: {
          id: targetUser.id,
          companyId,
          isActive: true,
          platformRole: null,
          role: { not: null },
        },
        select: {
          id: true,
          updatedAt: true,
        },
      });

      if (!user) return null;

      await writePersonalDataAudit(tx, {
        companyId,
        actorUserId,
        action: "USER_RESET_PASSWORD",
        entityType: "USER",
        entityId: targetUser.id,
        summary: `Reset mot de passe utilisateur ${targetUser.email}`,
        changedFields: ["password"],
        previous: {
          password: "REDACTED",
        },
        next: {
          password: "REDACTED",
        },
        details: {
          targetType: "user",
          targetEmail: targetUser.email,
          targetName: targetUser.name,
          targetRole: targetUser.role,
        },
      });

      await traceSupportAction(tx, {
        companyId,
        actorUserId,
        actorPlatformRole: platformRole,
        action: "SUPPORT_RESET_USER_PASSWORD",
        entityType: "USER",
        entityId: targetUser.id,
        summary: `Support reset mot de passe utilisateur ${targetUser.email}`,
        payload: {
          module: "users",
          changedFields: ["password"],
          previous: {
            password: "REDACTED",
          },
          next: {
            password: "REDACTED",
          },
          details: {
            targetType: "user",
            targetEmail: targetUser.email,
            targetName: targetUser.name,
            targetRole: targetUser.role,
          },
        },
      });

      return user;
    });

    if (!updatedUser) return notFound();

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

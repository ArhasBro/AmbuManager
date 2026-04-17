import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, forbidden, notFound, unauthorized } from "@/lib/api/response";
import { authOptions } from "@/lib/auth";
import { canExportPlanning, canViewGlobalPlanning, canViewSelfPlanning } from "@/lib/permissions";
import { buildPlanningCsvBuffer, buildPlanningPdfBuffer, buildPlanningXlsxBuffer, listPlanningExportRows } from "@/lib/planning/export";
import { prisma } from "@/lib/prisma";

const querySchema = z.object({
  format: z.enum(["csv", "xlsx", "pdf"]),
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  userId: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional().default(500),
});

function buildFileName(format: "csv" | "xlsx" | "pdf", scope: { day?: string; weekStart?: string; month?: string }) {
  const suffix = scope.day ?? scope.weekStart ?? scope.month ?? "global";
  return `planning-${suffix}.${format}`;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const actorUserId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !actorUserId) return unauthorized();

  const [canViewSelf, canViewGlobal, canExport] = await Promise.all([
    canViewSelfPlanning(actorUserId, role, platformRole),
    canViewGlobalPlanning(actorUserId, role, platformRole),
    canExportPlanning(actorUserId, role, platformRole),
  ]);

  if (!canViewSelf && !canViewGlobal) return forbidden();
  if (!canExport) return forbidden();

  const url = new URL(req.url);
  const parsed = querySchema.safeParse({
    format: url.searchParams.get("format") ?? undefined,
    day: url.searchParams.get("day") ?? undefined,
    weekStart: url.searchParams.get("weekStart") ?? undefined,
    month: url.searchParams.get("month") ?? undefined,
    userId: url.searchParams.get("userId") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const { format, day, weekStart, month, userId, limit } = parsed.data;
  const scopes = [day, weekStart, month].filter(Boolean);
  if (scopes.length > 1) {
    return badRequest("VALIDATION_ERROR", { message: "Utiliser un seul scope : day, weekStart ou month." });
  }

  if (!canViewGlobal && userId && userId !== actorUserId) return forbidden();
  const targetUserId = canViewGlobal ? userId ?? null : actorUserId;

  if (targetUserId) {
    const targetUser = await prisma.user.findFirst({ where: { id: targetUserId, companyId }, select: { id: true } });
    if (!targetUser) return notFound();
  }

  const shifts = await listPlanningExportRows({ companyId, userId: targetUserId, day, weekStart, month, limit });
  const fileName = buildFileName(format, { day, weekStart, month });

  const buffer =
    format === "csv"
      ? buildPlanningCsvBuffer(shifts)
      : format === "xlsx"
        ? buildPlanningXlsxBuffer(shifts)
        : buildPlanningPdfBuffer(shifts, `Planning export — ${day ?? weekStart ?? month ?? "global"}`);

  const contentType =
    format === "csv"
      ? "text/csv; charset=utf-8"
      : format === "xlsx"
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : "application/pdf";

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}

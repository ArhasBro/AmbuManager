import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canEditPlanning } from "@/lib/permissions";
import { assignDraftShift } from "@/lib/services/planning/assign-draftshift";
import { assignShift } from "@/lib/services/planning/assign-shift";
import { resolveTemplateMinStaffCount } from "@/lib/templates/template-rules";
import { json, unauthorized, forbidden, notFound } from "@/lib/api/response";
import { planningAssignInputSchema } from "@/lib/validators/planning-assign";

type Category = "VSL" | "TAXI" | "AMBULANCE" | "GARDE" | string;

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  // 1) Session
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const companyId = session?.user?.companyId;
  const actorUserId = session?.user?.id;
  const actorPlatformRole = session?.user?.platformRole;

  if (!session || !userRole || !companyId || !actorUserId) {
    return unauthorized();
  }

  // 2) RBAC
  if (!(await canEditPlanning(actorUserId, userRole, actorPlatformRole))) {
    return forbidden();
  }

  // 3) Params
  const { id } = await ctx.params;
  if (!id) return json({ ok: false, error: "INVALID_PARAMS" }, 400);

  // 4) Body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const parsed = planningAssignInputSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() }, 400);
  }

  const { userId, user2Id, vehicleId, depotId } = parsed.data;

  // 5) DraftShift (priorité UI)
  const draft = await prisma.draftShift.findFirst({
    where: { id, companyId },
    select: {
      id: true,
      startAt: true,
      endAt: true,
      userId: true,
      user2Id: true,
      vehicleId: true,
      run: { select: { status: true } },
      template: { select: { category: true, minStaffCount: true } },
    },
  });

  // 6) Sinon Shift (publié)
  const shift = !draft
    ? await prisma.shift.findFirst({
        where: { id, companyId },
        select: {
          id: true,
          startAt: true,
          endAt: true,
          userId: true,
          user2Id: true,
          vehicleId: true,
          depotId: true,
          template: { select: { category: true, minStaffCount: true } },
        },
      })
    : null;

  const current = draft ?? shift;
  if (!current) return notFound();

  if (draft && depotId !== undefined) {
    return json({ ok: false, error: "DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT" }, 400);
  }

  const category = (current.template?.category ?? null) as Category | null;
  const slots = resolveTemplateMinStaffCount(current.template?.minStaffCount ?? null, category);

  // user2 interdit si slots=1
  if (slots === 1 && user2Id !== undefined && user2Id !== null) {
    return json({ ok: false, error: "USER2_NOT_ALLOWED", details: { category } }, 400);
  }

  // Etat après patch (valeurs finales)
  const nextUser1 = userId !== undefined ? userId : current.userId ?? null;
  const nextUser2 = user2Id !== undefined ? user2Id : current.user2Id ?? null;

  if (slots === 2 && nextUser1 && nextUser2 && nextUser1 === nextUser2) {
    return json({ ok: false, error: "SAME_USER_BOTH_SLOTS" }, 400);
  }

  // 7) Ownership checks (si UUID fourni)
  const assertUserInCompany = async (uid: string) => {
    const u = await prisma.user.findFirst({ where: { id: uid, companyId }, select: { id: true } });
    return !!u;
  };

  const assertVehicleInCompany = async (vid: string) => {
    const v = await prisma.vehicle.findFirst({ where: { id: vid, companyId }, select: { id: true } });
    return !!v;
  };

  const assertActiveDepotInCompany = async (did: string) => {
    const depot = await prisma.depot.findFirst({
      where: { id: did, companyId, isActive: true },
      select: { id: true },
    });
    return !!depot;
  };

  if (userId !== undefined && userId !== null) {
    const ok = await assertUserInCompany(userId);
    if (!ok) return json({ ok: false, error: "INVALID_USER" }, 400);
  }

  if (user2Id !== undefined && user2Id !== null) {
    const ok = await assertUserInCompany(user2Id);
    if (!ok) return json({ ok: false, error: "INVALID_USER" }, 400);
  }

  if (vehicleId !== undefined && vehicleId !== null) {
    const ok = await assertVehicleInCompany(vehicleId);
    if (!ok) return json({ ok: false, error: "INVALID_VEHICLE" }, 400);
  }

  if (depotId !== undefined && depotId !== null) {
    const ok = await assertActiveDepotInCompany(depotId);
    if (!ok) return json({ ok: false, error: "INVALID_DEPOT" }, 400);
  }

  // 8) DraftShift : logique métier via Service
  if (draft) {
    const nextVehicle = vehicleId !== undefined ? vehicleId : current.vehicleId ?? null;

    const result = await assignDraftShift({
      companyId,
      draftShiftId: draft.id,
      actorUserId,
      userId: nextUser1,
      user2Id: nextUser2,
      vehicleId: nextVehicle,
    });

    if (!result.ok) {
      if (result.error.code === "NOT_FOUND") return notFound();
      if (result.error.code === "FORBIDDEN_COMPANY") return forbidden();

      if (
        result.error.code === "INVALID_SLOT_COUNT" ||
        result.error.code === "DUPLICATE_USER_IN_SAME_SHIFT" ||
        result.error.code === "VALIDATION_ERROR" ||
        result.error.code === "TEMPLATE_ROLE_MISMATCH" ||
        result.error.code === "TEMPLATE_VEHICLE_TYPE_MISMATCH"
      ) {
        return json({ ok: false, error: result.error.code, details: result.error.meta ?? null }, 400);
      }

      if (result.error.code === "RUN_NOT_DRAFT") return json({ ok: false, error: "RUN_NOT_DRAFT" }, 409);

      if (result.error.code === "RULE_CONFIG_ERROR") {
        return json({ ok: false, error: "RULE_CONFIG_ERROR", details: { message: result.error.message, ...(result.error.meta ?? {}) } }, 400);
      }

      if (
        result.error.code === "USER_ABSENCE_CONFLICT" ||
        result.error.code === "USER_OVERLAP_CONFLICT" ||
        result.error.code === "VEHICLE_OVERLAP_CONFLICT" ||
        result.error.code === "RULE_BLOCKED"
      ) {
        return json({ ok: false, error: result.error.code, details: result.error.meta ?? null }, 409);
      }

      return json({ ok: false, error: "INTERNAL_ERROR" }, 500);
    }

    // Re-fetch pour réponse UI identique
    const updated = await prisma.draftShift.findFirst({
      where: { id: draft.id, companyId },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        user2: { select: { id: true, name: true, email: true, role: true } },
        vehicle: { select: { id: true, immatriculation: true, type: true, status: true } },
        template: { select: { id: true, name: true, category: true, minStaffCount: true, requiredVehicleType: true, color: true } },
        run: { select: { id: true, status: true, scope: true, day: true, weekStart: true, createdAt: true } },
      },
    });

    if (!updated) return notFound();

    return json({
      ok: true,
      data: {
        kind: "DRAFT",
        issues: result.data.issues,
        item: {
          ...updated,
          date: updated.date.toISOString(),
          startAt: updated.startAt.toISOString(),
          endAt: updated.endAt.toISOString(),
          createdAt: updated.createdAt.toISOString(),
          run: updated.run
            ? {
                ...updated.run,
                day: updated.run.day ? updated.run.day.toISOString() : null,
                weekStart: updated.run.weekStart ? updated.run.weekStart.toISOString() : null,
                createdAt: updated.run.createdAt.toISOString(),
              }
            : null,
        },
      },
    }, 200);
  }

  // 9) Shift (planning publié) — logique métier via Service
  if (!shift) return notFound();

  const nextVehicle = vehicleId !== undefined ? vehicleId : current.vehicleId ?? null;
  const nextDepot = depotId !== undefined ? depotId : shift.depotId ?? null;

  const result = await assignShift({
    companyId,
    shiftId: shift.id,
    actorUserId,
    userId: nextUser1,
    user2Id: nextUser2,
    vehicleId: nextVehicle,
    depotId: nextDepot,
  });

  if (!result.ok) {
    if (result.error.code === "NOT_FOUND") return notFound();
    if (result.error.code === "FORBIDDEN_COMPANY") return forbidden();

    if (
      result.error.code === "INVALID_SLOT_COUNT" ||
      result.error.code === "DUPLICATE_USER_IN_SAME_SHIFT" ||
      result.error.code === "VALIDATION_ERROR" ||
      result.error.code === "TEMPLATE_ROLE_MISMATCH" ||
      result.error.code === "TEMPLATE_VEHICLE_TYPE_MISMATCH"
    ) {
      return json({ ok: false, error: result.error.code, details: result.error.meta ?? null }, 400);
    }

    if (result.error.code === "RULE_CONFIG_ERROR") {
      return json({ ok: false, error: "RULE_CONFIG_ERROR", details: { message: result.error.message, ...(result.error.meta ?? {}) } }, 400);
    }

    if (
      result.error.code === "USER_ABSENCE_CONFLICT" ||
      result.error.code === "USER_OVERLAP_CONFLICT" ||
      result.error.code === "VEHICLE_OVERLAP_CONFLICT" ||
      result.error.code === "RULE_BLOCKED"
    ) {
      return json({ ok: false, error: result.error.code, details: result.error.meta ?? null }, 409);
    }

    return json({ ok: false, error: "INTERNAL_ERROR" }, 500);
  }

  // Re-fetch pour réponse UI identique
  const updatedShift = await prisma.shift.findFirst({
    where: { id: shift.id, companyId },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
      user2: { select: { id: true, name: true, email: true, role: true } },
      vehicle: { select: { id: true, immatriculation: true, type: true, status: true } },
      depot: { select: { id: true, name: true, isActive: true } },
      template: { select: { id: true, name: true, category: true, minStaffCount: true, requiredVehicleType: true, color: true } },
      run: { select: { id: true, status: true, scope: true, day: true, weekStart: true, createdAt: true } },
    },
  });

  if (!updatedShift) return notFound();

  return json({
    ok: true,
    data: {
      kind: "SHIFT",
      issues: result.data.issues,
      item: {
        ...updatedShift,
        date: updatedShift.date.toISOString(),
        startAt: updatedShift.startAt.toISOString(),
        endAt: updatedShift.endAt.toISOString(),
        createdAt: updatedShift.createdAt.toISOString(),
        updatedAt: updatedShift.updatedAt.toISOString(),
        run: updatedShift.run
          ? {
              ...updatedShift.run,
              day: updatedShift.run.day ? updatedShift.run.day.toISOString() : null,
              weekStart: updatedShift.run.weekStart ? updatedShift.run.weekStart.toISOString() : null,
              createdAt: updatedShift.run.createdAt.toISOString(),
            }
          : null,
      },
    },
  });
}
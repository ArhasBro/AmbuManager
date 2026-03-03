import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { assignDraftShift } from "@/lib/services/planning/assign-draftshift";
import { assignShift } from "@/lib/services/planning/assign-shift";

const BodySchema = z
  .object({
    userId: z.string().uuid().nullable().optional(),
    user2Id: z.string().uuid().nullable().optional(),
    vehicleId: z.string().uuid().nullable().optional(),
  })
  .refine((v) => v.userId !== undefined || v.user2Id !== undefined || v.vehicleId !== undefined, {
    message: "At least one of userId, user2Id or vehicleId must be provided",
  });

function json(status: number, payload: unknown) {
  return NextResponse.json(payload, { status });
}

type Category = "VSL" | "TAXI" | "AMBULANCE" | "GARDE" | string;

function allowedUserSlots(category: Category | null | undefined): 1 | 2 {
  return category === "AMBULANCE" || category === "GARDE" ? 2 : 1;
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  // 1) Session
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const companyId = session?.user?.companyId;
  const actorUserId = session?.user?.id;

  if (!session || !userRole || !companyId || !actorUserId) {
    return json(401, { ok: false, error: "UNAUTHORIZED" });
  }

  // 2) RBAC
  if (!requireRole(userRole, ["ADMIN", "GERANT"])) {
    return json(403, { ok: false, error: "FORBIDDEN" });
  }

  // 3) Params
  const { id } = await ctx.params;
  if (!id) return json(400, { ok: false, error: "INVALID_PARAMS" });

  // 4) Body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: "INVALID_BODY" });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return json(400, { ok: false, error: "INVALID_BODY", details: parsed.error.flatten() });
  }

  const { userId, user2Id, vehicleId } = parsed.data;

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
      template: { select: { category: true } },
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
          template: { select: { category: true } },
        },
      })
    : null;

  const current = draft ?? shift;
  if (!current) return json(404, { ok: false, error: "NOT_FOUND" });

  const category = (current.template?.category ?? null) as Category | null;
  const slots = allowedUserSlots(category);

  // user2 interdit si slots=1
  if (slots === 1 && user2Id !== undefined && user2Id !== null) {
    return json(400, { ok: false, error: "USER2_NOT_ALLOWED", details: { category } });
  }

  // Etat après patch (valeurs finales)
  const nextUser1 = userId !== undefined ? userId : current.userId ?? null;
  const nextUser2 = user2Id !== undefined ? user2Id : current.user2Id ?? null;

  if (slots === 2 && nextUser1 && nextUser2 && nextUser1 === nextUser2) {
    return json(400, { ok: false, error: "SAME_USER_BOTH_SLOTS" });
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

  if (userId !== undefined && userId !== null) {
    const ok = await assertUserInCompany(userId);
    if (!ok) return json(400, { ok: false, error: "INVALID_USER" });
  }

  if (user2Id !== undefined && user2Id !== null) {
    const ok = await assertUserInCompany(user2Id);
    if (!ok) return json(400, { ok: false, error: "INVALID_USER" });
  }

  if (vehicleId !== undefined && vehicleId !== null) {
    const ok = await assertVehicleInCompany(vehicleId);
    if (!ok) return json(400, { ok: false, error: "INVALID_VEHICLE" });
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
      if (result.error.code === "NOT_FOUND") return json(404, { ok: false, error: "NOT_FOUND" });
      if (result.error.code === "FORBIDDEN_COMPANY") return json(403, { ok: false, error: "FORBIDDEN" });

      if (
        result.error.code === "INVALID_SLOT_COUNT" ||
        result.error.code === "DUPLICATE_USER_IN_SAME_SHIFT" ||
        result.error.code === "VALIDATION_ERROR"
      ) {
        return json(400, { ok: false, error: result.error.code, details: result.error.meta ?? null });
      }

      if (result.error.code === "RUN_NOT_DRAFT") return json(409, { ok: false, error: "RUN_NOT_DRAFT" });

      if (
        result.error.code === "USER_OVERLAP_CONFLICT" ||
        result.error.code === "VEHICLE_OVERLAP_CONFLICT" ||
        result.error.code === "RULE_BLOCKED"
      ) {
        return json(409, { ok: false, error: result.error.code, details: result.error.meta ?? null });
      }

      return json(500, { ok: false, error: "INTERNAL_ERROR" });
    }

    // Re-fetch pour réponse UI identique
    const updated = await prisma.draftShift.findFirst({
      where: { id: draft.id, companyId },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        user2: { select: { id: true, name: true, email: true, role: true } },
        vehicle: { select: { id: true, immatriculation: true, type: true, status: true } },
        template: { select: { id: true, name: true, category: true } },
        run: { select: { id: true, status: true, scope: true, day: true, weekStart: true, createdAt: true } },
      },
    });

    if (!updated) return json(404, { ok: false, error: "NOT_FOUND" });

    return json(200, {
      ok: true,
      data: {
        kind: "DRAFT",
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
    });
  }

  // 9) Shift (planning publié) — logique métier via Service
  if (!shift) return json(404, { ok: false, error: "NOT_FOUND" });

  const nextVehicle = vehicleId !== undefined ? vehicleId : current.vehicleId ?? null;

  const result = await assignShift({
    companyId,
    shiftId: shift.id,
    actorUserId,
    userId: nextUser1,
    user2Id: nextUser2,
    vehicleId: nextVehicle,
  });

  if (!result.ok) {
    if (result.error.code === "NOT_FOUND") return json(404, { ok: false, error: "NOT_FOUND" });
    if (result.error.code === "FORBIDDEN_COMPANY") return json(403, { ok: false, error: "FORBIDDEN" });

    if (
      result.error.code === "INVALID_SLOT_COUNT" ||
      result.error.code === "DUPLICATE_USER_IN_SAME_SHIFT" ||
      result.error.code === "VALIDATION_ERROR"
    ) {
      return json(400, { ok: false, error: result.error.code, details: result.error.meta ?? null });
    }

    if (
      result.error.code === "USER_OVERLAP_CONFLICT" ||
      result.error.code === "VEHICLE_OVERLAP_CONFLICT" ||
      result.error.code === "RULE_BLOCKED"
    ) {
      return json(409, { ok: false, error: result.error.code, details: result.error.meta ?? null });
    }

    return json(500, { ok: false, error: "INTERNAL_ERROR" });
  }

  // Re-fetch pour réponse UI identique
  const updatedShift = await prisma.shift.findFirst({
    where: { id: shift.id, companyId },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
      user2: { select: { id: true, name: true, email: true, role: true } },
      vehicle: { select: { id: true, immatriculation: true, type: true, status: true } },
      template: { select: { id: true, name: true, category: true } },
      run: { select: { id: true, status: true, scope: true, day: true, weekStart: true, createdAt: true } },
    },
  });

  if (!updatedShift) return json(404, { ok: false, error: "NOT_FOUND" });

  return json(200, {
    ok: true,
    data: {
      kind: "SHIFT",
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
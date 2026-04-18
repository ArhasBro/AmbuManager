import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ok, badRequest, unauthorized, forbidden, conflict, serverError } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { createVehicleBodySchema } from "@/lib/validators/vehicle";
import { serializeDates } from "@/lib/serializers";
import { canEditPlanning, canManageVehicles } from "@/lib/permissions";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";
import { z } from "zod";

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
});

const vehicleSelect = {
  id: true,
  immatriculation: true,
  type: true,
  status: true,
  depotId: true,
  insuranceExpiresAt: true,
  technicalInspectionExpiresAt: true,
  registrationDocumentPresent: true,
  sanitaryApprovalExpiresAt: true,
  createdAt: true,
  updatedAt: true,
  depot: {
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  },
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

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) return unauthorized();

  const canListVehicles =
    (await canManageVehicles(userId, session.user.role, platformRole)) ||
    (await canEditPlanning(userId, session.user.role, platformRole));

  if (!canListVehicles) return forbidden();

  const url = new URL(req.url);
  const parsed = listQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const { limit } = parsed.data;

  const vehicles = await prisma.vehicle.findMany({
    where: { companyId, isActive: true },
    orderBy: { immatriculation: "asc" },
    take: limit,
    select: vehicleSelect,
  });

  return ok(vehicles.map(serializeDates));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (session.user.role !== "ADMIN") return forbidden();

  const jsonBody: unknown = await req.json().catch(() => null);
  const parsed = createVehicleBodySchema.safeParse(jsonBody);
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const {
    immatriculation,
    type,
    status,
    insuranceExpiresAt,
    technicalInspectionExpiresAt,
    registrationDocumentPresent,
    sanitaryApprovalExpiresAt,
  } = parsed.data;

  try {
    const vehicle = await prisma.$transaction(async (tx) => {
      const createdVehicle = await tx.vehicle.create({
        data: {
          companyId,
          immatriculation,
          type,
          status,
          insuranceExpiresAt: insuranceExpiresAt ?? null,
          technicalInspectionExpiresAt: technicalInspectionExpiresAt ?? null,
          registrationDocumentPresent: registrationDocumentPresent ?? false,
          sanitaryApprovalExpiresAt: sanitaryApprovalExpiresAt ?? null,
        },
        select: vehicleSelect,
      });

      await traceSupportAction(tx, {
        companyId,
        actorUserId,
        actorPlatformRole: platformRole,
        action: "SUPPORT_CREATE_VEHICLE",
        entityType: "VEHICLE",
        entityId: createdVehicle.id,
        summary: `Support création véhicule ${createdVehicle.immatriculation}`,
        payload: {
          module: "vehicles",
          changedFields: [
            "immatriculation",
            "type",
            "status",
            "insuranceExpiresAt",
            "technicalInspectionExpiresAt",
            "registrationDocumentPresent",
            "sanitaryApprovalExpiresAt",
          ],
          previous: null,
          next: {
            immatriculation: createdVehicle.immatriculation,
            type: createdVehicle.type,
            status: createdVehicle.status,
            insuranceExpiresAt: createdVehicle.insuranceExpiresAt,
            technicalInspectionExpiresAt: createdVehicle.technicalInspectionExpiresAt,
            registrationDocumentPresent: createdVehicle.registrationDocumentPresent,
            sanitaryApprovalExpiresAt: createdVehicle.sanitaryApprovalExpiresAt,
          },
          details: {
            targetType: "vehicle",
          },
        },
      });

      return createdVehicle;
    });

    return ok(serializeDates(vehicle), 201);
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Véhicule déjà existant" });
    }
    return serverError(mapped ?? getErrorMessage(e));
  }
}


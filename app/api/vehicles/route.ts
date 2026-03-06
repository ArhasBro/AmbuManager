import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ok, badRequest, unauthorized, forbidden, notFound, conflict, serverError } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { createVehicleBodySchema, deleteVehicleQuerySchema } from "@/lib/validators/vehicle";
import { serializeDates } from "@/lib/serializers";
import { requireRole } from "@/lib/rbac";
import { z } from "zod";

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
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

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) return unauthorized();

  // ✅ RBAC (Phase actuelle) : ADMIN + GERANT uniquement
  if (!requireRole(session.user.role, ["ADMIN", "GERANT"])) return forbidden();

  const companyId = session.user.companyId;

  // ✅ Support ?limit=...
  const url = new URL(req.url);
  const parsed = listQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) return badRequest("Invalid query", parsed.error.flatten());

  const { limit } = parsed.data;

  const vehicles = await prisma.vehicle.findMany({
    where: { companyId },
    orderBy: { immatriculation: "asc" },
    take: limit,
    select: {
      id: true,
      immatriculation: true,
      type: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // ✅ ICI : on renvoie directement la liste
  return ok(vehicles.map(serializeDates));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) return unauthorized();
  if (session.user.role !== "ADMIN") return forbidden();

  const companyId = session.user.companyId;

  const jsonBody: unknown = await req.json().catch(() => null);
  const parsed = createVehicleBodySchema.safeParse(jsonBody);
  if (!parsed.success) return badRequest("Invalid body", parsed.error.flatten());

  const { immatriculation, type } = parsed.data;

  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        companyId,
        immatriculation,
        type,
        status: "ACTIVE",
      },
      select: {
        id: true,
        immatriculation: true,
        type: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // ✅ POST ok : renvoie un vehicle dans data
    return ok(serializeDates(vehicle), 201);
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 409) return conflict("Véhicule déjà existant");
    return serverError(mapped ?? getErrorMessage(e));
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) return unauthorized();
  if (session.user.role !== "ADMIN") return forbidden();

  const companyId = session.user.companyId;

  const url = new URL(req.url);
  const parsed = deleteVehicleQuerySchema.safeParse({
    id: url.searchParams.get("id"),
  });
  if (!parsed.success) return badRequest("Invalid query", parsed.error.flatten());

  const { id } = parsed.data;

  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: { id, companyId },
      select: { id: true },
    });

    if (!vehicle) return notFound();

    await prisma.vehicle.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    return serverError(mapped ?? getErrorMessage(e));
  }
}
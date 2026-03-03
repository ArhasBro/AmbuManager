import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

function hasAutoschedulePermission(session: unknown): boolean {
  if (!session || typeof session !== "object") return false;

  const s = session as {
    user?: {
      role?: unknown;
      permissions?: unknown;
    };
  };

  const role = s.user?.role;
  if (role === "ADMIN" || role === "GERANT") return true;

  const permissions = s.user?.permissions;
  if (Array.isArray(permissions)) {
    // type-safe: p est unknown, mais comparaison string OK
    return permissions.some((p) => p === "PLANNING_AUTOSCHEDULE");
  }

  return false;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  const companyId =
    session?.user && typeof session.user === "object"
      ? (session.user as { companyId?: unknown }).companyId
      : undefined;

  if (typeof companyId !== "string" || companyId.length === 0) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "Session invalide (companyId manquant)" },
      { status: 401 }
    );
  }

  if (!hasAutoschedulePermission(session)) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Accès refusé (PLANNING_AUTOSCHEDULE requis)" },
      { status: 403 }
    );
  }

  // Route dépréciée : séparation stricte preview/apply
  return NextResponse.json(
    {
      ok: false,
      error: "GONE",
      message:
        "Cette route est dépréciée. Utilise /match/preview (simulation) et /match/apply (application).",
    },
    { status: 410 }
  );
}
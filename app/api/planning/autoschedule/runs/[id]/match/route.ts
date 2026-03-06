
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { canAutoSchedule } from "@/lib/permissions";


export async function GET() {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;

  if (!session?.user?.id || typeof companyId !== "string" || companyId.length === 0) {
    return Response.json(
      { ok: false, error: "UNAUTHORIZED", message: "Session invalide (companyId manquant)" },
      { status: 401 }
    );
  }

  if (!(await canAutoSchedule(session.user.id, session.user.role))) {
    return Response.json(
      { ok: false, error: "FORBIDDEN", message: "Accès refusé (PLANNING_AUTOSCHEDULE requis)" },
      { status: 403 }
    );
  }

  // Route dépréciée : séparation stricte preview/apply
  return Response.json(
    {
      ok: false,
      error: "GONE",
      message:
        "Cette route est dépréciée. Utilise /match/preview (simulation) et /match/apply (application).",
    },
    { status: 410 }
  );
}
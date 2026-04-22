
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { canAutoSchedule } from "@/lib/permissions";
import { json } from "@/lib/api/response";

export async function GET() {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const platformRole = session?.user?.platformRole;

  if (!session?.user?.id || typeof companyId !== "string" || companyId.length === 0) {
    return json(
      { ok: false, error: "UNAUTHORIZED", details: "Session invalide (companyId manquant)" },
      401
    );
  }

  if (!(await canAutoSchedule(session.user.id, session.user.role, platformRole))) {
    return json(
      { ok: false, error: "FORBIDDEN", details: "Accès refusé (PLANNING_AUTOSCHEDULE requis)" },
      403
    );
  }

  // Route dépréciée : séparation stricte preview/apply
  return json(
    {
      ok: false,
      error: "GONE",
      details:
        "Cette route est dépréciée. Utilise /match/preview (simulation) et /match/apply (application).",
    },
    410
  );
}
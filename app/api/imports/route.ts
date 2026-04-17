import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, forbidden, ok, unauthorized } from "@/lib/api/response";
import { authOptions } from "@/lib/auth";
import { commitImport, IMPORT_DOMAINS, previewImport, sanitizePreviewRows } from "@/lib/imports/import-engine";

const previewDomainSchema = z.enum(IMPORT_DOMAINS);

const commitSchema = z.object({
  action: z.literal("commit"),
  domain: z.enum(IMPORT_DOMAINS),
  rows: z.array(
    z.object({
      rowNumber: z.number().int().min(2),
      values: z.record(z.string(), z.unknown()),
    }),
  ).max(500),
});

function canManageOnboarding(role?: string | null) {
  return role === "ADMIN" || role === "GERANT";
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;

  if (!companyId || !session?.user?.id) return unauthorized();
  if (!canManageOnboarding(role)) return forbidden();

  const contentType = req.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const domain = previewDomainSchema.safeParse(formData.get("domain"));
      if (!domain.success) return badRequest("VALIDATION_ERROR", domain.error.flatten());

      const file = formData.get("file");
      if (!(file instanceof File)) {
        return badRequest("VALIDATION_ERROR", { message: "Fichier d'import manquant." });
      }

      const preview = await previewImport(companyId, domain.data, file);
      return ok({ ...preview, previewRows: sanitizePreviewRows(preview.previewRows), rows: preview.rows });
    }

    const body: unknown = await req.json().catch(() => null);
    const parsed = commitSchema.safeParse(body);
    if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

    const result = await commitImport(companyId, parsed.data.domain, parsed.data.rows);
    return ok(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erreur serveur";
    return badRequest("IMPORT_ERROR", { message });
  }
}

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { AccessDeniedState, PageHeader } from "@/app/ui";
import { authOptions } from "@/lib/auth";
import { canViewAudit } from "@/lib/permissions";

import AuditClient from "./audit-client";

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) redirect("/login");
  if (!(await canViewAudit(user.id, user.role, user.platformRole))) {
    return (
      <main className="page-wrap">
        <AccessDeniedState />
      </main>
    );
  }

  const params = await searchParams;
  const companyIdParam = params.companyId;
  const companyId = typeof companyIdParam === "string" ? companyIdParam : user.companyId ?? "";

  return (
    <section className="page-wrap audit-page">
      <PageHeader
        title="Journal d'audit"
        description="Lecture unifiee des entrees d'audit planning et connexions, avec filtres simples et details lisibles."
      />

      <AuditClient defaultCompanyId={companyId} isGlobalSupport={Boolean(user.isGlobalSupport)} />
    </section>
  );
}

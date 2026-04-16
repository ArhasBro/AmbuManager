import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { canViewAudit } from "@/lib/permissions";
import AuditClient from "./audit-client";

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user?.id) redirect("/login");
  if (!(await canViewAudit(user.id, user.role, user.platformRole))) redirect("/login");
  const params = await searchParams;
  const companyIdParam = params.companyId;
  const companyId = typeof companyIdParam === "string" ? companyIdParam : user.companyId ?? "";
  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Audit</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>Lecture unifiée minimale des entrées d&apos;audit planning, support et connexions.</p>
      </div>
      <AuditClient defaultCompanyId={companyId} isGlobalSupport={Boolean(user.isGlobalSupport)} />
    </main>
  );
}

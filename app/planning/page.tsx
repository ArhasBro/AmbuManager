import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { canAutoSchedule, canEditPlanning, canExportPlanning, canManageCompanyRules, canViewAudit, canViewGlobalPlanning, canViewSelfPlanning } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import PlanningClient from "./planning-client";

export default async function PlanningPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user?.id || !user.companyId) redirect('/login');
  const [canViewSelf, canViewGlobal, canManageMode, canManagePlanning, canRunAutoSchedule, canReadAudit, canExport, currentUser] = await Promise.all([
    canViewSelfPlanning(user.id, user.role, user.platformRole),
    canViewGlobalPlanning(user.id, user.role, user.platformRole),
    canManageCompanyRules(user.id, user.role, user.platformRole),
    canEditPlanning(user.id, user.role, user.platformRole),
    canAutoSchedule(user.id, user.role, user.platformRole),
    canViewAudit(user.id, user.role, user.platformRole),
    canExportPlanning(user.id, user.role, user.platformRole),
    prisma.user.findFirst({ where: { id: user.id, companyId: user.companyId }, select: { id: true, name: true, email: true } }),
  ]);
  if (!canViewSelf && !canViewGlobal) return <main style={{ padding:24 }}><h1 style={{ fontSize:24, fontWeight:700, marginBottom:12 }}>Planning</h1><p style={{ margin:0, opacity:0.85 }}>Accès non autorisé à la consultation du planning.</p></main>;
  const depots = await prisma.depot.findMany({ where: { companyId: user.companyId, isActive: true }, orderBy: { name: 'asc' }, select: { id:true, name:true, isActive:true } });
  const fallbackCurrentUser = { id: user.id, name: user.name ?? user.email ?? 'Utilisateur', email: user.email ?? '' };
  const accessibleUsers = canViewGlobal || canManagePlanning ? await prisma.user.findMany({ where: { companyId: user.companyId, isActive: true, platformRole: null }, orderBy: [{ name:'asc' }, { email:'asc' }], select: { id:true, name:true, email:true } }) : [currentUser ?? fallbackCurrentUser];
  return <main style={{ padding:24, display:'grid', gap:12 }}><div style={{ display:'flex', justifyContent:'space-between', gap:12, alignItems:'center', flexWrap:'wrap' }}><h1 style={{ fontSize:24, fontWeight:700, margin:0 }}>Planning</h1>{canReadAudit ? <Link href="/audit" style={{ textDecoration:'underline' }}>Ouvrir l’audit dédié</Link> : null}</div><PlanningClient availableDepots={depots} availableUsers={accessibleUsers} currentUser={currentUser ?? fallbackCurrentUser} canViewGlobal={canViewGlobal} canEditPlanning={canManagePlanning} canAutoSchedule={canRunAutoSchedule} canManageCompanyMode={canManageMode} canViewAudit={canReadAudit} canExportPlanning={canExport} /></main>;
}

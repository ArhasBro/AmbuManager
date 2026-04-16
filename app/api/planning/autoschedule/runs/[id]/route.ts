import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { canAutoSchedule, canViewAudit } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { computeDraftShiftMatchingByRole, MATCHING_VARIANTS, type MatchingVariantDefinition, type MatchingVariantKey } from "@/lib/services/planning/matching.service";
import { computePlanningQuality } from "@/lib/services/planning/matching-quality";
import { isSupportActor } from "@/lib/services/audit/audit-context";

const ParamsSchema = z.object({ id: z.string().min(1) });
function extractRunIdFromPath(pathname: string): string | null { const parts=pathname.split('/').filter(Boolean); const idx=parts.findIndex((p)=>p==='runs'); if(idx===-1) return null; const id=parts[idx+1]; if(!id) return null; const next=parts[idx+2]; if(next) return null; return id; }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null; }
function resolveRunMatchingVariant(auditLogs: Array<{ action: string; payload: unknown }> | undefined): MatchingVariantDefinition { const variantLog = auditLogs?.find((log)=>log.action==='AUTOSCHEDULE_MATCH_APPLIED' && isRecord(log.payload) && typeof log.payload.variant==='string' && MATCHING_VARIANTS.some((item)=>item.key===log.payload.variant)); const variantKey = isRecord(variantLog?.payload) ? (variantLog.payload.variant as MatchingVariantKey | undefined) : undefined; return MATCHING_VARIANTS.find((item)=>item.key===variantKey) ?? MATCHING_VARIANTS[0]; }

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const sessionCompanyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;
  if (!userId) return NextResponse.json({ ok:false, error:'UNAUTHORIZED' }, { status:401 });
  const [canViewRun, canReadAudit] = await Promise.all([canAutoSchedule(userId, role, platformRole), canViewAudit(userId, role, platformRole)]);
  if (!canViewRun && !canReadAudit) return NextResponse.json({ ok:false, error:'FORBIDDEN' }, { status:403 });
  let idFromParams: string | null = null; try { const p = await ctx.params; idFromParams = p?.id ? String(p.id) : null; } catch { idFromParams = null; }
  const id = idFromParams ?? extractRunIdFromPath(req.nextUrl.pathname);
  const parsedParams = ParamsSchema.safeParse({ id });
  if (!parsedParams.success) return NextResponse.json({ ok:false, error:'VALIDATION_ERROR', details: parsedParams.error.flatten() }, { status:400 });
  const runId = parsedParams.data.id;
  const runHead = await prisma.autoScheduleRun.findFirst({ where: { id: runId, ...(sessionCompanyId ? { companyId: sessionCompanyId } : {}) }, select: { companyId: true } });
  if (!runHead) return NextResponse.json({ ok:false, error:'NOT_FOUND' }, { status:404 });
  if (!sessionCompanyId && !isSupportActor(platformRole)) return NextResponse.json({ ok:false, error:'UNAUTHORIZED' }, { status:401 });
  const companyId = runHead.companyId;
  const run = await prisma.autoScheduleRun.findFirst({ where: { id: runId, companyId }, select: { id:true, companyId:true, scope:true, status:true, day:true, weekStart:true, createdAt:true, createdBy:{ select:{ id:true, name:true, email:true } }, _count:{ select:{ draftShifts:true } }, draftShifts:{ orderBy:{ startAt:'asc' }, include:{ template:true, user:true, vehicle:true } }, planningAuditLogs:{ orderBy:{ createdAt:'desc' }, take:20, select:{ id:true, createdAt:true, action:true, entityType:true, entityId:true, summary:true, payload:true, actorUser:{ select:{ id:true, name:true, email:true } } } } } });
  if (!run) return NextResponse.json({ ok:false, error:'NOT_FOUND' }, { status:404 });
  const { planningAuditLogs, draftShifts, _count, ...runData } = run;
  const data: Record<string, unknown> = { ...runData, day: run.day ? run.day.toISOString() : null, weekStart: run.weekStart ? run.weekStart.toISOString() : null, createdAt: run.createdAt.toISOString(), access: { canViewRun, canViewAudit: canReadAudit } };
  if (canViewRun) {
    data._count = _count;
    data.draftShifts = draftShifts.map((s)=>({ ...s, date:s.date.toISOString(), startAt:s.startAt.toISOString(), endAt:s.endAt.toISOString(), createdAt:s.createdAt.toISOString() }));
    const variant = resolveRunMatchingVariant(planningAuditLogs);
    const plan = await computeDraftShiftMatchingByRole(prisma, { companyId, runId, includeAlreadyAssigned:true, variant: variant.key });
    data.matching = { variant, quality: computePlanningQuality(plan) };
  }
  if (canReadAudit) data.auditLogs = planningAuditLogs.map((log)=>({ ...log, createdAt: log.createdAt.toISOString() }));
  return NextResponse.json({ ok:true, data });
}

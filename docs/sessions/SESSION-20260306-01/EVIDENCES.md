# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Patches

- `docs/patches/4.7/4.7.1/SESSION-20260306-01__4.7.1-01__audit-infra.diff`
- `docs/patches/4.7/4.7.1/SESSION-20260306-01__4.7.1-02__audit-run-create.diff`
- `docs/patches/4.7/4.7.1/SESSION-20260306-01__4.7.1-03__audit-run-status.diff`
- `docs/patches/4.7/4.7.1/SESSION-20260306-01__4.7.1-04__audit-match-apply.diff`
- `docs/patches/4.7/4.7.1/SESSION-20260306-01__4.7.1-05__audit-manual-assignments.diff`

## Vérifications techniques

- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Vérifications manuelles

- Création run WEEK : OK
- Création run DAY : OK
- Publish run : OK
- Cancel run : OK
- Match apply : OK
- Affectation manuelle `Shift` : OK
- Affectation manuelle `DraftShift` : OK
- Absence de faux log sur non-changement : OK

## Fichiers code impactés par la session

- `prisma/schema.prisma`
- `prisma/migrations/20260306221500_add_planning_audit_log/migration.sql`
- `lib/services/planning/planning-audit.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`

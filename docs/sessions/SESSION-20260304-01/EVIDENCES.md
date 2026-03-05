# EVIDENCES

Éléments factuels (code) liés à la DoD 4.4.

---

## Code — preuves d’implémentation (présence)

- Autoschedule DAY (API) :
  - app/api/planning/autoschedule/day/route.ts
  - Gestion `DRAFT_ALREADY_EXISTS` + `runId`
  - Guard `NO_TEMPLATES`

- Autoschedule WEEK (API) :
  - app/api/planning/autoschedule/week/route.ts
  - Gestion `DRAFT_ALREADY_EXISTS` + `runId`
  - Guard `NO_TEMPLATES`

- Run info (API) :
  - app/api/planning/autoschedule/runs/[id]/route.ts
  - Fallback id via req.nextUrl.pathname (robustesse routes dynamiques)

- Cancel run (API) :
  - app/api/planning/autoschedule/runs/[id]/cancel/route.ts
  - DRAFT → CANCELLED + id fallback

- Publish run (API) :
  - app/api/planning/autoschedule/runs/[id]/publish/route.ts
  - Copie DraftShift → Shift + validations (conflits / repos min)

- UI /planning :
  - app/planning/planning-client.tsx
  - generateWeek / generateDay / publishLastRun / cancelLastRun
  - Refresh shifts après publish (loadShiftsForWeek)

- Seed (permissions) :
  - prisma/seed.ts
  - Permissions créées : PLANNING_AUTOSCHEDULE + PLANNING_AUTOSCHEDULE_PUBLISH

---

## Preuves d’exécution (logs/captures)

INFORMATION NON FOURNIE — À CONFIRMER
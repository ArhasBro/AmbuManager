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

### T1 — WEEK (ADMIN A)
- Compte : admin@ambulance.local
- runId : cmmdblltx0000b47kad73zl8v
- Publish : PUBLISHED
- Shifts visibles après publish : OUI
- Warnings : aucun message

### T2 — CANCEL (ADMIN A)
- runId : cmmdbqyow0018b47kzdyl38tn
- Cancel : OK
- Statut final : CANCELLED

### T3 — DRAFT_ALREADY_EXISTS (ADMIN A)
- runId (clic 1) : cmmdbsq3n0022b47kxia55tpl
- DRAFT_ALREADY_EXISTS (clic 2) : OUI
- runId retourné : cmmdbsq3n0022b47kxia55tpl

### T4 — 403 publish (PLANNER A)
- Compte : planner@ambulance.local
- runId : cmmdcq34e00005g7kt80mmpyh
- Publish : FORBIDDEN
- Preuve : {"ok":false,"error":"FORBIDDEN","details":"PLANNING_AUTOSCHEDULE_PUBLISH requis"}

### T5 — 403 autoschedule (VIEWER A)
- Compte : viewer@ambulance.local
- Preuve : {"ok":false,"error":"FORBIDDEN"}

### T6 — 401 (sans session)
- Endpoint testé (GET) : /api/planning/autoschedule/runs/cmmdblltx0000b47kad73zl8v
- Preuve : {"ok":false,"error":"UNAUTHORIZED"}

### T7 — Cross-tenant
- runId_B : cmmdcyp17000u5g7kvoe9hws7
- Accès depuis tenant A (GET /runs/<runId_B>) : NOT_FOUND
- Preuve : {"ok":false,"error":"NOT_FOUND"}
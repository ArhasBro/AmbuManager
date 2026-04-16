# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documentation projet
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code contrôlé
- `prisma/schema.prisma`
- `prisma/migrations/20260306221500_add_planning_audit_log/migration.sql`
- `lib/services/planning/planning-audit.ts`
- `lib/services/audit/support-action-trace.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `app/planning/page.tsx`
- `lib/auth.ts`
- `lib/rbac.ts`
- `prisma/seed.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `lib/services/users/archive-user.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`

---

## Preuves structurées

### A. Infrastructure persistante
- `PlanningAuditLog` existe dans `prisma/schema.prisma`.
- La migration `20260306221500_add_planning_audit_log` crée réellement la table et ses index.
- `lib/services/planning/planning-audit.ts` écrit en base via `db.planningAuditLog.create(...)`.

### B. Lecture audit du run courant
- `app/api/planning/autoschedule/runs/[id]/route.ts` charge `planningAuditLogs`.
- Cette même route renvoie `data.auditLogs` quand `canReadAudit` est vrai.
- `app/planning/planning-client.tsx` charge `/api/planning/autoschedule/runs/${runId}` puis affiche “Historique du run courant”.

### C. Historique shift
- `app/api/planning/shifts/route.ts` accepte `includeHistory`.
- Si `includeHistory=1`, la route lit `PlanningAuditLog` sur `entityType: "Shift"`.
- `app/planning/manual-planning-panel.tsx` force `includeHistory=1` et affiche “Historique minimal”.

### D. Actions planning réellement tracées
Actions réellement trouvées :
- `AUTOSCHEDULE_RUN_CREATED`
- `AUTOSCHEDULE_MATCH_APPLIED`
- `AUTOSCHEDULE_RUN_PUBLISHED`
- `AUTOSCHEDULE_RUN_CANCELLED`
- `SHIFT_CREATED_MANUALLY`
- `SHIFT_UPDATED_MANUALLY`
- `SHIFT_CANCELLED_MANUALLY`
- `SHIFT_ASSIGNED_MANUALLY`
- `DRAFT_SHIFT_ASSIGNED_MANUALLY`

### E. Modèle d’accès audit réel
- `lib/permission-catalog.ts` contient `AUDIT_VIEW`.
- `lib/permissions.ts` contient `canViewAudit(...)`.
- `app/api/planning/autoschedule/runs/[id]/route.ts` utilise `canViewAudit(...)`.
- `app/api/planning/shifts/route.ts` n’utilise pas `canViewAudit(...)` pour `includeHistory=1`.

### F. Support global
- `prisma/seed.ts` crée le support global avec `platformRole=SUPPORT`, `role=null`, `companyId=null`.
- `lib/permissions.ts` retourne `false` pour le support global dans `hasPermissionAccess(...)`.
- `traceSupportAction(...)` n’écrit que si `actorPlatformRole === SUPPORT`.

### G. Audit support réellement codé
Actions support réellement trouvées :
- `SUPPORT_CREATE_VEHICLE`
- `SUPPORT_UPDATE_VEHICLE`
- `SUPPORT_DELETE_VEHICLE`
- `SUPPORT_ARCHIVE_VEHICLE`
- `SUPPORT_ASSIGN_VEHICLE_DEPOT`
- `SUPPORT_ARCHIVE_USER`
- `SUPPORT_ASSIGN_USER_DEPOT`
- `SUPPORT_RESET_USER_PASSWORD`
- `SUPPORT_CREATE_DEPOT`
- `SUPPORT_UPDATE_DEPOT`
- `SUPPORT_ARCHIVE_DEPOT`

### H. Gaps strictement prouvés
- aucune page dédiée audit autonome trouvée ;
- aucun audit des connexions trouvé ;
- aucun audit création / modification standard des utilisateurs trouvé ;
- aucun audit standard des véhicules hors flux support trouvé ;
- aucun motif obligatoire support trouvé ;
- accès audit incohérent entre run courant et historique shifts ;
- accès natif support à l’audit non cohérent avec le cadrage.

---

## Validations terminales réellement exécutées

Aucune validation terminale applicative n’a été relancée dans cette session `AUDIT` avec décision `NO_PATCH`.

Conforme à la règle de preuve :
- aucun `git apply` exécuté ;
- aucun `npx prisma validate` relancé ;
- aucun `npx prisma generate` relancé ;
- aucun `npm run lint` relancé ;
- aucun `npm run build` relancé.

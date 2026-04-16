# EVIDENCES

## Sources de référence retenues

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` ;
- `docs/1-master/DOCUMENT_MAITRE.md` ;
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` ;
- `docs/1-master/ETAT_GLOBAL_PROJET.md` ;
- `docs/1-master/REGISTRE_DECISIONS.md` ;
- `docs/1-master/RECAP_DISCUSSIONS.md` ;
- `docs/1-master/STRUCTURE_PROJET.md` ;
- `docs/PROTOCOLE_SESSION.md` ;
- `docs/SOURCES_AUTORISEES.md` ;
- `docs/STRUCTURE_DOCS.md` ;
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` ;
- `SESSION-20260416-05_A11_AUDIT-01` ;
- `SESSION-20260416-06_A11_AUDIT-LOT-02-09` ;
- code réel du dépôt contrôlé.

## Preuves code retenues

### 1. Infrastructure persistante audit
- `prisma/schema.prisma` : `PlanningAuditLog` réellement présent (`65`) ; `LoginAuditLog` réellement présent (`92`).
- `prisma/migrations/20260306221500_add_planning_audit_log/migration.sql` : création réelle de `PlanningAuditLog` (`2`).
- `prisma/migrations/20260416143000_add_login_audit_log/migration.sql` : création réelle de `LoginAuditLog` (`1`).
- `lib/services/planning/planning-audit.ts` : helper d’écriture réel `writePlanningAudit(...)` (`16`).
- `lib/services/audit/login-audit.ts` : helper d’écriture réel `writeLoginAudit(...)` (`4`).

### 2. Lecture d’audit dédiée et page audit
- `app/api/audit/route.ts` : garde réelle par `canViewAudit(...)` (`22`) ; résolution société (`31`) ; lecture combinée `planningLogs` + `loginLogs` (`33-40`) ; réponse unifiée (`41`).
- `app/audit/page.tsx` : page dédiée réelle et protégée par `canViewAudit(...)` (`11`) ; intitulé explicite de lecture unifiée minimale (`19`).
- `app/audit/audit-client.tsx` : consommation réelle de `/api/audit` (`14`) ; affichage lisible d’entrées, acteur et payload (`15`).

### 3. Lecture d’audit du run courant
- `app/api/planning/autoschedule/runs/[id]/route.ts` : accès calculé avec `canViewAudit(...)` (`43`) ; champ `access.canViewAudit` dans la réponse (`57`) ; `auditLogs` réellement exposés si audit autorisé (`65`).
- `app/planning/planning-client.tsx` : affichage réel de l’historique du run courant (`1674-1714`).

### 4. Protection des lectures d’audit, y compris historique shift
- `app/api/planning/shifts/route.ts` : calcul `canReadAudit` via `canViewAudit(...)` (`75`) ; `includeHistory` contrôlé (`16`, `97`) ; lecture des logs seulement si `includeHistory === "1" && canReadAudit` (`152`) ; regroupement par shift (`161`).
- `app/planning/manual-planning-panel.tsx` : ajout de `includeHistory=1` seulement si `canViewAudit` (`148`) ; message explicite `Accès audit non autorisé.` (`511`).

### 5. Audit des connexions
- `lib/auth.ts` : appels réels à `writeLoginAudit(...)` pour `USER_INACTIVE` (`27`), `INVALID_PASSWORD` (`32`) et succès (`35`).
- `app/api/audit/route.ts` : lecture réelle des `loginLogs` dans la vue unifiée (`33-40`).

### 6. Modèle d’accès audit
- `lib/permission-catalog.ts` : permission dédiée `AUDIT_VIEW` réellement présente.
- `lib/permissions.ts` : `canViewAudit(...)` accorde l’accès via `AUDIT_VIEW` et `allowSupport: true` (`66-67`).
- `lib/permissions.ts` : `canManageUsers(...)` (`54`) et `canManageVehicles(...)` (`57`) ne donnent pas d’ouverture symétrique au support global.
- `lib/rbac.ts` : `requireRole(...)` ne laisse passer le support global que si `allowGlobalSupport` est explicitement demandé ; ce n’est pas le cas sur les routes dépôts.

### 7. Actions support et transparence support / client
- `lib/services/audit/support-action-trace.ts` : la trace ne s’exécute que pour `PlatformRole.SUPPORT` (`26`) ; `supportReason` est obligatoire (`28`) ; la raison est injectée dans le payload si fournie (`19-21`).
- Recherche code contrôlée : aucun appel applicatif recensé dans le périmètre A11 ne transmet `supportReason` à `traceSupportAction(...)`.
- `app/api/users/[id]/reset-password/route.ts`, `app/api/vehicles/route.ts`, `app/api/vehicles/[id]/route.ts`, services utilisateurs / véhicules / dépôts : des actions `SUPPORT_*` existent, mais elles ne seront réellement écrites que si l’acteur est support global **et** fournit un motif, ce qui n’est pas câblé dans les routes contrôlées.
- `app/api/vehicles/route.ts` : création / suppression véhicule réservées à `ADMIN` (`87`, `174`) ; donc le support global n’est pas réellement opérable sur ces routes.
- `app/api/depots/route.ts`, `app/api/depots/[id]/route.ts`, `app/api/depots/[id]/archive/route.ts` : contrôle par `requireRole(role, ALLOWED_ROLES)` (`31`, `36`, `37`) sans ouverture support globale.

### 8. Couverture planning réellement prouvée
- `app/api/planning/autoschedule/day/route.ts` : audit réel `AUTOSCHEDULE_RUN_CREATED` et `AUTOSCHEDULE_MATCH_APPLIED`.
- `app/api/planning/autoschedule/week/route.ts` : audit réel `AUTOSCHEDULE_RUN_CREATED` et `AUTOSCHEDULE_MATCH_APPLIED`.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts` : audit réel `AUTOSCHEDULE_RUN_PUBLISHED`.
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts` : audit réel `AUTOSCHEDULE_RUN_CANCELLED`.
- `app/api/planning/shifts/route.ts` : audit réel `SHIFT_CREATED_MANUALLY`.
- `app/api/planning/shifts/[id]/route.ts` : audit réel `SHIFT_UPDATED_MANUALLY`.
- `app/api/planning/shifts/[id]/cancel/route.ts` : audit réel `SHIFT_CANCELLED_MANUALLY`.
- `lib/services/planning/assign-shift.ts` : audit réel `SHIFT_ASSIGNED_MANUALLY`.
- `lib/services/planning/assign-draftshift.ts` : audit réel `DRAFT_SHIFT_ASSIGNED_MANUALLY`.

### 9. Couverture utilisateurs / véhicules / dépôts
- **Utilisateurs** :
  - `app/api/users/route.ts` et `app/api/users/[id]/route.ts` : aucune écriture audit prouvée pour création / modification.
  - `app/api/users/[id]/reset-password/route.ts`, `lib/services/users/archive-user.ts`, `lib/services/users/assign-user-depot.ts` : seulement des traces `SUPPORT_*` préparées.
- **Véhicules** :
  - `app/api/vehicles/route.ts`, `app/api/vehicles/[id]/route.ts`, `lib/services/vehicles/archive-vehicle.ts`, `lib/services/vehicles/assign-vehicle-depot.ts` : structure de traces `SUPPORT_*` présente.
  - cette structure n’apporte pas une couverture homogène des actions métier standards, car `traceSupportAction(...)` ne journalise pas les acteurs non support.
- **Dépôts** :
  - `lib/services/depots/create-depot.ts`, `update-depot.ts`, `archive-depot.ts` : structure de traces `SUPPORT_*` présente.
  - même limite de portée réelle que pour les véhicules.

## Validations terminales réellement exécutées dans cette session

Commandes lancées sur le dépôt contrôlé :

- `npx prisma validate` → **KO** (`sh: 1: prisma: not found`)
- `npx prisma generate` → **KO** (`sh: 1: prisma: not found`)
- `npm run lint` → **KO** (`sh: 1: eslint: not found`)
- `npm run build` → **KO** (`sh: 1: next: not found`)

Aucune autre validation terminale ne doit être considérée comme prouvée dans cette session.

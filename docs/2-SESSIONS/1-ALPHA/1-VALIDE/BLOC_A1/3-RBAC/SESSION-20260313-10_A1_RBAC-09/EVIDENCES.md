# EVIDENCES

## Sources documentaires officielles

### Cadrage fonctionnel module 06
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:343-430`
  - `06.1` fixe le catalogue de rôles métier.
  - `06.3` valide les permissions additionnelles pour les rôles terrain.
  - `06.4` impose un rôle principal unique obligatoire.
  - `06.5` liste les permissions fines ALPHA.
  - `06.6` fixe le modèle d’accès audit `rôles natifs + permission dédiée`.
  - `06.7` reporte le multi-rôle.

### Plan officiel
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:247-255`
  - confirme la séquence `RBAC-01` à `RBAC-09` ;
  - confirme que `RBAC-09` est bien la validation finale du bloc rôles / permissions ALPHA.

### Historique de session repris
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md:14-18`
  - valide la présence de `role` et `companyId` dans auth / JWT / session.
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md:28-65`
  - valide la cohérence injection auth, JWT, session, typage et consommation réelle.
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-09_A1_RBAC-08/RESULTATS.md:5-18`
  - valide la stabilisation du flux seed pour l’affectation des permissions.
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-09_A1_RBAC-08/RESULTATS.md:21-39`
  - borne le correctif `RBAC-08` au seul `prisma/seed.ts` avec vérifications techniques prouvées.

## Modèle réel rôles / permissions

### Catalogue de rôles et rôle principal
- `prisma/schema.prisma:9-20`
  - enum `Role` réel : `ADMIN`, `GERANT`, `BUREAU`, `ADE`, `AA`, `TAXI`, `REGULATEUR`.
- `prisma/schema.prisma:116-122`
  - `User.role` est obligatoire.
- `prisma/migrations/20260224175839_init/migration.sql:7-15`
  - type SQL `Role` initialisé avec rôle obligatoire côté `User`.
- `prisma/migrations/20260313120000_rename_role_dea_to_ade/migration.sql:1`
  - matérialise le renommage `DEA` → `ADE`.

### Séparation rôle principal / permissions fines
- `prisma/schema.prisma:151-169`
  - modèles `Permission` et `UserPermission` présents.

## Auth / session / typings

- `lib/auth.ts:43-65`
  - `authorize()` charge `role` et `companyId` depuis Prisma et les renvoie dans l’utilisateur authentifié.
- `lib/auth.ts:72-116`
  - callbacks `jwt` et `session` transportent `role` et `companyId`.
- `types/next-auth.d.ts:5-27`
  - typage `Session`, `User` et `JWT` aligné.

## Catalogue de permissions ALPHA

- `lib/permission-catalog.ts:1-96`
  - matérialise les permissions ALPHA :
    - `PLANNING_VIEW_SELF`
    - `PLANNING_VIEW_GLOBAL`
    - `PLANNING_EDIT`
    - `PLANNING_SHIFT_CREATE_MANUAL`
    - `PLANNING_SHIFT_EDIT_PUBLISHED`
    - `PLANNING_SHIFT_CANCEL_PUBLISHED`
    - `PLANNING_AUTOSCHEDULE`
    - `PLANNING_AUTOSCHEDULE_PUBLISH`
    - `PLANNING_AUTOSCHEDULE_CANCEL`
    - `USERS_MANAGE`
    - `ROLES_PERMISSIONS_MANAGE`
    - `VEHICLES_MANAGE`
    - `TEMPLATES_MANAGE`
    - `COMPANY_RULES_MANAGE`
    - `AUDIT_VIEW`
    - `PLANNING_EXPORT`
    - `DASHBOARD_ADMIN_ACCESS`
    - `DASHBOARD_TERRAIN_ACCESS`.

## Helpers / contrôles RBAC réels

- `lib/permissions.ts:4-6`
  - accès natif limité à `ADMIN` / `GERANT`.
- `lib/permissions.ts:34-41`
  - helper central de vérification permissionnelle.
- `lib/permissions.ts:43-80`
  - helpers réels présents :
    - `canAutoSchedule`
    - `canPublishAutoSchedule`
    - `canCancelAutoSchedule`
    - `canManageUsers`
    - `canManageVehicles`
    - `canManageCompanyRules`
    - `canViewAudit`
    - `canEditPlanning`
    - `canAccessAdminDashboard`.

## Branchement réel des permissions

### Gestion utilisateurs
- `app/api/users/route.ts:24-33`
  - `GET /api/users` protégé par `canManageUsers()`.
- `app/api/users/[id]/reset-password/route.ts:36-44`
  - reset password protégé par `canManageUsers()`.
- `app/users/page.tsx:10-16`
  - page `/users` conditionnée par `canManageUsers()`.

### Véhicules
- `app/vehicles/page.tsx:9-18`
  - page `/vehicles` conditionnée par `canManageVehicles()`.
- `app/api/vehicles/route.ts:26-35`
  - `GET /api/vehicles` protégé par `canManageVehicles()`.
- `app/api/vehicles/route.ts:64-70`
  - `POST /api/vehicles` reste protégé par `session.user.role === "ADMIN"`.
- `app/api/vehicles/route.ts:104-110`
  - `DELETE /api/vehicles` reste protégé par `session.user.role === "ADMIN"`.

### Règles métier
- `app/api/company/rules/route.ts:22-29`
  - lecture ouverte à tout utilisateur authentifié du tenant.
- `app/api/company/rules/route.ts:77-89`
  - écriture protégée par `canManageCompanyRules()`.

### Planning / autoschedule
- `app/api/planning/shifts/[id]/assign/route.ts:36-45`
  - affectation protégée par `canEditPlanning()`.
- `app/api/planning/autoschedule/day/route.ts:68-84`
  - génération jour protégée par `canAutoSchedule()`.
- `app/api/planning/autoschedule/week/route.ts:93-108`
  - génération semaine protégée par `canAutoSchedule()`.
- `app/api/planning/autoschedule/runs/route.ts:56-70`
  - liste des runs protégée par `canAutoSchedule()`.
- `app/api/planning/autoschedule/runs/[id]/match/route.ts:20-36`
  - ancienne route `match` encore bornée par `canAutoSchedule()` avant retour `410 GONE`.
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:25-41`
  - preview protégée par `canAutoSchedule()`.
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:54-70`
  - apply protégé par `canAutoSchedule()`.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:6-9`
  - helper dédié `canPublishAutoSchedule()` importé pour publication.
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:5-9`
  - helper dédié `canCancelAutoSchedule()` importé pour annulation.

### Audit
- `app/api/planning/autoschedule/runs/[id]/route.ts:48-65`
  - calcul distinct de `canViewRun` et `canReadAudit` ; refus seulement si les deux sont absents.
- `app/api/planning/autoschedule/runs/[id]/route.ts:149-165`
  - exposition différenciée de `draftShifts` et `auditLogs` selon les droits.

### Dashboard
- `app/dashboard/page.tsx:20-47`
  - dashboard admin et liens conditionnés par `canAccessAdminDashboard()`, `canManageUsers()` et `canManageVehicles()`.

## Points qui empêchent le verdict `conforme`

### Lecture planning non réellement permissionnée
- `app/planning/page.tsx:8-18`
  - page `/planning` accessible sur simple session valide.
- `app/api/planning/shifts/route.ts:40-48`
  - `GET /api/planning/shifts` n’exige qu’une session avec `companyId` / `userId`.
- `app/api/planning/shifts/route.ts:72-117`
  - lecture des shifts par tenant sans distinction `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL`.

### Permissions cataloguées sans consommation réelle prouvée
Recherche de code sur le périmètre `app`, `lib`, `prisma` :
- seules occurrences trouvées pour plusieurs permissions dans `lib/permission-catalog.ts` ;
- aucune consommation réelle prouvée pour :
  - `PLANNING_VIEW_SELF`
  - `PLANNING_VIEW_GLOBAL`
  - `PLANNING_SHIFT_CREATE_MANUAL`
  - `PLANNING_SHIFT_EDIT_PUBLISHED`
  - `PLANNING_SHIFT_CANCEL_PUBLISHED`
  - `ROLES_PERMISSIONS_MANAGE`
  - `TEMPLATES_MANAGE`
  - `PLANNING_EXPORT`
  - `DASHBOARD_TERRAIN_ACCESS`.

## Vérifications techniques réellement exécutées

- relecture documentaire des sources officielles `.md` demandées ;
- inspection statique du code réel ;
- recherche textuelle ciblée dans le dépôt ;
- contrôle de présence de `node_modules` : absent.

## Vérifications techniques non exécutées

- `npm run lint` : non exécuté dans cette session ;
- `npm run build` : non exécuté dans cette session ;
- raison : dépendances non installées localement (`node_modules` absent).

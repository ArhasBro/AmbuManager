# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## 1. Sources documentaires autorisées utilisées

- `docs/SOURCES_AUTORISEES.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-07_A1_TENANT-02/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-08_A1_TENANT-03/RESULTATS.md`

## 2. Cadrage documentaire — preuves utiles

### 2.1 Rôle exact de la session
Sources :
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- contexte imposé de session

Preuve utile :
- `TENANT-04 — VALIDATION — Validation multi-tenant sur périmètre ALPHA`

Constat factuel :
- la session doit valider l’état atteint ;
- elle ne doit rouvrir une correction que si une non-conformité résiduelle est prouvée.

### 2.2 Contexte de reprise
Sources :
- `SESSION-20260312-06_A1_TENANT-01/RESULTATS.md`
- `SESSION-20260312-07_A1_TENANT-02/RESULTATS.md`
- `SESSION-20260312-08_A1_TENANT-03/RESULTATS.md`

Constats utiles réutilisés :
- `TENANT-01` a retenu `partiellement conforme` ;
- `TENANT-02` a corrigé les routes/API réellement insuffisamment cloisonnées ;
- `TENANT-03` a ajouté la garde serveur explicite sur `/planning` ;
- `TENANT-04` doit donc vérifier l’état final réellement obtenu après ces correctifs.

## 3. Fichiers code réellement inspectés

- `lib/auth.ts`
- `proxy.ts`
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/vehicles/page.tsx`
- `app/users/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/dashboard/page.tsx`
- `lib/permissions.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/planning-audit.ts`
- `prisma/schema.prisma`

## 4. Preuves code — cloisonnement tenant réellement observé

### 4.1 Portage tenant côté auth
Source : `lib/auth.ts`

Preuves visibles :
- `authorize()` sélectionne `role` et `companyId` ;
- le retour d’`authorize()` contient `role` et `companyId` ;
- le callback `jwt` porte `token.role` et `token.companyId` ;
- le callback `session` affecte `session.user.id`, `session.user.role` et `session.user.companyId`.

Constat précis :
- le tenant courant reste porté par la session applicative ;
- les routes/pages inspectées peuvent réellement relire `session.user.companyId`.

### 4.2 Garde de navigation et pages serveur
Sources :
- `proxy.ts`
- `app/vehicles/page.tsx`
- `app/users/page.tsx`
- `app/planning/page.tsx`
- `app/dashboard/page.tsx`

Preuves visibles :
- `proxy.ts` protège `/dashboard/:path*`, `/vehicles/:path*`, `/planning/:path*`, `/users/:path*` ;
- `app/vehicles/page.tsx` lit la session, contrôle `user.role` et `user.companyId`, puis filtre `prisma.vehicle.findMany({ where: { companyId } })` ;
- `app/users/page.tsx` contrôle `user.id`, `user.companyId` et le rôle `ADMIN/GERANT` ;
- `app/planning/page.tsx` contrôle `user.id` et `user.companyId` avant rendu ;
- `app/dashboard/page.tsx` exige une session mais ne charge pas de données métier inter-tenant sur le périmètre inspecté.

Constat précis :
- les pages serveur critiques du périmètre ALPHA inspecté restent protégées ;
- la garde explicite ajoutée par `TENANT-03` est bien présente sur `/planning`.

### 4.3 Users / Vehicles
Sources :
- `app/api/users/route.ts`
- `app/api/vehicles/route.ts`

Preuves visibles :
- `app/api/users/route.ts`
  - lecture de `session.user.companyId` ;
  - GET en `findMany({ where: { companyId } })` ;
  - accès limité à `ADMIN` / `GERANT`.
- `app/api/vehicles/route.ts`
  - GET en `findMany({ where: { companyId } })` ;
  - POST injecte `companyId` dans `create()` ;
  - DELETE fait `deleteMany({ where: { id, companyId } })`.

Constat précis :
- les listes exposées sont bornées au tenant courant ;
- la correction `TENANT-02` sur la suppression véhicule est toujours effective.

### 4.4 Health Prisma
Source : `app/api/health/prisma/route.ts`

Preuves visibles :
- route réservée à un utilisateur tenantisé avec rôle `ADMIN` ;
- compteurs :
  - `prisma.company.count({ where: { id: companyId } })`
  - `prisma.user.count({ where: { companyId } })`

Constat précis :
- la route ne renvoie plus d’agrégats globaux système ;
- la non-conformité prouvée dans `TENANT-01` n’est plus visible dans le code actuel.

### 4.5 Reset password
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves visibles :
- acteur contrôlé par session + rôle ;
- cible relue par `findFirst({ where: { id: targetUserId, companyId } })` ;
- écriture finale par `updateMany({ where: { id: targetUser.id, companyId } })` ;
- relecture finale aussi bornée par `companyId`.

Constat précis :
- la correction `TENANT-02` sur cette route est bien présente ;
- aucune mutation inter-tenant n’est prouvée sur cette route inspectée.

### 4.6 Règles société
Source : `app/api/company/rules/route.ts`

Preuves visibles :
- GET avec `findMany({ where: { companyId, ... } })` ;
- PATCH avec `upsert({ where: { companyId_key: { companyId, key } } })` ;
- écriture réservée à `ADMIN/GERANT`.

Constat précis :
- la lecture et l’écriture des règles société inspectées restent bornées au tenant courant.

### 4.7 Planning — lectures et runs
Sources :
- `app/api/planning/shifts/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`

Preuves visibles :
- `app/api/planning/shifts/route.ts` initialise `where` avec `{ companyId }` ;
- `app/api/planning/autoschedule/runs/route.ts` liste les runs du tenant courant ;
- `app/api/planning/autoschedule/runs/[id]/route.ts` lit le run par `findFirst({ where: { id: runId, companyId } })`.

Constat précis :
- les lectures planning inspectées restent cloisonnées par société.

### 4.8 Planning — day/week/cancel/publish
Sources :
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `lib/services/planning/planning-audit.ts`

Preuves visibles :
- `day` et `week` relisent la session tenantisée, chargent templates et runs avec `companyId`, créent `AutoScheduleRun` / `DraftShift` / `PlanningAuditLog` avec `companyId` ;
- `cancel` relit le run par `id + companyId` puis annule par `updateMany({ where: { id: runId, companyId } })` ;
- `publish` relit le run par `id + companyId`, relit les drafts par `runId + companyId`, contrôle les conflits avec `companyId`, crée les shifts en portant `companyId` et finalise le run par `updateMany({ where: { id: run.id, companyId } })` ;
- `writePlanningAudit()` écrit `companyId` explicitement dans chaque log d’audit.

Constat précis :
- les opérations planning sensibles inspectées restent tenantisées ;
- la correction `TENANT-02` sur l’annulation de run est toujours présente.

### 4.9 Planning — assign / matching
Sources :
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/matching.service.ts`
- `lib/permissions.ts`

Preuves visibles :
- `assign` charge d’abord la cible par `id + companyId` ;
- `assign` vérifie que les `userId` et `vehicleId` fournis appartiennent au même tenant ;
- `assign-shift.ts` et `assign-draftshift.ts` relisent respectivement `Shift` / `DraftShift` par `id + companyId` et effectuent leurs recherches de conflit avec `companyId` ;
- les routes `match/*` exigent une session tenantisée et une permission dédiée ;
- `matching.service.ts` lit les drafts du run via `run: { companyId }`, charge les users du tenant par `companyId`, et applique les écritures par `updateMany()` borné au `runId` du tenant.

Constat précis :
- aucune lecture ou action inter-tenant n’est prouvée sur la chaîne `assign` / `match` réellement inspectée ;
- certains services gardent une écriture finale par `id` après relecture tenantisée, mais cela ne constitue pas ici une action inter-tenant prouvée sur le périmètre contrôlé.

### 4.10 UI client planning
Source : `app/planning/planning-client.tsx`

Preuves visibles :
- récupération du rôle via `/api/auth/session` ;
- chargement des listes via `/api/users?limit=500`, `/api/vehicles?limit=500`, `/api/company/rules?keys=...`, `/api/planning/...` ;
- condition d’édition via `canAdminSave(role)`.

Constat précis :
- la UI inspectée s’appuie sur des endpoints déjà tenantisés ;
- aucune exposition de listes ou détails d’un autre tenant n’est prouvée dans cette zone UI.

### 4.11 Support schéma
Source : `prisma/schema.prisma`

Preuves visibles :
- `User`, `Vehicle`, `CompanyRule`, `ShiftTemplate`, `MaintenanceType`, `AutoScheduleRun`, `DraftShift`, `Shift`, `PlanningAuditLog` portent `companyId` ;
- index et contraintes composites tenantisées sont présents sur plusieurs modèles métier.

Constat précis :
- la persistance principale du périmètre ALPHA inspecté reste compatible avec le cloisonnement multi-tenant attendu.

## 5. Distinction méthodologique exigée

### Zone conforme
- portage auth `companyId` / `role` ;
- garde de navigation `proxy.ts` ;
- pages serveur `/vehicles`, `/users`, `/planning` ;
- routes/API users, vehicles, company rules, planning, health Prisma ;
- consommation UI planning via APIs tenantisées.

### Zone inspectée non modifiée
- `app/dashboard/page.tsx` ;
- `lib/permissions.ts` ;
- `lib/services/planning/assign-shift.ts` ;
- `lib/services/planning/assign-draftshift.ts` ;
- `lib/services/planning/matching.service.ts` ;
- `prisma/schema.prisma`.

### Anomalie résiduelle prouvée
- aucune anomalie inter-tenant bloquante n’est prouvée sur le périmètre ALPHA réellement inspecté.

### Limite de preuve / information non fournie
- `middleware.ts` n’est pas présent ;
- `app/api/rules/**/*` n’est pas présent ;
- aucune validation E2E multi-sociétés n’est fournie ;
- aucune protection base externe (RLS, policies SQL, middleware infra) n’est auditée ;
- `npm run lint` et `npm run build` ne sont pas exécutables dans cet environnement faute de dépendances installées.

## 6. Conclusion probatoire

Conclusion factuelle :
- les correctifs `TENANT-02` et `TENANT-03` sont bien présents dans le code actuel ;
- le périmètre multi-tenant ALPHA inspecté reste cohérent après ces corrections ;
- aucune régression inter-tenant n’est prouvée ;
- aucun correctif supplémentaire strictement indispensable n’est établi.

Conclusion de validation :
- `TENANT-04` est **conforme** sur le périmètre ALPHA réellement inspecté.

# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation officielle lue

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
- docs/1-master/ETAT_GLOBAL_PROJET.md
- docs/1-master/REGISTRE_DECISIONS.md

Constats documentaires utiles :
- DOCUMENT_MAITRE : multi-tenant strict via `companyId`, session enrichie,
  RBAC/permissions, regle `CODE > DOCUMENTATION`.
- PLAN_DE_DEVELOPPEMENT : RGPD-01 est une session AUDIT devant sortir un verdict
  formel ; RGPD-LOT-02 est la suite correction/completion du bloc.
- DOCUMENT_CADRAGE_FONCTIONNEL :
  - 05.4 : archivage utilisateur sans suppression d'historique ;
  - 05.5 : suppression definitive utilisateur exceptionnelle et encadree ;
  - 05.6 : gestion des absences ;
  - 06.6 : acces audit par ADMIN, GERANT, support et permission dediee ;
  - 13.1 : creation / modification / desactivation utilisateur attendues dans
    l'audit critique ;
  - 13.2 : audit des connexions ;
  - 13.3 : page audit dediee ;
  - 15.4 : politique de conservation des exports encore ouverte.
- ETAT_GLOBAL_PROJET : la base RGPD fait partie des priorites de consolidation.

### Cartographie code observee

#### Modeles / tables

- `prisma/schema.prisma`
  - `User` :
    `email`, `password`, `name`, `role`, `platformRole`, `companyId`, `depotId`,
    `isActive`, `createdAt`, `updatedAt`.
  - `UserAbsence` :
    `companyId`, `userId`, `reason`, `startAt`, `endAt`, `createdAt`,
    `updatedAt`.
  - `PlanningAuditLog` :
    `companyId`, `actorUserId`, `runId`, `action`, `entityType`, `entityId`,
    `summary`, `payload`, `createdAt`.
  - `LoginAuditLog` :
    `companyId`, `actorUserId`, `email`, `success`, `reason`, `payload`,
    `createdAt`.

#### Auth / session / acces

- `lib/auth.ts`
  - authentification par `email` + `password` compare via `bcrypt.compare` ;
  - trace login succes/echec dans `LoginAuditLog` ;
  - session JWT enrichie avec `id`, `role`, `platformRole`, `companyId`,
    `isGlobalSupport`.
- `types/next-auth.d.ts`
  - confirme l'exposition de `id`, `email`, `name`, `role`, `platformRole`,
    `companyId` dans la session.
- `lib/permissions.ts`
  - acces natif pour `ADMIN` et `GERANT` ;
  - permissions dediees pour `USERS_MANAGE`, `AUDIT_VIEW`, `PLANNING_EXPORT` ;
  - support global autorise uniquement sur `canViewAudit`.
- `prisma/seed.ts`
  - support global seedable avec `platformRole=SUPPORT`, `role=null`,
    `companyId=null`.

#### Users / absences / UI admin

- `app/api/users/route.ts`
  - GET liste des utilisateurs actifs du tenant courant ;
  - POST creation user avec `email`, `password`, `name`, `role`.
- `app/api/users/[id]/route.ts`
  - GET detail utilisateur ;
  - PATCH correction user (`name`, `email`, `role`, `permissionCodes`).
- `app/api/users/[id]/archive/route.ts` +
  `lib/services/users/archive-user.ts`
  - archivage logique via `isActive=false`.
- `app/api/users/[id]/reset-password/route.ts`
  - correction du mot de passe par un utilisateur autorise.
- `app/api/users/[id]/absences/route.ts` +
  `app/api/users/[id]/absences/[absenceId]/route.ts` +
  `lib/services/users/user-absence.ts`
  - lecture, creation, modification et suppression physique des absences.
- `app/users/*.tsx`
  - UI d'administration users, edition, absences, reset password.

#### Audit

- `app/api/audit/route.ts`
  - agrege `PlanningAuditLog` et `LoginAuditLog` ;
  - filtre par `companyId`, `entityType`, `entityId` ;
  - retourne `actorUser` avec `id`, `name`, `email`.
- `app/audit/page.tsx` + `app/audit/audit-client.tsx`
  - page dediee audit ;
  - support global peut choisir un `companyId`.
- `lib/services/audit/login-audit.ts`
  - ecriture directe de `LoginAuditLog`.
- `lib/services/audit/support-action-trace.ts`
  - ecriture d'audit reservee au support global avec `supportReason`
    obligatoire.
- `lib/services/planning/planning-audit.ts`
  - ecriture des logs planning.

#### Exports / imports

- `app/api/planning/exports/route.ts`
  - export CSV/XLSX/PDF avec controle `canViewSelf`/`canViewGlobal` +
    `canExportPlanning`.
- `lib/planning/export.ts`
  - les lignes exportees incluent `user.name`, `user.email`, `user2.name`,
    `user2.email`, depot, vehicule, notes et motif d'annulation.
- `app/api/imports/route.ts`
  - import accessible seulement aux roles `ADMIN` / `GERANT`.
- `lib/imports/import-engine.ts`
  - domaines observes : `users`, `vehicles`, `templates`, `depots`,
    `user-absences` ;
  - import `users` avec `email`, `name`, `role`, `password`, `depotName` ;
  - import `user-absences` avec `userEmail`, `reason`, `startAt`, `endAt` ;
  - apercu d'import users masque le mot de passe.

### Finalites observables dans le depot

Inference explicite a partir du code audite :
- authentifier un utilisateur et tracer ses connexions ;
- administrer les comptes utilisateur et leurs permissions ;
- gerer les indisponibilites / absences ;
- afficher et exporter le planning nominatif ;
- tracer les operations planning/login ;
- importer des donnees initiales users et absences.

Aucun registre explicite des finalites n'a ete observe dans le depot.

### Absences de preuve constatees

- Aucune politique de conservation des users, absences, logs d'audit ou exports
  generes n'a ete observee dans le code.
- Aucune route dediee d'export RGPD des donnees personnelles users/absences/
  audit n'a ete observee.
- Aucun workflow documentaire ou technique de droit d'acces, rectification ou
  suppression RGPD n'a ete observe hors operations metier partielles.
- Aucune mention d'information ou registre de traitement n'a ete observe dans
  le perimetre documentaire relu pour cette session.

### Validation terminale

- Aucune validation terminale applicative relancee :
  - aucun patch code n'a ete produit ;
  - aucune impossibilite materielle n'a empeche l'audit ;
  - la session est une sortie `NO_PATCH` documentaire.

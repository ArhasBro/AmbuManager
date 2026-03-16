# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réellement inspecté
- `prisma/schema.prisma`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/users/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/add-vehicle-form.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/dashboard/page.tsx`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`

## Preuves code — absence de modèle et de rattachements Prisma

### Schéma métier
- `prisma/schema.prisma`
  - aucun modèle `Base`, `Depot`, `Depôt`, `Agency`, `Site`, `Location` ou équivalent métier ;
  - modèles visibles : `Company`, `User`, `Vehicle`, `CompanyRule`, `ShiftTemplate`, `DraftShift`, `Shift`, `AutoScheduleRun`, `MaintenanceType`, `PlanningAuditLog`.

### Vérification ciblée des relations attendues
- `prisma/schema.prisma`
  - `User` : aucun `baseId` / `depotId` ;
  - `Vehicle` : aucun `baseId` / `depotId` ;
  - `Shift` : aucun `baseId` / `depotId` ;
  - `DraftShift` : aucun `baseId` / `depotId` ;
  - `ShiftTemplate` : aucun `baseId` / `depotId`.

Constat probant :
- aucune base/dépôt n’est matérialisée au niveau data ;
- aucun rattachement `* -> base` n’est déjà préparé dans le schéma visible.

## Preuves code — absence d’API dédiée

### Routes réellement présentes inspectées
- `app/api/users/route.ts`
  - périmètre utilisateurs ;
  - aucun endpoint base/dépôt.
- `app/api/vehicles/route.ts`
  - périmètre véhicules ;
  - aucun endpoint base/dépôt.
- `app/api/planning/shifts/route.ts`
  - listing autour de `companyId`, `user`, `user2`, `vehicle`, `template`, `run` ;
  - aucun champ base.
- `app/api/planning/shifts/[id]/assign/route.ts`
  - assignation bornée à `userId`, `user2Id`, `vehicleId` ;
  - aucun `baseId` ou route dédiée.
- `app/api/company/profile/route.ts`
  - mise à jour du profil société ;
  - pas de gestion de base/dépôt.
- `app/api/company/rules/route.ts`
  - lecture / écriture de `CompanyRule` ;
  - pas de gestion de base/dépôt.

Constat probant :
- aucune route `app/api/bases/*`, `app/api/depots/*` ou équivalent n’est visible sur le dépôt inspecté.

## Preuves code — absence d’UI dédiée

### Dashboard et pages visibles
- `app/dashboard/page.tsx`
  - liens visibles : `Planning`, `Profil société`, `Réinitialisation mot de passe`, `Véhicules` ;
  - aucun lien bases/dépôts.
- `app/company/page.tsx`
  - page `Profil société` uniquement.
- `app/users/page.tsx`
  - page utilisateurs / reset mot de passe uniquement.
- `app/vehicles/page.tsx`
  - page véhicules uniquement.
- `app/planning/page.tsx`
  - page planning uniquement.
- `app/vehicles/add-vehicle-form.tsx`
  - formulaire véhicule avec seulement `immatriculation` et `type`.
- `app/vehicles/vehicles-client.tsx`
  - rendu véhicule avec `immatriculation`, `type`, `status` ;
  - aucun affichage de base.
- `app/company/company-profile-form.tsx`
  - formulaire profil société avec `name`, `managerNames`, `address`, `phone`, `siret` ;
  - aucun champ base.

Constat probant :
- aucune UI dédiée aux bases/dépôts n’est visible ;
- aucune UI voisine ne montre un rattachement partiel à une base.

## Preuves code — absence de permissions / module transverse dédiés

- `lib/permission-catalog.ts`
  - permissions visibles : planning, users, rôles/permissions, vehicles, templates, règles société, audit, dashboard ;
  - aucune permission dédiée aux bases/dépôts.
- `lib/permissions.ts`
  - helpers exposés : autoschedule, users, vehicles, règles société, audit, planning, dashboard ;
  - aucun helper `canManageBases` ou équivalent.

## Preuves code — absence côté templates

- `scripts/create-shift-template.ts`
  - création d’un template avec `companyId`, `name`, `category`, `requiredRole`, `isActive`, horaires ;
  - aucun champ base.
- `scripts/list-shift-templates.ts`
  - listing des templates avec `id`, `name`, `isActive`, `category`, horaires ;
  - aucun champ base.

## Traces ambiguës identifiées et reclassées correctement

### Variables techniques non métier
- `app/api/planning/shifts/route.ts`
  - variable locale `base` utilisée pour calculer un lundi de semaine ;
  - pas une base/dépôt métier.
- `app/api/planning/autoschedule/week/route.ts`
  - même logique de variable locale `base` sur un calcul de date ;
  - pas une base/dépôt métier.

### Vocabulaire voisin non requalifié
- `Company` / `companyId` = société, pas base/dépôt ;
- “base officielle produit” / “base de travail” dans la documentation = notion documentaire, pas entité métier.

## Vérifications techniques réellement exécutées

- relecture documentaire du pack imposé ;
- inspection statique ciblée du schéma Prisma ;
- inspection ciblée des routes API réellement présentes ;
- inspection ciblée des pages / formulaires réellement présents ;
- inspection du catalogue de permissions ;
- inspection des scripts templates ;
- recherches textuelles transversales ciblées sur les termes `base`, `bases`, `dépôt`, `depot`, `agence`, `agency`, `site`, `location`, `branch`, `baseId`, `depotId`, `agencyId`, `siteId`, `locationId`.

## Résultat des vérifications terminales éventuelles

Aucune vérification `lint`, `build` ou test automatisé n’a été lancée.

Motif :
- audit sans patch code ;
- consigne de session : pas de `lint/build` obligatoire si aucun patch code.

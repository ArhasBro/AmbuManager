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
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/3-patches/README.md`

### Code réellement inspecté
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/depots/page.tsx`

## Preuves code — existence réelle du concept template

### Schéma métier
- `prisma/schema.prisma`
  - modèle `ShiftTemplate` réellement présent ;
  - relations `ShiftTemplate -> DraftShift[]` ;
  - relations `ShiftTemplate -> Shift[]` ;
  - champ `companyId` sur le template ;
  - aucun `depotId` sur `ShiftTemplate`.

### Seed et scripts
- `prisma/seed.ts`
  - données `templates` réellement seedées par société ;
  - upsert réel des templates.
- `scripts/create-shift-template.ts`
  - création réelle d’un `ShiftTemplate`.
- `scripts/list-shift-templates.ts`
  - lecture réelle des templates.

Constat probant :
- le concept de template existe réellement dans le dépôt ;
- il n’est pas seulement documentaire.

## Preuves code — absence réelle du lien `ShiftTemplate -> Depot`

### Prisma
- `prisma/schema.prisma`
  - `Depot` est relié à `Vehicle`, `User`, `Shift` ;
  - `ShiftTemplate` n’a aucune relation vers `Depot` ;
  - `DraftShift` n’a aucun `depotId` ;
  - `Shift` a bien `depotId`.

Constat probant :
- la chaîne actuelle est `ShiftTemplate -> DraftShift -> Shift` ;
- le dépôt n’entre dans la chaîne qu’au niveau `Shift`.

## Preuves code — état réel des routes concernées

### Génération DAY/WEEK
- `app/api/planning/autoschedule/day/route.ts`
  - lecture des templates actifs par `companyId` et éventuellement `category` ;
  - création de `DraftShift` avec `templateId`, sans dépôt.
- `app/api/planning/autoschedule/week/route.ts`
  - même logique de génération hebdomadaire ;
  - pas de `depotId` dans le body ni dans les brouillons créés.

### Lecture d’un run
- `app/api/planning/autoschedule/runs/[id]/route.ts`
  - renvoie les `draftShifts` avec `template`, `user`, `vehicle` ;
  - ne renvoie aucun dépôt sur les brouillons.

### Publication
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
  - copie `templateId`, `userId`, `user2Id`, `vehicleId`, `notes` des brouillons vers les shifts ;
  - ne copie aucun dépôt depuis les brouillons car les brouillons n’en portent pas.

### Affectation manuelle
- `app/api/planning/shifts/[id]/assign/route.ts`
  - accepte `depotId` sur `Shift` publié ;
  - refuse explicitement `depotId` sur `DraftShift` avec `DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT`.
- `lib/services/planning/assign-shift.ts`
  - persiste `depotId` sur `Shift`.
- `lib/services/planning/assign-draftshift.ts`
  - ne traite aucun dépôt.

Constat probant :
- la gestion dépôt est volontairement bornée au niveau `Shift` publié.

## Preuves code — compatibilité UX réelle

### Planning
- `app/planning/page.tsx`
  - charge les dépôts actifs de la société.
- `app/planning/planning-client.tsx`
  - affiche le dépôt d’un shift quand il existe ;
  - propose un sélecteur `Base` ;
  - réutilise la même route d’assignation ;
  - les brouillons ne portent pas de dépôt dans les données chargées.

Constat probant :
- l’UX actuelle sait manipuler la base au niveau du shift publié ;
- elle n’expose pas un flux template/base.

## Preuves code — état réel RBAC / permissions

- `lib/permission-catalog.ts`
  - permission `TEMPLATES_MANAGE` réellement listée.
- `lib/permissions.ts`
  - aucun helper dédié à la gestion de templates n’est exposé.

Constat probant :
- un futur module templates est pressenti ;
- il n’est pas encore réellement branché dans les contrôles d’accès visibles.

## Vérifications terminales réellement exécutées

Aucune vérification `lint`, `build` ou tests automatisés n’a été lancée.

Motif :
- session de type `AUDIT` ;
- aucun patch code ;
- l’objectif est l’arbitrage, pas la validation d’une implémentation.

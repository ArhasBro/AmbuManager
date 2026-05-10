# EVIDENCES

## Sources utilisées
### Documentation autorisée
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code contrôlé
- `prisma/schema.prisma`
- `prisma/migrations/20260226173545_add_shift_templates/migration.sql`
- `prisma/migrations/20260226181203_autoschedule_planning_v4_1_1/migration.sql`
- `prisma/migrations/20260226193652_add_shift_model/migration.sql`
- `prisma/migrations/20260228235126_phase2_shift_indexes/migration.sql`
- `prisma/migrations/20260302131627_add_draftshift_conflict_indexes/migration.sql`
- `prisma/migrations/20260302154141_add_second_employee_slots/migration.sql`
- `prisma/migrations/20260317213000_base09_fix_attach_shift_to_depot/migration.sql`
- `prisma/seed.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`
- `scripts/disable-corrupted-template-journee.ts`

## Constats factuels
### Schéma `ShiftTemplate`
`prisma/schema.prisma` montre le modèle suivant :
- identifiant `id` ;
- rattachement multi-tenant `companyId` ;
- identité métier `name` ;
- champs actuellement branchés `category`, `requiredRole`, `isActive`, `startTime`, `endTime`, `crossesMidnight` ;
- horodatage `createdAt`, `updatedAt` ;
- relations `company`, `draftShifts`, `shifts` ;
- contrainte `@@unique([companyId, name])` ;
- index `@@index([companyId])` ;
- index `@@index([companyId, category])`.

### Migrations
- `20260226173545_add_shift_templates` crée la table `ShiftTemplate` avec :
  - `companyId`
  - `name`
  - `startTime`
  - `endTime`
  - `crossesMidnight`
  - `createdAt`
  - `updatedAt`
  - index `companyId`
  - unicité `(companyId, name)`
- `20260226181203_autoschedule_planning_v4_1_1` ajoute sur `ShiftTemplate` :
  - `category`
  - `isActive`
  - `requiredRole`
  et crée `DraftShift` avec `templateId -> ShiftTemplate.id`.
- `20260226193652_add_shift_model` crée `Shift` avec `templateId -> ShiftTemplate.id`.
- `20260228235126_phase2_shift_indexes` ajoute des index de conflits sur `Shift`.
- `20260302131627_add_draftshift_conflict_indexes` ajoute des index de conflits sur `DraftShift`.
- `20260302154141_add_second_employee_slots` ajoute `user2Id` à `DraftShift` et `Shift`.
- `20260317213000_base09_fix_attach_shift_to_depot` ajoute `depotId` à `Shift`.

### Seed
`prisma/seed.ts` consomme uniquement des champs réellement présents dans `ShiftTemplate` :
- `name`
- `category`
- `startTime`
- `endTime`
- `crossesMidnight`
- `requiredRole`
- `isActive`

Le seed s’appuie sur l’unicité Prisma `companyId_name`.

### Usages runtime contrôlés
- `app/api/planning/autoschedule/day/route.ts`
  - lit `companyId`, `isActive`, `category`, `startTime`, `endTime`, `crossesMidnight`
  - crée des `DraftShift` avec `templateId`
- `app/api/planning/autoschedule/week/route.ts`
  - même consommation que l’autoschedule day
  - répète la génération sur 7 jours
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
  - relit `templateId` depuis `DraftShift`
  - recopie `templateId` dans `Shift`
- `lib/services/planning/assign-draftshift.ts`
  - lit `draft.template.category`
  - dérive uniquement un nombre de slots depuis la catégorie
- `lib/services/planning/assign-shift.ts`
  - lit `shift.template.category`
  - même logique limitée de slots
- `lib/services/planning/matching.service.ts`
  - lit `template.requiredRole`
  - ne consomme aucun autre champ template
- `app/api/planning/shifts/route.ts`
  - expose seulement `template.id`, `template.name`, `template.category`

## Validation de preuve
Conclusion factuelle retenue :
- aucun usage contrôlé n’appelle un champ template absent du schéma ;
- aucune incohérence Prisma/migration strictement bloquante n’a été prouvée sur `ShiftTemplate` ;
- la session ne justifie pas l’ouverture immédiate d’un patch de correction modèle.

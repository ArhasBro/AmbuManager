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
- `prisma/seed.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- `prisma/migrations/20260407093000_tpl03_enforce_template_company_integrity/migration.sql`

## Constats factuels
### 1. Le principe projet impose un multi-tenant strict
`docs/1-master/DOCUMENT_MAITRE.md` fixe explicitement :
- multi-tenant strict via `companyId` ;
- cloisonnement par société.

### 2. Les trois modèles portent un `companyId`
`prisma/schema.prisma` montre :
- `ShiftTemplate.companyId` ;
- `DraftShift.companyId` ;
- `Shift.companyId`.

### 3. Les relations template existantes ne verrouillent pourtant que `templateId`
Dans `prisma/schema.prisma` :
- `DraftShift.template` référence `ShiftTemplate` uniquement via `fields: [templateId], references: [id]` ;
- `Shift.template` référence `ShiftTemplate` uniquement via `fields: [templateId], references: [id]`.

Dans les migrations historiques :
- `20260226181203_autoschedule_planning_v4_1_1` crée `DraftShift_templateId_fkey` vers `ShiftTemplate(id)` ;
- `20260226193652_add_shift_model` crée `Shift_templateId_fkey` vers `ShiftTemplate(id)`.

### 4. Le code runtime, lui, travaille déjà par société
- autoschedule day/week lit les templates avec `where: { companyId, isActive, category? }` puis crée des `DraftShift` avec le même `companyId` ;
- le publish crée des `Shift` en recopiant `companyId` et `templateId` depuis les `DraftShift` ;
- l’assignation et le matching relisent ensuite le template lié pour `category` ou `requiredRole`.

### 5. Défaut relationnel strictement prouvé
La combinaison des points 2, 3 et 4 prouve qu’un écart reste possible au niveau base :
- un `DraftShift` ou un `Shift` peut référencer un `ShiftTemplate` d’une autre société tant que l’`id` existe ;
- cet écart contredit le cloisonnement strict attendu via `companyId`.

## Correction minimale produite
La migration `20260407093000_tpl03_enforce_template_company_integrity` apporte :
- un nettoyage défensif des éventuels rattachements historiques incohérents ;
- un trigger de garde sur `DraftShift` ;
- un trigger de garde sur `Shift` ;
- un trigger empêchant le déplacement inter-sociétés d’un template déjà référencé.

## Conclusion de preuve
`TPL-02` restait correct sur les **champs** du modèle template.
En revanche, un **défaut relationnel multi-tenant réel** persistait bien entre `ShiftTemplate`, `DraftShift` et `Shift`.
Ce défaut justifie l’ouverture d’un patch minimal dans `TPL-03`.

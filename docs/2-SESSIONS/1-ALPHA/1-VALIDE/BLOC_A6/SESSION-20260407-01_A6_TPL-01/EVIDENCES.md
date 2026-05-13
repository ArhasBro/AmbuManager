# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées
### Documents méthodologiques et cadrage
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
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`
- `scripts/disable-corrupted-template-journee.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

---

## Preuves structurantes

### 1. Le modèle `ShiftTemplate` existe réellement
- `prisma/schema.prisma:257-285`
  - modèle `ShiftTemplate`
  - champs : `name`, `category`, `requiredRole`, `isActive`, `startTime`, `endTime`, `crossesMidnight`
  - relations vers `DraftShift[]` et `Shift[]`
  - unique `(companyId, name)` et index `(companyId, category)`

### 2. Le modèle a évolué en deux temps réels
- `prisma/migrations/20260226173545_add_shift_templates/migration.sql:2-22`
  - création initiale de la table `ShiftTemplate`
- `prisma/migrations/20260226181203_autoschedule_planning_v4_1_1/migration.sql:11-18`
  - ajout de `category`, `isActive`, `requiredRole`
- `prisma/migrations/20260226181203_autoschedule_planning_v4_1_1/migration.sql:31-77`
  - création de `DraftShift` avec `templateId`
- `prisma/migrations/20260226193652_add_shift_model/migration.sql:2-41`
  - création de `Shift` avec `templateId`

### 3. Seed réel présent
- `prisma/seed.ts:95-103`
  - définition du contrat de seed templates
- `prisma/seed.ts:249-279`
  - `upsertTemplate(...)`
- `prisma/seed.ts:337-355`
  - templates société A
- `prisma/seed.ts:375-384`
  - template société B

### 4. Scripts existants mais ponctuels
- `scripts/create-shift-template.ts:13-61`
  - création ciblée avec `companyId` codé en dur
- `scripts/list-shift-templates.ts:13-31`
  - listing brut par `companyId` codé en dur
- `scripts/disable-corrupted-template-journee.ts:13-38`
  - désactivation ciblée d’un template `Journée`
  - commentaire explicite sur un cas d’id vide/corrompu

### 5. Usages réels dans l’autoschedule
- `app/api/planning/autoschedule/day/route.ts:130-177`
  - lecture `shiftTemplate.findMany({ where: { companyId, isActive, category? } })`
  - création de `DraftShift` à partir de `startTime`, `endTime`, `crossesMidnight`
- `app/api/planning/autoschedule/week/route.ts:155-219`
  - même logique, répétée 7 jours
  - aucun champ de récurrence stocké sur le template

### 6. Publish réel
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:401-469`
  - lecture des `DraftShift`
  - copie de `templateId` vers `Shift`
  - aucune logique template avancée recalculée au publish

### 7. Usages réels dans le planning et l’assignation
- `app/api/planning/shifts/route.ts:124-151`
  - le planning expose `template: { id, name, category }`
- `app/api/planning/shifts/[id]/assign/route.ts:70-119`
  - l’assignation lit seulement `template.category`
  - le nombre de slots autorisés dépend de la catégorie
- `lib/services/planning/assign-shift.ts:26-28,52-79`
  - 1 ou 2 slots selon `category`
- `lib/services/planning/assign-draftshift.ts`
  - même logique côté brouillon

### 8. Matching réel mais limité
- `lib/services/planning/matching.service.ts:77-116`
  - le matching lit seulement `template.requiredRole`
- `lib/services/planning/matching.service.ts:180-265`
  - matching par rôle requis unique
  - proposition sur `userId` uniquement
  - aucune composition minimale configurable, aucun type de véhicule requis

### 9. UI réelle
- `app/planning/page.tsx:22-31,75-80`
  - page planning branchée sur droits planning / règles société, pas sur un module templates
- `app/planning/planning-client.tsx:7-19`
  - le type client ne retient du template que `id`, `name`, `category`
- `app/planning/planning-client.tsx:1368-1410`
  - UI orientée génération / publication / annulation de run
- `app/planning/planning-client.tsx:1700-1704`
  - le template est affiché comme mission
- `app/planning/planning-client.tsx:1812-1853`
  - la catégorie pilote l’affichage, pas un module d’administration template

### 10. Gouvernance / permissions réelles
- `lib/permission-catalog.ts:62-65`
  - `TEMPLATES_MANAGE` existe dans le catalogue
- `lib/permissions.ts:47-107`
  - aucune fonction dédiée `canManageTemplates`
  - aucune utilisation runtime de `TEMPLATES_MANAGE` dans le code contrôlé
- recherche dépôt :
  - `rg -n "TEMPLATES_MANAGE|canManageTemplates|/templates|shiftTemplate" app lib scripts prisma`
  - pas de page produit templates ni d’API dédiée templates dans le dépôt contrôlé

---

## Conclusion probante
Le dépôt prouve une **base technique templates déjà branchée au planning**, mais ne prouve pas encore l’existence d’un **module A6 autonome, administrable et conforme au module 09**.

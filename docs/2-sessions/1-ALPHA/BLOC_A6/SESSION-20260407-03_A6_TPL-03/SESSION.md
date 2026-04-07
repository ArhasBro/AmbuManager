# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260407-03_A6_TPL-03
Bloc : A6 — Shift templates
Type : CORRECTION
Version cible : 1-ALPHA

## Objectif unique
Recontrôler le modèle `ShiftTemplate` et ses relations vers `DraftShift` / `Shift`, puis corriger uniquement un défaut de schéma réellement prouvé si un écart de cohérence multi-tenant subsiste après `TPL-02`.

## Périmètre exact traité
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
- documents maîtres, protocole, sources autorisées, structure docs, template d’ouverture

## Résultat synthétique de session
`TPL-02` n’a pas laissé de défaut de champs ou de nullabilité sur `ShiftTemplate`, mais un défaut relationnel réel subsistait au niveau base :
- `ShiftTemplate`, `DraftShift` et `Shift` portent tous un `companyId` ;
- pourtant les relations `DraftShift.templateId -> ShiftTemplate.id` et `Shift.templateId -> ShiftTemplate.id` ne validaient que l’identifiant template, sans imposer l’appartenance à la même société.

Ce point contredit le principe projet de **multi-tenant strict via `companyId`** et la logique réelle du code, qui lit et crée les templates par société.

La session produit donc un **patch minimal légitime** :
- nouvelle migration SQL de durcissement relationnel ;
- nettoyage défensif d’éventuels liens historiques incohérents ;
- triggers SQL empêchant les rattachements inter-sociétés template -> `DraftShift` / `Shift` ;
- garde empêchant le changement de `companyId` d’un template déjà référencé.

Aucun ajout métier `TPL-04+` n’a été introduit.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03`

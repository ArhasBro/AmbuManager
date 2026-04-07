# SESSION

Projet : Investissement  
Sous-projet : Ambulance Manager  
Session : SESSION-20260407-01_A6_TPL-01  
Bloc : A6 — Shift templates  
Type : AUDIT  
Version cible : 1-ALPHA

## Objectif unique
Auditer complètement l’existant réel autour de `ShiftTemplate` afin d’établir l’état de départ du bloc A6, sans ouvrir le scope de correction des sessions suivantes.

## Périmètre exact traité
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
- documents maîtres, protocole, sources autorisées, structure docs, template d’ouverture

## Résultat synthétique de session
`ShiftTemplate` existe réellement comme **modèle de données multi-tenant exploité par le planning**, avec seed, scripts ponctuels, génération autoschedule jour/semaine, traçage `templateId` sur `DraftShift` et `Shift`, usages limités dans l’assignation et le matching, puis affichage dans l’UI planning.

En revanche, le **module produit A6 au sens du cadrage module 09 n’existe pas encore comme module administrable autonome** :
- pas d’API dédiée templates ;
- pas d’UI dédiée templates ;
- pas de branchement runtime réel de `TEMPLATES_MANAGE` ;
- pas de composition minimale d’équipe configurable ;
- pas de type de véhicule requis ;
- pas de nombre minimal de personnes requis ;
- pas de couleurs libres ;
- pas d’archivage métier réel distinct de `isActive`.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01`

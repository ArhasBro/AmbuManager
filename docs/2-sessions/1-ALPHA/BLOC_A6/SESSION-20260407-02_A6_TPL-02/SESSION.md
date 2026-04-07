# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260407-02_A6_TPL-02
Bloc : A6 — Shift templates
Type : VALIDATION
Version cible : 1-ALPHA

## Objectif unique
Vérifier factuellement le schéma actuel de `ShiftTemplate` et sa cohérence réelle avec les migrations, le seed et les usages déjà branchés, sans ouvrir la correction du bloc.

## Périmètre exact traité
- `prisma/schema.prisma`
- `prisma/migrations/20260226173545_add_shift_templates/migration.sql`
- `prisma/migrations/20260226181203_autoschedule_planning_v4_1_1/migration.sql`
- `prisma/migrations/20260226193652_add_shift_model/migration.sql`
- `prisma/migrations/20260228235126_phase2_shift_indexes/migration.sql`
- `prisma/migrations/20260302131627_add_draftshift_conflict_indexes/migration.sql`
- `prisma/migrations/20260302154141_add_second_employee_slots/migration.sql`
- `prisma/migrations/20260317213000_base09_fix_attach_shift_to_depot/migration.sql`
- `prisma/seed.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`
- `scripts/disable-corrupted-template-journee.ts`
- documents maîtres, protocole, sources autorisées, structure docs, template d’ouverture

## Résultat synthétique de session
Le modèle `ShiftTemplate` actuellement présent dans `prisma/schema.prisma` est **techniquement cohérent sur le périmètre contrôlé** :
- les champs réellement consommés par le seed, l’autoschedule, le publish, l’assignation et le matching existent bien ;
- les liens `ShiftTemplate -> DraftShift -> Shift` sont matérialisés par des clés étrangères cohérentes ;
- l’historique des migrations explique correctement le modèle template actuel et les relations template vers `DraftShift` et `Shift`.

Aucun défaut de schéma **strictement prouvé et immédiatement bloquant** n’a été trouvé dans `TPL-02`.
La session se conclut donc en **NO_PATCH code**, avec finalisation documentaire uniquement.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-02_A6_TPL-02`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-02_A6_TPL-02`

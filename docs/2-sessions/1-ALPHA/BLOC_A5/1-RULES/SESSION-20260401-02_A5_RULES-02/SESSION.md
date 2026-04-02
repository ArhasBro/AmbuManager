# SESSION

Projet : Investissement  
Sous-projet : Ambulance Manager  
Session : SESSION-20260401-02_A5_RULES-02  
Bloc : A5 — Règles métier et paramètres société  
Type : VALIDATION  
Version cible : 1-ALPHA

## Objectif unique
Valider formellement le modèle de règles actuel réellement présent dans le dépôt, sans refondre le module A5.

## Périmètre exact traité
- `prisma/schema.prisma`
- `prisma/migrations/20260226173427_add_company_rules/migration.sql`
- `app/api/company/rules/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- documents maîtres, protocole, sources autorisées, template d’ouverture

## Résultat synthétique de session
Le modèle `CompanyRule` / `RuleMode` est **cohérent et techniquement sain pour les usages réellement branchés** dans le dépôt contrôlé :
- `PLANNING_MIN_REST_HOURS`
- `PLANNING_VIEW_MODE`

Le module A5 global reste **partiel** au regard du cadrage du module 08, mais cela ne justifie **aucun correctif minimal** sur le modèle de données dans le périmètre strict de `RULES-02`.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02`

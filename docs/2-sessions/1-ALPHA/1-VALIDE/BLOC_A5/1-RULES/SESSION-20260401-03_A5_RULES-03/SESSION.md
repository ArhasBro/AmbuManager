# SESSION

Projet : Investissement  
Sous-projet : Ambulance Manager  
Session : SESSION-20260401-03_A5_RULES-03  
Bloc : A5 — Règles métier et paramètres société  
Type : AUDIT  
Version cible : 1-ALPHA

## Objectif unique
Auditer factuellement l’usage réel des règles existantes dans le moteur, sans refondre le module A5.

## Périmètre exact traité
- `prisma/schema.prisma`
- `prisma/migrations/20260226173427_add_company_rules/migration.sql`
- `app/api/company/rules/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/user-absence.ts`
- documents maîtres, protocole, sources autorisées, template d’ouverture

## Résultat synthétique de session
Le dépôt prouve un usage réel de `CompanyRule`, mais cet usage est **partiel et hétérogène** :
- vrai usage moteur prouvé : `PLANNING_MIN_REST_HOURS`
- simple réglage UI prouvé : `PLANNING_VIEW_MODE`

Le moteur actuel n’est pas vide :
- `PLANNING_MIN_REST_HOURS` est bien lu dans les flux manuels et dans la publication autoschedule ;
- `RuleMode` est réellement exploité dans le code.

En revanche, l’exploitation est **non homogène selon les flux** :
- en affectation manuelle, la règle ne contrôle que le repos avant le shift courant ;
- en publication autoschedule, le calcul contrôle les écarts adjacents sur la timeline complète ;
- en affectation manuelle, les alertes calculées ne sont pas réellement remontées à l’UI ;
- les valeurs invalides sont traitées différemment entre affectation manuelle et publication.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-03_A5_RULES-03`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-03_A5_RULES-03`

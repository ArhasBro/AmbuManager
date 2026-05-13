# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260401-04_A5_RULES-04
Bloc : A5 — Règles métier et paramètres société
Type : CORRECTION
Version cible : 1-ALPHA

## Objectif unique
Corriger strictement les usages déjà réellement branchés de `CompanyRule` / `RuleMode`, sans refonte du module A5.

## Périmètre exact traité
- `lib/types/planning.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/planning-client.tsx`
- relecture de référence sur `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- relecture de référence sur `app/api/company/rules/route.ts`
- documents maîtres, protocole, sources autorisées, structure docs et template d’ouverture

## Résultat synthétique de session
Le patch principal `RULES-04` a été validé à l’intégration et n’est pas rejoué.

Défauts réellement retenus :
- les flux manuels ignoraient silencieusement une valeur invalide de `PLANNING_MIN_REST_HOURS`, alors que la publication autoschedule renvoyait déjà une erreur explicite ;
- les alertes `MIN_REST_VIOLATION` calculées par `assign-shift` / `assign-draftshift` n’étaient pas remontées jusqu’à l’UI.

Correction appliquée :
- harmonisation minimale de la gestion de configuration invalide sur les flux manuels ;
- conservation du rôle neutralisant de `RuleMode.OFF` sur les flux manuels ;
- exposition API des `issues` de l’affectation manuelle ;
- affichage UI lisible des alertes de repos minimum et des blocages/configurations invalides ;
- aucune modification du comportement de `PLANNING_VIEW_MODE`.

## État final de validation documentaire
- patch principal : validé côté intégration ;
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK ;
- `npx prisma validate` : À confirmer ;
- `npx prisma generate` : À confirmer.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-04_A5_RULES-04`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-04_A5_RULES-04`

# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260401-05_A5_RULES-05
Bloc : A5 — Règles métier et paramètres société
Type : COMPLÉTION
Version cible : 1-ALPHA

## Objectif unique
Passer du stockage technique `CompanyRule` vers une couche de paramètres métier compréhensible, centralisée et réutilisable, sans absorber `RULES-06`, `RULES-07` ou `RULES-08`.

## Périmètre exact traité
### Code
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/company/rules/route.ts`
- `app/planning/planning-client.tsx`

### Documentation finale
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/*`
- `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/README_PATCH.md`

## Résultat synthétique de session
Le besoin métier de `RULES-05` est validé après correctif minimal `FIX-01`.

Le patch principal a bien introduit une couche métier centrale réelle et minimale au-dessus de `CompanyRule`.
Cette couche :
- centralise la définition des paramètres métier ALPHA préparés pour la suite ;
- distingue explicitement les règles métier et le réglage UI `PLANNING_VIEW_MODE` ;
- conserve les clés réellement prouvées seulement là où elles existent ;
- n’ajoute aucune fausse implémentation moteur sur les règles non encore branchées.

Compatibilité réelle confirmée :
- `PLANNING_MIN_REST_HOURS` reste branché ;
- `PLANNING_VIEW_MODE` reste fonctionnel, mais séparé du moteur ;
- `RULES-06`, `RULES-07` et `RULES-08` n’ont pas été absorbés dans cette session.

## Historique réel de validation
### Patch principal
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : échec initial sur `Cannot find name 'MIN_REST_RULE_KEY'` dans `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

### Correctif minimal
- patch : `PATCH__SESSION-20260401-05_A5_RULES-05_FIX-01.diff`
- objet : correction ciblée de l’usage résiduel de `MIN_REST_RULE_KEY` dans `publish/route.ts`, sans remettre en cause la centralisation introduite par `RULES-05`
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` après fix : OK
- `npm run build` après fix : OK

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05`

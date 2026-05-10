# RESULTATS

## Résultat principal
Patch code officiel validé :
**`PATCH__SESSION-20260401-04_A5_RULES-04.diff`**

## Défauts réels corrigés
### 1. Configuration invalide non homogène sur les flux manuels
Avant correction :
- `assign-shift` et `assign-draftshift` neutralisaient silencieusement une valeur invalide ;
- `publish` renvoyait déjà une erreur explicite.

Après correction :
- absence de règle => désactivé ;
- `RuleMode.OFF` => désactivé ;
- valeur invalide en mode actif => `RULE_CONFIG_ERROR` sur les flux manuels.

### 2. Alertes manuelles perdues entre service, API et UI
Avant correction :
- les services calculaient des `issues` ;
- la route ne les renvoyait pas ;
- le client affichait toujours un succès générique.

Après correction :
- la route d’affectation renvoie `issues` sur succès ;
- l’UI affiche un message enrichi lorsqu’une `MIN_REST_VIOLATION` est présente ;
- l’UI affiche un message lisible sur `RULE_BLOCKED` et `RULE_CONFIG_ERROR`.

## Fichiers code modifiés
- `lib/types/planning.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/planning-client.tsx`

## Fichiers documentation finale
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## Validation consolidée
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
- `npx prisma validate` : À confirmer
- `npx prisma generate` : À confirmer

## Livrable documentaire final
ZIP documentaire final à plat généré, sans sous-dossiers, conforme à la méthode projet.

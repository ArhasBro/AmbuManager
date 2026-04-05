# RESULTATS

## Livrables de patch réellement retenus
### Patch principal
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05.diff`

### Correctif minimal
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05_FIX-01.diff`

## Résultat fonctionnel validé après fix
Le besoin métier de `RULES-05` est validé.

Résultat retenu :
- une couche métier centrale réelle et minimale existe dans le code ;
- cette couche reste compatible avec `CompanyRule` comme stockage réel ;
- `PLANNING_MIN_REST_HOURS` reste branché ;
- `PLANNING_VIEW_MODE` reste fonctionnel mais séparé du moteur ;
- aucune fausse implémentation moteur n’a été ajoutée pour les règles non branchées ;
- `RULES-06`, `RULES-07` et `RULES-08` ne sont pas absorbés dans cette session.

## Historique de validation retenu
### Avant fix
- `git apply --check` patch principal : OK
- `git apply` patch principal : OK
- `npm run lint` : OK
- `npm run build` : échec initial sur `MIN_REST_RULE_KEY`

### Après `FIX-01`
- `git apply --check` fix : OK
- `git apply` fix : OK
- `npm run lint` après fix : OK
- `npm run build` après fix : OK

## Nature exacte du correctif
`FIX-01` est un correctif minimal.
Il ne remplace pas le patch principal et ne rejoue pas la session.
Il corrige uniquement le résidu build de `publish/route.ts` pour rendre le résultat final effectivement validable.

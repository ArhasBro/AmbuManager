# README_PATCH

## Session liée
`SESSION-20260401-06_A5_RULES-06`

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06`

## Chaîne finale officielle retenue
1. `PATCH__SESSION-20260401-06_A5_RULES-06.diff`
2. `PATCH__SESSION-20260401-06_A5_RULES-06_FIX-03.diff`
3. `PATCH__SESSION-20260401-06_A5_RULES-06_FIX-04.diff`

## Patch principal
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06.diff`

### Objet
Exposer une API paramètres métier ALPHA lisible au-dessus de la couche centrale existante, sans rejouer `RULES-05`, sans absorber `RULES-07`, `RULES-08` ou `RULES-09`, sans casser `PLANNING_MIN_REST_HOURS`, et sans casser `PLANNING_VIEW_MODE`.

## Correctif retenu
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06_FIX-03.diff`

### Objet
Corriger le typage bloquant de `DEFINITIONS_BY_ID` dans `lib/company-rules/api.ts` pour accepter une clé `string`, sans modifier la logique métier.

## Patch de régularisation finale
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06_FIX-04.diff`

### Objet
Régulariser la chaîne officielle des patchs pour formaliser l’existence correcte de `lib/company-rules/api.ts` dans sa version finale validée.

### Qualification
- patch de régularisation code ;
- aucun changement fonctionnel ;
- aucun changement moteur.

## Correctifs intermédiaires non retenus
- `FIX-01` ne fait pas partie de la chaîne finale officielle retenue.
- Aucun `FIX-02` appliqué n’est prouvé.

## Patch documentaire final
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06_DOCS.diff`

## État final réel des validations retenues
### Application des patchs retenus
- `git apply --check` patch principal : OK
- `git apply` patch principal : OK
- `git apply --check` `FIX-03` : OK
- `git apply` `FIX-03` : OK

### Validation terminale finale sur repo équipé
- `npm run lint` : OK
- `npm run build` : OK

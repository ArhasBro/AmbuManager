# RESULTATS

## Livrables de patch réellement retenus
### Patch principal
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06.diff`

### Correctif retenu
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06_FIX-03.diff`

### Patch de régularisation finale
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/PATCH__SESSION-20260401-06_A5_RULES-06_FIX-04.diff`

## Résultat fonctionnel validé
La session `RULES-06` est validée.

Résultat retenu :
- l’API paramètres métier ALPHA est désormais exposée via une couche dédiée ;
- le stockage réel reste basé sur `CompanyRule` ;
- la séparation est conservée entre paramètres moteur réellement branchés et réglages UI ;
- `PLANNING_MIN_REST_HOURS` reste compatible ;
- `PLANNING_VIEW_MODE` reste fonctionnel mais séparé du moteur ;
- aucun élargissement abusif du moteur n’a été ajouté.

## Historique de validation retenu
### Application des patchs retenus
- `git apply --check` patch principal : OK
- `git apply` patch principal : OK
- `git apply --check` `FIX-03` : OK
- `git apply` `FIX-03` : OK

### Validation terminale finale sur repo équipé
- `npm run lint` : OK
- `npm run build` : OK

## Nature exacte des correctifs retenus
- `FIX-03` est le correctif retenu dans la chaîne finale validée.
- `FIX-04` est un patch de régularisation de chaîne officielle.
- `FIX-04` n’ajoute aucun changement fonctionnel et ne modifie pas le moteur.

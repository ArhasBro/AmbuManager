# RESULTATS

## Résultat fonctionnel
Le warning lint `react-hooks/exhaustive-deps` visé sur `loadCompanyLists` a été corrigé en ajoutant la dépendance manquante `availableUsers`.

## Validations réellement confirmées
- `git apply --check` : OK
- `git apply` : OK

## Validations non confirmées dans l'environnement courant
- `npm run lint` : non confirmé
- `npm run build` : non confirmé

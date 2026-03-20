# README_PATCH

## Session liée
SESSION-20260319-23_A3_USERS-15

## Portée
Mini-fix strict USERS-15.

## Objet
Suppression du warning lint `react-hooks/exhaustive-deps` dans `app/planning/planning-client.tsx` en ajoutant `availableUsers` dans les dépendances du `useCallback` `loadCompanyLists`.

## Patch
`docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-23_A3_USERS-15/PATCH__SESSION-20260319-23_A3_USERS-15.diff`

## Commandes d'application vérifiées
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-23_A3_USERS-15/PATCH__SESSION-20260319-23_A3_USERS-15.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-23_A3_USERS-15/PATCH__SESSION-20260319-23_A3_USERS-15.diff"
```

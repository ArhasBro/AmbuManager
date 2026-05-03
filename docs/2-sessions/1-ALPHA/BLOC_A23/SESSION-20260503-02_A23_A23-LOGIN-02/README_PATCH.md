# README_PATCH

## Session liee
SESSION-20260503-02_A23_A23-LOGIN-02

## Type
CORRECTION

## Dossier PATCH
`docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH`

## Patch principal
`PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff`

## Correctif(s)
Aucun correctif additionnel produit.

## Commandes

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH/PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH/PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff"
```

## Portee technique

- Correction minimale du flux post-login dans `app/login/page.tsx`.
- Objectif : shell coherent immediatement apres connexion sans refresh manuel.
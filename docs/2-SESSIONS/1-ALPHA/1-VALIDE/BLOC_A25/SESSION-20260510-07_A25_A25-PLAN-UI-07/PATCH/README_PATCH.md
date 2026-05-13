# README_PATCH

## Session liée

SESSION-20260510-07_A25_A25-PLAN-UI-07

## Type

CORRECTION+COMPLÉTION

## Dossier PATCH

`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_A25-PLAN-UI-07/PATCH`

## Patches produits

- Patch principal : `PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07.diff`
- Patch correctif : `PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07_FIX-01.diff`

## Commandes d’application (informatif)

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_A25-PLAN-UI-07/PATCH/PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_A25-PLAN-UI-07/PATCH/PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07.diff"

git apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_A25-PLAN-UI-07/PATCH/PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07_FIX-01.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_A25-PLAN-UI-07/PATCH/PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07_FIX-01.diff"
```

## Statut et limite de preuve

- Patch principal produit.
- Patch correctif FIX-01 produit.
- Encodage UTF-8 sans BOM vérifié.
- Preuves `git apply --check` fournies.
- Limite importante : le patch FIX-01 joint n’est pas retenu comme preuve de rejouabilité séquentielle complète après patch principal depuis un repo propre.
- La preuve finale retenue pour la session est l’état appliqué validé (`lint/build` RC=0 + validation visuelle Nathan).
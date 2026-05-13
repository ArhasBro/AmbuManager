# README_PATCH

## Session liée

SESSION-20260510-08_A25_A25-PLAN-UI-08

## Type

CORRECTION+COMPLÉTION

## Dossier PATCH

`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH`

## Patchs produits

1. `PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff` (patch principal)
2. `PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff` (correctif QA minimal)

## Ordre d’application

1. `PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff`
2. `PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff`

## Commandes de vérification et d’application

### 1) Patch principal (base HEAD propre)

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff"
```

### 2) Fix-01 (base HEAD + patch principal déjà appliqué)

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff"
```

## Statut

- Patch principal et FIX-01 présents.
- FIX-01 s’applique sur base `HEAD + patch principal`.
- Encodage attendu : UTF-8 sans BOM.
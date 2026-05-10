# README_PATCH

## Session liee
SESSION-20260510-04_A25_A25-PLAN-UI-04

## Type
CORRECTION+COMPLETION

## Dossier PATCH
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04/PATCH

## Patch officiel
PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff

## Encodage
UTF-8 sans BOM

## Commandes d'application

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04/PATCH/PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04/PATCH/PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff"
```

## Note de verification

Dans l'arbre de travail courant, `git apply --check` echoue car le patch correspond deja aux changements appliques localement. La verification controlee a ete faite sur un worktree propre `HEAD` avec succes (`exit code 0`). Voir `EVIDENCES.md`.
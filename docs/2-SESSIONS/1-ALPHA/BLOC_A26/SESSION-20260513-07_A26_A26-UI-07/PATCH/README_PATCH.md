# README_PATCH

## Session liee
SESSION-20260513-07_A26_A26-UI-07

## Type
CORRECTION+COMPLETION

## Dossier PATCH
`docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH`

## Patch principal (historique de session)
- `PATCH__SESSION-20260513-07_A26_A26-UI-07.diff`

## Patch correctif minimal (QA)
- `PATCH__SESSION-20260513-07_A26_A26-UI-07_FIX-01.diff`

## Commandes d'application

### 1) Patch principal
```bash
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH/PATCH__SESSION-20260513-07_A26_A26-UI-07.diff"
git apply         "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH/PATCH__SESSION-20260513-07_A26_A26-UI-07.diff"
```

### 2) Patch FIX-01
```bash
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH/PATCH__SESSION-20260513-07_A26_A26-UI-07_FIX-01.diff"
git apply         "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH/PATCH__SESSION-20260513-07_A26_A26-UI-07_FIX-01.diff"
```

## Note de dependance

Le patch `FIX-01` est un correctif incremental ; il est concu pour s'appliquer sur un etat ou le patch principal est deja applique.

## Statut

- Patch principal : present
- Patch FIX-01 : present
- Validation `git apply --check` FIX-01 sur baseline post-patch principal : OK
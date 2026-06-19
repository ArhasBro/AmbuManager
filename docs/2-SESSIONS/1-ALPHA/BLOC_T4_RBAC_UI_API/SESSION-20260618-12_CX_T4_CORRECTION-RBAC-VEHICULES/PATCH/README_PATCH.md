# README_PATCH

## Session liee
SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES

## Type
CX

## Dossier PATCH
docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH

## Patch officiel attendu
PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff

## Generation

Le patch a ete regenere depuis une diff normalisee afin de conserver uniquement les hunks fonctionnels.

## Commandes d'application

```bash
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff"
git apply         "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff"
```

## Verification

- `git apply --check` strict reste non representatif dans le workspace courant.
- `git apply --check --cached --ignore-space-change --ignore-whitespace` passe sur ce patch.

## Statut
- Dossier patch initialise.
- Le patch reste limite aux fichiers applicatifs vehicles et permissions touches par la correction RBAC.

# README_PATCH

## Session liee
SESSION-20260503-06_A23_A23-UI-06

## Type
CORRECTION+COMPLETION

## Fichiers patch
- Principal (conserve): `PATCH__SESSION-20260503-06_A23_A23-UI-06.diff`
- Correctif minimal: `PATCH__SESSION-20260503-06_A23_A23-UI-06_FIX-01.diff`

## Pourquoi un FIX-01
Le patch principal ne contenait pas certains fichiers UI declares et les ajustements critiques demandes par le controle qualite.
Le correctif `FIX-01` ajoute ces deltas sans regeneration complete du patch principal.

## Fichiers integres dans FIX-01
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/company/company-rules-panel.tsx`
- `app/users/users-client-shared.ts`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/users/page.tsx`
- `app/audit/audit-client.tsx`
- `app/globals.css`

## Commandes d'application
```bash
git apply --check docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/PATCH/PATCH__SESSION-20260503-06_A23_A23-UI-06.diff
git apply docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/PATCH/PATCH__SESSION-20260503-06_A23_A23-UI-06.diff
git apply --check docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/PATCH/PATCH__SESSION-20260503-06_A23_A23-UI-06_FIX-01.diff
git apply docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/PATCH/PATCH__SESSION-20260503-06_A23_A23-UI-06_FIX-01.diff
```

## Verification executee
- Principal `--check`: OK
- Principal apply: OK
- Fix `--check`: OK
- Fix apply: OK
- Rejoue en depot propre via worktree temporaire.

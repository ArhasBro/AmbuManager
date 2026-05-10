# README_PATCH

## Session liee
SESSION-20260503-03_A23_A23-USERS-03

## Type
CORRECTION

## Decision
PATCH

## Patch principal
- Nom : `PATCH__SESSION-20260503-03_A23_A23-USERS-03.diff`
- Emplacement : `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/PATCH/`

## Perimetre du patch principal
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`

## Commandes executees
```bash
git apply --check docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/PATCH/PATCH__SESSION-20260503-03_A23_A23-USERS-03.diff
git apply docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/PATCH/PATCH__SESSION-20260503-03_A23_A23-USERS-03.diff
```

## Correctif separe
Aucun correctif `FIX-01` necessaire.

## Remarque
La correction BDD a ete appliquee par commande `npx prisma migrate deploy` (pas de modification de fichier SQL supplementaire dans ce lot).

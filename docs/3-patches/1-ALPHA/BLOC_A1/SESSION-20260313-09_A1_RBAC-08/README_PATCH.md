# README_PATCH

## Session liée

SESSION-20260313-09_A1_RBAC-08

## Type

CORRECTION

## Intitulé

RBAC-08 — CORRECTION — Stabilisation de l’affectation rôle principal + permissions si nécessaire

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-09_A1_RBAC-08`

## Patch officiel

`PATCH__SESSION-20260313-09_A1_RBAC-08.diff`

## Périmètre du patch

Le patch est strictement borné au fichier code suivant :
- `prisma/seed.ts`

Le patch ne modifie pas :
- le schéma Prisma ;
- les migrations ;
- l’auth / session ;
- les routes users ;
- l’UI users ;
- le modèle multi-rôle ;
- `USERS-10`.

## Effet fonctionnel attendu

Après application :
- les permissions seedées d’un utilisateur sont synchronisées exactement avec la liste demandée ;
- les permissions devenues obsolètes sont retirées ;
- un utilisateur avec `[]` se retrouve bien sans permission additionnelle ;
- un code permission seedé mais absent du catalogue déclenche désormais une erreur explicite.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-09_A1_RBAC-08/PATCH__SESSION-20260313-09_A1_RBAC-08.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-09_A1_RBAC-08/PATCH__SESSION-20260313-09_A1_RBAC-08.diff"
```

## Validation réellement prouvée

État réellement prouvé sur le dépôt cible :
- patch `.diff` généré ;
- patch appliqué sans erreur ;
- `git apply --check` : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

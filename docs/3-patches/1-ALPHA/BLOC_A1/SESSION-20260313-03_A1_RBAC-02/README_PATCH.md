# README_PATCH

## Session liée
SESSION-20260313-03_A1_RBAC-02

## Type
CORRECTION

## Dossier patch
`docs/patches/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02`

## Patch officiel
`PATCH__SESSION-20260313-03_A1_RBAC-02.diff`

## Périmètre exact du patch
Le patch est strictement limité à `RBAC-02` :
- réalignement de l’enum Prisma `Role` de `DEA` vers `ADE` ;
- réalignement du type local `Role` utilisé dans `app/planning/planning-client.tsx` ;
- ajout d’une migration additive PostgreSQL pour renommer la valeur persistée de l’enum.

## Justification de la stratégie retenue
L’écart `DEA` / `ADE` est officiellement prouvé par le cadrage et par `RBAC-01`.
Comme `Role` est un enum persisté en base, une correction du schéma seule n’était pas suffisante.
La stratégie retenue est donc :
- correction du schéma courant ;
- ajout d’une migration de renommage ;
- conservation de la migration initiale historique.

Cette stratégie évite :
- un remplacement aveugle ;
- la réécriture de l’historique ;
- une rupture entre code et persistance.

## Fichiers inclus dans le patch
- `prisma/schema.prisma`
- `app/planning/planning-client.tsx`
- `prisma/migrations/20260313120000_rename_role_dea_to_ade/migration.sql`

## Fichiers volontairement exclus du patch
- `prisma/migrations/20260224175839_init/migration.sql`
- `docs/master/*`
- `docs/sessions/*` historiques
- `CMD.txt`
- tout fichier généré / archive / dépendance

## Commandes d’application

```bash
git apply --check "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/PATCH__SESSION-20260313-03_A1_RBAC-02.diff"
git apply         "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/PATCH__SESSION-20260313-03_A1_RBAC-02.diff"
```

## État final prouvé du dépôt cible
- patch `.diff` appliqué
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- patch produit
- patch borné au périmètre `RBAC-02`
- aucun `NO_PATCH.md`

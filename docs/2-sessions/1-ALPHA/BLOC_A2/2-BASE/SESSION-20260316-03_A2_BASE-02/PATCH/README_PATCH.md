# README_PATCH

## Session liée

`SESSION-20260316-03_A2_BASE-02`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-03_A2_BASE-02/`

## Patch officiel

`BASE-02.diff`

## Périmètre exact du patch

Le patch est strictement limité à `BASE-02` :
- ajout du modèle Prisma `Depot` ;
- ajout de la relation inverse `Company.depots` ;
- ajout d’une migration dédiée pour la table `Depot`.

## Fichiers code inclus dans le patch

- `prisma/schema.prisma`
- `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`

## Fichiers volontairement exclus du patch

- toute documentation de session
- toute documentation master
- `prisma/seed.ts`
- toute API bases/dépôts
- toute UI bases/dépôts
- tout périmètre `BASE-03+`
- tout périmètre `SUP-*`

## Objet exact du correctif

Le correctif crée le **socle data minimal** de l’entité base/dépôt administrable, en cohérence avec `04.1 Entité base / dépôt administrable`.

Couverture visée et obtenue :
- nom canonique de modèle : `Depot` ;
- rattachement multi-tenant par `companyId` ;
- champ `name` pour l’administration ;
- champ `address` pour matérialiser le lieu ;
- champ `isActive` pour préparer la désactivation future ;
- timestamps structurels ;
- unicité tenant-aware et index nécessaires.

## Ce que le patch ne fait pas

Le patch ne fait pas :
- d’API de création / modification / désactivation ;
- d’UI de gestion ;
- de rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- de permissions dédiées ;
- de multi-agences.

## Point important d’application

Le patch `.diff` référence directement :
- `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`

Mais, dans le dépôt initial, le dossier :
- `prisma/migrations/20260316153000_base02_create_depot_model/`

n’existait pas encore.

Conséquence :
- le patch est **métier correct** ;
- mais il n’est **pas auto-applicable directement** tant que le dossier cible de migration n’a pas été créé.

## Commande d’application réellement nécessaire

```bash
mkdir -p prisma/migrations/20260316153000_base02_create_depot_model
: > prisma/migrations/20260316153000_base02_create_depot_model/migration.sql
git apply --check BASE-02.diff
git apply BASE-02.diff
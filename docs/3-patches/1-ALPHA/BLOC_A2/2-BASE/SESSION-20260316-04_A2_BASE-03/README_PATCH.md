# README_PATCH

## Session liée

`SESSION-20260316-04_A2_BASE-03`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/`

## Patch officiel

`BASE-03.diff`

## Périmètre exact du patch

Le patch est strictement limité à `BASE-03` :
- ajout de la route API canonique `POST /api/depots` ;
- ajout du service minimal de création de dépôt ;
- ajout du validateur d’entrée strict.

## Fichiers code inclus dans le patch

- `app/api/depots/route.ts`
- `lib/services/depots/create-depot.ts`
- `lib/validators/depot.ts`

## Fichiers volontairement exclus du patch

- toute documentation de session
- toute documentation master
- `prisma/schema.prisma`
- `prisma/seed.ts`
- toute UI bases/dépôts
- toute route `GET /api/depots`
- toute route `PATCH /api/depots`
- tout périmètre `BASE-04+`
- tout périmètre `SUP-*`

## Objet exact du correctif

Le correctif ajoute l’API minimale de création d’un dépôt au sein de la société courante, en cohérence avec :
- `04.2 Création d’une base / dépôt` ;
- le modèle Prisma `Depot` déjà introduit par `BASE-02` ;
- le multi-tenant strict via `session.user.companyId` ;
- le format API standard `{ ok:true, data } / { ok:false, error, details? }`.

## Ce que le patch ne fait pas

Le patch ne fait pas :
- de listing des dépôts ;
- de modification de dépôt ;
- de désactivation / archivage ;
- d’UI de gestion ;
- de permission dédiée ;
- de rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- de modification du schéma Prisma ;
- de modification du seed.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/BASE-03.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/BASE-03.diff"
```

## Statut

- patch code produit ;
- documentation de session produite ;
- réserves terminales documentées factuellement.

## IMPORTANT — PRISMA

Après application du patch :

```bash
npx prisma generate
```

doit être exécuté si le patch utilise un modèle Prisma nouvellement ajouté ou non encore présent dans le Prisma Client.

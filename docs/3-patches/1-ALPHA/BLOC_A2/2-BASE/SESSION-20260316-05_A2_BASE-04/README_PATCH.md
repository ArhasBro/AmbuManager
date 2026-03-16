# README_PATCH

## Session liée

`SESSION-20260316-05_A2_BASE-04`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/`

## Patch officiel

`BASE-04.diff`

## Périmètre exact du patch

Le patch est strictement limité à `BASE-04` :
- ajout de la route API canonique `PATCH /api/depots/[id]` ;
- ajout du service minimal de modification de dépôt ;
- extension du validateur d’entrée avec un schéma de mise à jour strict.

## Fichiers code inclus dans le patch

- `app/api/depots/[id]/route.ts`
- `lib/services/depots/update-depot.ts`
- `lib/validators/depot.ts`

## Fichiers volontairement exclus du patch

- toute documentation de session
- toute documentation master
- `prisma/schema.prisma`
- `prisma/seed.ts`
- toute UI bases/dépôts
- toute route de listing
- toute route de suppression
- toute route dédiée d’archivage / désactivation
- tout périmètre `BASE-05+`
- tout périmètre `SUP-*`

## Objet exact du correctif

Le correctif ajoute l’API minimale de modification d’un dépôt existant au sein de la société courante, en cohérence avec :
- `04.3 Modification d’une base / dépôt` ;
- le modèle Prisma `Depot` déjà introduit par `BASE-02` ;
- la route de création déjà introduite par `BASE-03` ;
- le multi-tenant strict via `session.user.companyId` ;
- le format API standard `{ ok:true, data } / { ok:false, error, details? }`.

## Ce que le patch ne fait pas

Le patch ne fait pas :
- de listing des dépôts ;
- de suppression de dépôt ;
- de route dédiée d’archivage / désactivation ;
- d’UI de gestion ;
- de permission dédiée ;
- de rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- de modification du schéma Prisma ;
- de modification du seed.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/BASE-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/BASE-04.diff"
```

## Statut

- patch code produit ;
- `git apply --check` validé sur copie de test ;
- documentation de session produite ;
- validation terminale complète à rejouer dans un environnement avec dépendances installées.

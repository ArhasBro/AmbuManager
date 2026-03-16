# README_PATCH

## Session liée

`SESSION-20260316-05_A2_BASE-04`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/`

## Patch d’origine

`BASE-04.diff`

## Patch documentaire final

`PATCH__SESSION-20260316-05_A2_BASE-04_DOCS-02.diff`

## Périmètre exact du patch

Le patch documentaire final est strictement limité à la traçabilité rejouable de `BASE-04` sur l’état réel du dépôt :
- aucun code n’est inclus ;
- aucun fix code n’est rejoué ;
- mise à jour des documents de session et du dossier patch ;
- conservation du patch initial `BASE-04.diff` comme trace d’origine.

## Fichiers inclus dans le patch

- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/README_PATCH.md`

## Fichiers volontairement exclus du patch

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

Le correctif documentaire final acte que l’API minimale de modification d’un dépôt existant est déjà au bon état dans le dépôt, en cohérence avec :
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

## Commandes d’application du correctif

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/PATCH__SESSION-20260316-05_A2_BASE-04_DOCS-02.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/PATCH__SESSION-20260316-05_A2_BASE-04_DOCS-02.diff"
```

## Statut

- patch d’origine conservé ;
- code `BASE-04` déjà conforme sur l’état réel du dépôt ;
- patch documentaire final produit ;
- validations terminales confirmées **OK** sur le dépôt réel.

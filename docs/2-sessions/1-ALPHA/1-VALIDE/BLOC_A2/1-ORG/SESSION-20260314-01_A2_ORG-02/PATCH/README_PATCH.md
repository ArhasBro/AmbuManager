# README_PATCH

## Session liée

`SESSION-20260314-01_A2_ORG-02`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-01_A2_ORG-02/`

## Patch officiel

`ORG-02.diff`

## Périmètre exact du patch

Le patch est strictement limité à `ORG-02` :
- ajout des champs minimaux du profil société ALPHA sur `Company` ;
- ajout d’une migration Prisma dédiée ;
- réalignement minimal de `prisma/seed.ts` pour conserver un bootstrap cohérent.

## Fichiers code inclus dans le patch

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/20260314143000_org02_company_profile/migration.sql`

## Fichiers volontairement exclus du patch

- toute documentation de session
- toute documentation master
- toute UI profil société
- toute API dédiée au profil société
- tout périmètre `ORG-03`, `ORG-04`, `BASE-*`, `SUP-*`

## Objet exact du correctif

Le correctif complète le **profil société minimal ALPHA** conformément au cadrage `03.2 Profil société`.

Couverture visée et obtenue :
- nom société → `name` déjà existant ;
- nom des gérants → `managerNames` ;
- adresse → `address` ;
- téléphone → `phone` ;
- SIRET → `siret`.

## Ce que le patch ne fait pas

Le patch ne fait pas :
- d’UI de consultation / édition du profil société ;
- d’API métier complète de la fiche société ;
- de validation métier avancée ;
- d’ouverture de nouveaux périmètres fonctionnels.

## Commande d’application

```bash
git apply ORG-02.diff
```

## Vérifications validées après intégration

- `git apply` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Statut

- patch produit ;
- patch appliqué ;
- patch techniquement validé ;
- session `ORG-02` : **`conforme`**.

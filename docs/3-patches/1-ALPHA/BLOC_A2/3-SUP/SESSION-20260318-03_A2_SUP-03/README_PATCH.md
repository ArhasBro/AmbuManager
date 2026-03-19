# README_PATCH

## Session liée
`SESSION-20260318-03_A2_SUP-03`

## Type
`COMPLETION`

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03`

## Patch officiel retenu
`SUP-03-FIX-04.diff`

## Portée du patch

Patch unique strictement borné à `SUP-03` :
- stabilisation du seed du compte support nominatif ;
- correction du typage des variables support ;
- upsert idempotent du compte support hors société ;
- protection explicite du seul cas support si `User.platformRole` manque en base ;
- aucun élargissement vers `SUP-04`, `SUP-05`, `SUP-06`.

## Fichier code modifié

- `prisma/seed.ts`

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03/SUP-03-FIX-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03/SUP-03-FIX-04.diff"
```

## Validations terminales réelles retenues

```bash
git apply --check

git apply

npx prisma validate
npx prisma generate
npm run lint
npm run build
```

Résultats conservés :
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Statut

- correctif code `SUP-03` validé sur son périmètre ;
- aucun patch code supplémentaire `SUP-03` requis ;
- `db:seed` reste bloqué par un écart côté `Company`, hors périmètre `SUP-03` ;
- documentation finale de session produite.

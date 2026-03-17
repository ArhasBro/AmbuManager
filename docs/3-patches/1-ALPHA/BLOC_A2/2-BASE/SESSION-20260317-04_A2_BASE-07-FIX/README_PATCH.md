# README_PATCH

## Session liée

`SESSION-20260317-04_A2_BASE-07-FIX`

## Type

`CORRECTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-04_A2_BASE-07-FIX/`

## Patch officiel unique

`BASE-07-FIX.diff`

## Objet exact

Cette correction répare l’écart réel laissé par `BASE-07` dans le dépôt :
- la route dédiée `PATCH /api/vehicles/[id]/depot` manquait alors que l’UI l’appelait déjà ;
- le service métier dédié d’affectation véhicule -> dépôt manquait ;
- l’historique Prisma ne contenait pas la migration SQL matérialisant `Vehicle.depotId`, alors que le schéma Prisma l’exposait déjà.

## Périmètre exact retenu

`BASE-07-FIX` reste strictement limité au rattachement `Vehicle -> Depot` dans le module véhicules, sans réouverture de :
- `BASE-04`
- `BASE-08`
- `BASE-09`
- `User -> Depot`
- `Shift -> Depot`
- `DraftShift`
- toute refonte large UI véhicules / dépôts / planning

## Fichiers code concernés

- `app/api/vehicles/[id]/depot/route.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `prisma/migrations/20260317201000_base07_fix_attach_vehicle_to_depot/migration.sql`

## État final du dossier patch

- `BASE-07-FIX.diff` : présent
- `README_PATCH.md` : présent
- `NO_PATCH.md` : non conservé dans l’état final de cette session

## Résultats terminaux confirmés

- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-04_A2_BASE-07-FIX/BASE-07-FIX.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-04_A2_BASE-07-FIX/BASE-07-FIX.diff"
```

## Statut final

- correction produite ;
- patch officiel unique produit ;
- validations terminales obtenues ;
- session clôturée en `conforme`.

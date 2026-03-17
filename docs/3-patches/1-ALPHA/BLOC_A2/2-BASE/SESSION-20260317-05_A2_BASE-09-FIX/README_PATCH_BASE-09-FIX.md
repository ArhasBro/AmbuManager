# README_PATCH

## Session liée

`SESSION-20260317-05_A2_BASE-09-FIX`

## Type

`CORRECTION`

## Patch officiel unique

`BASE-09-FIX.diff`

## Objet exact

Cette correction réaligne `BASE-09` avec l’état réel du dépôt :
- `Shift.depotId` est déjà présent dans `prisma/schema.prisma` ;
- l’API d’assignation planning gère déjà `depotId` sur `Shift` publié ;
- le refus explicite sur `DraftShift` est déjà en place ;
- l’UI `/planning` expose déjà la base sur les shifts publiés ;
- **le seul correctif code nécessaire était la migration Prisma matérialisant `Shift.depotId`, absente de l’historique SQL**.

## Périmètre exact retenu

`BASE-09-FIX` reste strictement limité à la matérialisation SQL de `Shift -> Depot`, sans réouverture de :
- `BASE-04`
- `BASE-07`
- `User -> Depot`
- `Vehicle -> Depot`
- `DraftShift -> Depot`
- templates / draft planning / autoschedule
- refonte planning globale

## Fichier code concerné

- `prisma/migrations/20260317213000_base09_fix_attach_shift_to_depot/migration.sql`

## Validations terminales réelles

- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Statut

Le patch `BASE-09-FIX.diff` est validé en **`conforme`**.

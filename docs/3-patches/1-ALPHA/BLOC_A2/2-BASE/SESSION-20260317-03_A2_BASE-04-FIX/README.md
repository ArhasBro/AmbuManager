# README

## Session liée

`SESSION-20260317-03_A2_BASE-04-FIX`

## Type

`CORRECTION`

## Patch principal

`BASE-04-FIX.diff`

## Périmètre exact

Le patch principal corrige uniquement `BASE-04-FIX` sur les trois fichiers suivants :
- `lib/validators/depot.ts`
- `app/api/depots/[id]/route.ts`
- `lib/services/depots/update-depot.ts`

## Recalage effectué

- retrait de `isActive` du validator de mise à jour ;
- suppression de `isActive` dans la route PATCH ;
- suppression de `isActive` dans le service `updateDepot`.

## Garanties conservées

- tenant check conservé ;
- RBAC `ADMIN / GERANT` conservé ;
- contrat API standard conservé ;
- aucun impact UI ;
- aucun impact archivage ;
- aucune nouvelle route ;
- aucune modification Prisma.

## Validation d’applicabilité du patch principal

- `git apply --check` : OK
- `git apply` : OK

## Note sur les validations terminales complètes

Dans l’environnement conteneur de session :
- `npx prisma validate` : NOK
- `npx prisma generate` : NOK
- `npm run lint` : OK
- `npm run build` : NOK

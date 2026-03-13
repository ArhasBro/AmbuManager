# README_PATCH

## Session liée
SESSION-20260313-05_A1_RBAC-04

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04`

## Patch officiel
`PATCH__SESSION-20260313-05_A1_RBAC-04.diff`

## Périmètre exact du patch
Le patch est strictement limité à `RBAC-04` :
- ajout d’un catalogue central des permissions fines ALPHA hors audit ;
- réalignement du seed pour garantir ce catalogue ;
- ajout de helpers permissionnels dédiés et conservation des accès natifs `ADMIN` / `GERANT` ;
- réalignement borné de contrôles déjà présents sur :
  - utilisateurs
  - véhicules (accès module / lecture)
  - règles métier
  - assignation planning
  - cancel run autoschedule
  - dashboard admin

## Justification de la stratégie retenue
Le cadrage `06.5` impose des permissions fines distinctes en ALPHA, mais `RBAC-03` a montré que le dépôt ne matérialisait réellement que deux permissions persistées.

La stratégie minimale retenue est donc :
- matérialiser tout le catalogue hors audit ;
- ne brancher que les contrôles réellement existants et propres à réaligner ;
- ne pas inventer les modules manquants ;
- ne pas ouvrir `RBAC-05` / `RBAC-06`.

## Fichiers inclus dans le patch
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `prisma/seed.ts`
- `app/users/page.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/vehicles/page.tsx`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/dashboard/page.tsx`

## Fichiers volontairement exclus du patch
- tout le périmètre audit (`RBAC-05` / `RBAC-06`)
- tout module complet rôles/permissions encore absent
- tout module complet templates encore absent
- tout export planning encore absent
- tout dashboard terrain distinct encore absent
- tout fichier de documentation de session
- tout fichier généré / dépendance / archive

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04/PATCH__SESSION-20260313-05_A1_RBAC-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04/PATCH__SESSION-20260313-05_A1_RBAC-04.diff"
```

## État final prouvé sur le dépôt cible
- patch `.diff` produit
- contrôle syntaxique local `TypeScript transpileModule` sur les fichiers modifiés : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## Statut
- patch produit
- patch borné au périmètre `RBAC-04`
- aucun `NO_PATCH.md`

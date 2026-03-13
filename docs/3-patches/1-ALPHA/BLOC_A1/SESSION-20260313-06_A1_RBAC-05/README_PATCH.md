# README_PATCH

## Session liée
SESSION-20260313-06_A1_RBAC-05

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05`

## Patch officiel
`PATCH__SESSION-20260313-06_A1_RBAC-05.diff`

## Périmètre exact du patch
Le patch est strictement limité à `RBAC-05` :
- ajout de la permission dédiée `consulter audit` dans le catalogue central ;
- ajout d’un helper dédié `canViewAudit()` ;
- réalignement du contrôle existant de lecture du run courant / audit planning sur cette permission.

## Justification de la stratégie retenue
Le cadrage `06.5` et `06.6` attend une permission dédiée `consulter audit`, mais le dépôt ne portait encore aucun code distinct pour elle.

La stratégie minimale retenue est donc :
- ajouter la permission au catalogue existant ;
- réutiliser le seed existant qui upsert déjà le catalogue complet ;
- brancher uniquement le support réel de consultation d’audit déjà présent ;
- ne pas inventer d’attribution globale, de support propriétaire ou de page audit dédiée ;
- ne pas ouvrir `RBAC-06`.

## Fichiers inclus dans le patch
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`

## Fichiers volontairement exclus du patch
- `prisma/schema.prisma`
- `prisma/seed.ts` (réutilise déjà le catalogue central via `ensurePermissions()`)
- toute attribution seed nouvelle d’une permission audit
- toute page audit globale
- toute route audit dédiée supplémentaire
- tout support propriétaire
- tout fichier de documentation de session
- tout fichier généré / dépendance / archive

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/PATCH__SESSION-20260313-06_A1_RBAC-05.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/PATCH__SESSION-20260313-06_A1_RBAC-05.diff"
```

## État final prouvé sur le dépôt cible
- patch `.diff` produit ;
- `.diff` appliqué sans erreur ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

## Statut
- patch produit
- patch borné au périmètre `RBAC-05`
- aucun `NO_PATCH.md`

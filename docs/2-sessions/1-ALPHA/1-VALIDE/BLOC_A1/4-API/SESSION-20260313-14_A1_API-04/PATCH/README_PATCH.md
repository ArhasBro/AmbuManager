# README_PATCH

## Session liée

SESSION-20260313-14_A1_API-04

## Type

CORRECTION

## Intitulé

API-04 — CORRECTION — Harmonisation minimale des erreurs critiques

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04`

## Patch officiel

`PATCH__SESSION-20260313-14_A1_API-04.diff`

## Périmètre du patch

Le patch est strictement borné aux fichiers code suivants :
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

Le patch ne modifie pas :
- les routes autoschedule déjà symboliquement cohérentes
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- l’UI
- auth / session / tenant / RBAC
- la logique métier fonctionnelle
- la politique HTTP
- `API-05`

## Effet fonctionnel attendu

Après application :
- les helpers génériques ne renvoient plus de wording anglais libre pour `401`, `403`, `404`, `409`, `500` ;
- le mapping Prisma partagé ne renvoie plus `Duplicate` / `Not found` ;
- `users`, `reset-password` et `vehicles` n’exposent plus de texte libre critique dans `error` ;
- les explications utiles restent accessibles via `details` ;
- les statuts HTTP existants sont conservés.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04/PATCH__SESSION-20260313-14_A1_API-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04/PATCH__SESSION-20260313-14_A1_API-04.diff"
```

## Validation réellement prouvée

État réellement prouvé dans cette session :
- patch `.diff` généré ;
- `git apply --check` : `OK` sur copie propre ;
- `git apply` : `OK` sur copie propre ;
- `npm run lint` : `OK` ;
- `npm run build` : échec hors périmètre `API-04` sur `app/api/company/rules/route.ts` (`RuleMode` non exporté par `@prisma/client`).

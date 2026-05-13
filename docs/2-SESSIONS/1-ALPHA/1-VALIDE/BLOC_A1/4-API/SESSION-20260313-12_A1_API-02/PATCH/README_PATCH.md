# README_PATCH

## Session liée

SESSION-20260313-12_A1_API-02

## Type

CORRECTION

## Intitulé

API-02 — CORRECTION — Correction des routes non conformes au format API cible

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02`

## Patch officiel

`PATCH__SESSION-20260313-12_A1_API-02.diff`

## Périmètre du patch

Le patch est strictement borné aux fichiers code suivants :
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`

Le patch ne modifie pas :
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- auth / session / tenant / RBAC
- la logique métier de génération / publication / annulation
- l’UI planning
- les routes déjà structurellement conformes
- `API-03`, `API-04`, `API-05`

## Effet fonctionnel attendu

Après application :
- les routes corrigées conservent leurs statuts HTTP actuels ;
- les réponses de succès restent sous `data` ;
- les erreurs ne portent plus de champs top-level hors contrat (`runId`, `message`, `debug`) ;
- les informations utiles restent accessibles sous `details` ;
- le contrat structurel cible est rétabli sur le périmètre corrigé.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02/PATCH__SESSION-20260313-12_A1_API-02.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02/PATCH__SESSION-20260313-12_A1_API-02.diff"
```

## Validation réellement prouvée

État réellement prouvé dans cette session :
- patch `.diff` généré ;
- `git apply --check` : `OK` sur copie propre ;
- `git apply` : `OK` sur copie propre ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

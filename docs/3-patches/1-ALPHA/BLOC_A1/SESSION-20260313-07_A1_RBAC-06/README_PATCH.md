# README_PATCH

## Session liée

SESSION-20260313-07_A1_RBAC-06

## Type

COMPLÉTION

## Intitulé

RBAC-06 — COMPLÉTION — Mise à niveau du modèle d’accès à l’audit (rôle + permission)

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-07_A1_RBAC-06`

## Patch officiel

`PATCH__SESSION-20260313-07_A1_RBAC-06.diff`

## Périmètre du patch

Le patch est strictement borné aux fichiers code suivants :
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`

Le patch ne modifie pas :
- Prisma ;
- le seed ;
- la session auth ;
- le catalogue des permissions ;
- la structure globale du module audit ;
- le support propriétaire ;
- le multi-rôle.

## Effet fonctionnel attendu

Après application :
- l’endpoint `GET /api/planning/autoschedule/runs/[id]` distingue l’accès run et l’accès audit ;
- l’accès run repose sur `canAutoSchedule()` ;
- l’accès audit repose sur `canViewAudit()` ;
- `ADMIN` / `GERANT` conservent l’accès natif via les helpers existants ;
- un profil run sans `AUDIT_VIEW` n’obtient pas `auditLogs` ;
- un profil `AUDIT_VIEW` sans accès run n’obtient pas `draftShifts` ;
- l’UI `/planning` affiche explicitement l’absence d’accès audit.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-07_A1_RBAC-06/PATCH__SESSION-20260313-07_A1_RBAC-06.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-07_A1_RBAC-06/PATCH__SESSION-20260313-07_A1_RBAC-06.diff"
```

## Validation réellement prouvée sur le dépôt cible

État réel désormais prouvé :
- `git apply --check` : `OK`
- application du patch : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## Portée documentaire

Ce `README_PATCH.md` documente un patch désormais :
- applicable ;
- appliqué ;
- cohérent avec le dépôt corrigé validé par `lint` et `build`.

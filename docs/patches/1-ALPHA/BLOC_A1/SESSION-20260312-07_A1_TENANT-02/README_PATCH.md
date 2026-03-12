# README PATCH

## ID SESSION

SESSION-20260312-07_A1_TENANT-02

## Intitulé

TENANT-02 — CORRECTION — Correction des routes/API non correctement cloisonnées

## Objet du patch

Ce patch corrige uniquement les routes/API réellement insuffisamment cloisonnées sur le plan multi-tenant, conformément au périmètre de la session `TENANT-02`.

## Périmètre du patch code

Fichiers code concernés :

- `app/api/health/prisma/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`

## Corrections contenues

### `app/api/health/prisma/route.ts`
- remplacement des compteurs globaux par des compteurs bornés au tenant courant via `session.user.companyId`.

### `app/api/vehicles/route.ts`
- suppression finale bornée par `id + companyId`.

### `app/api/users/[id]/reset-password/route.ts`
- mise à jour finale bornée par `id + companyId` ;
- relecture finale bornée au même tenant.

### `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- annulation finale bornée par `id + companyId`.

## Ce que le patch ne fait pas

Le patch ne fait pas :
- de refonte architecture ;
- de généralisation hors zones prouvées ;
- de travail RBAC global ;
- de traitement d’autres sessions ;
- de modifications hors périmètre.

## Application contrôlée sur le dépôt cible

Le patch code a été contrôlé et appliqué sur le dépôt cible avec exclusion volontaire des fichiers de documentation, afin d’éviter un échec d’application lié à un décalage de base sur les `.md`.

Commandes utilisées :

```powershell
git apply -p1 --check --exclude="docs/sessions/**" --exclude="docs/patches/**" .\docs\patches\1-ALPHA\BLOC_A1\SESSION-20260312-07_A1_TENANT-02\PATCH__SESSION-20260312-07_A1_TENANT-02.diff
git apply -p1 --exclude="docs/sessions/**" --exclude="docs/patches/**" .\docs\patches\1-ALPHA\BLOC_A1\SESSION-20260312-07_A1_TENANT-02\PATCH__SESSION-20260312-07_A1_TENANT-02.diff
# README_PATCH.md

## Référence
- Session : `SESSION-20260416-10_A12_A12-LOT-02-15`
- Bloc : `A12 — Exports / onboarding / imports`
- Stage : `1-ALPHA`

## Patchs à retenir
### Patch principal
- `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff`

### Correctifs intégrés
- `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-01.diff`
- `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-02.diff`

## Périmètre réellement livré
### Onboarding manuel société pilote
- ajout d’une entrée onboarding dédiée depuis le dashboard
- ajout d’une page `/onboarding`
- guidage réel vers :
  - profil société
  - dépôts / bases
  - utilisateurs
  - véhicules
  - templates
  - indisponibilités utilisateurs

### Imports initiaux simples ALPHA
Imports réels livrés pour :
- utilisateurs
- véhicules
- templates
- bases / dépôts
- indisponibilités utilisateurs

Capacités réelles livrées :
- CSV
- XLSX
- aperçu avant import
- validation manuelle d’import
- rapport d’erreurs
- logique add-only

### Exports planning + impression
Capacités réelles livrées :
- export PDF planning
- export XLSX planning
- export CSV planning
- impression simple
- permission `PLANNING_EXPORT` réellement branchée

## Fichiers code concernés
- `app/dashboard/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `lib/permissions.ts`
- `app/api/imports/route.ts`
- `app/api/planning/exports/route.ts`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `lib/imports/csv.ts`
- `lib/imports/import-engine.ts`
- `lib/imports/xlsx.ts`
- `lib/planning/export.ts`

## Détail des correctifs
### Fix 01
- normalisation du flux `templates`
- conversion `minStaffCount: null` vers `minStaffCount: undefined`
- correction appliquée en preview / validation et en commit

### Fix 02
- narrowing explicite local dans la branche preview `templates`
- variable locale typée `TemplateImportRow`
- correction strictement limitée au point de typage demandé

## Validations terminales finales réelles
- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## État final à retenir
- `SESSION A12-LOT-02-15 VALIDABLE EN L’ÉTAT : OUI`
- `ONBOARDING MANUEL COMPLET PROUVÉ : OUI`
- `IMPORT INITIAL SIMPLE PROUVÉ : OUI`
- `EXPORTS PLANNING ALPHA PROUVÉS : OUI`
- `IMPRESSION SIMPLE PROUVÉE : OUI`
- `PLANNING_EXPORT RÉELLEMENT BRANCHÉE : OUI`

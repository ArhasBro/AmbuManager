# README_PATCH.md

## Référence
- Session : `SESSION-20260416-11_A12_A12-16`
- Bloc : `A12 — Exports / onboarding / imports`
- Stage : `1-ALPHA`
- Type : `VALIDATION`

## Décision patch
`NO_PATCH`

## Motif
Cette session est une validation du bloc A12 avant clôture.

Après revérification :
- du cadrage produit ;
- des sessions A12-01 et A12-LOT-02-15 ;
- des patchs réels `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff`, `FIX-01`, `FIX-02` ;
- du code réel du dépôt ;

aucun résiduel code A12 strictement prouvé n’a été trouvé.

## Périmètre réellement confirmé
- onboarding manuel guidé sans import obligatoire ;
- import initial simple ALPHA pour `depots`, `users`, `vehicles`, `templates`, `user-absences` ;
- formats `CSV` et `XLSX` ;
- aperçu avant import ;
- validation manuelle d’import ;
- rapport d’erreurs ;
- exports planning `PDF`, `XLSX`, `CSV` ;
- impression simple depuis l’UI ;
- permission `PLANNING_EXPORT` réellement branchée en UI et API.

## Fichiers code revérifiés
- `app/dashboard/page.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/api/imports/route.ts`
- `lib/imports/csv.ts`
- `lib/imports/xlsx.ts`
- `lib/imports/import-engine.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/exports/route.ts`
- `lib/planning/export.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`

## Validations réellement exécutées dans cette session
- `npm run lint` : `KO` — `sh: 1: eslint: not found`
- `npm run build` : `KO` — `sh: 1: next: not found`

## Rappel des dernières validations code documentées du lot A12-LOT-02-15
- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## État final retenu
- `SESSION A12-16 TERMINÉE : OUI`
- `BLOC A12 VALIDABLE AVANT CLÔTURE : OUI`

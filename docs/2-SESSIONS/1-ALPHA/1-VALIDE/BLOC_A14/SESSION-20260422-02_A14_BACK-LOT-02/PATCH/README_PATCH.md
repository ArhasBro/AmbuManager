# README_PATCH — SESSION-20260422-02_A14_BACK-LOT-02

## Patchs code validés
- Patch principal : `PATCH__SESSION-20260422-02_A14_BACK-LOT-02.diff`
- Fix complémentaire : `PATCH__SESSION-20260422-02_A14_BACK-LOT-02_FIX-01.diff`

## Périmètre
- backend uniquement ;
- aucun frontend ;
- aucune modification Prisma schema.

## Contenu réel du patch principal
- extraction du traitement sensible de mise à jour du profil société hors route API ;
- centralisation des validations `company/rules` dans `lib/validators/company-rules.ts` ;
- réutilisation du validateur partagé `lib/validators/planning-assign.ts` pour `planning/shifts/[id]/assign` ;
- extension du validateur partagé d’assignation avec `depotId` ;
- suppression de mappings Prisma locaux ciblés sur plusieurs routes `planning/autoschedule` au profit de `lib/api/prisma-error.ts` ;
- propagation de `platformRole` sur les routes `planning/autoschedule` ciblées ;
- homogénéisation partielle des réponses backend sur le périmètre traité.

## Contenu réel du fix complémentaire `FIX-01`
- correction minimale de `app/api/planning/autoschedule/runs/route.ts` ;
- réintroduction des helpers de cursor requis par la route ;
- levée du blocage build prouvé sur `decodeCursor`.

## Validations terminales prouvées
- `git apply --check PATCH__SESSION-20260422-02_A14_BACK-LOT-02.diff` : `OK`
- `git apply PATCH__SESSION-20260422-02_A14_BACK-LOT-02.diff` : `OK`
- `git apply --check PATCH__SESSION-20260422-02_A14_BACK-LOT-02_FIX-01.diff` : `OK`
- `git apply PATCH__SESSION-20260422-02_A14_BACK-LOT-02_FIX-01.diff` : `OK`
- `npm run test:quality` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

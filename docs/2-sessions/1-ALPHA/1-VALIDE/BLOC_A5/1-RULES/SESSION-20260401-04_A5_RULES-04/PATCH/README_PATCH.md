# README_PATCH

## Session liée
SESSION-20260401-04_A5_RULES-04

## Type
CORRECTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-04_A5_RULES-04`

## Patch principal validé
`PATCH__SESSION-20260401-04_A5_RULES-04.diff`

## Objet du patch principal
Remise à niveau strictement minimale des règles déjà réellement utilisées :
- harmonisation du traitement des valeurs invalides de `PLANNING_MIN_REST_HOURS` sur les flux manuels ;
- conservation de `RuleMode.OFF` comme neutralisation explicite ;
- remontée API/UI des alertes manuelles déjà produites par le moteur.

## Fichiers inclus dans le patch principal
- `lib/types/planning.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/planning-client.tsx`

## Commandes d’application du patch principal
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-04_A5_RULES-04/PATCH__SESSION-20260401-04_A5_RULES-04.diff"
git apply "docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-04_A5_RULES-04/PATCH__SESSION-20260401-04_A5_RULES-04.diff"
```

## Validation consolidée
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
- `npx prisma validate` : À confirmer
- `npx prisma generate` : À confirmer

## Note documentaire finale
La clôture documentaire finale est produite sans réutiliser le patch documentaire intermédiaire et sans rejouer le patch principal.

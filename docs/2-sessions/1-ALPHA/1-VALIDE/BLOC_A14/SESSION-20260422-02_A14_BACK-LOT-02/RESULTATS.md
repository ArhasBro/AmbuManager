# RESULTATS — SESSION-20260422-02_A14_BACK-LOT-02

## Fichiers modifiés par le patch principal
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/validators/planning-assign.ts`

## Fichiers créés par le patch principal
- `lib/services/company/update-company-profile.ts`
- `lib/validators/company-rules.ts`

## Fichier modifié par FIX-01
- `app/api/planning/autoschedule/runs/route.ts`

## Résultat de session
- patch principal produit et validé ;
- fix complémentaire `FIX-01` produit et validé ;
- `test:quality`, `lint` et `build` validés ;
- session backend livrable et vérifiable en l’état validé final.

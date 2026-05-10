# README_PATCH — SESSION-20260319-25_A3_CLOTURE-A3

## Patch principal

`PATCH__SESSION-20260319-25_A3_CLOTURE-A3.diff`

## Objet

Correctif final minimal de clôture A3 pour intégrer `UserAbsence` dans les flux réels de planification concernés par le code existant.

## Fichiers code touchés

- `lib/services/planning/user-absence.ts`
- `lib/types/planning.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

## Résultat métier couvert

- blocage d’affectation manuelle si utilisateur absent ;
- exclusion des candidats absents au matching ;
- revalidation absence au moment de l’apply ;
- blocage de publication d’un run contenant un utilisateur absent.

## Validation terminale réellement retenue

- `git apply --check` du patch principal : OK
- `git apply` du patch principal : OK
- `npm run lint` : OK
- `npm run build` : OK

## Conséquence de clôture

Le patch principal permet la clôture définitive du bloc A3 dans le périmètre contrôlé, aucun autre blocant n’étant prouvé après application réelle et validations terminales positives.

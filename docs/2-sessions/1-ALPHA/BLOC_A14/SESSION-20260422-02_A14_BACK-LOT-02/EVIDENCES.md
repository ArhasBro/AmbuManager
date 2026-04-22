# EVIDENCES — SESSION-20260422-02_A14_BACK-LOT-02

## Patchs livrés
- `PATCH__SESSION-20260422-02_A14_BACK-LOT-02.diff`
- `PATCH__SESSION-20260422-02_A14_BACK-LOT-02_FIX-01.diff`

## Validations d’application
- `git apply --check PATCH__SESSION-20260422-02_A14_BACK-LOT-02.diff` : `OK`
- `git apply PATCH__SESSION-20260422-02_A14_BACK-LOT-02.diff` : `OK`
- `git apply --check PATCH__SESSION-20260422-02_A14_BACK-LOT-02_FIX-01.diff` : `OK`
- `git apply PATCH__SESSION-20260422-02_A14_BACK-LOT-02_FIX-01.diff` : `OK`

## Validations terminales prouvées
- `npm run test:quality` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## Écart complémentaire traité par FIX-01
- Fichier concerné : `app/api/planning/autoschedule/runs/route.ts`
- Erreur prouvée : `Cannot find name 'decodeCursor'`
- Traitement validé : réintroduction minimale des helpers de cursor nécessaires à la route.

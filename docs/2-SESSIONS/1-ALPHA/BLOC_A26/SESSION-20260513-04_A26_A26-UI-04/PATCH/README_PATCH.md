# README_PATCH

## Session liée

SESSION-20260513-04_A26_A26-UI-04

## Type

CORRECTION+COMPLÉTION

## Dossier PATCH

`docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-04_A26_A26-UI-04/PATCH`

## Patchs produits

- `PATCH__SESSION-20260513-04_A26_A26-UI-04.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-01.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-02.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-03.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff`

## Patch final à utiliser

`PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff`

## Clarification obligatoire

`PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04.diff` est remplacé par `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff`.
Le patch `FIX-04` ne doit pas être utilisé.
Le patch final validé visuellement est `FIX-04_V2`.
`FIX-04_V2` doit être appliqué sur la base `FIX-03`.

## Application du patch final

```bash
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-04_A26_A26-UI-04/PATCH/PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff"
git apply "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-04_A26_A26-UI-04/PATCH/PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff"
```

## Vérifications terminales

- `npm run lint` : code retour `0` (18 warnings connus hors périmètre dans `app/planning/planning-client.tsx`).
- `npm run build` : code retour `0`.
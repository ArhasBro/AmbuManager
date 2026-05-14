# EVIDENCES

## Chaîne de patchs produits

- `PATCH__SESSION-20260513-04_A26_A26-UI-04.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-01.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-02.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-03.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04.diff`
- `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff`

## Statut patch final

`PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04.diff` est remplacé par `PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff`.

Le patch `FIX-04` ne doit pas être utilisé comme correctif final.
Le patch final validé visuellement est `FIX-04_V2`.
`FIX-04_V2` doit être appliqué sur la base `FIX-03`.

## Preuves techniques explicites

- `git apply --check PATCH__SESSION-20260513-04_A26_A26-UI-04_FIX-04_V2.diff : code retour 0`
- `npm run lint : code retour 0`
- `npm run build : code retour 0`
- `npm run lint signale 18 warnings dans app/planning/planning-client.tsx, hors périmètre de cette session`

## Encodage

- Fichiers documentaires finaux : UTF-8 sans BOM.
- Patch documentaire final : UTF-8 sans BOM.
# RESULTATS

## Correctifs minimaux appliques

- `SESSION-20260425-19_A22_UIINT-10_FIX-01.diff`
  - restauration de la formule exacte `INFORMATION NON FOURNIE — À CONFIRMER`.
- `SESSION-20260425-19_A22_UIINT-10_FIX-02.diff`
  - nettoyage final de `app/company/company-rules-panel.tsx` : BOM retire, ligne vide finale retiree.
- `SESSION-20260425-19_A22_UIINT-10_FIX-FINAL.diff`
  - correctif minimal final documentaire UTF-8 propre + preuves terminales regenerees.

## Verifications code cible

- Les 3 occurrences de la formule sont conservees exactement : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Validation technique apres FIX-FINAL

- `npm.cmd run lint` : OK
- `npm.cmd run build` : KO hors perimetre UI (dependances manquantes `@prisma/client`, `bcrypt`, `pg`).

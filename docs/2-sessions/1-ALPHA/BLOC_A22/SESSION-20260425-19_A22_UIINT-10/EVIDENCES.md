# EVIDENCES

## Patch principal

- Fichier : `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-19_A22_UIINT-10/PATCH/SESSION-20260425-19_A22_UIINT-10.diff`

## Correctifs minimaux

- `SESSION-20260425-19_A22_UIINT-10_FIX-01.diff`
  - objet : restauration de la formule exacte `INFORMATION NON FOURNIE — À CONFIRMER`.
- `SESSION-20260425-19_A22_UIINT-10_FIX-02.diff`
  - objet : nettoyage final de `app/company/company-rules-panel.tsx` (BOM retire + ligne vide finale retiree), en conservant les 3 occurrences exactes de `INFORMATION NON FOURNIE — À CONFIRMER`.
- `SESSION-20260425-19_A22_UIINT-10_FIX-FINAL.diff`
  - objet : correctif minimal final documentaire UTF-8 propre + verification des contraintes finales.

## Validations executees apres FIX-FINAL

- `git apply --check -p2 <FIX-FINAL.diff>` : OK
- `git apply -p2 <FIX-FINAL.diff>` : OK
- `npm.cmd run lint` : OK (exit code 0)
- `npm.cmd run build` : KO (exit code 1)

KO build documente hors perimetre UI : dependances manquantes `@prisma/client`, `bcrypt`, `pg`.

## Preuves brutes

- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-19_A22_UIINT-10/PATCH/QA_PREUVES_BRUTES_FIX-02.txt`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-19_A22_UIINT-10/PATCH/QA_PREUVES_BRUTES_FIX-FINAL.txt`

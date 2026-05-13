# README_PATCH

## Session liee
SESSION-20260425-19_A22_UIINT-10

## Type
CORRECTION+COMPLETION

## Dossier PATCH
`docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-19_A22_UIINT-10/PATCH`

## Patch principal code
- Nom : `SESSION-20260425-19_A22_UIINT-10.diff`
- Perimetre :
  - `app/company/page.tsx`
  - `app/company/company-profile-form.tsx`
  - `app/company/company-rules-panel.tsx`
  - `app/depots/page.tsx`
  - `app/depots/depots-client.tsx`
  - `app/globals.css`

## Correctifs minimaux separes

- `SESSION-20260425-19_A22_UIINT-10_FIX-01.diff`
  - restauration stricte de la formule `INFORMATION NON FOURNIE — À CONFIRMER`.
- `SESSION-20260425-19_A22_UIINT-10_FIX-02.diff`
  - nettoyage final : suppression BOM + suppression ligne vide finale dans `app/company/company-rules-panel.tsx`.
- `SESSION-20260425-19_A22_UIINT-10_FIX-FINAL.diff`
  - correctif minimal final : regeneration UTF-8 propre des documents cibles et conservation stricte de `INFORMATION NON FOURNIE — À CONFIRMER`.

## Commandes FIX-FINAL executees

```bash
git apply --check -p2 "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-19_A22_UIINT-10/PATCH/SESSION-20260425-19_A22_UIINT-10_FIX-FINAL.diff"
git apply -p2         "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-19_A22_UIINT-10/PATCH/SESSION-20260425-19_A22_UIINT-10_FIX-FINAL.diff"
```

## Validation terminale apres FIX-FINAL

```bash
npm.cmd run lint
npm.cmd run build
```

Resultat final : `lint OK` / `build KO (dependances manquantes hors perimetre UI)`.

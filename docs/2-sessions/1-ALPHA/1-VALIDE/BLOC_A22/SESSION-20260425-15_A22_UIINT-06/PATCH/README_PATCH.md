# README_PATCH

## Session liee
SESSION-20260425-15_A22_UIINT-06

## Type
CORRECTION+COMPLETION

## Dossier PATCH
`docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-15_A22_UIINT-06/PATCH`

## Patch principal code
- Nom : `SESSION-20260425-15_A22_UIINT-06.diff`
- Perimetre :
  - `app/planning/manual-planning-panel.tsx`
  - `app/planning/planning-client.tsx`
  - `app/globals.css`

## Commandes d'application executees

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-15_A22_UIINT-06/PATCH/SESSION-20260425-15_A22_UIINT-06.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-15_A22_UIINT-06/PATCH/SESSION-20260425-15_A22_UIINT-06.diff"
```

Resultat : OK.

## Validation terminale executee

```bash
npm.cmd run lint
npm.cmd run build
```

Resultat : OK.

## Statut
- Patch principal produit : OUI
- Patch principal applique : OUI
- Patch correctif separe : NON


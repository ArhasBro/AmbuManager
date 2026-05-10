# README_PATCH

## Session liee
SESSION-20260425-11_A22_UIINT-02

## Type
CORRECTION+COMPLETION

## Dossier PATCH
docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH

## Patch principal code
- Nom : `SESSION-20260425-11_A22_UIINT-02.diff`
- Perimetre :
  - `app/layout.tsx`
  - `app/app-shell.tsx`

## Commandes d'application executees

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH/SESSION-20260425-11_A22_UIINT-02.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH/SESSION-20260425-11_A22_UIINT-02.diff"
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
- Patch correctif separe : NON
- Session : VALIDEE

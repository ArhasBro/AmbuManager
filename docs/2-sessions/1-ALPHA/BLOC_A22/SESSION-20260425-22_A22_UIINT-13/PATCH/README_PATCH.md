# README_PATCH

## Session liee
SESSION-20260425-22_A22_UIINT-13

## Type
CORRECTION+COMPLETION

## Dossier PATCH
docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH

## Patch principal
- `PATCH__SESSION-20260425-22_A22_UIINT-13.diff`

### Application
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13.diff"
```

## Correctif minimal
- `PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-01.diff`

### Application
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-01.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-01.diff"
```

## Correctif residuel
- `PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-02.diff`

### Application
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-02.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-02.diff"
```

## Fichiers code touches
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/globals.css`

## Statut
- Patch principal applique.
- Correctif minimal applique.
- Correctif residuel FIX-02 applique.
- `npm.cmd run lint` : OK
- `npm.cmd run build` : KO hors perimetre (dependances globales manquantes : `@prisma/client`, `bcrypt`, `pg`).
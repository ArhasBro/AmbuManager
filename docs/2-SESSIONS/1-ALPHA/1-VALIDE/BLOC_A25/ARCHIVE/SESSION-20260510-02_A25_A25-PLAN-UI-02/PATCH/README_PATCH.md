# README_PATCH

## Session liee
SESSION-20260510-02_A25_A25-PLAN-UI-02

## Type
CORRECTION+COMPLETION

## Dossier PATCH
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH`

## Patch officiel
`PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff`

## Correctif QA applique

- Patch principal reexporte en **UTF-8 sans BOM**.
- Verification binaire : le fichier commence directement par `diff --git` (pas de prefixe `EF BB BF`).

## Applicabilite du patch

Commande de reference :
```bash
git apply --check docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff
```

Statut :
- echec en working tree courant (contexte deja modifie) ;
- preuve d'applicabilite validee dans un worktree propre base sur `HEAD` (`PS_LASTEXITCODE=0`).

Preuves detaillees : voir `EVIDENCES.md` (sections encodage + apply-check).

## Validations terminales finales

- `npm run lint` : OK (`PS_LASTEXITCODE=0`)
- `npm run build` : OK (`PS_LASTEXITCODE=0`)

Sorties terminales detaillees : voir `EVIDENCES.md`.
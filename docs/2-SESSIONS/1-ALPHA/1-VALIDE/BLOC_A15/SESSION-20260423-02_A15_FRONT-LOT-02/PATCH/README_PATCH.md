# README_PATCH

## Session liee

SESSION-20260423-02_A15_FRONT-LOT-02

## Type

CORRECTION+COMPLETION

## Dossier PATCH

`docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-02_A15_FRONT-LOT-02/PATCH`

## Patch principal code

`PATCH__SESSION-20260423-02_A15_FRONT-LOT-02.diff`

Ce patch contient uniquement le code frontend du perimetre `FRONT-LOT-02`.  
La documentation finale de session est geree separement et n'est pas incluse dans le patch principal code.

## Commandes d'application

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-02_A15_FRONT-LOT-02/PATCH/PATCH__SESSION-20260423-02_A15_FRONT-LOT-02.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-02_A15_FRONT-LOT-02/PATCH/PATCH__SESSION-20260423-02_A15_FRONT-LOT-02.diff"
```

Note d'applicabilite :

- Le patch correspond aux modifications effectivement appliquees manuellement.
- Les commandes `git apply --check` et `git apply` ont ete relancees apres application des changements, ce qui explique l'echec `patch does not apply` sur un depot deja patche.
- sur un arbre deja modifie avec ce lot, `git apply` retourne `patch does not apply` (normal, patch deja reflete) ;
- le patch est destine a etre applique sur une base ou ces changements ne sont pas encore presents.

## Portee du patch principal

- `app/app-shell.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/dashboard/page.tsx`
- `app/dashboard/logout-button.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`

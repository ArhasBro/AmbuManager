# README_PATCH — `SESSION-20260423-03_A15_FRONT-03`

## Patch principal

- `PATCH__SESSION-20260423-03_A15_FRONT-03.diff`

## Objet

Correctif minimal de validation frontend :
- filtrage de la navigation globale selon les droits réels de la session ;
- alignement de la navigation existante avec le dashboard déjà filtré ;
- maintien du thème et du shell global existants.

## Fichiers code impactés

- `app/app-shell.tsx`
- `app/layout.tsx`

## Application

- `git apply --check ...PATCH__SESSION-20260423-03_A15_FRONT-03.diff` : `OK`
- `git apply ...PATCH__SESSION-20260423-03_A15_FRONT-03.diff` : `OK`

## Validations relancées après application

- `npm.cmd run lint` : `OK`
- `npm.cmd run build` en sandbox : `ECHEC` — `spawn EPERM`
- `npm.cmd run build` hors sandbox : `OK`
- `git apply --check --reverse ...PATCH__SESSION-20260423-03_A15_FRONT-03.diff` : `OK`
- `git diff --check` : `OK`

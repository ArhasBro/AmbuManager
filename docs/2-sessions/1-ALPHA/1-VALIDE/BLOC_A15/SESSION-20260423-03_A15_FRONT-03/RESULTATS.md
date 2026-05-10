# RESULTATS — `SESSION-20260423-03_A15_FRONT-03`

## 1. Résultats obtenus

Points conformes constatés :
- shell global présent et appliqué au layout racine ;
- thème `system/light/dark` présent avec tokens CSS ;
- pages critiques protégées côté serveur par session / droits ;
- dashboard filtré par droits ;
- écrans critiques structurés avec `page-wrap`, `page-head`, `panel`, messages d’état et retours dashboard ;
- planning manuel prioritaire ;
- autoschedule legacy masqué par défaut.

Point non conforme constaté puis corrigé :
- navigation globale statique dans `app/app-shell.tsx`, non alignée avec les droits réels.

Correctif appliqué :
- `app/app-shell.tsx` reçoit `navLinks` au lieu d’une navigation statique ;
- `app/layout.tsx` calcule les liens autorisés selon la session, le `companyId`, le rôle et les permissions.

## 2. Validations terminales réellement constatées

- `git apply --check ...PATCH__SESSION-20260423-03_A15_FRONT-03.diff` : `OK`
- `git apply ...PATCH__SESSION-20260423-03_A15_FRONT-03.diff` : `OK`
- `npm.cmd run lint` après patch : `OK`
- `npm.cmd run build` après patch en sandbox : `ECHEC` — `spawn EPERM`
- `npm.cmd run build` après patch hors sandbox : `OK`
- `git apply --check --reverse ...PATCH__SESSION-20260423-03_A15_FRONT-03.diff` : `OK`
- `git diff --check` : `OK`

## 3. Fichiers modifiés / produits

Fichiers code impactés :
- `app/app-shell.tsx`
- `app/layout.tsx`

Éléments produits :
- `PATCH__SESSION-20260423-03_A15_FRONT-03.diff`
- `README_PATCH.md`

Élément hors périmètre signalé mais non touché :
- `docs/CMD.md` était déjà modifié hors périmètre.

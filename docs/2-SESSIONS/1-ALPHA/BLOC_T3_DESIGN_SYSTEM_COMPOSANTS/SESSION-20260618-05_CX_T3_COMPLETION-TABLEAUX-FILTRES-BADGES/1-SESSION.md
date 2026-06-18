# 1 - Session

## 1. Identification

- Session : COMPLETION-TABLEAUX-FILTRES-BADGES
- Identifiant technique : SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T3_DESIGN_SYSTEM_COMPOSANTS
- Type de session : CX
- Type métier : COMPLÉTION
- Intitulé : Complétion des tableaux, filtres, badges et actions récurrentes

## 2. Contexte

- Projet : Ambulance Manager
- Source technique de vérité : repo officiel
- Base44 : référence fonctionnelle et visuelle uniquement
- T2 : clôturé manuellement, ne pas le rouvrir

## 3. Objectif unique

Compléter les primitives UI communes liées aux tableaux, filtres, statuts, actions récurrentes, headers de page et cartes statistiques, sans modifier la logique métier des modules.

## 4. Périmètre autorisé

- Modifier uniquement `app/ui/` pour les primitives communes
- Apporter des raccords minimaux dans les pages consommatrices uniquement si cela démontre ou relie une primitive commune
- Mettre à jour `app/ui/index.ts` si un export devient nécessaire
- Produire les preuves, le patch et le verdict final dans le dossier de session

## 5. Périmètre interdit

- Modifier une API
- Modifier Prisma
- Modifier le RBAC
- Modifier les routes
- Modifier `next.config.ts`
- Modifier `package.json`
- Modifier `package-lock.json`
- Lancer `npm install`
- Lancer une migration
- Créer un dossier `components/`
- Copier un composant Base44
- Copier un composant shadcn
- Refondre `app/globals.css`
- Traiter la palette globale, la typographie globale, le spacing global ou la navigation
- Refondre une page métier complète
- Rouvrir `CX_T3_CORRECTION-ETATS-COMMUNS` autrement que pour lecture de dépendance
- Faire un audit global hors T3
- Corriger des warnings ESLint sans lien direct avec le patch

## 6. Fichiers à lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/PATCH/PATCH__SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS.diff`
- `app/ui/action-button.tsx`
- `app/ui/data-table.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`
- `app/ui/index.ts`
- `app/depots/page.tsx`
- `app/users/users-list-client.tsx`
- `app/vehicles/add-vehicle-form.tsx`

## 7. Fichiers modifiables

- `app/ui/action-button.tsx`
- `app/ui/data-table.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`
- `app/depots/page.tsx`
- `app/users/users-list-client.tsx`
- `app/vehicles/add-vehicle-form.tsx`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES/PATCH/PATCH__SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES.diff`

## 8. Livrable attendu

- Primitives `data-table`, `filter-bar`, `status-badge`, `action-button`, `page-header` et `stat-card` complétées ou explicitement justifiées
- Raccords minimaux dans les pages consommatrices uniquement si nécessaires
- Diff ciblé et patch officiel dans `PATCH/`
- Preuves terminales et documentaires à jour

## 9. Contrôles attendus

- `git status --short`
- `Get-ChildItem -LiteralPath "app/ui" -Recurse -File`
- `rg -n "DataTable|data-table|Filter|filter|Badge|badge|Status|status|Action|action|PageHeader|page-header|StatCard|stat-card" app app/ui`
- `rg -n "from \"@/app/ui|from '@/app/ui|from \"@/ui|from '@/ui" app`
- `npx eslint app/ui`
- `npx eslint app/ui app/depots/page.tsx app/users/users-list-client.tsx app/vehicles/add-vehicle-form.tsx`
- `git diff --name-only`
- `git diff -- app/ui`

## 10. Critères de validation

- Les primitives communes sont utilisables par les futurs blocs page
- Les composants restent génériques et non spécifiques à un module
- Aucune logique métier n’est déplacée dans `app/ui/`
- Aucune route, API, Prisma, RBAC ou config package n’est modifiée
- Le diff est ciblé
- Le patch est produit dans `PATCH/`

## 11. Points à confirmer

- Diff ergonomique comparé à Base44 au pixel près : INFORMATION NON FOURNIE - À CONFIRMER
- Impact futur des nouvelles slots sur d’autres pages : INFORMATION NON FOURNIE - À CONFIRMER

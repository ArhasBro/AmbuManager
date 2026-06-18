# 1 — Session

## 1. Identification

- Session : AUDIT-COMPOSANTS-ETATS
- Identifiant technique : SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T3_DESIGN_SYSTEM_COMPOSANTS
- Type : DX
- Intitulé : Audit composants communs et etats UI

## 2. Contexte

- Projet : Ambulance Manager
- Source technique finale : repo officiel
- Prototype de référence : Base44, uniquement en lecture et sans copie technique
- T2 est considéré comme clôturé par décision manuelle projet ; ne pas le rouvrir

## 3. Objectif unique

Inventorier les composants communs existants dans `app/ui/` et les états UI existants, manquants ou incohérents, sans modifier l’interface ni créer de composant.

## 4. Périmètre autorisé

- Lire `create_session.ps1`
- Lire `docs/2-SESSIONS/README_SESSIONS.md`
- Lire `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- Lire `docs/3-TEMPLATES/TEMPLATE_CONTROLE_CHATGPT.md`
- Lire `docs/1-MASTER/01-APPLICATION_WEB.md`
- Lire `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- Lire `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- Lire `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- Lire `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- Lire `docs/1-MASTER/2-REFERENCE_UI_UX/*`
- Lire `docs/1-MASTER/4-BASE44_REFERENCE/*` en lecture seule
- Lire `app/ui/`
- Lire `app/globals.css`
- Lire les CSS locales de pages si nécessaire à l’inventaire
- Lire les pages ou composants consommateurs uniquement pour identifier les usages récurrents

## 5. Périmètre interdit

- Modifier `app/ui/`
- Modifier `app/globals.css`
- Modifier une page métier
- Modifier un composant client
- Créer, supprimer, déplacer ou renommer un composant
- Créer un dossier `components/`
- Modifier une API
- Modifier Prisma
- Modifier `next.config.ts`
- Modifier `package.json`
- Modifier `package-lock.json`
- Lancer `npm install`
- Lancer Prisma
- Lancer Playwright
- Lancer un navigateur
- Faire une capture
- Corriger les warnings ESLint
- Lancer `npm run build`
- Lancer `npm run lint`
- Faire un audit global hors T3

## 6. Fichiers à lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/3-TEMPLATES/TEMPLATE_CONTROLE_CHATGPT.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_CHECKLIST_CODEX.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `app/ui/*.tsx`
- `app/globals.css`
- `app/a24-*.css` si utile à la lecture des usages
- Pages et composants consommateurs lus uniquement pour usage :
  - `app/audit/page.tsx`
  - `app/audit/audit-client.tsx`
  - `app/company/page.tsx`
  - `app/company/company-profile-form.tsx`
  - `app/company/company-rules-panel.tsx`
  - `app/depots/page.tsx`
  - `app/depots/depots-client.tsx`
  - `app/dashboard/page.tsx`
  - `app/planning/page.tsx`
  - `app/planning/planning-client.tsx`
  - `app/planning/manual-planning-panel.tsx`
  - `app/templates/page.tsx`
  - `app/templates/templates-client.tsx`
  - `app/users/page.tsx`
  - `app/users/users-list-client.tsx`
  - `app/users/users-side-panel-client.tsx`
  - `app/users/user-edit-client.tsx`
  - `app/users/user-depot-assignment-client.tsx`
  - `app/users/user-archive-client.tsx`
  - `app/users/user-creation-client.tsx`
  - `app/users/user-absence-client.tsx`
  - `app/users/reset-password-client.tsx`
  - `app/onboarding/page.tsx`
  - `app/onboarding/onboarding-client.tsx`
  - `app/privacy/page.tsx`
  - `app/vehicles/page.tsx`
  - `app/vehicles/vehicles-client.tsx`
  - `app/vehicles/add-vehicle-form.tsx`

## 7. Fichiers modifiables

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md`

## 8. Livrable attendu

Audit structuré contenant :

- inventaire des composants communs existants dans `app/ui/`
- rôle probable de chaque composant
- composants fiables à conserver
- composants à corriger plus tard
- composants à créer plus tard
- composants ou zones à ne pas toucher
- états UI existants
- états UI manquants ou incohérents
- primitives utiles pour les prochains blocs page
- liste des pages consommatrices lues uniquement pour usage
- comparaison d’intention avec Base44 sans copie technique
- risques de refonte UI globale
- recommandations de sessions CX futures

## 9. Contrôles attendus

- `git status --short`
- `git diff --name-only`
- `rg -n "Empty|empty|Error|error|Loading|loading|disabled|Accès refusé|Acces refuse|Access denied|badge|table|filter|header|button|stat" app app/ui`
- `rg -n "app/ui|from \"@/app/ui|from '@/app/ui|from \"@/ui|from '@/ui" app`
- revue des composants `app/ui/`
- revue des pages consommatrices uniquement pour usage

## 10. Critères de validation

- aucune modification applicative hors session documentaire
- inventaire des composants et états suffisamment complet pour ouvrir CX_T3
- preuves terminales et fichiers lus listés
- aucun composant créé, déplacé, renommé ou supprimé
- aucun patch applicatif attendu

## 11. Points à confirmer

- Création future d’un dossier `components/` : INFORMATION NON FOURNIE — À CONFIRMER
- Palette, typographie et espacements chiffrés exacts : INFORMATION NON FOURNIE — À CONFIRMER
- Niveau de fidélité visuelle Alpha par rapport aux maquettes V2 : INFORMATION NON FOURNIE — À CONFIRMER

## 12. Complément d’audit — cohérence du plan de suite T3

- Vérifier si `CX_T3_CORRECTION-ETATS-COMMUNS` est bien la prochaine session logique
- Vérifier si cette CX est suffisamment ciblée et doit rester séparée de la complétion tableaux/filtres/badges
- Vérifier que les sujets `palette`, `typographie`, `spacing`, `navigation`, `RBAC`, `routes`, `logique métier`, `globals.css`, `components/`, Base44 et shadcn restent hors de cette CX
- Vérifier si un cadrage intermédiaire est nécessaire avant correction
- Maintenir les points non tranchés sous la forme `INFORMATION NON FOURNIE — À CONFIRMER`

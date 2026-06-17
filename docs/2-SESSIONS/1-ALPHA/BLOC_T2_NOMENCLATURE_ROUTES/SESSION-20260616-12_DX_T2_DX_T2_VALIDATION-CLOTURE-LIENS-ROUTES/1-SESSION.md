# 1 - Session

## 1. Identification

- Session : `SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`
- Date : `16/06/2026`
- Phase : `1-ALPHA`
- Bloc : `T2 - Nomenclature, routes et renommages futurs`
- Nature : `DX`
- Type métier : `VALIDATION+CLOTURE`
- Intitulé : `Validation et clôture des liens et routes T2`
- Dépendances :
  - `DX_T2_AUDIT-ROUTES-LIBELLES`
  - `DX_T2_CADRAGE-RENOMMAGES`
  - `CX_T2_CORRECTION-LIBELLES-RESIDUELS`
  - correction documentaire ciblée associée à `CX_T2_CORRECTION-LIBELLES-RESIDUELS`

## 2. Contexte

Le repo officiel Ambulance Manager reste la source technique de vérité.

Base44 reste une référence fonctionnelle, visuelle et métier uniquement. Aucun code Base44 ne doit être copié ni utilisé comme vérité technique.

Cette session est une session `DX` de `VALIDATION+CLOTURE`. Elle contrôle l'état réel des liens et routes après T2 et ne corrige rien.

## 3. Objectif unique

Contrôler que la navigation visible, les liens et les routes techniques conservées fonctionnent après les corrections de libellés T2, puis conclure si le bloc T2 est clôturable ou non clôturable.

## 4. Périmètre autorisé

- Créer la session via `create_session.ps1`.
- Lire la gouvernance de session et les MASTER actifs demandés.
- Relire les sessions T2 dépendantes et la reprise documentaire associée.
- Lire `app/`, `app/app-shell.tsx`, `app/ui/` et les pages/routes principales existantes.
- Exécuter les contrôles Git demandés.
- Exécuter `npm run lint`.
- Utiliser l'application rendue et le navigateur headless local pour vérifier :
  - navigation visible ;
  - routes `/dashboard`, `/templates`, `/onboarding`, `/privacy`, `/depots` ;
  - autres modules principaux visibles du shell connecté ;
  - redirection attendue des routes protégées hors authentification ;
  - accessibilité publique de `/privacy`.
- Documenter précisément les écarts avec classement `BLOQUANT`, `NON BLOQUANT` ou `INFORMATION A CONFIRMER`.

## 5. Périmètre interdit

- Aucune correction de code.
- Aucune modification de libellé UI.
- Aucune modification de route, `href`, URL, redirection ou alias.
- Aucune modification de `next.config.ts`.
- Aucune modification Prisma.
- Aucune modification Base44.
- Aucune modification `docs/1-MASTER`.
- Aucune modification `docs/3-TEMPLATES`.
- Aucune modification des pages applicatives, de `app/app-shell.tsx` ou de `app/ui/`.
- Aucun déplacement, renommage ou création de fichier applicatif.
- Aucune création de session CX ou FIX.
- Aucun patch applicatif `.diff`.

## 6. Fichiers lus

### Gouvernance et création de session

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`

### Sessions dépendantes T2

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md`

### MASTER actifs

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md`

### Références UI/UX utiles

- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`

### Code officiel lu en lecture seule

- `app/app-shell.tsx`
- `app/page.tsx`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/depots/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/company/page.tsx`
- `app/audit/page.tsx`
- `app/ui/**`

## 7. Fichiers modifiables

Uniquement :

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/PATCH/NO_PATCH.md`

## 8. Fichiers à ne pas modifier

- `app/**`
- `next.config.ts`
- `prisma/**`
- `docs/1-MASTER/**`
- `docs/3-TEMPLATES/**`
- `docs/1-MASTER/4-BASE44_REFERENCE/**`

## 9. Livrable attendu

- `2-PREUVES.md` complété avec commandes, sorties utiles, contrôles navigateur, tableaux de routes et navigation, écarts, Git avant/après, lint et encodage.
- `3-FIN_DE_SESSION.md` complété avec conclusion explicite sur la clôture ou non-clôture du bloc T2.
- Aucun patch applicatif.

## 10. Contrôles attendus

- `git status --short`
- `git diff --name-only`
- `git ls-files --others --exclude-standard`
- `npm run lint`
- contrôle navigateur connecté sur la navigation visible
- contrôle navigateur direct sur `/dashboard`, `/templates`, `/onboarding`, `/privacy`, `/depots`
- contrôle navigateur sur les autres modules visibles du shell
- contrôle de non-correction applicative
- contrôle UTF-8 sans BOM des fichiers de session

## 11. Critères de validation

Le bloc T2 est clôturable uniquement si :

- aucun lien critique n'est cassé ;
- les routes techniques conservées restent accessibles selon le comportement attendu ;
- les libellés visibles corrigés sont conformes ou les écarts restants sont explicitement non bloquants ;
- aucune correction applicative n'est faite dans cette session ;
- aucune route, URL, redirection, alias, fichier ou dossier applicatif n'est modifié ;
- les preuves sont suffisantes ;
- l'état Git final reste cohérent avec une session documentaire uniquement.

## 12. Règle de non-correction

Si un lien cassé, une route inaccessible ou un libellé visible legacy bloquant est détecté :

1. ne rien corriger ;
2. documenter précisément l'écart ;
3. classer l'écart ;
4. conclure à une non-clôture du bloc T2 si l'écart est bloquant ;
5. demander une session CX ciblée.

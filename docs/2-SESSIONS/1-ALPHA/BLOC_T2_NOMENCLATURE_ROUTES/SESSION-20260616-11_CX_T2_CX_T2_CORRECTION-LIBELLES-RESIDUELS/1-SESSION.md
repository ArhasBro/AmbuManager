# 1 - Session

## 1. Identification

- Session : `SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS`
- Date : `16/06/2026`
- Phase : `1-ALPHA`
- Bloc : `T2 - Nomenclature, routes et renommages futurs`
- Nature : `CX`
- Type métier : `CORRECTION`
- Dépendance obligatoire : `DX_T2_CADRAGE-RENOMMAGES`
- Création : via `create_session.ps1`

## 2. Contexte

Le repo officiel Ambulance Manager reste la source technique de vérité.

Base44 est uniquement une référence fonctionnelle, visuelle et métier. Aucun code Base44 ne doit être copié ni adapté techniquement sans cadrage explicite.

Le cadrage T2 impose de conserver les routes techniques historiques en l'état tant qu'aucun renommage technique n'est validé, tout en corrigeant les libellés visibles résiduels côté UI.

## 3. Objectif unique

Corriger uniquement les libellés visibles résiduels encore en anglais, legacy ou incohérents avec le cadrage T2, sans changer les routes techniques, les `href`, les URLs, les dossiers App Router, les imports techniques ni les segments de route.

## 4. Périmètre autorisé

- Créer la session via `create_session.ps1`.
- Lire `docs/2-SESSIONS/README_SESSIONS.md`.
- Lire `DX_T2_AUDIT-ROUTES-LIBELLES`.
- Lire `DX_T2_CADRAGE-RENOMMAGES`.
- Lire les MASTER utiles.
- Lire `app/`, `app/ui/`, `app/app-shell.tsx` et les pages concernées.
- Modifier uniquement les fichiers UI strictement nécessaires aux libellés visibles résiduels.
- Produire un diff applicatif ciblé dans `PATCH/`.
- Exécuter `npm run lint`.

## 5. Périmètre interdit

- Aucun renommage de dossier, fichier, route ou segment App Router.
- Aucune modification de `href`, URL, redirection ou alias technique.
- Aucune modification de `next.config.ts`.
- Aucune modification Prisma.
- Aucune modification Base44 documentaire.
- Aucune modification `docs/1-MASTER`.
- Aucune modification `docs/3-TEMPLATES`.
- Aucune refonte de navigation, de RBAC ou de protections d'accès.
- Aucun déplacement de composant.

## 6. Fichiers lus

### Gouvernance et sessions

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/2-PREUVES.md`

### MASTER actifs

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

### Références UI/UX

- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`

### Code officiel lu

- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/privacy/page.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/templates/templates-client.tsx`

## 7. Fichiers modifiables

### Applicatif

- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/templates/templates-client.tsx`

### Session

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/PATCH__SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS.diff`

## 8. Fichiers à ne pas modifier

- `next.config.ts`
- `prisma/**`
- `docs/1-MASTER/**`
- `docs/3-TEMPLATES/**`
- `docs/1-MASTER/4-BASE44_REFERENCE/**`
- tout dossier App Router ou fichier de route hors besoin strict de libellé visible

## 9. Livrable attendu

- Correction ciblée de libellés visibles résiduels sur les zones `Modèles horaires`, `Mise en route`, `Dépôts / Bases` et harmonisation visible associée.
- Preuves complètes dans `2-PREUVES.md`.
- Verdict explicite dans `3-FIN_DE_SESSION.md`.
- Patch applicatif ciblé `.diff` dans `PATCH/`.

## 10. Contrôles attendus

- `git status --short` avant/après
- `git diff --name-only`
- `git ls-files --others --exclude-standard`
- `npm run lint`
- contrôle ciblé de non-modification des `href` et routes
- contrôle d'absence de modification interdite
- contrôle UTF-8 sans BOM des fichiers créés/modifiés

## 11. Critères de validation

- Les libellés visibles résiduels ciblés sont corrigés en français.
- Aucune route technique n'est renommée.
- Aucun `href` ou URL n'est modifié.
- Aucun fichier hors périmètre n'est modifié.
- Le diff applicatif reste minimal et ciblé.
- `npm run lint` est exécuté et qualifié.
- Les preuves sont complètes.

## 12. Points à confirmer

- `INFORMATION NON FOURNIE — À CONFIRMER` : politique future de renommage technique `/templates`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : politique future de renommage technique `/onboarding`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : arbitrage futur sur aliases/redirections si renommage technique validé plus tard.

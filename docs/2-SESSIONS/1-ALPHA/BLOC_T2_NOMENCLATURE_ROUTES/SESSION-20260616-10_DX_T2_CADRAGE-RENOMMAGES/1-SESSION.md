# 1 - Session

## 1. Identification

- Session : `SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES`
- Bloc : `T2 - Nomenclature, routes et renommages futurs`
- Nature : `DX`
- Type métier : `CADRAGE`
- Dépendance obligatoire : `DX_T2_AUDIT-ROUTES-LIBELLES`
- Création : via `create_session.ps1`

Note de création : le script impose le token technique `VALIDATION` pour une session DX de cadrage séparée. Cette session reste une session de cadrage et ne constitue pas une validation ni une clôture de T2.

## 2. Contexte

L'audit `DX_T2_AUDIT-ROUTES-LIBELLES` a cartographié les routes officielles, les libellés visibles, les écarts de nomenclature et les points à confirmer.

Le repo officiel reste la source technique de vérité. Base44 est uniquement une référence fonctionnelle, visuelle et métier. Base44 ne doit jamais être copié techniquement.

## 3. Objectif strict

Décider, à partir de l'audit T2, quoi conserver, quoi corriger uniquement en UI, quoi reporter comme renommage technique futur, et quoi laisser en `INFORMATION NON FOURNIE — À CONFIRMER`.

Cette session ne corrige rien dans l'application.

## 4. Périmètre inclus

- Relecture du résultat `DX_T2_AUDIT-ROUTES-LIBELLES`.
- Relecture des règles de session.
- Lecture des MASTER utiles : méthode, plan, blocs de production et nomenclature disponible.
- Lecture ciblée de `next.config.ts`.
- Lecture ciblée de `app/`, `app/app-shell.tsx`, shell, dashboard et routes concernées.
- Lecture des références UI/UX et fiches fonctionnelles utiles.
- Lecture Base44 limitée aux intentions fonctionnelles et libellés métier.
- Cadrage des options : maintien des routes anglaises, aliases éventuels, redirections éventuelles, impacts UX/navigation, App Router, SEO Alpha, documentation/conventions, risques de liens cassés et risques de divergence shell/dashboard/onboarding/routes directes.

## 5. Périmètre exclu

- Aucune migration de route.
- Aucune correction applicative.
- Aucune redirection.
- Aucun alias technique.
- Aucun renommage technique.
- Aucune correction de libellé UI.
- Aucune modification de `app/`.
- Aucune modification de `next.config.ts`.
- Aucune modification Prisma.
- Aucune modification Base44.
- Aucune modification MASTER.
- Aucune modification de `docs/3-TEMPLATES`.
- Aucune session CX ou FIX.
- Aucun patch applicatif `.diff`.
- Aucune déclaration que T2 est validé ou clôturé.

## 6. Fichiers lus

### Session dépendante

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/3-FIN_DE_SESSION.md`

### Gouvernance et MASTER

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

### Code officiel lu en lecture seule

- `next.config.ts`
- `app/`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/dashboard/page.tsx`
- `app/planning/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/audit/page.tsx`

### Références UI/UX et fonctionnelles

- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`

### Base44 en référence uniquement

- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/shell/AppShell.jsx`

## 7. Fichiers modifiables

Uniquement :

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/PATCH/NO_PATCH.md`

## 8. Méthode de cadrage

1. Partir du repo officiel et de l'audit T2.
2. Distinguer route technique, libellé visible, alias, redirection et convention documentaire.
3. Reclasser chaque sujet dans une seule décision finale autorisée : `CONSERVER`, `CORRIGER LIBELLÉ`, `RENOMMER PLUS TARD`, `INFORMATION NON FOURNIE — À CONFIRMER`.
4. Reporter les migrations techniques quand l'arbitrage humain n'est pas fourni.
5. Signaler les impacts sur shell, dashboard, onboarding, accès direct App Router et SEO Alpha.

## 9. Rappel de non-modification applicative

Aucune modification applicative n'est autorisée dans cette session. Aucun fichier `app/`, `next.config.ts`, Prisma, Base44, MASTER ou template ne doit être modifié.

## 10. Rappel de non-clôture T2

Cette session termine un cadrage documentaire. Elle ne valide pas T2, ne clôture pas T2 et ne remplace pas une validation humaine.

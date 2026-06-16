# 1 - Session

## 1. Identification

- Session : SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T2 - Nomenclature, routes et renommages futurs
- Nature : DX
- Type métier : AUDIT
- Intitulé : Audit routes officielles et libellés visibles

## 2. Objectif unique

Cartographier les routes officielles repérées dans `app/`, les libellés visibles associés, les écarts de nomenclature et les décisions proposées pour les sessions suivantes.

Cette session ne valide pas T2 et ne corrige aucun code.

## 3. Périmètre autorisé

- Lecture des routes officielles dans `app/`.
- Lecture de la navigation et des liens visibles.
- Lecture des liens login/privacy.
- Lecture du dashboard uniquement pour les liens, raccourcis et libellés de navigation.
- Lecture de Base44 comme référence fonctionnelle, visuelle et métier uniquement.
- Production d'une matrice route technique -> libellé visible -> source -> écart -> décision proposée.

## 4. Périmètre interdit

- Aucune correction de libellé.
- Aucun renommage de route.
- Aucune redirection créée.
- Aucune modification de `app/`, Prisma, Base44, MASTER ou templates.
- Aucun patch applicatif `.diff`.
- Aucune déclaration de validation ou clôture T2.

## 5. Fichiers lus

### Gouvernance et MASTER

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/README_SESSIONS.md`

### Code officiel

- `app/`
- `app/layout.tsx`
- `app/page.tsx`
- `app/app-shell.tsx`
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/dashboard/page.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/planning/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/audit/page.tsx`

### Références UI/UX

- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/1-REFERENCE_UI_UX_LOGIN.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`

### Fiches fonctionnelles

- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`

### Base44 en référence uniquement

- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/shell/AppShell.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/Dashboard.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/Login.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/ModelesHoraires.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/MiseEnRoute.jsx`

## 6. Livrable attendu

Livrable produit dans `2-PREUVES.md` et synthétisé dans `3-FIN_DE_SESSION.md` :

- liste des routes officielles repérées ;
- liste des libellés visibles associés ;
- matrice route/libellé/source/Base44/écart/décision ;
- écarts de nomenclature ;
- liens critiques à contrôler plus tard ;
- décisions à confirmer ;
- risques pour les sessions suivantes ;
- recommandation de suite.

## 7. Décisions autorisées

Les décisions de la matrice utilisent uniquement les statuts demandés :

- CONFORME
- CORRECTION LIBELLÉ À PRÉVOIR
- RENOMMAGE TECHNIQUE À CONFIRMER
- REDIRECTION À CONFIRMER
- INFORMATION NON FOURNIE — À CONFIRMER
- HORS PÉRIMÈTRE T2

## 8. Limite de session

Base44 reste une référence fonctionnelle, visuelle et métier. Aucun code Base44 n'a été copié, modifié ou porté.

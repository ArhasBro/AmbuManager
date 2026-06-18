# Ambulance Manager - Blocs et sessions de production

Date de refonte ciblée : 16/06/2026

## Sommaire

- [1. Rôle du document](#1-rôle-du-document)
- [2. Convention de lecture](#2-convention-de-lecture)
- [3. Ordre global recommandé des blocs restants](#3-ordre-global-recommandé-des-blocs-restants)
- [4. Blocs transversaux](#4-blocs-transversaux)
  - [BLOC T1 - Shell global, navigation et contexte connecté](#bloc-t1---shell-global-navigation-et-contexte-connecté)
  - [BLOC T2 - Nomenclature, routes et renommages futurs](#bloc-t2---nomenclature-routes-et-renommages-futurs)
  - [BLOC T3 - Design system officiel et composants communs](#bloc-t3---design-system-officiel-et-composants-communs)
  - [BLOC T4 - RBAC UI/API et matrice permissions progressive](#bloc-t4---rbac-uiapi-et-matrice-permissions-progressive)
  - [BLOC T5 - Données, multi-tenant et mapping Base44 vers officiel](#bloc-t5---données-multi-tenant-et-mapping-base44-vers-officiel)
  - [BLOC T6 - Audit et traçabilité transverse](#bloc-t6---audit-et-traçabilité-transverse)
  - [BLOC T7 - Qualité, tests et contrôles de reprise](#bloc-t7---qualité-tests-et-contrôles-de-reprise)
- [5. Blocs pages et modules](#5-blocs-pages-et-modules)
  - [BLOC P-LOGIN - Connexion](#bloc-p-login---connexion)
  - [BLOC P-SOCIETE - Société](#bloc-p-societe---société)
  - [BLOC P-DEPOTS-BASES - Dépôts / Bases](#bloc-p-depots-bases---dépôts--bases)
  - [BLOC P-UTILISATEURS-RH - Utilisateurs / RH](#bloc-p-utilisateurs-rh---utilisateurs--rh)
  - [BLOC P-VEHICULES - Véhicules](#bloc-p-vehicules---véhicules)
  - [BLOC P-SUIVI-VEHICULES - Suivi des véhicules](#bloc-p-suivi-vehicules---suivi-des-véhicules)
  - [BLOC P-MODELES-HORAIRES - Modèles horaires](#bloc-p-modeles-horaires---modèles-horaires)
  - [BLOC P-PLANNING - Planning](#bloc-p-planning---planning)
  - [BLOC P-AUDIT - Audit / Traçabilité](#bloc-p-audit---audit--traçabilité)
  - [BLOC P-DASHBOARD - Tableau de bord](#bloc-p-dashboard---tableau-de-bord)
  - [BLOC P-MISE-EN-ROUTE - Mise en route](#bloc-p-mise-en-route---mise-en-route)
- [6. Bloc RGPD et Privacy](#6-bloc-rgpd-et-privacy)
  - [BLOC RGPD-PRIVACY - Privacy visible en Alpha](#bloc-rgpd-privacy---privacy-visible-en-alpha)
- [7. Validations finales et gel Alpha](#7-validations-finales-et-gel-alpha)
  - [BLOC F1 - Validation fonctionnelle croisée](#bloc-f1---validation-fonctionnelle-croisée)
  - [BLOC F2 - Validation qualité technique](#bloc-f2---validation-qualité-technique)
  - [BLOC F3 - Validation UX visuelle](#bloc-f3---validation-ux-visuelle)
  - [BLOC F4 - Clôture documentaire Alpha ou clôture de phase](#bloc-f4---clôture-documentaire-alpha-ou-clôture-de-phase)
- [8. Décisions à confirmer avant production](#8-décisions-à-confirmer-avant-production)
- [9. Risques principaux à surveiller](#9-risques-principaux-à-surveiller)

## 1. Rôle du document

Ce fichier est le plan officiel unique des blocs et sessions de production d'Ambulance Manager.

Il remplace le cadrage OFF validé et doit rester cohérent avec `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`, `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` et `docs/2-SESSIONS/README_SESSIONS.md`.

Règles appliquées :

- le repo officiel reste la source technique de vérité ;
- Base44 reste une référence fonctionnelle, visuelle et métier, jamais une source technique à copier ;
- les sessions listées ci-dessous sont des lots réels, ordonnés, courts et contrôlables ;
- aucune validation humaine n'est déclarée dans ce document ;
- toute information non prouvée reste marquée `INFORMATION NON FOURNIE — À CONFIRMER`.

## 2. Convention de lecture

Les seules natures réelles utilisées dans ce plan sont :

- `DX` : session documentaire utile au code ;
- `CX` : session code, applicative ou technique.

Les validations et clôtures sont portées par des sessions `DX` de type métier `VALIDATION+CLOTURE`. Aucune session réelle `QA` ou `DOC` n'est à créer dans `docs/2-SESSIONS`.

Les types métier officiels sont : `AUDIT+CADRAGE`, `AUDIT`, `CADRAGE`, `CRÉATION`, `CORRECTION`, `COMPLÉTION`, `VALIDATION+CLOTURE`.

## 3. Ordre global recommandé des blocs restants

Ordre recommandé :

1. T1 - Shell global, navigation et contexte connecté : bloc historiquement traité, à garder visible sans nouvelle correction inventée.
2. T2 - Nomenclature, routes et renommages futurs.
3. T3 - Design system officiel et composants communs.
4. T4 - RBAC UI/API et matrice permissions progressive.
5. T5 - Données, multi-tenant et mapping Base44 vers officiel.
6. T6 - Audit et traçabilité transverse.
7. T7 - Qualité, tests et contrôles de reprise.
8. P-LOGIN - Connexion.
9. P-SOCIETE - Société.
10. P-DEPOTS-BASES - Dépôts / Bases.
11. P-UTILISATEURS-RH - Utilisateurs / RH.
12. P-VEHICULES - Véhicules.
13. P-SUIVI-VEHICULES - Suivi des véhicules.
14. P-MODELES-HORAIRES - Modèles horaires.
15. P-PLANNING - Planning.
16. P-AUDIT - Audit / Traçabilité.
17. P-DASHBOARD - Tableau de bord.
18. P-MISE-EN-ROUTE - Mise en route.
19. RGPD-PRIVACY - Privacy visible en Alpha.
20. F1 - Validation fonctionnelle croisée.
21. F2 - Validation qualité technique.
22. F3 - Validation UX visuelle.
23. F4 - Clôture documentaire Alpha ou clôture de phase.

Justification synthétique :

- T2 précède les renommages/routes afin d'éviter des changements techniques non arbitrés sur `/templates` et `/onboarding`.
- T3 précède l'harmonisation UI large afin de stabiliser les primitives `app/ui`, les états communs et les patterns de tableaux/actions.
- T4 précède les actions sensibles car les écarts front/API sont un risque majeur confirmé par les audits.
- T5 précède les créations de modèles/data, notamment `CompanyContact`, `DashboardPreference`, `VehicleCheck`, `Disinfection`, `VehicleAnomaly` et tout mapping Base44.
- T6 précède les modules devant produire ou exposer des traces.
- Les référentiels Société, Dépôts, Utilisateurs/RH, Véhicules et Modèles horaires précèdent le Planning.
- Le Planning précède le Dashboard final, car les KPI et widgets ne doivent pas présenter de données fictives.
- F1, F2 et F3 précèdent F4 afin d'éviter une clôture documentaire sans preuve.

## 4. Blocs transversaux

### BLOC T1 - Shell global, navigation et contexte connecté

#### Objectif du bloc

Conserver le statut historique du bloc T1 sans rouvrir de corrections non demandées.

#### Rôle dans l'application

Le shell porte la navigation connectée, le contexte utilisateur/société, la visibilité des modules et le pattern `Accès refusé`.

#### Dépendances amont

- Sessions historiques T1 déjà réalisées.
- T4 pour toute évolution future des permissions fines.

#### Dépendances aval

- Tous les blocs page/module.
- F1 et F3.

#### Décisions connues

- T1 est marqué `Validé` dans le plan actuel.
- Les libellés visibles attendus sont `Modèles horaires`, `Mise en route`, `Dépôts / Bases`, `Utilisateurs / RH`.
- `Privacy` ne doit pas être une entrée métier principale.

#### Décisions à confirmer

- Validation humaine finale du statut T1 dans la phase Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Règles exactes de fallback si un droit est retiré pendant une session active : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Réouvrir T1 sans preuve et inventer une nouvelle correction.
- Confondre validation historique et validation finale Alpha.
- Laisser T4 modifier indirectement la navigation sans contrôle T1.

#### Sessions de production prévues

- `DX_T1_VALIDATION-CLOTURE-HISTORIQUE-SHELL`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : vérifier que le statut historique T1 est cohérent avec les preuves disponibles et qu'aucune nouvelle correction T1 n'est nécessaire avant les blocs restants.
  - Périmètre inclus : lecture du dossier historique T1, `app/app-shell.tsx`, `app/ui/access-denied-state.tsx`, références Shell et navigation.
  - Hors périmètre : correction code, renommage de routes, modification RBAC.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION` si présent, `app/app-shell.tsx`, `app/ui/access-denied-state.tsx`, `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`.
  - Zones modifiables plus tard : aucune dans cette session de validation.
  - Critères de validation : statut T1 qualifié comme déjà traité, écarts restants listés sans patch.
  - Preuves attendues : `git status --short`, extraits de fichiers, captures éventuelles si serveur disponible.
  - Dépendances : T4 si une permission modifie la navigation.

- `DX_T1_VALIDATION-CLOTURE-HISTORIQUE-SI-REQUIS`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : produire une note de clôture historique T1 uniquement si la méthode de phase l'exige.
  - Périmètre inclus : synthèse documentaire du statut T1 et des réserves.
  - Hors périmètre : correction, nouvelle session de reprise T1, validation humaine implicite.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : preuves T1, `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`, présent fichier.
  - Zones modifiables plus tard : documentation de session T1 ou synthèse de phase si explicitement ouverte.
  - Critères de validation : aucune nouvelle correction T1 inventée.
  - Preuves attendues : liste des preuves lues, `git status --short`.
  - Dépendances : DX_T1_VALIDATION-CLOTURE-HISTORIQUE-SHELL.

#### Critère de clôture du bloc

T1 reste visible comme bloc historiquement traité ; aucune correction T1 nouvelle n'est planifiée sans écart prouvé.

#### Points de contrôle ChatGPT

- Vérifier que T1 n'est pas implicitement revalidé pour toute l'Alpha.
- Vérifier qu'aucune session de correction T1 n'a été inventée.

### BLOC T2 - Nomenclature, routes et renommages futurs

#### Objectif du bloc

Classer les libellés produit, routes techniques et renommages futurs avant toute intervention sur les routes ou liens.

#### Rôle dans l'application

T2 évite les divergences entre route technique officielle et libellé métier visible, notamment `templates`/`Modèles horaires` et `onboarding`/`Mise en route`.

#### Dépendances amont

- T1 historique.
- Documents `01`, `03`, `04`.
- Références UI/UX globales et Shell.

#### Dépendances aval

- T3.
- P-MODELES-HORAIRES.
- P-MISE-EN-ROUTE.
- P-LOGIN, P-DASHBOARD et F3 pour cohérence des liens.

#### Décisions connues

- Les routes techniques restent stables en anglais tant qu'un renommage n'est pas confirmé.
- Les libellés UI visibles doivent être en français.
- `Privacy` n'est pas une entrée métier principale.

#### Décisions à confirmer

- Renommage technique éventuel `/templates` vers une route française : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Renommage technique éventuel `/onboarding` vers une route française : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Statut exact de la route future `Suivi des véhicules` : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Casser les liens internes ou redirections.
- Renommer du code avant arbitrage.
- Présenter les routes anglaises comme un problème si seuls les libellés visibles sont en cause.

#### Sessions de production prévues

- `DX_T2_AUDIT-ROUTES-LIBELLES`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : cartographier routes officielles, libellés visibles et écarts de nomenclature.
  - Périmètre inclus : routes `app/`, navigation, liens login/privacy, dashboard, Base44 en lecture.
  - Hors périmètre : correction de libellés, renommage technique, redirections.
  - Zones à lire : `app/`, `app/app-shell.tsx`, `app/login/page.tsx`, `app/templates/page.tsx`, `app/onboarding/page.tsx`, références UI/UX et fiches fonctionnelles.
  - Zones modifiables plus tard : `app/app-shell.tsx`, pages portant des libellés, éventuelles routes si décision validée.
  - Critères de validation : matrice route technique -> libellé visible -> décision classée.
  - Preuves attendues : liste des routes, extraits de libellés, `git status --short`.
  - Dépendances : T1.

- `DX_T2_CADRAGE-RENOMMAGES`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : décider quoi conserver, quoi corriger en UI, quoi reporter comme renommage technique.
  - Périmètre inclus : options de maintien routes anglaises, aliases, redirections, impacts SEO non prioritaires Alpha.
  - Hors périmètre : migration de route.
  - Zones à lire : résultat audit T2, `next.config.ts`, `app/`.
  - Zones modifiables plus tard : documentation conventions, routes si validées.
  - Critères de validation : chaque renommage classé `conserver`, `corriger libellé`, `renommer plus tard`, ou `INFORMATION NON FOURNIE — À CONFIRMER`.
  - Preuves attendues : tableau de décisions, risques, impacts.
  - Dépendances : DX_T2_AUDIT-ROUTES-LIBELLES.

- `CX_T2_CORRECTION-LIBELLES-RESIDUELS`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger uniquement les libellés visibles résiduels sans changer les routes techniques.
  - Périmètre inclus : textes UI encore en `Templates`, `Onboarding` ou équivalents legacy.
  - Hors périmètre : déplacement de fichiers, renommage d'URL, refonte navigation.
  - Zones à lire : audit T2, `app/`, `app/ui/`.
  - Zones modifiables plus tard : fichiers UI concernés uniquement.
  - Critères de validation : libellés visibles français, routes inchangées, tests/lint selon patch.
  - Preuves attendues : diff ciblé, `npm run lint`, captures ou extraits.
  - Dépendances : DX_T2_CADRAGE-RENOMMAGES.

- `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : contrôler que les liens et routes existants fonctionnent après corrections de libellés.
  - Périmètre inclus : navigation, accès direct `/templates`, `/onboarding`, `/privacy`, modules principaux.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue, `app/`.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : aucun lien critique cassé, libellés visibles conformes ou écarts listés.
  - Preuves attendues : commandes, captures navigateur, `git status --short`.
  - Dépendances : CX T2 éventuelle.

- `CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger le reliquat visible `Depot` dans `Planning`.
  - Dépendances : `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`.
  - Hors périmètre : routes, `href`, URLs, renommage technique, refonte Planning.
  - Suite attendue : DX courte de revalidation/clôture T2.

#### Critère de clôture du bloc

Les routes et libellés sont classés, les corrections de libellés simples sont faites ou reportées, et aucun renommage technique n'est engagé sans décision humaine.

#### Points de contrôle ChatGPT

- Vérifier que T2 ne modifie pas Prisma ni modèle de données.
- Vérifier que les routes anglaises conservées ne contredisent pas les libellés UI français.

### BLOC T3 - Design system officiel et composants communs

#### Objectif du bloc

Stabiliser les composants communs nécessaires aux pages Alpha sans copier les composants Base44.

#### Rôle dans l'application

T3 sert à limiter les divergences UI sur tableaux, badges, filtres, états vides, erreurs, accès refusé, boutons et headers.

#### Dépendances amont

- T1 historique.
- T2 pour libellés et routes.
- Références UI/UX globales.

#### Dépendances aval

- Tous les blocs page.
- F3 validation UX.

#### Décisions connues

- Les composants officiels actuels sont principalement dans `app/ui/`.
- Base44 peut inspirer des patterns mais pas être copié.
- Les états communs `loading`, `empty`, `error`, `disabled`, `Accès refusé` doivent être cohérents.

#### Décisions à confirmer

- Création d'un dossier `components/` futur : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Palette, typographie et espacements chiffrés exacts : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Niveau de fidélité visuelle Alpha par rapport aux maquettes V2 : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Refonte UI globale trop large.
- Copier des composants shadcn/Base44 au lieu d'adapter les primitives officielles.
- Mélanger composant commun et logique métier de page.

#### Sessions de production prévues

- `DX_T3_AUDIT-COMPOSANTS-ETATS`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : inventorier les composants communs existants et les états UI manquants.
  - Périmètre inclus : `app/ui`, CSS globaux, composants clients récurrents, références UI/UX.
  - Hors périmètre : patch UI, création de design system complet.
  - Zones à lire : `app/ui/`, `app/globals.css`, CSS page, Base44 composants uniquement en lecture.
  - Zones modifiables plus tard : `app/ui/`, CSS ciblés.
  - Critères de validation : liste des composants fiables, à corriger, à créer ou à ne pas toucher.
  - Preuves attendues : inventaire, extraits, `git status --short`.
  - Dépendances : T2.

- `CX_T3_CORRECTION-ETATS-COMMUNS`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les états communs insuffisants sans modifier les règles métier.
  - Périmètre inclus : `empty-state`, `error-message`, `access-denied-state`, states loading/disabled communs.
  - Hors périmètre : refonte d'une page métier complète.
  - Zones à lire : audit T3, `app/ui/*`.
  - Zones modifiables plus tard : composants UI communs uniquement.
  - Critères de validation : états communs réutilisables et non spécifiques à un module.
  - Preuves attendues : diff, lint/build si nécessaire, captures ciblées.
  - Dépendances : DX_T3_AUDIT-COMPOSANTS-ETATS.

- `CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter les primitives de table, filtres, statuts et actions récurrentes.
  - Périmètre inclus : `data-table`, `filter-bar`, `status-badge`, `action-button`, `page-header`, `stat-card`.
  - Hors périmètre : logique API ou filtres métier propres à un module.
  - Zones à lire : `app/ui/`, pages utilisant ces composants.
  - Zones modifiables plus tard : `app/ui/` et imports limités si nécessaire.
  - Critères de validation : composants utilisables par blocs page sans régression visible.
  - Preuves attendues : diff, lint, captures d'au moins deux pages consommatrices si modifiées.
  - Dépendances : CX_T3_CORRECTION-ETATS-COMMUNS.

- `DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : contrôler la cohérence visuelle des composants communs dans les pages existantes.
  - Périmètre inclus : rendu navigateur desktop et responsive minimum des composants modifiés.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue, références UI/UX.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : absence de casse visuelle évidente, états communs visibles et cohérents.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX T3.

- `DX_T3_VALIDATION-CLOTURE-DESIGN-SYSTEM`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : synthétiser composants prêts, limites et reports.
  - Périmètre inclus : rapport de clôture du bloc.
  - Hors périmètre : validation humaine implicite, correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : preuves T3.
  - Zones modifiables plus tard : documentation de session uniquement.
  - Critères de validation : périmètre T3 clair pour les blocs page.
  - Preuves attendues : synthèse, `git status --short`.
  - Dépendances : DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS.

#### Critère de clôture du bloc

Les composants communs nécessaires aux blocs page sont identifiés, corrigés ou reportés explicitement, sans copie technique Base44.

#### Points de contrôle ChatGPT

- Vérifier que les composants restent génériques.
- Vérifier qu'aucune page métier n'est refondue dans T3.

### BLOC T4 - RBAC UI/API et matrice permissions progressive

#### Objectif du bloc

Cadrer puis corriger progressivement les contrôles RBAC UI/API sur les actions sensibles Alpha.

#### Rôle dans l'application

T4 garantit que les actions visibles ne contredisent pas les contrôles serveur et que les API ne font pas confiance au client.

#### Dépendances amont

- T1.
- T2 pour routes/libellés.
- T5 si des droits dépendent d'entités ou relations non créées.

#### Dépendances aval

- Toutes les sessions CX avec actions sensibles.
- T6, P-AUDIT, F2.

#### Décisions connues

- Le catalogue officiel actuel est `ALPHA_PERMISSION_CATALOG`.
- Les rôles `ADMIN` et `GERANT` ont un accès natif large.
- `PlatformRole.SUPPORT` existe pour le support global sous conditions.
- Base44 `can()` est front-only et ne vaut pas garantie serveur.

#### Décisions à confirmer

- Permission `DEPOTS_MANAGE` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Permissions suivi véhicules : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Permissions disponibilité véhicule, reset password, contacts société, dashboard preferences : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Granularité archive/restauration par module : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Front autorise une action refusée par API ou inversement.
- Trop de permissions créées sans arbitrage métier.
- Support global accède à des données tenant sans trace ou raison.

#### Sessions de production prévues

- `DX_T4_AUDIT-MATRICE-RBAC`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : cartographier rôles, permissions, helpers et endpoints sensibles.
  - Périmètre inclus : `lib/permissions.ts`, `lib/permission-catalog.ts`, `lib/rbac.ts`, `app/api`, pages avec actions.
  - Hors périmètre : ajout de permission, correction code.
  - Zones à lire : RBAC officiel, fiches fonctionnelles, audit Base44, scripts qualité.
  - Zones modifiables plus tard : catalogue permission, helpers, guards API/UI si validés.
  - Critères de validation : matrice rôle/permission/action/API avec écarts classés.
  - Preuves attendues : tableau, extraits endpoint/UI, `git status --short`.
  - Dépendances : T2.

- `DX_T4_CADRAGE-PERMISSIONS-MANQUANTES`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : préparer les décisions sur permissions manquantes ou trop larges.
  - Périmètre inclus : options pour dépôts, suivi véhicules, disponibilité, contacts, reset password, dashboard.
  - Hors périmètre : modification catalogue.
  - Zones à lire : audit T4, `docs/1-MASTER/3-FONCTIONNALITES/`, Base44 `userPermissions.js`.
  - Zones modifiables plus tard : `lib/permission-catalog.ts`, migrations si permissions persistées.
  - Critères de validation : décisions prêtes à validation humaine avec impacts.
  - Preuves attendues : options, risques, dépendances T5/T6.
  - Dépendances : DX_T4_AUDIT-MATRICE-RBAC.

- `CX_T4_CORRECTION-ENDPOINTS-CRITIQUES`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les endpoints sensibles dont le contrôle serveur est incohérent avec la matrice validée.
  - Périmètre inclus : endpoints users, vehicles, templates, depots, company, planning selon priorisation.
  - Hors périmètre : création massive de permissions, UI large.
  - Zones à lire : audit T4, routes API ciblées, services.
  - Zones modifiables plus tard : routes API ciblées, helpers permissions.
  - Critères de validation : API refuse sans session/companyId, ne lit pas `companyId` client, permission alignée.
  - Preuves attendues : diff, tests qualité, logs de commandes.
  - Dépendances : validation cadrage T4, T5 si modèle impliqué.

- `CX_T4_CORRECTION-ACTIONS-UI`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : aligner visibilité/disabled des actions UI sur la matrice validée.
  - Périmètre inclus : boutons et menus d'actions sensibles déjà existants.
  - Hors périmètre : redesign UI complet, endpoints non corrigés.
  - Zones à lire : pages modules, `app/ui/action-button.tsx`, helpers permissions.
  - Zones modifiables plus tard : composants clients ciblés.
  - Critères de validation : action visible seulement si autorisée et refus serveur cohérent en accès direct.
  - Preuves attendues : diff, captures par rôle si possible, lint.
  - Dépendances : CX_T4_CORRECTION-ENDPOINTS-CRITIQUES.

- `DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : contrôler les contrats RBAC critiques sans correction.
  - Périmètre inclus : scripts qualité existants, tests API ciblés, vérification support.
  - Hors périmètre : patch.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : `scripts/quality/`, API modifiées, pages critiques.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : écarts classés bloquants/non bloquants, preuves serveur.
  - Preuves attendues : `npm run test:quality`, extraits, `git status --short`.
  - Dépendances : CX T4.

#### Critère de clôture du bloc

Une matrice RBAC Alpha minimale existe, les écarts critiques front/API sont traités ou reportés explicitement, et les permissions non arbitrées restent marquées à confirmer.

#### Points de contrôle ChatGPT

- Vérifier que les API restent la barrière réelle.
- Vérifier que le support global est limité et tracé.

### BLOC T5 - Données, multi-tenant et mapping Base44 vers officiel

#### Objectif du bloc

Comparer les entités Base44 utiles au modèle officiel et cadrer les créations ou reports de données sans modifier Prisma par défaut.

#### Rôle dans l'application

T5 protège le multi-tenant et évite les migrations opportunistes inspirées de Base44 sans décision.

#### Dépendances amont

- `01`, audits, schéma Prisma officiel.
- T4 pour permissions liées aux données.

#### Dépendances aval

- P-SOCIETE, P-SUIVI-VEHICULES, P-DASHBOARD, P-MISE-EN-ROUTE.
- P-PLANNING pour référentiels.

#### Décisions connues

- Le schéma officiel contient `Company`, `Depot`, `User`, `UserAbsence`, `Vehicle`, `ShiftTemplate`, `DraftShift`, `Shift`, `PlanningAuditLog`, `LoginAuditLog`.
- `CompanyContact`, `DashboardPreference`, `VehicleCheck`, `Disinfection`, `VehicleAnomaly`, `OnboardingStep` sont absents du schéma officiel lu.
- `PlanningEntry` Base44 ne doit pas remplacer `Shift`/`DraftShift`/`AutoScheduleRun`.

#### Décisions à confirmer

- Création ou report de `CompanyContact` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Création ou report de `DashboardPreference` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Création ou report de `VehicleCheck`, `Disinfection`, `VehicleAnomaly` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Création ou refus de `OnboardingStep` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Gestion TPMR / TPMR VSL / TPMR TAXI : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Copier des entités Base44 dénormalisées.
- Ajouter Prisma avant d'avoir contrôlé les relations `companyId`.
- Stocker des compteurs ou statuts libres au lieu de requêtes/enums officiels.

#### Sessions de production prévues

- `DX_T5_AUDIT-MAPPING-ENTITES`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : produire une matrice Base44 -> Prisma officiel pour toutes les entités utiles.
  - Périmètre inclus : entités Base44, `prisma/schema.prisma`, services officiels, validators.
  - Hors périmètre : migration, `prisma generate`, modification Prisma.
  - Zones à lire : `prisma/schema.prisma`, `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/`, `lib/validators/`.
  - Zones modifiables plus tard : Prisma uniquement dans sessions CX validées.
  - Critères de validation : chaque entité classée garder/adaptater/refuser/à confirmer.
  - Preuves attendues : tableau, extraits schéma, `git status --short`.
  - Dépendances : T4 audit si permissions liées.

- `DX_T5_CADRAGE-MODELES-CANDIDATS`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : cadrer les modèles candidats et leurs impacts avant toute migration.
  - Périmètre inclus : `CompanyContact`, `DashboardPreference`, suivi véhicules, `OnboardingStep`.
  - Hors périmètre : création Prisma.
  - Zones à lire : audit T5, fiches Société, Dashboard, Suivi véhicules, Mise en route.
  - Zones modifiables plus tard : migrations Prisma, validators, services, API selon décisions.
  - Critères de validation : chaque modèle a option créer/report/refuser avec impact sessions.
  - Preuves attendues : options, risques multi-tenant, dépendances RBAC/audit.
  - Dépendances : DX_T5_AUDIT-MAPPING-ENTITES.

- `CX_T5_CORRECTION-MULTITENANT-CRITIQUE`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les accès tenant critiques déjà prouvés comme incohérents.
  - Périmètre inclus : requêtes qui ne bornent pas correctement par `companyId`.
  - Hors périmètre : création de nouveaux modèles.
  - Zones à lire : audit T5, routes/services concernés.
  - Zones modifiables plus tard : routes API et services ciblés uniquement.
  - Critères de validation : `companyId` issu serveur, dépendances résolues dans le tenant.
  - Preuves attendues : diff, tests qualité, extraits.
  - Dépendances : audit T5, T4 si permission modifiée.

- `CX_T5_CREATION-MODELE-CANDIDAT`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer un modèle Prisma uniquement après décision humaine explicite sur un modèle candidat.
  - Périmètre inclus : un seul modèle ou groupe cohérent validé par session.
  - Hors périmètre : création simultanée de tous les modèles Base44, UI métier.
  - Zones à lire : cadrage modèle, `prisma/schema.prisma`, validators/services ciblés.
  - Zones modifiables plus tard : Prisma, migration, validators/API minimaux du modèle retenu.
  - Critères de validation : migration cohérente, `companyId` obligatoire si tenant, relations/indexes validés.
  - Preuves attendues : migration, `npx prisma validate`, tests ciblés.
  - Dépendances : validation humaine du modèle concerné.

- `DX_T5_VALIDATION-CLOTURE-DONNEES-TENANT`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider le cloisonnement des données après corrections ou créations.
  - Périmètre inclus : API touchées, scripts qualité, Prisma validate si migration.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : routes/services/migrations modifiés.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : pas de confiance dans `companyId` client, relations tenant contrôlées.
  - Preuves attendues : commandes, extraits, `git status --short`.
  - Dépendances : CX T5.

#### Critère de clôture du bloc

Les données Alpha utiles sont mappées, les modèles candidats sont classés, et aucune modification Prisma n'est engagée sans décision explicite.

#### Points de contrôle ChatGPT

- Vérifier que Base44 n'est jamais repris comme modèle technique.
- Vérifier les champs `companyId`, indexes et relations avant tout feu vert Prisma.

### BLOC T6 - Audit et traçabilité transverse

#### Objectif du bloc

Définir puis fiabiliser le contrat minimal de traçabilité serveur des actions sensibles.

#### Rôle dans l'application

T6 établit quelles actions doivent produire une trace officielle exploitable par P-AUDIT.

#### Dépendances amont

- T4 RBAC.
- T5 données/multi-tenant.

#### Dépendances aval

- P-AUDIT.
- Tous modules avec actions sensibles.
- RGPD-PRIVACY et F2.

#### Décisions connues

- Le repo contient `PlanningAuditLog` et `LoginAuditLog`.
- Des services d'audit existent pour login, planning, données personnelles et support.
- Base44 audit client-side est à refuser comme preuve.

#### Décisions à confirmer

- Niveau de détail et de rétention audit : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Export audit : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Audit générique unifié ou maintien de journaux spécifiques : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Actions support obligatoires et motif support : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Trace écrite côté client ou hors transaction présentée comme probante.
- Payload contenant des données personnelles excessives.
- Page audit affichant des fallback `INFORMATION NON FOURNIE` au lieu de données qualifiées.

#### Sessions de production prévues

- `DX_T6_AUDIT-TRACES-EXISTANTES`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : inventorier logs, services et actions sensibles déjà tracées.
  - Périmètre inclus : auth, users, vehicles, depots, templates, company, planning, audit page/API.
  - Hors périmètre : ajout de trace.
  - Zones à lire : `lib/services/audit/`, `lib/services/planning/planning-audit.ts`, API routes sensibles, Prisma audit models.
  - Zones modifiables plus tard : services audit et routes ciblées.
  - Critères de validation : matrice action -> trace existante -> manque.
  - Preuves attendues : extraits, tableau, `git status --short`.
  - Dépendances : T4/T5.

- `DX_T6_CADRAGE-CONTRAT-AUDIT`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir le contrat minimal de trace par type d'action.
  - Périmètre inclus : module, action, acteur, tenant, cible, résultat, payload minimal.
  - Hors périmètre : conformité RGPD complète, SIEM.
  - Zones à lire : audit T6, RGPD base minimale, fiches fonctionnelles.
  - Zones modifiables plus tard : services audit, validators.
  - Critères de validation : contrat validable sans sur-collecte.
  - Preuves attendues : contrat proposé, risques RGPD, dépendances.
  - Dépendances : DX_T6_AUDIT-TRACES-EXISTANTES.

- `CX_T6_CORRECTION-TRACES-PRIORITAIRES`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les traces manquantes ou incohérentes sur actions déjà existantes.
  - Périmètre inclus : une famille d'actions par session si volume élevé.
  - Hors périmètre : création de module audit complet, export audit.
  - Zones à lire : cadrage T6, routes/services ciblés.
  - Zones modifiables plus tard : services/routes ciblés.
  - Critères de validation : trace serveur produite avec tenant et acteur.
  - Preuves attendues : diff, tests, extraits logs ou mocks.
  - Dépendances : T4/T5 et cadrage T6.

- `CX_T6_COMPLETION-SUPPORT-AUDIT`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter la traçabilité support si le périmètre support est confirmé.
  - Périmètre inclus : actions support déjà présentes dans services.
  - Hors périmètre : portail support complet.
  - Zones à lire : `lib/services/audit/support-action-trace.ts`, services depots/users/vehicles.
  - Zones modifiables plus tard : services support-action ciblés.
  - Critères de validation : support tracé, raison/contextes présents ou explicitement non fournis.
  - Preuves attendues : tests ciblés, diff.
  - Dépendances : décision support : `INFORMATION NON FOURNIE — À CONFIRMER`.

- `DX_T6_VALIDATION-CLOTURE-TRACABILITE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : contrôler sans correction que les actions sensibles retenues produisent ou exposent des traces.
  - Périmètre inclus : actions modifiées, audit API/page, tests qualité.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : services/routes modifiés, `app/api/audit/route.ts`.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : traces consultables par acteur autorisé et interdites sinon.
  - Preuves attendues : commandes, extraits, captures audit.
  - Dépendances : CX T6 et P-AUDIT.

#### Critère de clôture du bloc

Le contrat audit Alpha est défini, les traces prioritaires sont traitées ou reportées, et les limites de rétention/conformité restent visibles.

#### Points de contrôle ChatGPT

- Vérifier que l'audit Base44 client-side n'est pas utilisé comme preuve.
- Vérifier la minimisation des payloads.

### BLOC T7 - Qualité, tests et contrôles de reprise

#### Objectif du bloc

Formaliser et compléter les contrôles récurrents nécessaires aux futures sessions.

#### Rôle dans l'application

T7 permet d'ouvrir des sessions Codex avec DoD, commandes et preuves adaptées au type de changement.

#### Dépendances amont

- `03`.
- Scripts qualité existants.
- T4/T5/T6 pour les contrôles RBAC, tenant et audit.

#### Dépendances aval

- Toutes les sessions CX et DX VALIDATION+CLOTURE.
- F2.

#### Décisions connues

- Scripts disponibles : `npm run lint`, `npm run build`, `npm run test:smoke`, `npm run test:targeted`, `npm run test:quality`, `npm run docs:encoding`.
- Exception Base44 documentaire possible pour build/lint si conditions strictes.

#### Décisions à confirmer

- Nommage réel des sessions DX VALIDATION+CLOTURE : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Niveau minimal E2E navigateur Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Tolérance warnings lint/build : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Valider avec des tests non représentatifs.
- Masquer une régression derrière l'exception Base44.
- Mélanger correction et validation.

#### Sessions de production prévues

- `DX_T7_AUDIT-SCRIPTS-CONTROLES`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : inventorier scripts, commandes et lacunes de contrôle.
  - Périmètre inclus : `package.json`, `scripts/quality/`, `scripts/check-doc-encoding.mjs` si présent.
  - Hors périmètre : modification de scripts.
  - Zones à lire : scripts qualité, docs méthode.
  - Zones modifiables plus tard : scripts qualité ciblés.
  - Critères de validation : matrice type de session -> commandes.
  - Preuves attendues : extraits, liste scripts, `git status --short`.
  - Dépendances : T4/T5/T6.

- `DX_T7_CADRAGE-DOD-SESSIONS`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir les critères de sortie par session DX/CX.
  - Périmètre inclus : preuves, git, encodage, tests, navigateur, Prisma.
  - Hors périmètre : création de session dans `docs/2-SESSIONS`.
  - Zones à lire : `03`, audit T7.
  - Zones modifiables plus tard : templates ou docs si validation humaine.
  - Critères de validation : DoD exploitable pour prompts Codex.
  - Preuves attendues : tableau DoD, points à confirmer.
  - Dépendances : DX_T7_AUDIT-SCRIPTS-CONTROLES.

- `CX_T7_COMPLETION-SCRIPTS-QUALITE`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter un script qualité uniquement si une lacune bloquante est confirmée.
  - Périmètre inclus : un script ou test ciblé par session.
  - Hors périmètre : refonte complète outillage, tests E2E lourds.
  - Zones à lire : scripts qualité, routes concernées.
  - Zones modifiables plus tard : `scripts/quality/`.
  - Critères de validation : script non destructif, déterministe, documenté par preuves.
  - Preuves attendues : diff, exécution du script, `npm run test:quality` si applicable.
  - Dépendances : cadrage T7 et validation de la lacune.

- `DX_T7_VALIDATION-CLOTURE-CADRE-REPRISE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : vérifier que le cadre qualité couvre les futures sessions.
  - Périmètre inclus : commandes, encodage, git status, exception Base44.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : `package.json`, scripts, `03`.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : aucun type de session restant sans contrôle minimal.
  - Preuves attendues : commandes non destructives, synthèse.
  - Dépendances : DX/CX T7.

#### Critère de clôture du bloc

Les futures sessions disposent d'un cadre de contrôle clair, les manques de scripts sont traités ou reportés, et F2 peut s'appuyer sur des commandes connues.

#### Points de contrôle ChatGPT

- Vérifier que les sessions DX VALIDATION+CLOTURE ne corrigent pas.
- Vérifier que l'exception Base44 n'est pas abusée.

## 5. Blocs pages et modules

### BLOC P-LOGIN - Connexion

#### Objectif du bloc

Stabiliser le parcours officiel de connexion, les erreurs, les redirections et le comportement `Se souvenir de moi` si confirmé.

#### Rôle dans l'application

Le login est l'entrée publique de l'application et charge l'identité, le tenant, les rôles et permissions.

#### Dépendances amont

- T1, T2, T4.
- RGPD-PRIVACY pour lien et mentions.

#### Dépendances aval

- Tous les modules connectés.
- F1, F2, RGPD-PRIVACY.

#### Décisions connues

- Auth officielle via NextAuth Credentials.
- Session JWT max age actuellement fixe à 8 heures.
- Lien `/privacy` attendu depuis login.
- Pas d'inscription libre Alpha.

#### Décisions à confirmer

- Comportement exact de `Se souvenir de moi` : durée, cookie, renouvellement ou retrait : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Mot de passe oublié Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Politique de session prolongée : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Option `Se souvenir de moi` visible sans effet réel.
- Redirection login utilisée pour utilisateur connecté mais non autorisé.
- Sur-promesse sécurité/RGPD.

#### Sessions de production prévues

- `DX_PLOGIN_AUDIT-AUTH-UX`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer page login, auth NextAuth, lien privacy et états d'erreur.
  - Périmètre inclus : UI login, `lib/auth.ts`, route auth, RGPD minimal.
  - Hors périmètre : modification auth.
  - Zones à lire : `app/login/page.tsx`, `app/api/auth/[...nextauth]/route.ts`, `lib/auth.ts`, `app/privacy/page.tsx`.
  - Zones modifiables plus tard : login/auth seulement après cadrage.
  - Critères de validation : écarts login classés UI, auth, privacy, remember.
  - Preuves attendues : extraits, `git status --short`, éventuelles captures.
  - Dépendances : T2/T4.

- `DX_PLOGIN_CADRAGE-REMEMBER-ME`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : cadrer le comportement `Se souvenir de moi` ou son retrait.
  - Périmètre inclus : options session courte/longue, sécurité, UX, impact NextAuth.
  - Hors périmètre : patch.
  - Zones à lire : audit login, `lib/auth.ts`, fiche Login.
  - Zones modifiables plus tard : `lib/auth.ts`, `app/login/page.tsx`.
  - Critères de validation : option retenue ou décision à confirmer explicitement.
  - Preuves attendues : options, risques, impact tests.
  - Dépendances : DX_PLOGIN_AUDIT-AUTH-UX.

- `CX_PLOGIN_CORRECTION-UI-ERREURS-PRIVACY`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les états login et le lien privacy sans toucher à la durée session si non arbitrée.
  - Périmètre inclus : messages, disabled/loading, lien privacy, libellés.
  - Hors périmètre : MFA, SSO, mot de passe oublié, remember non arbitré.
  - Zones à lire : audit login, `app/login/page.tsx`.
  - Zones modifiables plus tard : `app/login/page.tsx`, styles associés.
  - Critères de validation : login clair, privacy accessible, erreurs non ambiguës.
  - Preuves attendues : diff, lint/build, capture login.
  - Dépendances : T3/RGPD.

- `CX_PLOGIN_COMPLETION-REMEMBER-ME`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : implémenter ou neutraliser `Se souvenir de moi` selon décision humaine.
  - Périmètre inclus : formulaire login, configuration session si validée.
  - Hors périmètre : refonte auth globale, MFA.
  - Zones à lire : cadrage remember, `lib/auth.ts`, NextAuth route.
  - Zones modifiables plus tard : `app/login/page.tsx`, `lib/auth.ts`.
  - Critères de validation : comportement prouvé ou option retirée explicitement.
  - Preuves attendues : diff, tests auth manuels, lint/build.
  - Dépendances : décision humaine remember.

- `DX_PLOGIN_VALIDATION-CLOTURE-CONNEXION`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider connexion, erreurs, session, redirection et privacy sans correction.
  - Périmètre inclus : scénarios succès/échec, utilisateur inactif si testable, lien privacy.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue, logs auth si disponibles.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : parcours login exploitable et limites restantes listées.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX PLOGIN.

#### Critère de clôture du bloc

Le login est utilisable, les limites Alpha sont explicites, et `Se souvenir de moi` est implémenté, neutralisé ou reporté avec décision visible.

#### Points de contrôle ChatGPT

- Vérifier que l'auth Base44 n'est pas reprise.
- Vérifier que le lien privacy reste discret et accessible.

### BLOC P-SOCIETE - Société

#### Objectif du bloc

Stabiliser le profil société, les règles métier et le cadrage des contacts société multiples.

#### Rôle dans l'application

Société porte le contexte permanent du tenant, les informations de profil, les règles métier et les contacts éventuels.

#### Dépendances amont

- T4, T5, T6.

#### Dépendances aval

- P-DEPOTS-BASES, P-PLANNING, P-DASHBOARD, P-MISE-EN-ROUTE, RGPD-PRIVACY.

#### Décisions connues

- `Company` et `CompanyRule` existent officiellement.
- `CompanyContact` existe dans Base44 mais pas dans Prisma officiel lu.
- Société ne doit pas être fusionnée avec Mise en route.

#### Décisions à confirmer

- Création de `CompanyContact` en Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Champs ARS/réglementaires exacts : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Permission profil société vs règles société vs contacts : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Multi-tenant fragile si société non issue de session serveur.
- Contacts société confondus avec utilisateurs applicatifs.
- Déclaration réglementaire excessive.

#### Sessions de production prévues

- `DX_PSOCIETE_AUDIT-PROFIL-REGLES-CONTACTS`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer profil, règles, contacts attendus et écarts Base44/officiel.
  - Périmètre inclus : page société, API company, Prisma Company/CompanyRule, fiche Société.
  - Hors périmètre : migration contacts.
  - Zones à lire : `app/company/*`, `app/api/company/*`, `lib/services/company/`, `lib/company-rules/`, `prisma/schema.prisma`.
  - Zones modifiables plus tard : company UI/API/services, Prisma si modèle validé.
  - Critères de validation : écarts profil/règles/contacts classés.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : T5.

- `DX_PSOCIETE_CADRAGE-COMPANYCONTACT`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : décider créer, reporter ou refuser `CompanyContact`.
  - Périmètre inclus : données, RBAC, audit, UI, migration.
  - Hors périmètre : création modèle.
  - Zones à lire : audit P-SOCIETE, entité Base44 `CompanyContact`, fiche Société.
  - Zones modifiables plus tard : Prisma/API/UI contacts.
  - Critères de validation : décision prête avec impacts.
  - Preuves attendues : options, risques RGPD/multi-tenant.
  - Dépendances : T5/T4/T6.

- `CX_PSOCIETE_CORRECTION-PROFIL-REGLES`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les incohérences prouvées du profil société et des règles existantes.
  - Périmètre inclus : champs existants, validations, droits, audit existant.
  - Hors périmètre : contacts si modèle non validé, facturation.
  - Zones à lire : audit P-SOCIETE, `app/company/*`, `app/api/company/*`.
  - Zones modifiables plus tard : page/API/services company.
  - Critères de validation : profil borné au tenant, droits cohérents, audit si action sensible.
  - Preuves attendues : diff, tests API, lint/build.
  - Dépendances : T4/T5/T6.

- `CX_PSOCIETE_CREATION-CONTACTS`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer les contacts société uniquement si `CompanyContact` est validé.
  - Périmètre inclus : migration Prisma, API contacts, UI minimale, audit.
  - Hors périmètre : annuaire complet, utilisateurs applicatifs, conformité juridique complète.
  - Zones à lire : cadrage CompanyContact, Prisma, validators.
  - Zones modifiables plus tard : Prisma, API company contacts, UI société.
  - Critères de validation : contacts tenant-scopés, archivage logique si retenu, audit.
  - Preuves attendues : migration, `npx prisma validate`, tests, captures.
  - Dépendances : validation humaine CompanyContact.

- `DX_PSOCIETE_VALIDATION-CLOTURE-SOCIETE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider profil/règles/contacts retenus par rôle et tenant.
  - Périmètre inclus : API, UI, audit, multi-tenant.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue, API modifiées, audit.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : société cohérente et non confondue avec Mise en route.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-SOCIETE.

#### Critère de clôture du bloc

Le profil société et les règles existantes sont fiables ; les contacts sont créés seulement si validés ou clairement reportés.

#### Points de contrôle ChatGPT

- Vérifier `companyId` serveur.
- Vérifier qu'aucun champ réglementaire non confirmé n'est présenté comme conformité.

### BLOC P-DEPOTS-BASES - Dépôts / Bases

#### Objectif du bloc

Stabiliser le référentiel des dépôts/bases avant les rattachements RH, véhicules et planning.

#### Rôle dans l'application

Les dépôts structurent les lieux de rattachement, les véhicules, les utilisateurs et les affectations planning.

#### Dépendances amont

- T4, T5, T6.
- P-SOCIETE pour tenant/règles éventuelles.

#### Dépendances aval

- P-UTILISATEURS-RH, P-VEHICULES, P-PLANNING, P-MISE-EN-ROUTE.

#### Décisions connues

- Modèle `Depot` officiel présent.
- API CRUD et archivage existent.
- Base44 ajoute code, ville, responsable local et compteurs dynamiques comme inspirations.

#### Décisions à confirmer

- Permission dédiée `DEPOTS_MANAGE` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Restauration/désarchivage officiel : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Responsable local comme utilisateur lié ou texte : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Archiver un dépôt encore rattaché sans règle claire.
- Compteurs dénormalisés repris de Base44.
- Gestion des dépôts sans permission dédiée.

#### Sessions de production prévues

- `DX_PDEPOTS_AUDIT-REFERENTIEL-API-UI`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer modèle, API, UI, archivage et rattachements.
  - Périmètre inclus : depots page/API/services, Prisma, fiches.
  - Hors périmètre : correction.
  - Zones à lire : `app/depots/*`, `app/api/depots/*`, `lib/services/depots/*`, `prisma/schema.prisma`.
  - Zones modifiables plus tard : page/API/services depots.
  - Critères de validation : cycle vie et dépendances cartographiés.
  - Preuves attendues : extraits, tableau écarts, `git status --short`.
  - Dépendances : T5.

- `DX_PDEPOTS_CADRAGE-CYCLE-VIE`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : cadrer archive/restauration et blocage si rattachements actifs.
  - Périmètre inclus : règles utilisateur/véhicule/planning dépendantes.
  - Hors périmètre : patch.
  - Zones à lire : audit depots, services users/vehicles/planning.
  - Zones modifiables plus tard : services archive/depot, UI filtres.
  - Critères de validation : règles prêtes à validation humaine ou marquées à confirmer.
  - Preuves attendues : options, impacts.
  - Dépendances : DX_PDEPOTS_AUDIT-REFERENTIEL-API-UI.

- `CX_PDEPOTS_CORRECTION-RBAC-TENANT-AUDIT`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger droits, tenant et audit sur actions dépôt existantes.
  - Périmètre inclus : create/update/archive/depot assignment si dépôt impliqué.
  - Hors périmètre : nouveaux champs non validés.
  - Zones à lire : audit/cadrage depots, T4/T6.
  - Zones modifiables plus tard : API/services depots.
  - Critères de validation : actions dépôt bornées au tenant et tracées.
  - Preuves attendues : diff, tests qualité, lint/build.
  - Dépendances : T4/T6.

- `CX_PDEPOTS_COMPLETION-UI-CHAMPS-FILTRES`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter UI dépôts sur champs/filtres/états validés.
  - Périmètre inclus : colonnes, recherche, active/archivé si supporté.
  - Hors périmètre : géolocalisation, compteurs stockés.
  - Zones à lire : référence UI/UX dépôts, page officielle.
  - Zones modifiables plus tard : `app/depots/*`, CSS ciblé.
  - Critères de validation : liste exploitable par RH/véhicules/planning.
  - Preuves attendues : diff, captures, lint/build.
  - Dépendances : T3, cadrage cycle vie.

- `DX_PDEPOTS_VALIDATION-CLOTURE-REFERENTIEL`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider création/modification/archive/lecture dépôts selon droits.
  - Périmètre inclus : UI/API, tenant, audit.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : dépôts fiables pour modules dépendants.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-DEPOTS.

#### Critère de clôture du bloc

Le référentiel dépôts/bases est fiable, tenant-scopé et exploitable par RH, véhicules et planning ; les règles de restauration non validées restent visibles.

#### Points de contrôle ChatGPT

- Vérifier que les compteurs sont calculés ou justifiés.
- Vérifier que les rattachements actifs sont pris en compte avant archivage si règle retenue.

### BLOC P-UTILISATEURS-RH - Utilisateurs / RH

#### Objectif du bloc

Stabiliser utilisateurs, rôles, accès applicatif, données RH minimales, rattachement dépôt et absences.

#### Rôle dans l'application

Le module porte les personnes, droits, statuts, accès et indisponibilités nécessaires au planning et aux actions sensibles.

#### Dépendances amont

- T4, T5, T6.
- P-DEPOTS-BASES.

#### Dépendances aval

- P-PLANNING, P-DASHBOARD, P-MISE-EN-ROUTE, F1.

#### Décisions connues

- Modèle officiel `User`, `Permission`, `UserPermission`, `UserAbsence`.
- Base44 `Employee` est refusé comme entité séparée sans arbitrage.
- API users et absences existent.

#### Décisions à confirmer

- Séparation compte applicatif / fiche RH en officiel : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Permission dédiée reset password : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Statuts RH opérationnels au-delà de `isActive`/absences : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Workflow demandes d'absence vs indisponibilités simples : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Incohérence filtre actifs/inactifs UI/API.
- Reset password ou rôles sans permission fine.
- Données personnelles modifiées sans audit.
- Support global inclus dans listes tenant.

#### Sessions de production prévues

- `DX_PUSERS_AUDIT-RH-API-RBAC`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer users/RH, API, permissions, absences et écarts Base44.
  - Périmètre inclus : page users, API, services, validators, Prisma User/UserAbsence.
  - Hors périmètre : correction.
  - Zones à lire : `app/users/*`, `app/api/users/*`, `lib/services/users/*`, `lib/validators/user*.ts`, `prisma/schema.prisma`.
  - Zones modifiables plus tard : users UI/API/services/validators.
  - Critères de validation : écarts action par action classés.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : T4/T5.

- `DX_PUSERS_CADRAGE-ACCES-APPLICATIF-RH`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : cadrer séparation fiche RH, compte applicatif, reset password et permissions.
  - Périmètre inclus : options sans nouveau modèle vs champs existants vs report.
  - Hors périmètre : patch.
  - Zones à lire : audit users, Base44 Utilisateurs, fiche RH.
  - Zones modifiables plus tard : user schema/API/UI si validé.
  - Critères de validation : décisions prêtes ou à confirmer.
  - Preuves attendues : options, risques RGPD/RBAC.
  - Dépendances : DX_PUSERS_AUDIT-RH-API-RBAC.

- `CX_PUSERS_CORRECTION-FILTRES-STATUTS`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger mismatch filtres/statuts actifs/inactifs et actions visibles.
  - Périmètre inclus : liste users, filtres, API list, statut actif.
  - Hors périmètre : nouveau workflow RH.
  - Zones à lire : audit users, `app/users/*`, `app/api/users/route.ts`.
  - Zones modifiables plus tard : UI liste/API users.
  - Critères de validation : UI et API racontent la même vérité.
  - Preuves attendues : diff, tests qualité, captures.
  - Dépendances : P-DEPOTS si rattachement affiché.

- `CX_PUSERS_COMPLETION-ABSENCES-DEPOTS`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter absences/indisponibilités et rattachement dépôt selon cadrage.
  - Périmètre inclus : `UserAbsence`, assignation dépôt, validations, audit.
  - Hors périmètre : workflow validation/refus d'absence si non validé.
  - Zones à lire : services absences, API depot assignment, validators.
  - Zones modifiables plus tard : services/API/UI absences et depot.
  - Critères de validation : absence bornée tenant, impact planning documenté.
  - Preuves attendues : diff, tests, lint/build.
  - Dépendances : P-DEPOTS, T6.

- `CX_PUSERS_CORRECTION-RBAC-AUDIT`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger RBAC/audit sur création, édition, archive, reset et permissions.
  - Périmètre inclus : actions sensibles users existantes.
  - Hors périmètre : module complet de gestion des rôles si non validé.
  - Zones à lire : T4/T6, users API/services.
  - Zones modifiables plus tard : API/services users, permission helpers.
  - Critères de validation : action sensible contrôlée et tracée.
  - Preuves attendues : diff, `npm run test:quality`, extraits audit.
  - Dépendances : T4/T6.

- `DX_PUSERS_VALIDATION-CLOTURE-RH`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider parcours users/RH sans correction.
  - Périmètre inclus : liste, création, édition, archive, absences, droits.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : module exploitable sans incohérence critique connue.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-USERS.

#### Critère de clôture du bloc

Utilisateurs/RH est exploitable, les données personnelles sont tracées, et les règles non arbitrées restent explicitement à confirmer.

#### Points de contrôle ChatGPT

- Vérifier que `Employee` Base44 n'est pas recréé sans arbitrage.
- Vérifier que les utilisateurs support ne polluent pas les listes tenant.

### BLOC P-VEHICULES - Véhicules

#### Objectif du bloc

Stabiliser le référentiel administratif de flotte avant le suivi opérationnel et le planning.

#### Rôle dans l'application

Véhicules porte la flotte administrative, les statuts, les documents, les rattachements dépôt et la disponibilité de base.

#### Dépendances amont

- T4, T5, T6.
- P-DEPOTS-BASES.

#### Dépendances aval

- P-SUIVI-VEHICULES, P-PLANNING, P-DASHBOARD.

#### Décisions connues

- Modèle `Vehicle` officiel présent.
- API vehicles et archive existent.
- Audit identifie une incohérence permission front/API sur création.
- Le suivi opérationnel détaillé relève de P-SUIVI-VEHICULES.

#### Décisions à confirmer

- Permission disponibilité véhicule : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Mapping `VehicleStatus`, `isActive`, disponibilité opérationnelle et indisponibilité planning : `INFORMATION NON FOURNIE — À CONFIRMER`.
- TPMR / TPMR VSL / TPMR TAXI : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Restauration véhicule : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Confusion entre référentiel administratif et suivi opérationnel.
- Disponibilité non cohérente avec planning.
- Détails véhicule affichant des données synthétiques ou placeholders.

#### Sessions de production prévues

- `DX_PVEH_AUDIT-FLOTTE-API-UI`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer modèle, API, UI, statuts, documents et écarts Base44.
  - Périmètre inclus : page véhicules, API, services, validators, Prisma Vehicle.
  - Hors périmètre : suivi opérationnel 6.1.
  - Zones à lire : `app/vehicles/*`, `app/api/vehicles/*`, `lib/services/vehicles/*`, `lib/validators/vehicle.ts`, `prisma/schema.prisma`.
  - Zones modifiables plus tard : véhicules UI/API/services.
  - Critères de validation : écarts flotte classés par priorité.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : P-DEPOTS/T4/T5.

- `DX_PVEH_CADRAGE-STATUTS-DISPONIBILITE`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : cadrer statuts, disponibilité, motifs et impact planning.
  - Périmètre inclus : enums officiels, idées Base44, droits, audit.
  - Hors périmètre : migration ou UI.
  - Zones à lire : audit véhicules, fiche véhicules, Base44 Vehicle.
  - Zones modifiables plus tard : schema/API/UI si validé.
  - Critères de validation : mapping statut/disponibilité prêt ou à confirmer.
  - Preuves attendues : options, risques planning.
  - Dépendances : T5/P-PLANNING futur.

- `CX_PVEH_CORRECTION-RBAC-CREATION`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger incohérence front/API sur création et gestion véhicule.
  - Périmètre inclus : permissions page/API create/update/archive.
  - Hors périmètre : disponibilité avancée, suivi véhicules.
  - Zones à lire : T4, `app/vehicles/*`, `app/api/vehicles/*`.
  - Zones modifiables plus tard : véhicules UI/API.
  - Critères de validation : même permission front/API et refus serveur prouvé.
  - Preuves attendues : diff, tests qualité, captures.
  - Dépendances : T4.

- `CX_PVEH_COMPLETION-ARCHIVE-DEPOT-DOCUMENTS`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter cycle administratif validé : archive, dépôt, champs documentaires.
  - Périmètre inclus : rattachement dépôt, documents, état actif, restauration si validée.
  - Hors périmètre : vérifications/désinfections/anomalies.
  - Zones à lire : services vehicles, validators, page.
  - Zones modifiables plus tard : API/services/UI vehicles.
  - Critères de validation : flotte fiable pour planning et suivi.
  - Preuves attendues : diff, lint/build, tests ciblés.
  - Dépendances : P-DEPOTS/T6.

- `CX_PVEH_CORRECTION-DONNEES-DETAIL`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : supprimer ou remplacer les données de détail non sourcées par des états honnêtes.
  - Périmètre inclus : panneaux de détail, placeholders, informations liées au suivi futur.
  - Hors périmètre : création du module suivi véhicules.
  - Zones à lire : audit véhicules, `app/vehicles/vehicles-client.tsx`.
  - Zones modifiables plus tard : UI véhicule.
  - Critères de validation : aucune donnée fictive présentée comme réelle.
  - Preuves attendues : diff, captures.
  - Dépendances : T3/P-SUIVI futur.

- `DX_PVEH_VALIDATION-CLOTURE-FLOTTE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider parcours flotte administrative sans correction.
  - Périmètre inclus : create/update/archive/depot/documents/RBAC.
  - Hors périmètre : suivi opérationnel.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : véhicules fiables pour modules dépendants.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-VEH.

#### Critère de clôture du bloc

La flotte administrative est fiable, tenant-scopée, contrôlée et prête pour suivi véhicules et planning.

#### Points de contrôle ChatGPT

- Vérifier séparation Véhicules vs Suivi des véhicules.
- Vérifier absence de faux détails opérationnels.

### BLOC P-SUIVI-VEHICULES - Suivi des véhicules

#### Objectif du bloc

Cadrer puis créer ou compléter le module de suivi opérationnel véhicules selon le périmètre Alpha validé.

#### Rôle dans l'application

Le module porte vue d'ensemble, vérifications, désinfections et anomalies, distincts de la flotte administrative.

#### Dépendances amont

- P-VEHICULES.
- T4, T5, T6.
- P-DEPOTS-BASES.

#### Dépendances aval

- P-DASHBOARD, P-PLANNING si disponibilité impactée, F1, F3.

#### Décisions connues

- Base44 matérialise un module dédié avec quatre onglets.
- Le repo officiel ne prouve pas de route autonome dédiée.
- Les modèles `VehicleCheck`, `Disinfection`, `VehicleAnomaly` sont absents du Prisma officiel lu.

#### Décisions à confirmer

- Route autonome, sous-module Véhicules ou hybride : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Création des modèles Prisma suivi véhicules : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Règles ARS exactes vérifications/désinfections : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Permissions création/modification/lecture suivi : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Effet d'une anomalie critique sur disponibilité véhicule : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Bloc trop large si Prisma/API/UI sont mélangés.
- Reprendre les entités Base44 sans normalisation officielle.
- Absence de RBAC fin sur écritures opérationnelles.
- Présenter des règles ARS non confirmées.

#### Sessions de production prévues

- `DX_PSUIVI_AUDIT-PERIMETRE-EXISTANT`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : vérifier ce qui existe réellement côté officiel et comparer à Base44 6.1.
  - Périmètre inclus : route/page officielle éventuelle, véhicules détail, Prisma, Base44 suivi.
  - Hors périmètre : création module.
  - Zones à lire : `app/vehicles/*`, `app/api/vehicles/*`, `prisma/schema.prisma`, références/fiches suivi, Base44 suivi.
  - Zones modifiables plus tard : route suivi, Prisma, API, UI si validés.
  - Critères de validation : statut technique du module qualifié.
  - Preuves attendues : extraits, matrice manques, `git status --short`.
  - Dépendances : P-VEH.

- `DX_PSUIVI_CADRAGE-ARCHITECTURE-MODULE`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : décider route autonome/sous-module/hybride et découpage data/API/UI.
  - Périmètre inclus : architecture officielle, dépendances véhicules/dépôts/audit/RBAC.
  - Hors périmètre : migration.
  - Zones à lire : audit suivi, T5/T4/T6.
  - Zones modifiables plus tard : `app/suivi-vehicules` ou autre route validée, API, Prisma.
  - Critères de validation : architecture et ordre des CX prêts, ou questions humaines listées.
  - Preuves attendues : options, impacts, décisions à confirmer.
  - Dépendances : DX_PSUIVI_AUDIT-PERIMETRE-EXISTANT.

- `CX_PSUIVI_CREATION-PRISMA-API`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer les modèles/API suivi uniquement après validation du cadrage.
  - Périmètre inclus : un lot data/API cohérent : check, désinfection, anomalie ou socle commun.
  - Hors périmètre : UI complète quatre onglets, règles ARS non confirmées.
  - Zones à lire : cadrage suivi, Prisma, validators, services audit.
  - Zones modifiables plus tard : Prisma, migrations, API, validators/services.
  - Critères de validation : modèles tenant-scopés, API RBAC, audit serveur.
  - Preuves attendues : migration, prisma validate, tests API.
  - Dépendances : validation humaine modèles suivi.

- `CX_PSUIVI_CREATION-UI-VUE-ENSEMBLE`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer la vue d'ensemble suivi sur données officielles.
  - Périmètre inclus : route/page, KPI réels ou états vides, liens véhicules.
  - Hors périmètre : formulaires check/désinfection/anomalie si API non prête.
  - Zones à lire : API suivi, références UI/UX 6.1, Base44 en lecture.
  - Zones modifiables plus tard : page suivi, composants UI ciblés.
  - Critères de validation : vue sans faux KPI, accès selon droits.
  - Preuves attendues : diff, captures, lint/build.
  - Dépendances : CX Prisma/API ou décision de lecture sans nouveaux modèles.

- `CX_PSUIVI_CREATION-ONGLETS-OPERATIONS`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer les onglets vérifications, désinfections et anomalies par petits lots.
  - Périmètre inclus : un onglet ou formulaire par session si volume élevé.
  - Hors périmètre : indisponibilité automatique, signature, preuve mobile.
  - Zones à lire : UI vue ensemble, API suivi, références 6.1.
  - Zones modifiables plus tard : composants suivi ciblés.
  - Critères de validation : actions contrôlées, traçables, données réelles.
  - Preuves attendues : diff, captures, tests.
  - Dépendances : CX_PSUIVI_CREATION-PRISMA-API.

- `CX_PSUIVI_COMPLETION-RBAC-AUDIT`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter permissions et traces suivi véhicules.
  - Périmètre inclus : accès lecture/écriture, actions sensibles, payload audit.
  - Hors périmètre : conformité réglementaire complète.
  - Zones à lire : T4/T6, API suivi.
  - Zones modifiables plus tard : permissions/helpers/API/services.
  - Critères de validation : pas d'écriture non autorisée, traces produites.
  - Preuves attendues : tests RBAC, extraits audit, diff.
  - Dépendances : décisions permissions suivi.

- `DX_PSUIVI_VALIDATION-CLOTURE-MODULE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider le périmètre suivi retenu sans correction.
  - Périmètre inclus : route, onglets, API, audit, RBAC, états vides.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue/API.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : suivi véhicules situé clairement et fonctionnel sur Alpha retenu.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX PSUIVI.

#### Critère de clôture du bloc

Le statut du module est tranché, le périmètre Alpha retenu fonctionne ou est reporté explicitement, et aucune règle ARS non confirmée n'est présentée comme validée.

#### Points de contrôle ChatGPT

- Vérifier que le bloc est divisé data/API/UI.
- Vérifier que Base44 est utilisé comme référence, pas comme source technique.

### BLOC P-MODELES-HORAIRES - Modèles horaires

#### Objectif du bloc

Aligner le module officiel `ShiftTemplate` avec la terminologie `Modèles horaires` et les besoins planning.

#### Rôle dans l'application

Les modèles horaires sont un référentiel utilisé par le planning pour créer ou affecter des créneaux.

#### Dépendances amont

- T2, T3, T4, T5.

#### Dépendances aval

- P-PLANNING, P-DASHBOARD, P-MISE-EN-ROUTE.

#### Décisions connues

- Route officielle actuelle `/templates`.
- Modèle Prisma `ShiftTemplate` existant.
- Permission officielle `TEMPLATES_MANAGE` existante.
- Libellé visible attendu : `Modèles horaires`.

#### Décisions à confirmer

- Renommage technique route `/templates` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Duplication et restauration modèles : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Champs Base44 `allowed_roles`, `active_days`, `usage_count`, `short_label` : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Terminologie legacy visible.
- Casser le planning en modifiant les modèles.
- Reprendre des compteurs stockés Base44.

#### Sessions de production prévues

- `DX_PMODELES_AUDIT-TEMPLATES-OFFICIEL`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer ShiftTemplate, API templates, UI et dépendances planning.
  - Périmètre inclus : `/templates`, services/lib templates, Prisma.
  - Hors périmètre : renommage technique.
  - Zones à lire : `app/templates/*`, `app/api/templates/*`, `lib/templates/*`, `lib/services/templates/*`, `prisma/schema.prisma`.
  - Zones modifiables plus tard : templates UI/API/services.
  - Critères de validation : écarts terminologie/champs/cycle vie classés.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : T2/T5.

- `DX_PMODELES_CADRAGE-CHAMPS-CYCLE-VIE`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : cadrer duplication, archive/restauration, jours actifs et rôles autorisés.
  - Périmètre inclus : décisions champs et impact planning.
  - Hors périmètre : migration.
  - Zones à lire : audit modèles, Base44 ShiftTemplate, fiche planning.
  - Zones modifiables plus tard : Prisma/API/UI si validé.
  - Critères de validation : chaque enrichissement classé créer/report/refuser.
  - Preuves attendues : options, risques planning.
  - Dépendances : DX_PMODELES_AUDIT-TEMPLATES-OFFICIEL.

- `CX_PMODELES_CORRECTION-NOMENCLATURE-UI`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger les libellés visibles vers `Modèles horaires`.
  - Périmètre inclus : titres, boutons, messages, navigation locale.
  - Hors périmètre : route technique, schema, planning.
  - Zones à lire : audit modèles, T2.
  - Zones modifiables plus tard : `app/templates/*`.
  - Critères de validation : aucun libellé visible legacy non justifié.
  - Preuves attendues : diff, captures, lint.
  - Dépendances : T2.

- `CX_PMODELES_COMPLETION-ARCHIVE-VALIDATIONS`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter validations et cycle vie modèle selon cadrage.
  - Périmètre inclus : validation horaires, archive/restauration si confirmée, compatibilité planning.
  - Hors périmètre : refonte planning.
  - Zones à lire : validators/templates, API, planning dependencies.
  - Zones modifiables plus tard : validators/API/services/UI templates.
  - Critères de validation : modèles exploitables et non cassants pour planning.
  - Preuves attendues : diff, tests API, lint/build.
  - Dépendances : cadrage champs/cycle vie.

- `DX_PMODELES_VALIDATION-CLOTURE-PLANNING-COMPAT`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider modèles horaires et compatibilité planning sans correction.
  - Périmètre inclus : CRUD, archive si retenue, utilisation planning.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue, API.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : modèles horaires prêts pour P-PLANNING.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-MODELES.

#### Critère de clôture du bloc

Le module est nommé correctement côté produit, fonctionne avec `ShiftTemplate` officiel et ne bloque pas la reprise du planning.

#### Points de contrôle ChatGPT

- Vérifier qu'aucun renommage technique n'est fait sans T2.
- Vérifier la compatibilité planning avant clôture.

### BLOC P-PLANNING - Planning

#### Objectif du bloc

Reprendre le planning manuel métier après stabilisation des référentiels et contrôles transverses.

#### Rôle dans l'application

Le planning synthétise utilisateurs, véhicules, dépôts, modèles horaires, absences, publications, annulations et exports.

#### Dépendances amont

- P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES.
- T4, T5, T6, T7.

#### Dépendances aval

- P-DASHBOARD, P-AUDIT, F1, F2, F3.

#### Décisions connues

- Modèle officiel structuré autour de `DraftShift`, `Shift`, `AutoScheduleRun`, audit planning.
- Base44 `PlanningEntry` monolithique est refusé comme remplacement.
- Module officiel déjà riche mais complexe et incomplet.

#### Décisions à confirmer

- Règles semaine 53 : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Publication avec besoins obligatoires non couverts : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Week-ends/jours fériés/équilibrage : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Informations sensibles visibles par rôle : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Restauration planning/shift annulé : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Session trop large.
- Régression moteur autoschedule/matching.
- Mélange planning manuel, autoschedule, export, audit et vues en un seul patch.
- Données personnelles visibles à tort.

#### Sessions de production prévues

- `DX_PPLANNING_AUDIT-FLUX-MOTEUR`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : cartographier vues, flux actifs, legacy, endpoints, services et audit.
  - Périmètre inclus : planning page, APIs shifts/autoschedule/exports, services.
  - Hors périmètre : correction.
  - Zones à lire : `app/planning/*`, `app/api/planning/*`, `lib/services/planning/*`, `lib/types/planning.ts`, `prisma/schema.prisma`.
  - Zones modifiables plus tard : planning UI/API/services.
  - Critères de validation : flux classés actif/legacy/report.
  - Preuves attendues : matrice flux, extraits, `git status --short`.
  - Dépendances : référentiels.

- `DX_PPLANNING_CADRAGE-VUES-ALPHA`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir les vues Alpha à traiter : global, personnel, semaine, jour, mois.
  - Périmètre inclus : priorités, données nécessaires, droits visibles.
  - Hors périmètre : patch.
  - Zones à lire : audit planning, références UI/UX planning, Base44 planning.
  - Zones modifiables plus tard : composants planning.
  - Critères de validation : vues prioritaires et reports explicités.
  - Preuves attendues : ordre de traitement, risques.
  - Dépendances : DX_PPLANNING_AUDIT-FLUX-MOTEUR.

- `CX_PPLANNING_CORRECTION-LEGACY-CONTRATS`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger ou isoler les flux legacy prouvés comme risqués.
  - Périmètre inclus : endpoints dépréciés, composants inutilisés, contrats API fragiles.
  - Hors périmètre : refonte planning.
  - Zones à lire : audit planning.
  - Zones modifiables plus tard : endpoints/services ciblés.
  - Critères de validation : flux legacy qualifié, non destructif.
  - Preuves attendues : diff, tests qualité, lint/build.
  - Dépendances : cadrage planning.

- `CX_PPLANNING_COMPLETION-ACTIONS-MANUELLES`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter création/édition/assignation/cancel manuel selon périmètre Alpha.
  - Périmètre inclus : shifts manuels, validation tenant, absences, véhicules, modèles.
  - Hors périmètre : autoschedule avancé, vues multiples non liées.
  - Zones à lire : API shifts, assign services, validators.
  - Zones modifiables plus tard : API shifts, planning client.
  - Critères de validation : action manuelle contrôlée, auditée, cohérente avec référentiels.
  - Preuves attendues : diff, tests, captures.
  - Dépendances : P-USERS/P-VEH/P-MODELES/T6.

- `CX_PPLANNING_COMPLETION-VUES`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter une vue planning prioritaire par session.
  - Périmètre inclus : rendu, filtres, états, droits, données réelles.
  - Hors périmètre : modification moteur.
  - Zones à lire : cadrage vues, composants planning.
  - Zones modifiables plus tard : `app/planning/*`.
  - Critères de validation : vue exploitable sans données fictives.
  - Preuves attendues : captures, lint/build.
  - Dépendances : CX actions manuelles si nécessaire.

- `CX_PPLANNING_COMPLETION-PUBLICATION-EXPORT`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : fiabiliser publication, annulation et export dans le périmètre retenu.
  - Périmètre inclus : publish/cancel/export, RBAC, audit.
  - Hors périmètre : règles non arbitrées semaine 53/jours fériés.
  - Zones à lire : autoschedule publish/cancel, exports route, audit planning.
  - Zones modifiables plus tard : API/services planning.
  - Critères de validation : actions sensibles tracées et droits prouvés.
  - Preuves attendues : tests, diff, extraits audit.
  - Dépendances : T4/T6.

- `DX_PPLANNING_VALIDATION-CLOTURE-PARCOURS-CRITIQUES`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider les parcours planning retenus sans correction.
  - Périmètre inclus : vues, actions manuelles, publication/annulation/export, RBAC.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : planning manuel métier fiable ou écarts listés.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-PLANNING.

#### Critère de clôture du bloc

Les parcours planning Alpha retenus sont fiables, contrôlés, auditables, et les règles non arbitrées sont explicitement reportées.

#### Points de contrôle ChatGPT

- Vérifier que `PlanningEntry` Base44 n'est jamais utilisé comme modèle.
- Vérifier que chaque session planning garde un seul objectif.

### BLOC P-AUDIT - Audit / Traçabilité

#### Objectif du bloc

Garantir la consultation autorisée des traces officielles.

#### Rôle dans l'application

P-AUDIT expose les événements audit pertinents sans permettre de modification involontaire.

#### Dépendances amont

- T6.
- T4.

#### Dépendances aval

- F1, F2, RGPD-PRIVACY.

#### Décisions connues

- Route `/audit` et API audit existent.
- Lecture réservée via `canViewAudit`.
- Base44 Audit UI est inspiration, audit client est refusé.

#### Décisions à confirmer

- Export audit : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Filtre criticité : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Masquage des champs sensibles par permission : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Affichage de payloads sensibles.
- Page audit utilisée comme preuve d'actions non tracées.
- Export non autorisé.

#### Sessions de production prévues

- `DX_PAUDIT_AUDIT-PAGE-API-FILTRES`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer page audit, API, filtres, droits et données exposées.
  - Périmètre inclus : `app/audit`, `app/api/audit`, logs Prisma.
  - Hors périmètre : correction.
  - Zones à lire : `app/audit/*`, `app/api/audit/route.ts`, `lib/services/audit/*`, Prisma audit logs.
  - Zones modifiables plus tard : audit page/API.
  - Critères de validation : écarts consultation/filtre/sensibilité classés.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : T6.

- `CX_PAUDIT_CORRECTION-RBAC-LECTURE`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger accès, lecture seule et restrictions de données.
  - Périmètre inclus : guard page/API, détails sensibles, états accès refusé.
  - Hors périmètre : export audit non validé.
  - Zones à lire : audit P-AUDIT, T4.
  - Zones modifiables plus tard : `app/audit/*`, `app/api/audit/route.ts`.
  - Critères de validation : accès audit réservé et accès direct refusé.
  - Preuves attendues : diff, tests, captures.
  - Dépendances : T4.

- `CX_PAUDIT_COMPLETION-FILTRES-DETAILS`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter filtres et panneau détail sur les traces officielles existantes.
  - Périmètre inclus : période, module, action, utilisateur, résultat selon données présentes.
  - Hors périmètre : création d'événements manquants, export.
  - Zones à lire : API audit, UI audit, références UI/UX.
  - Zones modifiables plus tard : page/API audit.
  - Critères de validation : filtres fonctionnels et détails utiles sans sur-exposition.
  - Preuves attendues : diff, captures, tests.
  - Dépendances : T6.

- `DX_PAUDIT_VALIDATION-CLOTURE-CONSULTATION`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider consultation audit autorisée sans correction.
  - Périmètre inclus : filtres, droits, détails, lecture seule.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : traces officielles consultables sans modification.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-AUDIT.

#### Critère de clôture du bloc

L'audit officiel est consultable par les profils autorisés, avec limites et champs sensibles contrôlés.

#### Points de contrôle ChatGPT

- Vérifier que P-AUDIT ne promet pas une traçabilité complète si T6 a des reports.
- Vérifier que la page reste lecture seule.

### BLOC P-DASHBOARD - Tableau de bord

#### Objectif du bloc

Fiabiliser le tableau de bord comme portail d'entrée sur données réelles et permissions.

#### Rôle dans l'application

Le dashboard synthétise KPI, raccourcis, alertes et widgets après stabilisation des modules sources.

#### Dépendances amont

- T1, T3, T4, T5.
- Référentiels métiers et P-PLANNING pour widgets planning fiables.

#### Dépendances aval

- F1, F3, P-MISE-EN-ROUTE.

#### Décisions connues

- Dashboard officiel existe.
- Base44 apporte widgets, raccourcis, préférences et suppression des faux KPI.
- `DashboardPreference` absent du Prisma officiel lu.

#### Décisions à confirmer

- Persistance `DashboardPreference` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Widgets obligatoires Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Personnalisation Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Raccourci suivi véhicules si module créé : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- KPI fictifs ou coûteux.
- Préférences qui contournent les permissions.
- Dashboard repris avant les données sources.

#### Sessions de production prévues

- `DX_PDASHBOARD_AUDIT-KPI-WIDGETS`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer KPI, widgets, raccourcis, données et droits.
  - Périmètre inclus : dashboard officiel, Base44 dashboard, sources Prisma.
  - Hors périmètre : correction.
  - Zones à lire : `app/dashboard/page.tsx`, `app/ui/stat-card.tsx`, fiches dashboard, Base44 dashboard.
  - Zones modifiables plus tard : dashboard page, API éventuelle, Prisma si préférence validée.
  - Critères de validation : faux KPI et dépendances listés.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : référentiels.

- `DX_PDASHBOARD_CADRAGE-PREFERENCES-WIDGETS`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : décider widgets Alpha et persistance préférences.
  - Périmètre inclus : option sans persistance, local UI, Prisma `DashboardPreference`.
  - Hors périmètre : migration.
  - Zones à lire : audit dashboard, T5, fiche dashboard.
  - Zones modifiables plus tard : Prisma/API/UI dashboard si validé.
  - Critères de validation : widgets/raccourcis classés et préférences décidées ou reportées.
  - Preuves attendues : options, risques permissions.
  - Dépendances : T5/T4.

- `CX_PDASHBOARD_CORRECTION-KPI-RACCOURCIS`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger KPI/raccourcis non fiables sur données existantes.
  - Périmètre inclus : données réelles ou états indisponibles, permissions.
  - Hors périmètre : préférences persistées, reporting avancé.
  - Zones à lire : audit/cadrage dashboard.
  - Zones modifiables plus tard : `app/dashboard/page.tsx`.
  - Critères de validation : aucun faux KPI présenté comme réel.
  - Preuves attendues : diff, captures, tests/lint.
  - Dépendances : référentiels et P-PLANNING pour widgets planning.

- `CX_PDASHBOARD_CREATION-PREFERENCES`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer préférences dashboard uniquement si validées.
  - Périmètre inclus : modèle/API/UI préférences tenant/user-scopées.
  - Hors périmètre : marketplace widgets, reporting avancé.
  - Zones à lire : cadrage préférences, Prisma, T4/T5.
  - Zones modifiables plus tard : Prisma, API dashboard, page dashboard.
  - Critères de validation : préférences n'affichent jamais un widget non autorisé.
  - Preuves attendues : migration, tests, captures.
  - Dépendances : validation humaine DashboardPreference.

- `DX_PDASHBOARD_VALIDATION-CLOTURE-PORTAIL`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider portail par rôles et données sans correction.
  - Périmètre inclus : KPI, raccourcis, widgets, états vides.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : dashboard fiable et permissions respectées.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX P-DASHBOARD.

#### Critère de clôture du bloc

Le dashboard n'affiche que des données fiables ou des états explicites, et les préférences sont créées seulement si validées.

#### Points de contrôle ChatGPT

- Vérifier absence de données fictives.
- Vérifier que les raccourcis suivent les droits.

### BLOC P-MISE-EN-ROUTE - Mise en route

#### Objectif du bloc

Stabiliser l'assistant de configuration initiale après les référentiels métier.

#### Rôle dans l'application

Mise en route guide l'installation initiale sans remplacer Société ni les pages métier.

#### Dépendances amont

- P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES.
- T2, T4, T5.

#### Dépendances aval

- F1, F3, P-DASHBOARD.

#### Décisions connues

- Route officielle actuelle `/onboarding`.
- Libellé visible attendu `Mise en route`.
- Base44 calcule la progression depuis les entités métier et ne prouve pas l'usage d'`OnboardingStep`.

#### Décisions à confirmer

- Conditions minimales de complétion par étape : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Permission dédiée Mise en route : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Création ou refus `OnboardingStep` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Périmètre imports Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Dupliquer les modules métier.
- Confondre route `onboarding` et libellé utilisateur.
- Afficher une progression arbitraire.

#### Sessions de production prévues

- `DX_PMER_AUDIT-CHECKLIST-SOURCES`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer checklist, liens, calculs, sources et droits.
  - Périmètre inclus : `app/onboarding`, fiches, Base44 Mise en route.
  - Hors périmètre : correction.
  - Zones à lire : `app/onboarding/*`, fiches Mise en route/Société, Base44 MiseEnRoute.
  - Zones modifiables plus tard : onboarding page/client, route si validée.
  - Critères de validation : étapes et sources classées.
  - Preuves attendues : extraits, matrice, `git status --short`.
  - Dépendances : référentiels.

- `DX_PMER_CADRAGE-CONDITIONS-COMPLETION`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir les conditions de complétion et le besoin éventuel d'`OnboardingStep`.
  - Périmètre inclus : sources dynamiques, options de persistance, droits.
  - Hors périmètre : migration.
  - Zones à lire : audit PMER, T5, Base44 OnboardingStep.
  - Zones modifiables plus tard : Prisma/API/UI si validé.
  - Critères de validation : conditions validables ou à confirmer.
  - Preuves attendues : tableau étapes/sources/risques.
  - Dépendances : DX_PMER_AUDIT-CHECKLIST-SOURCES.

- `CX_PMER_CORRECTION-LIBELLES-LIENS`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger libellés, liens et redirections sans renommage technique non validé.
  - Périmètre inclus : UI `Mise en route`, liens vers vrais modules.
  - Hors périmètre : route rename, calcul progression.
  - Zones à lire : T2, audit PMER.
  - Zones modifiables plus tard : `app/onboarding/*`.
  - Critères de validation : libellé utilisateur conforme et liens autorisés.
  - Preuves attendues : diff, captures, lint.
  - Dépendances : T2/T4.

- `CX_PMER_COMPLETION-PROGRESSION`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : stabiliser calcul progression sur données réelles.
  - Périmètre inclus : requêtes sources validées, états incomplétude, permissions.
  - Hors périmètre : table `OnboardingStep` si non validée.
  - Zones à lire : cadrage complétion, référentiels.
  - Zones modifiables plus tard : `app/onboarding/*`, API éventuelle.
  - Critères de validation : progression cohérente avec vrais modules.
  - Preuves attendues : diff, captures, tests.
  - Dépendances : référentiels stabilisés.

- `DX_PMER_VALIDATION-CLOTURE-MISE-EN-ROUTE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider parcours Mise en route sans correction.
  - Périmètre inclus : étapes, liens, droits, états.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : checklist fiable et non dupliquante.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX PMER.

#### Critère de clôture du bloc

Mise en route reflète les vrais modules sources, sans fusion avec Société et sans persistance non validée.

#### Points de contrôle ChatGPT

- Vérifier que la page ne remplace pas les modules métier.
- Vérifier que `OnboardingStep` n'est pas créé sans décision.

## 6. Bloc RGPD et Privacy

### BLOC RGPD-PRIVACY - Privacy visible en Alpha

#### Objectif du bloc

Garantir une page Privacy visible et prudente sans déclarer une conformité RGPD complète.

#### Rôle dans l'application

Privacy informe minimalement sur les données personnelles manipulées en Alpha.

#### Dépendances amont

- P-LOGIN.
- T6.
- `RGPD_BASE_MINIMALE.md`.

#### Dépendances aval

- F1 et F4.

#### Décisions connues

- `/privacy` existe.
- Le login doit pointer vers `/privacy`.
- La conformité complète n'est pas prouvée.

#### Décisions à confirmer

- Responsable de traitement : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Contact DPO/privacy : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Bases légales et durées de conservation : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Export RGPD dédié : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Sur-promesse juridique.
- Page inaccessible depuis login.
- Mentions déconnectées du code réel.

#### Sessions de production prévues

- `DX_RGPD_AUDIT-PRIVACY-ALPHA`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : auditer page Privacy, lien login et cohérence avec RGPD minimal.
  - Périmètre inclus : `/privacy`, `/login`, documentation RGPD.
  - Hors périmètre : rédaction juridique complète.
  - Zones à lire : `app/privacy/page.tsx`, `app/login/page.tsx`, `docs/1-MASTER/RGPD_BASE_MINIMALE.md`.
  - Zones modifiables plus tard : privacy/login seulement.
  - Critères de validation : sur-promesses et manques listés.
  - Preuves attendues : extraits, `git status --short`.
  - Dépendances : P-LOGIN.

- `CX_RGPD_CORRECTION-MENTIONS-LIEN`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger lien ou contenu minimal validé sans inventer d'informations.
  - Périmètre inclus : page Privacy et lien Login.
  - Hors périmètre : politique légale exhaustive, DPO inventé.
  - Zones à lire : audit RGPD.
  - Zones modifiables plus tard : `app/privacy/page.tsx`, `app/login/page.tsx`.
  - Critères de validation : page accessible et prudente.
  - Preuves attendues : diff, capture, test qualité privacy.
  - Dépendances : audit RGPD et décisions de contenu.

- `DX_RGPD_VALIDATION-CLOTURE-VISIBILITE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : vérifier accessibilité et absence de promesse complète.
  - Périmètre inclus : login -> privacy, contenu visible, encodage.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : Privacy visible et limites Alpha explicites.
  - Preuves attendues : captures, commandes, `git status --short`.
  - Dépendances : CX RGPD éventuelle.

#### Critère de clôture du bloc

Privacy est visible et cohérente avec les limites Alpha ; la conformité complète reste non déclarée.

#### Points de contrôle ChatGPT

- Vérifier chaque formulation juridique non prouvée.
- Vérifier que les informations non fournies restent marquées.

## 7. Validations finales et gel Alpha

### BLOC F1 - Validation fonctionnelle croisée

#### Objectif du bloc

Valider les parcours fonctionnels principaux après reprise ou reports acceptés.

#### Rôle dans l'application

F1 vérifie les flux métier transverses sans corriger dans la session de validation.

#### Dépendances amont

- Blocs métiers terminés ou reports explicitement acceptés.
- T4/T5/T6/T7.

#### Dépendances aval

- F4.

#### Décisions connues

- F1 ne corrige pas le code.
- Chaque validation doit avoir une preuve.

#### Décisions à confirmer

- Parcours exacts Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Rôles et jeux de données de test : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Seuil d'acceptation des reports : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Valider implicitement une page incomplète.
- Confondre report et réussite.
- Corriger pendant validation.

#### Sessions de production prévues

- `DX_F1_CADRAGE-PARCOURS-ALPHA`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir parcours, rôles, données et modules à valider.
  - Périmètre inclus : login, référentiels, planning, suivi, dashboard, audit, privacy.
  - Hors périmètre : test correctif.
  - Zones à lire : sessions clôturées, docs fonctionnalités, T7.
  - Zones modifiables plus tard : plan de validation seulement.
  - Critères de validation : checklist de parcours prête.
  - Preuves attendues : tableau parcours/rôles/données.
  - Dépendances : blocs métier.

- `DX_F1_VALIDATION-CLOTURE-REFERENTIELS`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider Société, Dépôts, Users/RH, Véhicules, Modèles horaires.
  - Périmètre inclus : parcours UI/API des référentiels.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : référentiels exploitables ou écarts listés.
  - Preuves attendues : captures, commandes.
  - Dépendances : blocs référentiels.

- `DX_F1_VALIDATION-CLOTURE-PLANNING-SUIVI`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider planning et suivi véhicules retenus.
  - Périmètre inclus : parcours critiques, RBAC, audit.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app/API rendues.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : parcours OK ou bloquants listés.
  - Preuves attendues : captures, commandes.
  - Dépendances : P-PLANNING/P-SUIVI.

- `DX_F1_VALIDATION-CLOTURE-LOGIN-DASHBOARD-AUDIT-RGPD`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider entrée, portail, audit et privacy.
  - Périmètre inclus : login, dashboard, audit, privacy.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : flux transverses cohérents.
  - Preuves attendues : captures, commandes.
  - Dépendances : P-LOGIN/P-DASHBOARD/P-AUDIT/RGPD.

- `DX_F1_VALIDATION-CLOTURE-FONCTIONNELLE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : synthétiser validations et écarts F1.
  - Périmètre inclus : rapport F1.
  - Hors périmètre : validation humaine automatique.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : preuves de validation/clôture F1.
  - Zones modifiables plus tard : documentation de phase si validée.
  - Critères de validation : verdict explicite et écarts classés.
  - Preuves attendues : synthèse, `git status --short`.
  - Dépendances : validations/clôtures F1.

#### Critère de clôture du bloc

Les parcours principaux sont validés ou les écarts bloquants sont listés avec décision de correction/report.

#### Points de contrôle ChatGPT

- Vérifier preuves par parcours.
- Vérifier qu'aucune correction n'est mélangée à F1.

### BLOC F2 - Validation qualité technique

#### Objectif du bloc

Valider lint, build, tests, API/RBAC, multi-tenant et Prisma après reprise.

#### Rôle dans l'application

F2 contrôle la qualité technique finale Alpha sans corriger dans la même session.

#### Dépendances amont

- Blocs code terminés.
- T7.

#### Dépendances aval

- F4.

#### Décisions connues

- Scripts qualité existent.
- Exception Base44 documentaire possible si conditions strictes.

#### Décisions à confirmer

- Niveau minimal E2E : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Validation Prisma si aucune migration nouvelle : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Tolérance warnings : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Build/lint masqués par exception abusive.
- Tests qualité statiques insuffisants.
- Échec Prisma ignoré après migration.

#### Sessions de production prévues

- `DX_F2_CADRAGE-PLAN-QUALITE`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir commandes et périmètre qualité.
  - Périmètre inclus : lint, build, tests qualité, Prisma, encodage.
  - Hors périmètre : correction.
  - Zones à lire : `package.json`, `scripts/quality/`, T7.
  - Zones modifiables plus tard : aucune sauf plan de validation.
  - Critères de validation : plan de commandes prêt.
  - Preuves attendues : liste commandes, critères échec/succès.
  - Dépendances : T7.

- `DX_F2_VALIDATION-CLOTURE-LINT-BUILD`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : exécuter lint/build et qualifier les résultats.
  - Périmètre inclus : `npm run lint`, `npm run build`.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : logs commandes.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : succès ou échecs précisément qualifiés.
  - Preuves attendues : logs synthèse, exception Base44 si applicable.
  - Dépendances : DX_F2_CADRAGE-PLAN-QUALITE.

- `DX_F2_VALIDATION-CLOTURE-TESTS-QUALITE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : exécuter tests smoke/targeted/quality.
  - Périmètre inclus : `npm run test:quality` et scripts nécessaires.
  - Hors périmètre : ajout test.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : logs tests.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : résultats exploitables.
  - Preuves attendues : logs synthèse.
  - Dépendances : T7.

- `DX_F2_VALIDATION-CLOTURE-API-RBAC-TENANT`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : recontrôler contrats API/RBAC/multi-tenant critiques.
  - Périmètre inclus : routes sensibles, tests ciblés, extraits.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : API routes/services et scripts.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : écarts classés bloquant/non bloquant.
  - Preuves attendues : commandes, extraits.
  - Dépendances : T4/T5.

- `DX_F2_VALIDATION-CLOTURE-PRISMA-ENCODAGE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : valider Prisma et encodage documentaire.
  - Périmètre inclus : `npx prisma validate` si Prisma touché, `npm run docs:encoding`, contrôle séquences suspectes.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : logs commandes.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : Prisma valide si concerné, encodage OK ou anomalies listées.
  - Preuves attendues : logs, liste anomalies.
  - Dépendances : T5/T7.

- `DX_F2_VALIDATION-CLOTURE-QUALITE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : documenter verdict qualité technique.
  - Périmètre inclus : synthèse F2.
  - Hors périmètre : validation produit.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : preuves de validation/clôture F2.
  - Zones modifiables plus tard : docs phase si validées.
  - Critères de validation : verdict explicite.
  - Preuves attendues : `git status --short`, synthèse.
  - Dépendances : validations/clôtures F2.

#### Critère de clôture du bloc

Les contrôles techniques Alpha sont exécutés, les échecs éventuels qualifiés, et aucune correction n'est faite dans F2.

#### Points de contrôle ChatGPT

- Vérifier l'usage strict de l'exception Base44.
- Vérifier que chaque échec est attribué à un fichier/périmètre.

### BLOC F3 - Validation UX visuelle

#### Objectif du bloc

Valider la cohérence visuelle et responsive minimale des écrans critiques.

#### Rôle dans l'application

F3 contrôle l'alignement avec les références UI/UX et maquettes sans refonte pendant validation.

#### Dépendances amont

- T3.
- Blocs pages terminés ou reportés.

#### Dépendances aval

- F4.

#### Décisions connues

- Références UI/UX et maquettes V2 existent.
- Base44 peut servir de comparaison ergonomique uniquement.

#### Décisions à confirmer

- Viewports exacts à tester : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Seuil d'écart visuel acceptable Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Pages critiques exactes : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Transformer une validation UX en refonte.
- Prendre Base44 pour référence visuelle officielle finale.
- Oublier états UI et responsive.

#### Sessions de production prévues

- `DX_F3_CADRAGE-ECRANS-CRITIQUES`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : définir écrans, maquettes, états et viewports à valider.
  - Périmètre inclus : références UI/UX, maquettes PNG, pages critiques.
  - Hors périmètre : capture/correction.
  - Zones à lire : `docs/1-MASTER/2-REFERENCE_UI_UX/`, `docs/1-MASTER/1-MAQUETTE/`.
  - Zones modifiables plus tard : plan de validation UX.
  - Critères de validation : checklist visuelle prête.
  - Preuves attendues : tableau écrans/viewports/états.
  - Dépendances : T3.

- `DX_F3_VALIDATION-CLOTURE-DESKTOP-PAGES`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : capturer et comparer pages desktop critiques.
  - Périmètre inclus : shell, login, dashboard, référentiels, planning.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue, maquettes.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : écarts visuels listés.
  - Preuves attendues : captures, notes d'écart.
  - Dépendances : cadrage F3.

- `DX_F3_VALIDATION-CLOTURE-ETATS-UI`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : vérifier empty/loading/error/disabled/access denied.
  - Périmètre inclus : états critiques.
  - Hors périmètre : correction.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : états couverts ou écarts listés.
  - Preuves attendues : captures.
  - Dépendances : T3/pages.

- `DX_F3_VALIDATION-CLOTURE-RESPONSIVE-MINIMUM`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : vérifier absence de chevauchements bloquants sur viewports ciblés.
  - Périmètre inclus : mobile/tablette minimum selon cadrage.
  - Hors périmètre : refonte responsive complète.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : app rendue.
  - Zones modifiables plus tard : aucune dans cette session DX VALIDATION+CLOTURE.
  - Critères de validation : pas de casse bloquante connue ou écarts listés.
  - Preuves attendues : captures.
  - Dépendances : cadrage F3.

- `DX_F3_VALIDATION-CLOTURE-UX`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : synthétiser validation visuelle et reports.
  - Périmètre inclus : rapport F3.
  - Hors périmètre : validation implicite.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : preuves de validation/clôture F3.
  - Zones modifiables plus tard : docs phase si validées.
  - Critères de validation : verdict UX explicite.
  - Preuves attendues : synthèse, `git status --short`.
  - Dépendances : validations/clôtures F3.

#### Critère de clôture du bloc

Les écrans critiques sont contrôlés visuellement, les écarts sont qualifiés, et aucune correction n'est mélangée à F3.

#### Points de contrôle ChatGPT

- Vérifier que Base44 n'est pas source visuelle finale.
- Vérifier preuves par écran/viewport.

### BLOC F4 - Clôture documentaire Alpha ou clôture de phase

#### Objectif du bloc

Clôturer explicitement la phase ou acter sa non-clôture avec reports et preuves.

#### Rôle dans l'application

F4 est la gouvernance de fin de phase avant suite Beta/V1.

#### Dépendances amont

- F1, F2, F3 terminés ou reportés explicitement.

#### Dépendances aval

- Phase suivante.

#### Décisions connues

- Validation humaine obligatoire.
- Aucune conformité RGPD complète ne doit être promise.
- Une clôture ne corrige pas.

#### Décisions à confirmer

- Périmètre final Alpha : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Reports acceptés : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Prochaines priorités Beta/V1 : `INFORMATION NON FOURNIE — À CONFIRMER`.

#### Risques principaux

- Clôture implicite sans preuves.
- Oublier les reports.
- Modifier les MASTER sans validation humaine.

#### Sessions de production prévues

- `DX_F4_AUDIT-PREUVES-PHASE`
  - Nature : DX.
  - Type métier : AUDIT.
  - Objectif : rassembler preuves F1/F2/F3, statuts blocs et décisions.
  - Périmètre inclus : rapports de validation, sessions créées, git status.
  - Hors périmètre : modification MASTER.
  - Zones à lire : preuves F1/F2/F3, `docs/1-MASTER/02*`, `04*`, `05*`.
  - Zones modifiables plus tard : synthèse de phase si validée.
  - Critères de validation : manques et contradictions listés.
  - Preuves attendues : tableau preuves, `git status --short`.
  - Dépendances : F1/F2/F3.

- `DX_F4_CADRAGE-REPORTS-DECISIONS`
  - Nature : DX.
  - Type métier : CADRAGE.
  - Objectif : lister reports, risques et décisions humaines nécessaires.
  - Périmètre inclus : blocs non clôturés, réserves RGPD/RBAC/data/UX.
  - Hors périmètre : clôture automatique.
  - Zones à lire : audit preuves F4.
  - Zones modifiables plus tard : docs de phase après validation.
  - Critères de validation : liste de décisions humaines claire.
  - Preuves attendues : questions, risques, options.
  - Dépendances : DX_F4_AUDIT-PREUVES-PHASE.

- `DX_F4_VALIDATION-CLOTURE-DOCUMENTATION-OFFICIELLE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : mettre à jour les documents officiels de clôture uniquement après validation humaine explicite.
  - Périmètre inclus : `02`, `04`, `05` ou synthèse de phase selon décision.
  - Hors périmètre : code, nouvelles fonctionnalités, validation implicite.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : décisions humaines F4.
  - Zones modifiables plus tard : documents MASTER explicitement autorisés.
  - Critères de validation : docs cohérents et non contradictoires.
  - Preuves attendues : diff docs, encodage, `git status --short`.
  - Dépendances : validation humaine explicite.

- `DX_F4_VALIDATION-CLOTURE-OU-NON-CLOTURE`
  - Nature : DX.
  - Type métier : VALIDATION+CLOTURE.
  - Objectif : émettre le verdict final de phase.
  - Périmètre inclus : verdict clôturée/non clôturée, preuves, reports.
  - Hors périmètre : correction ou validation produit inventée.
  - Règle de non-correction : Si un écart bloquant est détecté, la session doit conclure à une non-clôture du bloc et demander une session CX ciblée.
  - Zones à lire : preuves F4 et documents mis à jour si documentation de clôture exécutée.
  - Zones modifiables plus tard : aucune sauf synthèse de session.
  - Critères de validation : verdict explicite, reports visibles.
  - Preuves attendues : `git status --short`, liste décisions, synthèse finale.
  - Dépendances : DX_F4_VALIDATION-CLOTURE-DOCUMENTATION-OFFICIELLE si documentation officielle validée.

#### Critère de clôture du bloc

La phase est clôturée ou non clôturée explicitement, avec preuves, reports et validation humaine documentée.

#### Points de contrôle ChatGPT

- Vérifier qu'aucune validation humaine n'est inventée.
- Vérifier que F4 ne corrige pas.

## 8. Décisions à confirmer avant production

- Comportement exact de `Se souvenir de moi`.
- Renommage technique éventuel de `/templates`.
- Renommage technique éventuel de `/onboarding`.
- Statut technique de `Suivi des véhicules`.
- Création ou report de `VehicleCheck`, `Disinfection`, `VehicleAnomaly`.
- Création ou report de `CompanyContact`.
- Création ou report de `DashboardPreference`.
- Création ou refus de `OnboardingStep`.
- Granularité RBAC : dépôts, contacts société, disponibilité véhicule, suivi véhicules, reset password, archive/restauration.
- Politique archive/restauration par module.
- Gestion officielle de TPMR, TPMR VSL, TPMR TAXI.
- Règles ARS exactes pour vérifications et désinfections.
- Conditions de complétion de Mise en route.
- Règles de publication planning avec besoins non couverts, semaine 53, jours fériés/week-ends et informations sensibles par rôle.
- Politique RGPD complète : responsable de traitement, contact privacy/DPO, bases légales, conservation, export RGPD dédié.
- Niveau de détail et de rétention audit, export audit et accès support.
- Nommage réel des sessions DX VALIDATION+CLOTURE dans `docs/2-SESSIONS`.

## 9. Risques principaux à surveiller

- RBAC front/API incohérent sur actions sensibles.
- Multi-tenant incomplet ou dépendant d'un `companyId` client.
- Reprise directe de concepts Base44 incompatibles avec Prisma officiel.
- Gros blocs CX trop larges, notamment Planning et Suivi des véhicules.
- Audit client ou non transactionnel présenté comme preuve.
- Données fictives ou compteurs dénormalisés présentés comme vérité.
- Confusion entre référentiel administratif Véhicules et suivi opérationnel.
- Privacy/RGPD sur-promis sans informations légales confirmées.
- Validation finale implicite de pages seulement parce que le code existe.

# 2 - Preuves

## 1. Commandes executees

- `git status --short`
  - Resultat initial : aucune sortie, worktree propre avant creation de session.
- `Get-ChildItem -Force`
  - Resultat utile : racine repo avec `app/`, `lib/`, `prisma/`, `docs/`, `package.json`, `create_session.ps1`; pas de dossier `src/` visible.
- `Get-ChildItem -Recurse -Filter create_session.ps1`
  - Resultat utile : script present a la racine.
- `.\create_session.ps1 -Stage 1-ALPHA -Block T1 -SessionCode AUDIT-SHELL-NAVIGATION -Type DX -Title "Audit shell navigation"`
  - Resultat utile : creation de `SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION`.
- `rg --files ...`
  - Resultat utile : inventaires documents, references, Base44, `app/`, `lib/`, `types/`, `prisma/`.
- `rg -n ...`
  - Resultat utile : preuves de cadrage T1, routes, libelles, RBAC, AccessDeniedState, Base44.
- `Get-Content ...`
  - Resultat utile : lecture ciblee des fichiers cites ci-dessous.

## 2. Fichiers lus - MASTER et session precedente

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/PATCH/README_PATCH.md`

Preuves utiles :

- `04` ordonne T1 avant T2, T3, T4 et avant les reprises pages/modules; lignes detectees : `04:130-148`, dependances `04:156-157`.
- `04` liste les points a confirmer : route `Suivi des vehicules`, renommage technique `templates`, renommage technique `onboarding`, granularite RBAC; lignes detectees : `04:182-185`.
- `05` cadre T1 comme stabilisation sidebar, topbar, societe courante, utilisateur courant, filtrage visible par droits et acces refuse; lignes detectees : `05:103-144`.
- `05` donne les dependances T1 : T2 si convention de nommage bloque, T4 pour permissions fines; lignes detectees : `05:123-124`.

## 3. Fichiers lus - references fonctionnelles/UI/maquettes

- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/1-REFERENCE_UI_UX_LOGIN.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/1-MAQUETTE/README_MAQUETTES.md`

Preuves utiles :

- La fiche Shell exige modules non autorises masques et acces direct non autorise vers `Acces refuse`; lignes detectees : fonctionnalites Shell `56`, `123`, `136`.
- La fiche Shell interdit `Privacy` en entree metier principale; lignes detectees : `62`, `64`, `104`.
- La fiche Shell accepte les routes historiques `/templates` et `/onboarding` si les libelles fonctionnels sont `Modeles horaires` et `Mise en route`; lignes detectees : `74-75`.
- La reference UI/UX Shell liste les entrees attendues : `Tableau de bord`, `Planning`, `Utilisateurs / RH`, `Vehicules`, `Modeles horaires`, `Societe`, `Depots / Bases`, `Mise en route`, `Audit`; lignes detectees : `126-134`.
- `Suivi des vehicules` est conditionnel selon fiche active/maquette validee; ligne detectee : `137`.

## 4. Fichiers lus - Base44

- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/shell/AppShell.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/shell/AccessDeniedState.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/ProtectedRoute.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/AuthContext.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/userPermissions.js`

Preuves utiles :

- Base44 est reference prototype, non source technique finale, et ne doit pas etre copie directement; `README_BASE44_REFERENCE.md:7-17`.
- Base44 Shell a `NAV_ITEMS`, dont `Tableau de bord` et `Suivi des vehicules`; `AppShell.jsx:17-22`.
- Base44 filtre la navigation et verifie l'acces direct via `hasAccessToCurrentRoute`; `AppShell.jsx:67-78`, rendu `AccessDeniedState` a `178`.
- Base44 affiche societe via `Company.get(user.company_id)` et fallback; `AppShell.jsx:46-49`, `144`.
- Synthese Base44 : Shell utilisable comme reference, mais Base44 reste prototype; `SYNTHESE:82`, `609-611`.
- Synthese Base44 : multi-societe et `companyId` a reprendre explicitement dans Codex; `SYNTHESE:331-336`, `473`.

## 5. Fichiers lus - code officiel

- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/providers.tsx`
- `app/page.tsx`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `app/planning/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/page.tsx`
- `app/audit/page.tsx`
- `app/privacy/page.tsx`
- `app/ui/access-denied-state.tsx`
- `app/ui/index.ts`
- `proxy.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/permission-catalog.ts`
- `lib/api/response.ts`
- `package.json`
- `prisma/schema.prisma`

Preuves utiles :

- `app/layout.tsx:46` definit `getAppShellData`.
- `app/layout.tsx:61` ajoute `/dashboard` avec libelle `Dashboard`.
- `app/layout.tsx:92-99` ajoute les liens connectes selon droits.
- `app/layout.tsx:102-104` construit `companyLabel`, `userLabel`, `roleLabel`.
- `app/app-shell.tsx:36` ne considere public que `/login`.
- `app/app-shell.tsx:95-130` rend sidebar/navigation.
- `app/app-shell.tsx:158-197` rend topbar, societe, utilisateur et deconnexion.
- `app/ui/access-denied-state.tsx:11` definit le composant `AccessDeniedState`.
- Pages directes non autorisees retournant `AccessDeniedState` : planning `51`, users `29`, vehicles `23`, templates `20`, company `38`, depots `31`, onboarding `23`, audit `18`.
- `proxy.ts` protege les routes connectees via `withAuth` et matcher.
- `lib/permissions.ts:27-35` centralise un helper d'acces permission, mais plusieurs pages gardent des checks locaux par role.
- `lib/permission-catalog.ts:1-96` definit le catalogue Alpha.

## 6. Dossiers lus

- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/`
- `app/`
- `app/api/`
- `app/ui/`
- `lib/`
- `types/`
- `prisma/`

## 7. Limites du controle

- Aucun navigateur lance.
- Aucun lint/build/test lance, car session DX sans modification applicative.
- Aucune migration lancee.
- Aucune base modifiee.
- Aucun package installe.
- Les controles RBAC API sont cartographies par lecture, non prouves par tests d'execution.
- Les caracteres accentues du repo apparaissent correctement dans certains `rg`, mais des sorties `Get-Content` affichent des sequences moquees par la console PowerShell; le controle final vise uniquement les fichiers de session crees/modifies.

## 8. Informations non fournies

- Matrice exhaustive module -> permission pour le Shell V1 : INFORMATION NON FOURNIE — À CONFIRMER.
- Statut final de `Suivi des vehicules` dans le shell T1 : INFORMATION NON FOURNIE — À CONFIRMER APRES AUDIT T2/T4.
- Decision de renommage technique `/templates` vers `/modeles-horaires` : INFORMATION NON FOURNIE — À CONFIRMER APRES AUDIT T2.
- Decision de renommage technique `/onboarding` vers `/mise-en-route` : INFORMATION NON FOURNIE — À CONFIRMER APRES AUDIT T2.
- Politique finale pour utilisateurs support sans societe courante hors audit : INFORMATION NON FOURNIE — À CONFIRMER APRES AUDIT T4/T5.

## 9. Controles finaux

- `git status --short`
  - Sortie : `?? docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/`
  - Interpretation : seul le nouveau dossier T1 non suivi est present.
- Inventaire des fichiers du dossier de session :
  - `1-SESSION.md`
  - `2-PREUVES.md`
  - `3-FIN_DE_SESSION.md`
  - `PATCH/NO_PATCH.md`
  - `PATCH/README_PATCH.md`
- `git diff --name-only`
  - Sortie : aucune.
  - Interpretation : aucun fichier suivi modifie, donc aucun fichier applicatif suivi modifie.
- `git diff -- app lib prisma package.json package-lock.json create_session.ps1 docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - Sortie : aucune.
  - Interpretation : perimetre interdit non modifie.
- Recherche de `.diff` dans `PATCH/`
  - Sortie : aucune.
  - Interpretation : aucun patch applicatif `.diff` cree.
- Presence des fichiers `PATCH`
  - `PATCH/NO_PATCH.md` : `True`
  - `PATCH/README_PATCH.md` : `True`
- Controle UTF-8 sans BOM des cinq fichiers crees/modifies :
  - `1-SESSION.md` : `UTF8_OK`, `BOM=False`
  - `2-PREUVES.md` : `UTF8_OK`, `BOM=False`
  - `3-FIN_DE_SESSION.md` : `UTF8_OK`, `BOM=False`
  - `PATCH/NO_PATCH.md` : `UTF8_OK`, `BOM=False`
  - `PATCH/README_PATCH.md` : `UTF8_OK`, `BOM=False`
- Recherche des quatre sequences suspectes demandees sur les fichiers de session :
  - Sortie : aucune.
- Controle de fichiers hors convention dans le dossier de session :
  - Sortie : aucune.

## 10. Complement documentaire de `05`

Contexte :

- Après contrôle intermédiaire, la session existante `SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION` a été complétée sans création de nouvelle session.
- Objectif : rendre `05-BLOCS_SESSIONS_PRODUCTION.md` contrôlable en remplaçant le placeholder des CX prévisionnelles du bloc T1 par le découpage issu de l'audit.

Fichier lu :

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

Zone modifiée :

- Bloc `### BLOC T1 - Shell global, navigation et contexte connecté`
- Sous-section `#### **Sessions prévues**`

Résumé précis du remplacement :

- Ancien contenu :
  - `DX audit + cadrage : cartographier shell/navigation, écarts, risques et questions bloquantes.`
  - `CX prévisionnelles : INFORMATION NON FOURNIE — À CONFIRMER APRÈS AUDIT CIBLÉ.`
  - `Clôture : DX si synthèse documentaire seule ; CX uniquement si un contrôle technique ou script est réellement modifié.`
- Nouveau contenu :
  - conservation de la ligne DX audit + cadrage;
  - ajout de `CX_T1_RENOMMAGE-LIBELLES-NAVIGATION`;
  - ajout de `CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE`;
  - ajout de `CX_T1_CREATION-ACCES-REFUSE`;
  - ajout de `CX_T1_COMPLETION-NAVIGATION-DROITS`;
  - ajout de `CX_T1_VALIDATION-SHELL-NAVIGATION`;
  - ajout de `DX_T1_CLOTURE`.

Nature de la modification :

- Modification documentaire uniquement.
- Aucun code applicatif modifié.
- Aucun patch applicatif `.diff` créé.
- La session reste soumise au contrôle final ChatGPT.

Commandes de contrôle associées :

- `git diff -- docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `git diff --name-only`
- `git diff -- app lib prisma package.json package-lock.json create_session.ps1 docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- Recherche de `.diff` dans le dossier `PATCH/`
- Contrôle présence `PATCH/NO_PATCH.md`
- Contrôle UTF-8 sans BOM des fichiers de session modifiés
- Recherche des quatre séquences suspectes demandées

Résultats utiles :

- `git diff -- docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - Diff limité à la sous-section `Sessions prévues` du bloc T1.
  - Suppression du placeholder `CX prévisionnelles`.
  - Ajout des six sessions : `CX_T1_RENOMMAGE-LIBELLES-NAVIGATION`, `CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE`, `CX_T1_CREATION-ACCES-REFUSE`, `CX_T1_COMPLETION-NAVIGATION-DROITS`, `CX_T1_VALIDATION-SHELL-NAVIGATION`, `DX_T1_CLOTURE`.
  - Avertissement Git affiché : `LF will be replaced by CRLF the next time Git touches it`.
- `git diff --name-only`
  - `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - les cinq fichiers de session T1 existants.
- Diff perimetre interdit applicatif et `04`
  - Sortie : aucune.
- Recherche `.diff` dans `PATCH/`
  - Sortie : aucune.
- Presence `PATCH/NO_PATCH.md`
  - Sortie : `True`.
- UTF-8 sans BOM :
  - `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` : `UTF8_OK`, `BOM=False`.
  - `1-SESSION.md` : `UTF8_OK`, `BOM=False`.
  - `2-PREUVES.md` : `UTF8_OK`, `BOM=False`.
  - `3-FIN_DE_SESSION.md` : `UTF8_OK`, `BOM=False`.
  - `PATCH/NO_PATCH.md` : `UTF8_OK`, `BOM=False`.
  - `PATCH/README_PATCH.md` : `UTF8_OK`, `BOM=False`.
- Recherche des quatre séquences suspectes demandées :
  - Sortie : aucune.
- `git status --short`
  - ` M docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - `?? docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/`

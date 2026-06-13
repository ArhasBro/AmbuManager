# 2 - Preuves

## 1. Commandes executees

Commandes executees pendant la session :

```powershell
Get-ChildItem -Force
git status --short
Get-ChildItem -Path docs -Force
Get-ChildItem -Path docs\1-MASTER -Force
Get-ChildItem -Path docs\2-SESSIONS -Force
Get-ChildItem -Path docs\3-TEMPLATES -Force
Get-Content -Path create_session.ps1 -TotalCount 220
rg --files app lib docs/1-MASTER docs/2-SESSIONS docs/3-TEMPLATES
Get-ChildItem -Path docs\1-MASTER\4-BASE44_REFERENCE -Recurse -Force
Get-ChildItem -Path app -Recurse -Force -Include page.tsx,layout.tsx,route.ts,loading.tsx,error.tsx,not-found.tsx | Select-Object FullName
Get-ChildItem -Path app -Recurse -Force -Directory | Select-Object FullName
Get-Content -Path create_session.ps1 | Select-Object -Skip 220 -First 260
Select-String -Path docs\1-MASTER\01-APPLICATION_WEB.md,docs\1-MASTER\02-DOCUMENT_MAITRE_PROJET.md,docs\1-MASTER\03-METHODE_DE_TRAVAIL.md,docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md -Pattern '^(#|##|###) '
Select-String -Path docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md -Pattern 'BLOC|Bloc|bloc|ancien|obsol|Base44|PHASE|Phase|phase'
Select-String -Path docs\1-MASTER\4-BASE44_REFERENCE\README_BASE44_REFERENCE.md,docs\1-MASTER\4-BASE44_REFERENCE\PROMPT_INTEGRATION_BASE44_REFERENCE.md,docs\1-MASTER\4-BASE44_REFERENCE\SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md -Pattern '^(#|##|###) '
Select-String -Path docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\App.jsx -Pattern 'path|Dashboard|Planning|Vehicules|Utilisateurs|Modeles|Depots|Societe|Audit|MiseEnRoute|Login|Suivi'
Get-ChildItem -Path docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\pages -File | Select-Object Name,Length
Get-Content -Path create_session.ps1 | Select-Object -Skip 480 -First 240
Select-String -Path docs\1-MASTER\01-APPLICATION_WEB.md -Pattern '^### ' -Context 0,4
Select-String -Path docs\1-MASTER\02-DOCUMENT_MAITRE_PROJET.md -Pattern 'Base44|officiel|repo|reference|prototype|ne doit|doit'
Select-String -Path docs\1-MASTER\03-METHODE_DE_TRAVAIL.md -Pattern 'session|perimetre|preuve|encodage|renommage|interdictions|verdict|code|documentaire'
Get-ChildItem -Path app\ui -File | Select-Object Name,Length
Get-ChildItem -Path app -File | Select-Object Name,Length
Select-String -Path app\app-shell.tsx -Pattern 'href|label|nav|Navigation|dashboard|planning|users|vehicles|templates|company|depots|audit|onboarding|Acces|Access' -Context 1,1
Select-String -Path docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\shell\AppShell.jsx -Pattern 'href|path|label|nav|Dashboard|Planning|Utilisateurs|Vehicules|Suivi|Modeles|Societe|Depots|Mise|Audit|Access|Acces' -Context 1,1
Select-String -Path app\*\page.tsx -Pattern 'PageHeader|title=|<h1|redirect|AppShell|AccessDenied|Templates|Modeles|Mise|Onboarding|Societe|Depots|Vehicules|Planning|Audit|Dashboard|Tableau|Utilisateurs' -Context 0,2
Select-String -Path app\*.css,app\globals.css -Pattern 'a24|ambulance|dashboard|planning|vehicles|templates|users|complementary|Base44|shell'
Select-String -Path app\ui\*.tsx -Pattern 'export|type .*Props|interface .*Props|Empty|Error|Filter|Table|Badge|Card|Button|Access'
Get-ChildItem -Path lib -Recurse -Force -File | Select-Object FullName
Select-String -Path docs\1-MASTER\5-AUDIT\*.md -Pattern '^(#|##|###) |BLOC|Bloc|bloc|obsol|ancien|Base44|officiel|ecart|renomm|templates|onboarding|suivi'
Get-Content -Path package.json
Get-Content -Path app\layout.tsx
Get-Content -Path app\page.tsx
Get-Content -Path docs\1-MASTER\4-BASE44_REFERENCE\README_BASE44_REFERENCE.md
Get-Content -Path docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\README_EXPORT_BASE44.md
.\create_session.ps1 -Stage 1-ALPHA -Block A1 -SessionCode P1-01 -Type AUDIT -Title "Structuration reprise Base44"
```

Commandes finales executees apres redaction :

```powershell
git status --short
git diff --name-only -- app lib prisma package.json package-lock.json
Get-ChildItem -Path docs\1-MASTER -Force
Get-ChildItem -Path docs\2-SESSIONS -Force
Get-ChildItem -Path docs\3-TEMPLATES -Force
Get-ChildItem -Path docs\1-MASTER\4-BASE44_REFERENCE -Force
```

Les commandes de controle encodage sont documentees dans la section 20 apres execution finale.

## 2. Fichiers et dossiers lus

Fichiers lus ou inventaries directement :

- `create_session.ps1`
- `package.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/app-shell.tsx`
- `app/ui/access-denied-state.tsx`
- `app/ui/action-button.tsx`
- `app/ui/data-table.tsx`
- `app/ui/empty-state.tsx`
- `app/ui/error-message.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/5-AUDIT/AUDIT_CODE_EXISTANT_ALPHA_V2.md`
- `docs/1-MASTER/5-AUDIT/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/PROMPT_INTEGRATION_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/README_EXPORT_BASE44.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/shell/AppShell.jsx`

Dossiers inventories :

- `app/`
- `app/api/`
- `app/ui/`
- `lib/`
- `docs/1-MASTER/`
- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/1-MASTER/5-AUDIT/`
- `docs/2-SESSIONS/`
- `docs/3-TEMPLATES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/`

## 3. Inventaire synthetique du repo

Racine detectee :

- `.git/`
- `.next/`
- `app/`
- `docs/`
- `lib/`
- `node_modules/`
- `prisma/`
- `public/`
- `scripts/`
- `test-results/`
- `types/`
- `.editorconfig`
- `.env`
- `.gitignore`
- `create_session.ps1`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `prisma.config.ts`
- `proxy.ts`
- `README.md`
- `tsconfig.json`

Stack detectee dans `package.json` :

- Next.js `16.1.6`
- React `19.2.3`
- TypeScript
- Prisma `7.7.0`
- PostgreSQL via `pg`
- NextAuth
- Zod
- Lucide React
- Tailwind/PostCSS

## 4. Inventaire docs/1-MASTER

Structure detectee :

- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/1-MASTER/5-AUDIT/`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md`

Documents MASTER actifs lus :

- `01-APPLICATION_WEB.md` : modules cible detectes.
- `02-DOCUMENT_MAITRE_PROJET.md` : repo officiel source technique finale ; Base44 reference prototype.
- `03-METHODE_DE_TRAVAIL.md` : regles session, preuve, perimetre, encodage, interdictions.
- `04-PLAN_DE_DEVELOPPEMENT.md` : phase actuelle PHASE 1, blocs existants a restructurer.

## 5. Inventaire docs/2-SESSIONS

Structure detectee avant creation P1-01 :

- `docs/2-SESSIONS/1-ALPHA/`
- `docs/2-SESSIONS/SESSION-YYYYMMDD-XX/`
- `docs/2-SESSIONS/README_SESSIONS.md`

Structure creee par script pour cette session :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/PATCH/`

## 6. Inventaire docs/3-TEMPLATES

Structure detectee :

- `docs/3-TEMPLATES/README_TEMPLATES.md`
- `docs/3-TEMPLATES/TEMPLATE_CONTROLE_CHATGPT.md`
- `docs/3-TEMPLATES/TEMPLATE_CREATION_BLOC_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_RELANCE_CODEX.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`

## 7. Inventaire docs/1-MASTER/4-BASE44_REFERENCE

Structure detectee :

- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/`
- `docs/1-MASTER/4-BASE44_REFERENCE/PROMPT_INTEGRATION_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`

Structure principale de l'export :

- `EXPORT_BASE44/src/App.jsx`
- `EXPORT_BASE44/src/pages/`
- `EXPORT_BASE44/src/components/`
- `EXPORT_BASE44/src/components/ui/`
- `EXPORT_BASE44/src/components/shell/`
- `EXPORT_BASE44/src/components/planning/`
- `EXPORT_BASE44/src/components/suivi/`
- `EXPORT_BASE44/src/components/utilisateurs/`
- `EXPORT_BASE44/src/components/vehicules/`
- `EXPORT_BASE44/src/components/modeles/`
- `EXPORT_BASE44/src/components/depots/`
- `EXPORT_BASE44/src/components/societe/`
- `EXPORT_BASE44/src/components/dashboard/`
- `EXPORT_BASE44/base44/entities/`
- `EXPORT_BASE44/base44/functions/`

Entites Base44 detectees :

- `AbsenceRequest`
- `AuditLog`
- `Company`
- `CompanyContact`
- `DashboardPreference`
- `Depot`
- `Disinfection`
- `Employee`
- `OnboardingStep`
- `PlanningEntry`
- `ShiftTemplate`
- `User`
- `Vehicle`
- `VehicleAnomaly`
- `VehicleCheck`

## 8. Inventaire des pages officielles detectees

Pages Next.js detectees :

| Page officielle | Route officielle detectee | Fichier | Observation |
|---|---:|---|---|
| Redirection racine | `/` | `app/page.tsx` | Redirige vers `/dashboard` si session, sinon `/login`. |
| Login | `/login` | `app/login/page.tsx` | Page publique d'authentification. |
| Tableau de bord | `/dashboard` | `app/dashboard/page.tsx` | Dashboard officiel detecte. |
| Planning | `/planning` | `app/planning/page.tsx` | Page planning avec droits self/global/edit/export/audit. |
| Utilisateurs / RH | `/users` | `app/users/page.tsx` | Page RH officielle. |
| Vehicules | `/vehicles` | `app/vehicles/page.tsx` | Page flotte officielle. |
| Modeles horaires | `/templates` | `app/templates/page.tsx` | Route historique `templates`, libelle fonctionnel cible `Modeles horaires`. |
| Societe | `/company` | `app/company/page.tsx` | Route officielle anglaise, libelle fonctionnel `Societe`. |
| Depots / bases | `/depots` | `app/depots/page.tsx` | Page depots officielle. |
| Mise en route | `/onboarding` | `app/onboarding/page.tsx` | Route historique `onboarding`, libelle fonctionnel `Mise en route`. |
| Audit | `/audit` | `app/audit/page.tsx` | Page journal d'audit. |
| Mentions d'information | `/privacy` | `app/privacy/page.tsx` | Page RGPD/information, hors liste Base44 fonctionnelle principale. |

Page officielle non detectee :

| Page attendue | Route officielle | Observation |
|---|---:|---|
| Suivi des vehicules | INFORMATION NON FOURNIE — À CONFIRMER | Aucune route autonome `app/suivi-vehicules` ou equivalente detectee. Des elements partiels peuvent exister dans Vehicules, mais le module dedie n'est pas prouve. |

## 9. Inventaire des pages et modules Base44 detectes

Routes Base44 detectees dans `EXPORT_BASE44/src/App.jsx` :

| Page Base44 | Route Base44 | Fichier |
|---|---:|---|
| Login | `/login` | `src/pages/Login.jsx` |
| Dashboard | `/` | `src/pages/Dashboard.jsx` |
| Planning | `/planning` | `src/pages/Planning.jsx` |
| Utilisateurs | `/utilisateurs` | `src/pages/Utilisateurs.jsx` |
| Vehicules | `/vehicules` | `src/pages/Vehicules.jsx` |
| Suivi vehicules | `/suivi-vehicules` | `src/pages/SuiviVehicules.jsx` |
| Modeles horaires | `/modeles-horaires` | `src/pages/ModelesHoraires.jsx` |
| Societe | `/societe` | `src/pages/Societe.jsx` |
| Depots | `/depots` | `src/pages/Depots.jsx` |
| Mise en route | `/mise-en-route` | `src/pages/MiseEnRoute.jsx` |
| Audit | `/audit` | `src/pages/Audit.jsx` |
| Page non trouvee | `*` | `src/lib/PageNotFound.jsx` |

Modules Base44 detectes :

- `components/shell/` : shell, navigation, acces refuse.
- `components/ui/` : composants UI type shadcn.
- `components/dashboard/` : cartes KPI, widgets, raccourcis, personnalisation.
- `components/planning/` : vues planning globale, jour, mois, semaine, personnelle, publication.
- `components/suivi/` : vue ensemble, verifications, desinfections, anomalies, formulaires.
- `components/utilisateurs/` : formulaire utilisateur, reset password, acces application, absences.
- `components/vehicules/` : formulaire vehicule.
- `components/modeles/` : formulaire modele horaire.
- `components/depots/` : formulaire depot.
- `components/societe/` : champs societe, contacts, administration.
- `base44/entities/` : modele prototype de donnees.

## 10. Premiere table de correspondance officielle <-> Base44

| Cible fonctionnelle | Officiel detecte | Base44 detecte | Correspondance probable | Statut preliminaire |
|---|---|---|---|---|
| Login | `/login` | `/login` | Forte | Adapter UX, conserver auth officielle. |
| Tableau de bord | `/dashboard` | `/` | Forte avec divergence de route | Ne pas remplacer le dashboard officiel par la racine Base44. |
| Planning | `/planning` | `/planning` | Forte | Adapter vues UX ; garder moteur officiel planning/autoschedule. |
| Utilisateurs / RH | `/users` | `/utilisateurs` | Forte avec divergence route/langue | Renommage route eventuel a cadrer plus tard. |
| Vehicules | `/vehicles` | `/vehicules` | Forte avec divergence route/langue | Adapter UX/champs sans copier. |
| Suivi des vehicules | INFORMATION NON FOURNIE — À CONFIRMER | `/suivi-vehicules` | Base44 plus explicite | Bloc page dedie a cadrer ; route officielle absente. |
| Modeles horaires | `/templates` | `/modeles-horaires` | Forte fonctionnellement | Route/fichiers `templates` historiques a revoir en session dediee. |
| Societe | `/company` | `/societe` | Forte | Route anglaise officielle a arbitrer. |
| Depots / bases | `/depots` | `/depots` | Forte | Libelle officiel a uniformiser. |
| Mise en route | `/onboarding` | `/mise-en-route` | Forte fonctionnellement | Route/fichiers `onboarding` historiques a revoir en session dediee. |
| Audit / tracabilite | `/audit` | `/audit` | Forte | Base44 non probant cote logs serveur ; garder audit officiel. |
| Mentions d'information | `/privacy` | INFORMATION NON FOURNIE — À CONFIRMER | Non prouvee | Page officielle hors Base44 principal. |

## 11. Premiere liste des sujets transversaux detectes

Sujets transversaux detectes dans le repo officiel et/ou Base44 :

- shell global ;
- navigation principale ;
- topbar, societe courante, utilisateur courant ;
- theme clair/sombre ;
- conventions routes francais/anglais ;
- nomenclature affichage : `Dashboard` vs `Tableau de bord`, `Templates` vs `Modeles horaires`, `Onboarding` vs `Mise en route` ;
- design system officiel `app/ui/*` ;
- design system prototype Base44 `components/ui/*` ;
- page headers ;
- boutons d'action ;
- cartes KPI / stat cards ;
- badges de statut ;
- tables de donnees ;
- barres de filtres ;
- panneaux lateraux ;
- modales/dialogs ;
- etats vides ;
- etats loading ;
- etats erreur ;
- acces refuse ;
- permissions visuelles ;
- RBAC serveur/API ;
- liens dashboard vers modules ;
- audit des actions sensibles ;
- multi-tenant `companyId` / societe courante ;
- exports planning ;
- archivage/restauration ;
- absences/indisponibilites ;
- conventions CSS historiques ;
- encodage de certains libelles existants a verifier ulterieurement.

## 12. Premiere liste des noms historiques ou fichiers a renommer potentiellement

Aucun renommage effectue dans cette session.

Noms a revoir plus tard en sessions dediees :

| Element | Localisation detectee | Motif preliminaire | Action future |
|---|---|---|---|
| `templates` | `app/templates/`, `app/api/templates/`, `lib/templates/`, classes CSS `templates-*` | Terme cible MASTER : `Modeles horaires`. | Arbitrage route/fichiers/composants en session dediee. |
| `onboarding` | `app/onboarding/`, classes et composants onboarding | Terme cible MASTER : `Mise en route`. | Arbitrage route/fichiers/composants en session dediee. |
| `Dashboard` dans navigation | `app/layout.tsx` | MASTER cible : `Tableau de bord`. | Correction libelle possible sans forcement renommer route. |
| `company` | `app/company/`, `app/api/company/` | Page cible : `Societe`. | Renommage route a confirmer ; risque API/links. |
| `users`, `vehicles` | `app/users/`, `app/vehicles/` | Routes anglaises vs libelles FR et Base44 FR. | Decision humaine requise : garder routes techniques ou franciser. |
| CSS `a24-*` | `app/a24-vehicles-templates.css`, `app/a24-users-rh.css`, `app/a24-complementary-pages.css` | Noms historiques de sessions UI precedentes. | Ne pas renommer sans session dediee, car impact layout global. |
| Classes `planning-legacy*` | `app/globals.css` | Marqueur historique detecte. | Audit planning dedie avant toute action. |
| Anciens codes `DEV-B44-*` | `docs/1-MASTER/5-AUDIT/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md` | Ancien cadrage de reprise, non adapte a la nouvelle doctrine P1. | Remplacer par nouveau plan apres validation humaine. |
| Blocs Base44 A-L | `SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md` | Blocs de synthese prototype, pas blocs d'execution officiels. | Utiliser comme reference, pas comme plan principal. |

Point encodage observe sans modification :

- Des sequences d'affichage de type mojibake apparaissent dans `app/layout.tsx` lors de la lecture terminal, notamment sur des libelles de roles et de societe.
- Des sequences similaires apparaissent dans des README Base44 lus.
- Cette session ne corrige pas ces fichiers, car toute correction serait hors perimetre.

## 13. Anciens blocs ou anciens plans devenus obsoletes

Elements a considerer obsoletes comme plan d'execution principal :

- anciens codes de reprise `DEV-B44-*` cites dans `AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md` ;
- cadrage ancien oriente `Phase 5` dans `AUDIT_CODE_EXISTANT_ALPHA_V2.md` ;
- blocs Base44 A a L de la synthese finale Base44, qui restent des blocs d'analyse prototype et non des blocs officiels de reprise ;
- liste actuelle BLOC 1 a BLOC 15 de `04-PLAN_DE_DEVELOPPEMENT.md` a traiter comme base preliminaire a restructurer, pas comme plan final complet, car la doctrine validee impose maintenant des blocs transversaux + un bloc par page fonctionnelle.

Les documents historiques conservent leur valeur de preuve et de contexte, mais ne doivent pas piloter directement l'execution code.

## 14. Premiere proposition de blocs de reprise

### Blocs transversaux preliminaires

| Bloc preliminaire | Objet | Commentaire |
|---|---|---|
| T0 - Gouvernance du plan P1 | Formaliser le plan final, statuts, criteres, ordre et dependances. | A produire apres validation de cet audit. |
| T1 - Shell global et navigation | Shell, topbar, routes visibles, societe courante, utilisateur, theme, liens. | Doit preceder les pages. |
| T2 - Nomenclature et conventions | Routes/libelles, francais/anglais, conventions composants/dossiers. | Renommages seulement en sessions dediees. |
| T3 - Design system officiel | `app/ui`, boutons, headers, cards, badges, tables, filtres, etats. | A stabiliser avant reprises page par page. |
| T4 - Etats transversaux | Empty/loading/error/access denied, permissions visuelles. | Lie a T1/T3/T5. |
| T5 - RBAC UI/API | Matrice permissions, helpers serveur, restrictions API, affichage conditionnel. | Critique avant modules sensibles. |
| T6 - Donnees et mapping Base44 vers Prisma | Entites Base44 utiles vs modele officiel, multi-tenant, migrations futures. | Aucun Prisma sans session dediee. |
| T7 - Audit et tracabilite transverse | Contrats d'audit pour actions sensibles. | Peut etre transversal puis page audit. |
| T8 - Qualite, tests et controles | lint/build/tests/browser/encodage selon type de session. | Bloc final et controle recurrent. |

### Blocs page par page preliminaires

| Bloc page | Page officielle cible | Correspondance Base44 |
|---|---|---|
| P-LOGIN | Login | `Login.jsx` |
| P-DASHBOARD | Tableau de bord | `Dashboard.jsx` |
| P-PLANNING | Planning | `Planning.jsx` + composants planning |
| P-USERS-RH | Utilisateurs / RH | `Utilisateurs.jsx` + composants utilisateurs |
| P-VEHICLES | Vehicules | `Vehicules.jsx` + composants vehicules |
| P-VEHICLE-FOLLOWUP | Suivi des vehicules | `SuiviVehicules.jsx` + composants suivi |
| P-TEMPLATES | Modeles horaires | `ModelesHoraires.jsx` + composants modeles |
| P-COMPANY | Societe | `Societe.jsx` + composants societe |
| P-DEPOTS | Depots / bases | `Depots.jsx` + composants depots |
| P-ONBOARDING | Mise en route | `MiseEnRoute.jsx` |
| P-AUDIT | Audit / tracabilite | `Audit.jsx` |
| P-PRIVACY | Mentions d'information | Pas de correspondance Base44 prouvee |

### Blocs finaux preliminaires

| Bloc final | Objet |
|---|---|
| F1 - Validation fonctionnelle croisee | Verifier coherence pages, navigation, permissions, etats. |
| F2 - Validation qualite technique | lint/build/tests cibles, smoke tests, encodage. |
| F3 - Validation UX visuelle | Controle navigateur et comparaison aux references visuelles. |
| F4 - Cloture documentaire Alpha | Preuves, verdicts, restes acceptes ou sessions restantes. |

## 15. Ordre preliminaire de reprise

Ordre indicatif, non final :

1. T0 - Gouvernance du plan P1.
2. T1 - Shell global et navigation.
3. T2 - Nomenclature et conventions, incluant decision sur renommages futurs.
4. T3 - Design system officiel.
5. T4 - Etats transversaux.
6. T5 - RBAC UI/API.
7. T6 - Donnees et mapping Base44 vers Prisma.
8. P-LOGIN.
9. P-COMPANY.
10. P-DEPOTS.
11. P-USERS-RH.
12. P-VEHICLES.
13. P-TEMPLATES.
14. P-VEHICLE-FOLLOWUP.
15. P-PLANNING.
16. P-AUDIT avec T7.
17. P-DASHBOARD.
18. P-ONBOARDING.
19. P-PRIVACY si maintenue dans le perimetre Alpha.
20. F1/F2/F3/F4 - validations et cloture.

Raison preliminaire :

- Les transversaux doivent eviter les corrections redondantes page par page.
- Les modules sources de donnees doivent preceder dashboard et mise en route.
- Planning depend de depots, utilisateurs, vehicules et modeles horaires.
- Suivi vehicules demande un cadrage donnees/API avant toute implementation.

## 16. Risques detectes

Risques preliminaires :

- risque de copier Base44 au lieu d'adapter ;
- routes officielles anglaises vs routes Base44 francaises ;
- route officielle absente pour `Suivi des vehicules` ;
- design system officiel plus restreint que la bibliotheque UI Base44 ;
- divergence RBAC Base44 front-only vs RBAC officiel serveur/API ;
- entites Base44 absentes ou divergentes du schema Prisma officiel ;
- anciens plans `DEV-B44-*` et `Phase 5` susceptibles de brouiller la nouvelle gouvernance ;
- sequences d'encodage suspectes observees dans des fichiers existants hors perimetre ;
- CSS historique volumineux et potentiellement fragile ;
- risque de plan trop lourd si les sessions ne sont pas decoupees finement.

## 17. Decisions humaines a prendre

Decisions a confirmer avant plan final :

- faut-il franciser les routes officielles ou conserver les routes techniques anglaises avec libelles FR ?
- `Suivi des vehicules` doit-il devenir une page autonome officielle, un sous-module de `Vehicules`, ou une approche hybride ?
- quel niveau de granularite RBAC doit etre retenu pour suivi vehicules, depots, reset password, contacts societe, disponibilite vehicule ?
- les contacts societe Base44 doivent-ils etre repris, reportes ou exclus ?
- les preferences dashboard Base44 doivent-elles etre persistantes en Alpha ?
- les renommages `templates` -> `modeles-horaires` et `onboarding` -> `mise-en-route` doivent-ils concerner routes, dossiers, composants, API ou seulement libelles ?
- le module `Privacy` reste-t-il dans le plan de reprise page par page ou dans un bloc RGPD/qualite separe ?

## 18. Preuve qu'aucun code n'a ete modifie

Preuve attendue apres controles finaux :

- `git diff --name-only -- app lib prisma package.json package-lock.json` doit rester vide.
- `git status --short` ne doit lister que les fichiers documentaires de session nouvellement crees ou modifies.

Resultat final consigne dans la section 20.

## 19. git status --short

Resultat initial :

```text
SORTIE VIDE
```

Resultat final `git status --short` :

```text
?? docs/2-SESSIONS/1-ALPHA/
```

Detail final `git status --short --untracked-files=all` :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/PATCH/NO_PATCH.md
```

## 20. Controles finaux

Commandes finales executees :

```powershell
git status --short
git status --short --untracked-files=all
git diff --name-only -- app lib prisma package.json package-lock.json
Get-ChildItem -Path docs\1-MASTER -Force
Get-ChildItem -Path docs\2-SESSIONS -Force
Get-ChildItem -Path docs\3-TEMPLATES -Force
Get-ChildItem -Path docs\1-MASTER\4-BASE44_REFERENCE -Force
Get-ChildItem -Path docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-01_A1_P1-01 -Recurse -Force | Select-Object FullName,Length
Controle BOM UTF-8 via lecture des trois premiers octets des Markdown de session et de PATCH/NO_PATCH.md
Controle absence des quatre marqueurs d'encodage demandes via Select-String sur les Markdown de session et PATCH/NO_PATCH.md
```

Resultats :

- structure `docs/1-MASTER` : OUI, structure prouvee.
- structure `docs/2-SESSIONS` : OUI, structure prouvee.
- structure `docs/3-TEMPLATES` : OUI, structure prouvee.
- presence `docs/1-MASTER/4-BASE44_REFERENCE` : OUI, presence prouvee.
- UTF-8 sans BOM des fichiers Markdown crees/modifies : OUI, `BOM=False` pour les quatre fichiers de session.
- absence des quatre marqueurs d'encodage demandes dans les fichiers Markdown crees/modifies : OUI, sortie vide au controle final.
- absence modification code : OUI, `git diff --name-only -- app lib prisma package.json package-lock.json` retourne une sortie vide.

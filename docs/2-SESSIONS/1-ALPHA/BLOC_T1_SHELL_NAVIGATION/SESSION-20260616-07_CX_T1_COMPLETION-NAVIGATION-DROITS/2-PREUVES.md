# 2 - Preuves

## 1. Fichiers lus

- `C:/Users/arche/.codex/attachments/443ba0ed-a463-4f16-89e8-83f870dc64a5/pasted-text.txt`
- `C:/Users/arche/.codex/plugins/cache/openai-curated-remote/vercel/0.21.2/skills/nextjs/SKILL.md`
- `C:/Users/arche/.codex/plugins/cache/openai-bundled/browser/26.609.71450/skills/control-in-app-browser/SKILL.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `create_session.ps1`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-06_CX_T1_CREATION-ACCES-REFUSE/2-PREUVES.md`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/dashboard/page.tsx`
- `app/users/page.tsx`
- `app/depots/page.tsx`
- `app/company/page.tsx`
- `app/onboarding/page.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `proxy.ts`
- `prisma/seed.ts`

## 2. Fichiers utilises comme reference

- `05-BLOCS_SESSIONS_PRODUCTION.md` : T1 inclut filtrage visible par droits et dependance T4 pour permissions fines.
- Audit T1 precedent : liste attendue shell et reserve sur matrice module-permission exhaustive.
- Session renommage : libelles `Tableau de bord` et `Depots / Bases` a conserver.
- Session acces refuse : acces direct non autorise rendu par `AccessDeniedState`.
- `lib/permission-catalog.ts` : permissions dashboard existantes `DASHBOARD_ADMIN_ACCESS` et `DASHBOARD_TERRAIN_ACCESS`.
- `lib/permissions.ts` : helpers existants `canAccessAdminDashboard` et `canAccessTerrainDashboard`.
- `app/dashboard/page.tsx` : la page dashboard utilise deja ces helpers et affiche les liens module selon les memes droits.

## 3. Audit navigation actuelle

Avant correction, `app/layout.tsx` ajoutait toujours :

- `/dashboard` : `Tableau de bord`, sans condition de droit.

Puis ajout conditionnel :

- `/planning` : `Planning`, si session societe et `canViewSelfPlanning` ou `canViewGlobalPlanning`.
- `/users` : `Utilisateurs / RH`, si session societe et `canManageUsers`.
- `/vehicles` : `Vehicules`, si session societe et `canManageVehicles`.
- `/templates` : `Modeles horaires`, si session societe et `canManageTemplates`.
- `/company` : `Societe`, si session societe et profil ADMIN/GERANT ou `canManageCompanyRules`.
- `/depots` : `Depots / Bases`, si session societe et profil ADMIN/GERANT.
- `/onboarding` : `Mise en route`, si session societe et profil ADMIN/GERANT.
- `/audit` : `Audit`, si session societe ou support, et `canViewAudit`.

Routes ciblees verifiees par `Test-Path` :

- `app/dashboard/page.tsx` : `True`
- `app/planning/page.tsx` : `True`
- `app/users/page.tsx` : `True`
- `app/vehicles/page.tsx` : `True`
- `app/templates/page.tsx` : `True`
- `app/company/page.tsx` : `True`
- `app/depots/page.tsx` : `True`
- `app/onboarding/page.tsx` : `True`
- `app/audit/page.tsx` : `True`

## 4. Decision retenue

Les droits existants suffisent pour une completion minimale prouvee du lien dashboard.

Decision appliquee :

- Ne pas creer de matrice RBAC complete.
- Ne pas inventer de permission module nouvelle.
- Integrer les helpers existants `canAccessAdminDashboard` et `canAccessTerrainDashboard` dans `app/layout.tsx`.
- Afficher `Tableau de bord` si un droit dashboard dedie existe ou si au moins un module visible est deja autorise par les droits existants.

Mention obligatoire :

`MATRICE MODULE-PERMISSION NON STABILISEE - COMPLETION LIMITEE AUX DROITS DISPONIBLES`

## 5. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/PATCH/PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff`

## 6. Fichiers modifies

- `app/layout.tsx`
- Fichiers de session courante listes ci-dessus.

## 7. Fichiers supprimes

Aucun.

## 8. Fichiers deplaces ou renommes

Aucun.

## 9. Commandes executees

- `git status --short`
- `rg --files`
- `Get-Content -LiteralPath ...pasted-text.txt`
- `Get-Content -LiteralPath ...nextjs/SKILL.md`
- `Get-Content -LiteralPath docs\1-MASTER\03-METHODE_DE_TRAVAIL.md`
- `Get-Content -LiteralPath docs\1-MASTER\02-DOCUMENT_MAITRE_PROJET.md`
- `Get-Content -LiteralPath docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md`
- `Get-ChildItem -LiteralPath docs\2-SESSIONS\1-ALPHA\BLOC_T1_SHELL_NAVIGATION -Directory`
- `Get-Content -LiteralPath create_session.ps1`
- `.\create_session.ps1 -Stage 1-ALPHA -Block T1 -SessionCode 'COMPLETION-NAVIGATION-DROITS' -Type 'CX+COMPLETION' -Title 'Completion navigation visible selon droits disponibles'`
- `Get-Content -LiteralPath app\app-shell.tsx`
- `Get-Content -LiteralPath app\layout.tsx`
- `Get-Content -LiteralPath lib\permissions.ts`
- `Get-Content -LiteralPath lib\rbac.ts`
- `Get-Content -LiteralPath lib\permission-catalog.ts`
- `Get-Content -LiteralPath proxy.ts`
- `Get-Content -LiteralPath` sur les preuves des sessions T1 precedentes.
- `rg -n "canAccess|AccessDenied|access-denied|canManage|requireRole|canView|DASHBOARD|Acc.s refus|Acces refus|dashboard|navLinks" app lib -g '!docs/**'`
- `Get-Content -LiteralPath app\dashboard\page.tsx`
- `Get-Content -LiteralPath prisma\seed.ts`
- `Get-Content -LiteralPath app\users\page.tsx`
- `Get-Content -LiteralPath app\depots\page.tsx`
- `Get-Content -LiteralPath app\company\page.tsx`
- `Get-Content -LiteralPath app\onboarding\page.tsx`
- `git diff -- app\layout.tsx`
- `git diff --name-only`
- `rg -n "const navLinks|dashboardNavAllowed|planningAllowed|usersNavAllowed|vehiclesNavAllowed|templatesNavAllowed|companyNavAllowed|depotsNavAllowed|onboardingNavAllowed|auditNavAllowed|href:|label:" app\layout.tsx`
- `Test-Path` sur les routes sidebar.
- `git diff -- docs\1-MASTER\4-BASE44_REFERENCE docs\1-MASTER\1-MAQUETTE docs\3-TEMPLATES create_session.ps1 docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md prisma lib\permission-catalog.ts lib\permissions.ts lib\rbac.ts app\dashboard\page.tsx app\planning\page.tsx app\users\page.tsx app\vehicles\page.tsx app\templates\page.tsx app\company\page.tsx app\depots\page.tsx app\onboarding\page.tsx app\audit\page.tsx`
- `npm run lint`
- `npm run build`
- `Get-Content -LiteralPath ...browser...SKILL.md`
- `Invoke-WebRequest -UseBasicParsing http://localhost:3000/login -TimeoutSec 10`
- `Get-Process -Name node -ErrorAction SilentlyContinue`
- Controles navigateur integre via Browser sur `http://localhost:3000/login`.
- `git diff --output=...PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff -- app\layout.tsx`
- `git apply --reverse --check ...PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff`

## 10. Resultats des commandes

- `git status --short` initial : aucune sortie.
- Session creee : `SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS`.
- `git diff --name-only` apres patch applicatif : `app/layout.tsx`.
- `git diff -- app\layout.tsx` : diff limite a la navigation shell dans `getAppShellData`.
- `rg` post-correction : `dashboardNavAllowed` et boolens `*NavAllowed` presents; libelles conserves.
- `Test-Path` routes sidebar : neuf valeurs `True`.
- Controle perimetre interdit par `git diff -- ...` : aucune sortie.
- Patch genere : `PATCH/PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff`.
- `git apply --reverse --check` sur patch : code 0, aucune erreur.

## 11. Diff applicatif resume

`app/layout.tsx` :

- Ajout imports `canAccessAdminDashboard` et `canAccessTerrainDashboard`.
- `navLinks` n'est plus initialise avec `/dashboard` inconditionnel.
- Ajout des controles `adminDashboardAllowed` et `terrainDashboardAllowed`.
- Factorisation des conditions existantes en boolens `planningAllowed`, `usersNavAllowed`, `vehiclesNavAllowed`, `templatesNavAllowed`, `companyNavAllowed`, `depotsNavAllowed`, `onboardingNavAllowed`, `auditNavAllowed`.
- Ajout `dashboardNavAllowed` : dashboard visible si droit dashboard dedie ou au moins un module visible autorise.
- Aucun changement de route technique.
- Aucun ajout `Suivi des vehicules`.

## 12. Controle build/lint

### `npm run lint`

Resultat : echec.

Erreurs bloquantes dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`, notamment :

- `src/components/auth/LoginForm.jsx`
- `src/components/dashboard/DashboardCustomizeDialog.jsx`
- `src/components/depots/DepotFormDialog.jsx`
- `src/components/modeles/TemplateFormDialog.jsx`
- `src/components/planning/AssignmentFormDialog.jsx`
- `src/components/ui/sidebar.jsx`
- `src/lib/AuthContext.jsx`
- `tailwind.config.js`

Warnings preexistants dans `app/planning/planning-client.tsx`.

Le fichier modifie `app/layout.tsx` n'est pas cite en erreur.

Verdict : echec couvert par l'exception documentaire Base44 officielle.

### `npm run build`

Resultat : echec.

Erreur :

`docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts:1:41`

Message :

`Cannot find module 'npm:@base44/sdk@0.8.31' or its corresponding type declarations.`

Le fichier modifie `app/layout.tsx` n'est pas cite.

Verdict : echec couvert par l'exception documentaire Base44 officielle.

## 13. Controle navigateur

Serveur local :

- `Invoke-WebRequest http://localhost:3000/login` : `200`.
- Serveur existant utilise sur `http://localhost:3000`.

Admin seed :

- Utilisateur : `admin@ambulance.local`.
- Mot de passe seed : `admin123`.
- URL apres connexion : `http://localhost:3000/dashboard`.
- Navigation visible :
  - `/dashboard` : `Tableau de bord`
  - `/planning` : `Planning`
  - `/users` : `Utilisateurs / RH`
  - `/vehicles` : `Vehicules`
  - `/templates` : `Modeles horaires`
  - `/company` : `Societe`
  - `/depots` : `Depots / Bases`
  - `/onboarding` : `Mise en route`
  - `/audit` : `Audit`
- `Suivi des vehicules` absent.
- Deconnexion : bouton visible et retour `/login`.

Viewer seed :

- Utilisateur : `viewer@ambulance.local`.
- Mot de passe seed : `user123`.
- URL apres connexion : `http://localhost:3000/dashboard`.
- Sidebar : aucun lien, message `Aucun module disponible.`
- Dashboard : `Aucun acces module exploitable`.
- `Suivi des vehicules` absent.
- Acces direct `/users` :
  - URL : `http://localhost:3000/users`
  - `Acces refuse` rendu.
  - Lien `Retour au tableau de bord` present.
  - `Creer un utilisateur` absent.

## 14. Controle perimetre

Respecte :

- Aucun fichier Base44 modifie.
- Aucune maquette/PNG modifiee.
- Aucun template modifie.
- `create_session.ps1` non modifie.
- `04-PLAN_DE_DEVELOPPEMENT.md` non modifie.
- `05-BLOCS_SESSIONS_PRODUCTION.md` non modifie.
- Aucun fichier Prisma modifie.
- Aucun fichier `lib/permissions.ts`, `lib/rbac.ts` ou `lib/permission-catalog.ts` modifie.
- Aucune page metier modifiee.
- Aucune route technique renommee.
- Aucun module ajoute.
- Aucune matrice RBAC complete creee.

## 15. Informations non fournies / reports T4-RBAC

- MATRICE MODULE-PERMISSION NON STABILISEE - COMPLETION LIMITEE AUX DROITS DISPONIBLES.
- Granularite finale module-permission a traiter en T4/RBAC.
- Politique definitive du dashboard pour un utilisateur connecte sans module visible : INFORMATION NON FOURNIE - A CONFIRMER.
- Validation exhaustive de tous les profils et routes directes reportee a `CX_T1_VALIDATION-SHELL-NAVIGATION`.

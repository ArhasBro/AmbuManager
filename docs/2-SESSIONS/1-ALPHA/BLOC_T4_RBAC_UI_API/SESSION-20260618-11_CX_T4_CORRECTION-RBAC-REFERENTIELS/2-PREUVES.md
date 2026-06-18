# 2 - Preuves

## 1. Fichiers lus

### Gouvernance et sessions

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/3-FIN_DE_SESSION.md`

### MASTER actifs lus

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

### Code relu pour cadrage et verification

- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`
- `app/users/user-archive-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-absence-client.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`

## 2. Fichiers utilises comme reference

- `docs/2-SESSIONS/README_SESSIONS.md` pour les regles de session.
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md` pour la structure.
- `docs/1-MASTER/01-APPLICATION_WEB.md` pour le cadrage produit.
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md` pour l'etat du projet et les regles globales.
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md` pour les regles de preuve, patch et controle.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` pour l'ordre de reprise.
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` pour le bloc T4 et les sessions futures.
- La session `09_DX_T4_AUDIT-MATRICE-RBAC` pour la matrice RBAC deja documentee.
- La session `10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES` pour le cadrage T4 deja fige.

## 3. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/PATCH/001-rbac-depots.diff`

## 4. Fichiers modifies

### Code applicatif

- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/depots/page.tsx`

### Documents de session

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`

## 5. Fichiers supprimes

- Aucun.

## 6. Fichiers deplaces ou renommes

- Aucun.

## 7. Dossiers explicitement non modifies

- `app/api/users/**`
- `app/users/**`
- `app/api/company/**`
- `app/company/**`
- `app/api/vehicles/**`
- `app/vehicles/**`
- `app/planning/**`
- `app/dashboard/**`
- `lib/rbac.ts`
- `docs/1-MASTER/**`
- `prisma/**`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `create_session.ps1`
- les sessions precedentes du bloc T4
- les autres blocs de `docs/2-SESSIONS`

## 8. Commandes executees

- `git status --short`
- `Get-ChildItem -Name 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API'`
- `Get-Content -Raw 'docs\2-SESSIONS\README_SESSIONS.md'`
- `Get-Content -Raw 'docs\3-TEMPLATES\TEMPLATE_SESSION_CODEX.md'`
- `Get-Content -Raw 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API\SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC\1-SESSION.md'`
- `Get-Content -Raw 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API\SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC\2-PREUVES.md'`
- `Get-Content -Raw 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API\SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC\3-FIN_DE_SESSION.md'`
- `Get-Content -Raw 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API\SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES\1-SESSION.md'`
- `Get-Content -Raw 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API\SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES\2-PREUVES.md'`
- `Get-Content -Raw 'docs\2-SESSIONS\1-ALPHA\BLOC_T4_RBAC_UI_API\SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES\3-FIN_DE_SESSION.md'`
- `Get-Content -Raw 'docs\1-MASTER\01-APPLICATION_WEB.md'`
- `Get-Content -Raw 'docs\1-MASTER\02-DOCUMENT_MAITRE_PROJET.md'`
- `Get-Content -Raw 'docs\1-MASTER\03-METHODE_DE_TRAVAIL.md'`
- `Get-Content -Raw 'docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md'`
- `Get-Content -Raw 'docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md'`
- `Get-Content -Raw 'lib\permission-catalog.ts'`
- `Get-Content -Raw 'lib\permissions.ts'`
- `Get-Content -Raw 'lib\rbac.ts'`
- `Get-Content -LiteralPath 'app\api\depots\route.ts' -Raw`
- `Get-Content -LiteralPath 'app\api\depots\[id]\route.ts' -Raw`
- `Get-Content -LiteralPath 'app\api\depots\[id]\archive\route.ts' -Raw`
- `Get-Content -Raw 'app\depots\page.tsx'`
- `Get-Content -Raw 'app\depots\depots-client.tsx'`
- `Get-Content -Raw 'app\users\page.tsx'`
- `Get-Content -Raw 'app\users\user-archive-client.tsx'`
- `Get-Content -Raw 'app\users\reset-password-client.tsx'`
- `Get-Content -Raw 'app\users\user-depot-assignment-client.tsx'`
- `Get-Content -Raw 'app\users\user-creation-client.tsx'`
- `Get-Content -Raw 'app\users\user-edit-client.tsx'`
- `Get-Content -Raw 'app\users\user-absence-client.tsx'`
- `Get-Content -Raw 'app\users\users-list-client.tsx'`
- `Get-Content -Raw 'app\users\users-side-panel-client.tsx'`
- `Get-Content -Raw 'app\api\company\profile\route.ts'`
- `Get-Content -Raw 'app\api\company\rules\route.ts'`
- `Get-Content -Raw 'app\company\page.tsx'`
- `Get-Content -Raw 'app\company\company-profile-form.tsx'`
- `Get-Content -Raw 'app\company\company-rules-panel.tsx'`
- `rg -n "DEPOTS_MANAGE|USERS_MANAGE|COMPANY_RULES_MANAGE|COMPANY_MANAGE|ROLES_PERMISSIONS_MANAGE|canManageDepots|canManageUsers|canManageCompanyRules|allowSupport" lib app\api app\depots app\users app\company`
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\create_session.ps1 -Stage 1-ALPHA -Block BLOC_T4_RBAC_UI_API -SessionCode CORRECTION-RBAC-REFERENTIELS -Type CX -Title "Correction RBAC referentiels"`
- `git diff --name-only`
- `git diff -- lib/permission-catalog.ts lib/permissions.ts app/api/depots/route.ts app/api/depots/[id]/route.ts app/api/depots/[id]/archive/route.ts app/depots/page.tsx`
- `npm run lint`
- `npx eslint lib/permission-catalog.ts lib/permissions.ts app/api/depots/route.ts app/api/depots/[id]/route.ts app/api/depots/[id]/archive/route.ts app/depots/page.tsx`
- `npm run build`
- `git status --short`

## 9. Resultats des commandes

- `git status --short` initial : sortie vide.
- Le listing du bloc `BLOC_T4_RBAC_UI_API` montrait bien les sessions `08`, `09` et `10` avant creation de la session courante.
- `create_session.ps1` a cree `SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS` dans `BLOC_T4_RBAC_UI_API` et le dossier `PATCH/`.
- `git diff --name-only` a liste uniquement les 6 fichiers code modifies :
  - `app/api/depots/[id]/archive/route.ts`
  - `app/api/depots/[id]/route.ts`
  - `app/api/depots/route.ts`
  - `app/depots/page.tsx`
  - `lib/permission-catalog.ts`
  - `lib/permissions.ts`
- Le diff montre :
  - ajout de `DEPOTS_MANAGE` dans le catalogue ;
  - ajout de `canManageDepots` dans `lib/permissions.ts` ;
  - remplacement des gates `requireRole(["ADMIN","GERANT"])` par `canManageDepots(...)` sur les 3 routes depots ;
  - remplacement du helper local role-only par `canManageDepots(...)` dans la page depots.
- `npx eslint` sur les fichiers modifies a reussi sans erreur ni warning.
- `npm run lint` a echoue sur des erreurs preexistantes hors perimetre dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/...` ; exemples observes :
  - `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/auth/LoginForm.jsx`
  - `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/dashboard/DashboardCustomizeDialog.jsx`
  - `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/Dashboard.jsx`
- `npm run build` a compile avec succes puis a echoue sur un type error preexistant hors perimetre dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts` :
  - module introuvable `npm:@base44/sdk@0.8.31`.
- `git status --short` final montre les fichiers code modifies et la session nouvelle non suivie.

## 10. Contrôles Git

- `git status --short` avant : vide.
- `git diff --name-only` : 6 fichiers code.
- `git diff -- <fichiers modifies>` : diff cible uniquement depots et permissions.
- `git status --short` apres : code modifie + dossier de session non suivi.

## 11. Contrôles techniques

- Le gate depots server-side est maintenant porte par `canManageDepots`.
- Les routes depots `POST`, `PATCH` et `POST /archive` sont alignees sur le meme gate.
- La page depots utilise le meme gate que le serveur.
- `DEPOTS_MANAGE` existe dans le catalogue de permissions.
- `ROLES_PERMISSIONS_MANAGE` reste dormant.
- Les surfaces users et societe ont ete relues mais pas modifiees.
- Aucun fichier vehicles, planning, dashboard, Prisma, package ou MASTER n'a ete modifie.

## 12. Contrôles d'encodage

- Aucun controle d'encodage dedie supplementaire n'a ete lance.
- Les fichiers de session ont ete crees par le script officiel puis modifies en texte plat.
- Aucun re-encodage hors perimetre n'a ete effectue.

## 13. Contrôles de périmètre

- La correction reste limitee aux referentiels users, societe et depots.
- Seul le sous-perimetre depots a necessite un changement de code.
- Les utilisateurs / RH et la societe ont ete verifies sans correction, car aucun ecart de la matrice T4 validee n'a ete prouve.
- Aucun fichier vehicles, planning ou dashboard n'a ete ouvert en correction.
- Aucun MASTER, Prisma, package ou script de session n'a ete modifie.

## 14. Limites / commandes non exécutées

- Aucun navigateur.
- Aucune capture.
- Aucun Playwright.
- Aucun `npm run dev`.
- Aucune commande Prisma.
- Aucun `npm install`.
- Aucune correction dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`.
- Aucun correctif sur users ou societe, car aucune incoherence n'a ete prouvee.

## 15. Informations non fournies

- `INFORMATION NON FOURNIE - A CONFIRMER` : niveau final de granularite future pour les permissions depots au-dela du gate T4 actuel.
- `INFORMATION NON FOURNIE - A CONFIRMER` : politique future eventuelle de lecture seule vs gestion pour les depots dans un bloc hors T4.

## 16. Preuves brutes complementaires

### 16.1 Git avant reprise documentaire

```text
 M app/api/depots/[id]/archive/route.ts
 M app/api/depots/[id]/route.ts
 M app/api/depots/route.ts
 M app/depots/page.tsx
 M lib/permission-catalog.ts
 M lib/permissions.ts
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/
```

```text
app/api/depots/[id]/archive/route.ts
app/api/depots/[id]/route.ts
app/api/depots/route.ts
app/depots/page.tsx
lib/permission-catalog.ts
lib/permissions.ts
```

### 16.2 ESLint cible

```text
EXITCODE=0
```

### 16.3 Echec npm run lint

```text
C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\auth\LoginForm.jsx
  124:59  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\dashboard\DashboardCustomizeDialog.jsx
  22:15  error  Error: Calling setState synchronously within an effect can trigger cascading renders
C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\depots\DepotFormDialog.jsx
  18:17  error  Error: Calling setState synchronously within an effect can trigger cascading renders
✖ 90 problems (48 errors, 42 warnings)
EXITCODE=1
```

### 16.4 Echec npm run build

```text
  Creating an optimized production build ...
✓ Compiled successfully in 17.0s
./docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts:1:41
Type error: Cannot find module 'npm:@base44/sdk@0.8.31' or its corresponding type declarations.
Next.js build worker exited with code: 1 and signal: null
EXITCODE=1
```

### 16.5 Preuve DEPOTS_MANAGE

```text
53:    code: "DEPOTS_MANAGE",
58:    code: "ROLES_PERMISSIONS_MANAGE",
```

```text
54:export async function canManageUsers(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
57:export async function canManageDepots(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
66:export async function canManageCompanyRules(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
```

```text
app/api/depots/[id]/archive/route.ts:7:import { canManageDepots } from "@/lib/permissions";
app/api/depots/[id]/archive/route.ts:35:  if (!(await canManageDepots(actorUserId, role, platformRole))) return forbidden();
app/depots/page.tsx:7:import { canManageDepots } from "@/lib/permissions";
app/depots/page.tsx:25:  if (!(await canManageDepots(user.id, user.role, user.platformRole))) {
app/api/depots/[id]/route.ts:7:import { canManageDepots } from "@/lib/permissions";
app/api/depots/[id]/route.ts:34:  if (!(await canManageDepots(actorUserId, role, platformRole))) return forbidden();
app/api/depots/route.ts:6:import { canManageDepots } from "@/lib/permissions";
app/api/depots/route.ts:29:  if (!(await canManageDepots(actorUserId, role, platformRole))) return forbidden();
```

`COMPANY_MANAGE`:

```text
EXITCODE=1
```

Aucune occurrence trouvee dans les fichiers cibles.

### 16.6 Users et societe

```text
lib/permission-catalog.ts:48:    code: "USERS_MANAGE",
lib/permission-catalog.ts:58:    code: "ROLES_PERMISSIONS_MANAGE",
lib/permission-catalog.ts:73:    code: "COMPANY_RULES_MANAGE"
lib/permissions.ts:55:  return hasPermissionAccess({ userId, role, platformRole, codes: ["USERS_MANAGE"] });
lib/permissions.ts:67:  return hasPermissionAccess({ userId, role, platformRole, codes: ["COMPANY_RULES_MANAGE"] });
app/api/users/[id]/reset-password/route.ts:48:  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();
app/api/users/[id]/archive/route.ts:26:  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();
app/api/users/[id]/depot/route.ts:35:  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();
app/users/page.tsx:26:  if (!(await canManageUsers(user.id, user.role, user.platformRole))) {
app/api/company/rules/route.ts:91:  if (!(await canManageCompanyRules(userId, role, platformRole))) {
app/company/page.tsx:33:  const canManageRules = await canManageCompanyRules(user.id, user.role, user.platformRole);
```

### 16.7 Git final

```text
 M app/api/depots/[id]/archive/route.ts
 M app/api/depots/[id]/route.ts
 M app/api/depots/route.ts
 M app/depots/page.tsx
 M lib/permission-catalog.ts
 M lib/permissions.ts
 ?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/
```

Le statut final reste identique parce que la reprise documentaire est contenue dans un dossier deja non suivi.

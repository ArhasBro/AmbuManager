# 2 - Preuves

## 1. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `app/layout.tsx`
- `app/app-shell.tsx`

## 2. Fichiers utilises comme reference

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` : session CX T1 prevue pour corriger uniquement les libelles visibles de navigation.
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/3-FIN_DE_SESSION.md` : ecarts `Dashboard` et `Depots / bases`; `Suivi des vehicules`, `/templates`, `/onboarding`, RBAC et `Acces refuse` hors perimetre.
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md` : navigation attendue avec `Tableau de bord` et `Depots / Bases`; `Suivi des vehicules` conditionnel.
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md` : titre valide `Tableau de bord`.
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md` : intitule valide `Depots / Bases`.

## 3. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/PATCH/PATCH__SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION.diff`

## 4. Fichiers modifies

- `app/layout.tsx`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`

## 5. Diff / remplacements textuels

Diff applicatif :

```diff
-  const navLinks: AppShellNavLink[] = [{ href: "/dashboard", label: "Dashboard" }];
+  const navLinks: AppShellNavLink[] = [{ href: "/dashboard", label: "Tableau de bord" }];

-  if (companyScopedSession && companyProfileAllowed) navLinks.push({ href: "/depots", label: "Dépôts / bases" });
+  if (companyScopedSession && companyProfileAllowed) navLinks.push({ href: "/depots", label: "Dépôts / Bases" });
```

Routes conservees :

- `/dashboard`
- `/depots`
- `/templates`
- `/onboarding`

## 6. Fichiers supprimes

Aucun.

## 7. Fichiers deplaces ou renommes

Aucun.

## 8. Commandes executees

- `Get-ChildItem -Force`
- `rg --files`
- `git status --short`
- `Get-Content -Raw -Encoding UTF8 create_session.ps1`
- `Get-Content -Raw -Encoding UTF8 docs\2-SESSIONS\README_SESSIONS.md`
- `Get-Content -Raw -Encoding UTF8 docs\3-TEMPLATES\TEMPLATE_SESSION_CODEX.md`
- `Get-Content -Raw -Encoding UTF8 docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md`
- `.\create_session.ps1 -Stage 1-ALPHA -Block T1 -SessionCode RENOMMAGE-LIBELLES-NAVIGATION -Type CX -Title "Renommage libellés navigation"`
- `Get-Content -Raw -Encoding UTF8 docs\2-SESSIONS\1-ALPHA\BLOC_T1_SHELL_NAVIGATION\SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION\1-SESSION.md`
- `Get-Content -Raw -Encoding UTF8 docs\2-SESSIONS\1-ALPHA\BLOC_T1_SHELL_NAVIGATION\SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION\2-PREUVES.md`
- `Get-Content -Raw -Encoding UTF8 docs\2-SESSIONS\1-ALPHA\BLOC_T1_SHELL_NAVIGATION\SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION\3-FIN_DE_SESSION.md`
- `Get-Content -Raw -Encoding UTF8 docs\1-MASTER\2-REFERENCE_UI_UX\0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `Get-Content -Raw -Encoding UTF8 docs\1-MASTER\2-REFERENCE_UI_UX\2-REFERENCE_UI_UX_DASHBOARD.md`
- `Get-Content -Raw -Encoding UTF8 docs\1-MASTER\2-REFERENCE_UI_UX\7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `Get-Content -Raw -Encoding UTF8 app\layout.tsx`
- `Get-Content -Raw -Encoding UTF8 app\app-shell.tsx`
- `rg -n "Dashboard|Dépôts / bases|Depots / bases|Dépôts / Bases|Tableau de bord|href:|label:" app\layout.tsx app\app-shell.tsx`
- `rg -n "Dashboard|Dépôts / bases|Depots / bases" app`
- `git diff --name-only`
- `git diff -- app\layout.tsx`
- `rg -n "href:|label:" app\layout.tsx`
- `rg -n "Dashboard|Dépôts / bases|Depots / bases|Tableau de bord|Dépôts / Bases" app\layout.tsx app\app-shell.tsx`
- `git diff -- lib\permissions.ts lib\rbac.ts prisma package.json package-lock.json create_session.ps1 docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md docs\3-TEMPLATES`
- `npm run build`
- `npm run lint`
- `git apply --reverse --check "docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/PATCH/PATCH__SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION.diff"`
- controle UTF-8 sans BOM des fichiers de session et du patch
- recherche `rg` des quatre sequences suspectes demandees sur `app/layout.tsx` et le dossier de session

## 9. Resultats des commandes

- Creation de session : OK, `SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION`.
- Occurrences confirmees dans `app/layout.tsx` avant correction :
  - `href: "/dashboard", label: "Dashboard"`
  - `href: "/depots", label: "Dépôts / bases"`
- Occurrences apres correction :
  - `href: "/dashboard", label: "Tableau de bord"`
  - `href: "/depots", label: "Dépôts / Bases"`
- Recherche post-correction dans `app/layout.tsx` et `app/app-shell.tsx` :
  - `Dashboard` ne subsiste que comme identifiant technique/import `LayoutDashboard`.
  - `Dépôts / bases` ne subsiste plus dans la navigation shell.
- `npm run lint` : echec non lie a `app/layout.tsx`; erreurs existantes dans l'export Base44 sous `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44` et avertissements existants dans `app/planning/planning-client.tsx`.
- `git apply --reverse --check ...PATCH__SESSION...diff` : aucune sortie, code 0; le patch correspond a l'etat applique.
- Recherche des sequences suspectes : aucune sortie, code 1 attendu pour absence de correspondance.

## 9.1. Controle obligatoire `npm run build`

Commande exacte :

```powershell
npm run build
```

Sortie complete utile :

```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 14.5s
  Running TypeScript ...
Failed to compile.

./docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts:1:41
Type error: Cannot find module 'npm:@base44/sdk@0.8.31' or its corresponding type declarations.

> 1 | import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
    |                                         ^
  2 |
  3 | Deno.serve(async (req) => {
  4 |   const base44 = createClientFromRequest(req);
Next.js build worker exited with code: 1 and signal: null
```

Fichier concerne :

- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts`

Analyse :

- `app/layout.tsx` n'est pas cite par l'echec.
- Le fichier en erreur est dans Base44 reference export, explicitement hors perimetre et non modifie.
- Le controle de perimetre `git diff -- docs\1-MASTER\4-BASE44_REFERENCE` ne produit aucune sortie.
- L'echec est donc preexistant au patch de cette session, ou a minima hors modification de cette session.
- Aucune correction n'a ete faite, car corriger Base44 reference export serait hors perimetre strict.

Verdict build :

- `npm run build` : ECHEC.
- La session reste non validable selon la regle projet confirmee.

## 9.2. Controle obligatoire `npm run lint`

Commande exacte :

```powershell
npm run lint
```

Sortie complete utile :

```text
> ambulance-manager@0.1.0 lint
> eslint .

C:\Users\arche\ambulance-manager\app\planning\planning-client.tsx
   597:3   warning  'canManageCompanyMode' is defined but never used                 @typescript-eslint/no-unused-vars
   601:21  warning  'setWeekStart' is assigned a value but never used                @typescript-eslint/no-unused-vars
   608:26  warning  'setSelectedUserId' is assigned a value but never used           @typescript-eslint/no-unused-vars
   615:10  warning  'companyRuleLoaded' is assigned a value but never used           @typescript-eslint/no-unused-vars
   616:10  warning  'saving' is assigned a value but never used                      @typescript-eslint/no-unused-vars
   621:26  warning  'setAssignmentMode' is assigned a value but never used           @typescript-eslint/no-unused-vars
   649:10  warning  'listsError' is assigned a value but never used                  @typescript-eslint/no-unused-vars
   659:35  warning  'setSelectedMatchingVariant' is assigned a value but never used  @typescript-eslint/no-unused-vars
   726:9   warning  'selectedBinomeUser' is assigned a value but never used          @typescript-eslint/no-unused-vars
  1095:9   warning  'saveCompanyMode' is assigned a value but never used             @typescript-eslint/no-unused-vars
  1178:9   warning  'generateWeek' is assigned a value but never used                @typescript-eslint/no-unused-vars
  1289:9   warning  'previewMatch' is assigned a value but never used                @typescript-eslint/no-unused-vars
  1369:9   warning  'applyMatch' is assigned a value but never used                  @typescript-eslint/no-unused-vars
  1460:9   warning  'publishLastRun' is assigned a value but never used              @typescript-eslint/no-unused-vars
  1581:9   warning  'cancelLastRun' is assigned a value but never used               @typescript-eslint/no-unused-vars
  1767:9   warning  'publishDisabled' is assigned a value but never used             @typescript-eslint/no-unused-vars
  1776:9   warning  'matchDisabled' is assigned a value but never used               @typescript-eslint/no-unused-vars
  1797:9   warning  'applyBlocked' is assigned a value but never used                @typescript-eslint/no-unused-vars

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\auth\LoginForm.jsx
  124:59  error  apostrophe can be escaped  react/no-unescaped-entities

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\dashboard\DashboardCustomizeDialog.jsx
  22:15  error  Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect
  37:61  error  quote can be escaped  react/no-unescaped-entities
  37:83  error  quote can be escaped  react/no-unescaped-entities

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\depots\DepotFormDialog.jsx
  18:17  error  Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\modeles\TemplateFormDialog.jsx
  30:7   error  Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect
  120:67 error  apostrophe can be escaped  react/no-unescaped-entities

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\planning\AssignmentFormDialog.jsx
  22:7   error  Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect
  141:64 error  apostrophe can be escaped  react/no-unescaped-entities
  154:41 error  apostrophe can be escaped  react/no-unescaped-entities

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\components\ui\sidebar.jsx
  536:26 error  Cannot call impure function during render  react-hooks/purity

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\src\lib\AuthContext.jsx
  18:5 error  Cannot access variable before it is declared  react-hooks/immutability

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\tailwind.config.js
  94:13 error  A require style import is forbidden  @typescript-eslint/no-require-imports

Autres erreurs de meme nature signalees dans Base44 reference export.

✖ 90 problems (48 errors, 42 warnings)
```

Fichiers concernes :

- `app/planning/planning-client.tsx` : warnings preexistants, hors modification de cette session.
- nombreux fichiers sous `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/` : erreurs lint, hors perimetre et non modifies.

Analyse :

- `app/layout.tsx` n'est pas cite par la sortie lint.
- Le controle de perimetre `git diff -- docs\1-MASTER\4-BASE44_REFERENCE app\planning\planning-client.tsx` ne produit aucune sortie.
- Les erreurs lint sont donc preexistantes au patch de cette session, ou a minima hors modification de cette session.
- Aucune correction n'a ete faite car elle toucherait Base44 reference export ou planning, hors perimetre strict.

Verdict lint :

- `npm run lint` : ECHEC.
- Aucune decision projet explicite d'accepter temporairement le lint global casse n'a ete donnee.
- La session reste non validable selon la regle projet confirmee.

## 10. Controles Git

- `git diff --name-only` apres modification applicative :
  - `app/layout.tsx`
  - avertissement Git : `LF will be replaced by CRLF the next time Git touches it`
- `git diff -- app\layout.tsx` :
  - diff limite a deux lignes `label`.
- `git status --short` avant documentation finale :
  - ` M app/layout.tsx`
  - `?? docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/`
- `git diff --name-only` final :
  - `app/layout.tsx`
  - les fichiers de session sont non suivis et donc visibles via `git status --short`, pas via `git diff --name-only`.
- `git status --short` final :
  - ` M app/layout.tsx`
  - `?? docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/`

## 11. Controles techniques

### Routes techniques

Preuve par `rg -n "href:|label:" app\layout.tsx` :

- `/dashboard` conserve.
- `/planning` conserve.
- `/users` conserve.
- `/vehicles` conserve.
- `/templates` conserve.
- `/company` conserve.
- `/depots` conserve.
- `/onboarding` conserve.
- `/audit` conserve.

Aucune route technique renommee.

### Entrees de navigation

Preuve par `rg -n "href:|label:" app\layout.tsx` :

- Meme liste de 9 entrees codees.
- Aucun `navLinks.push` ajoute.
- Aucun `navLinks.push` supprime.
- Seuls deux textes `label` modifies.

### RBAC

Preuve par diff :

- Aucun changement dans les conditions `companyScopedSession`, `companyProfileAllowed`, `planningSelfAllowed`, `planningGlobalAllowed`, `usersAllowed`, `vehiclesAllowed`, `templatesAllowed`, `companyRulesAllowed`, `auditAllowed`.
- `git diff -- lib\permissions.ts lib\rbac.ts ...` : aucune sortie.

## 12. Controles d'encodage

Controle final UTF-8 sans BOM :

- `1-SESSION.md` : `UTF8_OK`, `BOM=False`
- `2-PREUVES.md` : `UTF8_OK`, `BOM=False`
- `3-FIN_DE_SESSION.md` : `UTF8_OK`, `BOM=False`
- `PATCH/README_PATCH.md` : `UTF8_OK`, `BOM=False`
- `PATCH/PATCH__SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION.diff` : `UTF8_OK`, `BOM=False`

Controle absence des sequences suspectes sur `app/layout.tsx` et le dossier de session : aucune sortie.

## 13. Controles de perimetre

- Aucun fichier `prisma/` modifie.
- Aucun `lib/permissions.ts` modifie.
- Aucun `lib/rbac.ts` modifie.
- Aucun `package.json` ni `package-lock.json` modifie.
- Aucun fichier Base44 modifie.
- Aucun PNG ni maquette modifie.
- Aucun fichier `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` modifie.
- Aucun fichier `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` modifie.
- Aucun fichier `docs/3-TEMPLATES/` modifie.
- `create_session.ps1` lu mais non modifie.

## 14. Limites / commandes non executees

- Aucun controle navigateur lance : correction textuelle minimale, aucun changement de comportement ni layout.
- `npm run build` execute mais non passant a cause d'une erreur TypeScript hors perimetre dans Base44 reference export.
- `npm run lint` execute mais non passant a cause d'erreurs hors perimetre dans Base44 reference export et d'avertissements preexistants.
- Aucun controle navigateur lance; il ne remplace pas build/lint.

## 15. Informations non fournies

- Validation metier de `Suivi des vehicules` : hors perimetre.
- Decision de renommage technique `/templates` et `/onboarding` : hors perimetre.
- Validation RBAC complete : hors perimetre.

## 16. Exception Base44 documentaire

Exception Base44 appliquée : `npm run build` et `npm run lint` échouent sur le dépôt global à cause du référentiel documentaire Base44 situé dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`. Aucun fichier Base44 n'a été modifié. Le patch CX ne touche que `app/layout.tsx` et les erreurs ne concernent pas ce fichier.

Décision de gouvernance liée :

- `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-04_DX_T7_GOUVERNANCE-EXCEPTION-BASE44-BUILD-LINT/`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`, section 13.1.

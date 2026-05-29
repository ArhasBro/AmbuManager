# EVIDENCES — DEV-V2-01-05 (correction finale)

Sorties terminales complètes recopiées ci-dessous.

## Commande
```powershell
git status --short --untracked-files=all
```
Sortie :
```text
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md
 M docs/2-SESSIONS/README_SESSIONS.md
 M docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md
```

## Commande
```powershell
npm run docs:encoding
```
Sortie :
```text

> ambulance-manager@0.1.0 docs:encoding
> node scripts/check-doc-encoding.mjs

Documentation encoding guard passed.
Checked files: 46
UTF-8 strict: OK
UTF-8 without BOM: OK
No active mojibake sequence found.
```

## Commande
```powershell
npm run lint
```
Sortie :
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

✖ 18 problems (0 errors, 18 warnings)
```

## Commande
```powershell
npm run build
```
Sortie :
```text

> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 7.1s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 417.9ms
  Finalizing page optimization ...

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/audit
├ ƒ /api/auth/[...nextauth]
├ ƒ /api/company/profile
├ ƒ /api/company/rules
├ ƒ /api/depots
├ ƒ /api/depots/[id]
├ ƒ /api/depots/[id]/archive
├ ƒ /api/health/prisma
├ ƒ /api/imports
├ ƒ /api/planning/autoschedule/day
├ ƒ /api/planning/autoschedule/runs
├ ƒ /api/planning/autoschedule/runs/[id]
├ ƒ /api/planning/autoschedule/runs/[id]/cancel
├ ƒ /api/planning/autoschedule/runs/[id]/match
├ ƒ /api/planning/autoschedule/runs/[id]/match/apply
├ ƒ /api/planning/autoschedule/runs/[id]/match/preview
├ ƒ /api/planning/autoschedule/runs/[id]/publish
├ ƒ /api/planning/autoschedule/week
├ ƒ /api/planning/exports
├ ƒ /api/planning/shifts
├ ƒ /api/planning/shifts/[id]
├ ƒ /api/planning/shifts/[id]/assign
├ ƒ /api/planning/shifts/[id]/cancel
├ ƒ /api/templates
├ ƒ /api/templates/[id]
├ ƒ /api/templates/[id]/archive
├ ƒ /api/users
├ ƒ /api/users/[id]
├ ƒ /api/users/[id]/absences
├ ƒ /api/users/[id]/absences/[absenceId]
├ ƒ /api/users/[id]/archive
├ ƒ /api/users/[id]/depot
├ ƒ /api/users/[id]/reset-password
├ ƒ /api/vehicles
├ ƒ /api/vehicles/[id]
├ ƒ /api/vehicles/[id]/archive
├ ƒ /api/vehicles/[id]/depot
├ ƒ /audit
├ ƒ /company
├ ƒ /dashboard
├ ƒ /depots
├ ƒ /login
├ ƒ /onboarding
├ ƒ /planning
├ ƒ /privacy
├ ƒ /templates
├ ƒ /users
└ ƒ /vehicles


ƒ Proxy (Middleware)

ƒ  (Dynamic)  server-rendered on demand
```

## Commande
```powershell
git worktree add --detach "C:\Users\arche\AppData\Local\Temp\am-dev-v2-01-05-proof-final2-20260529090234" 936c69fabe54f1a5b445aa6e74f66bbb644b1efa
```
Sortie :
```text
cmd.exe : Preparing worktree (detached HEAD 936c69f)
Au caractère Ligne:14 : 8
+   $out=cmd.exe /d /c $full 2>&1 | Out-String
+        ~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (Preparing workt...d HEAD 936c69f):String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Updating files:  53% (1102/2070)
Updating files:  54% (1118/2070)
Updating files:  55% (1139/2070)
Updating files:  56% (1160/2070)
Updating files:  57% (1180/2070)
Updating files:  58% (1201/2070)
Updating files:  59% (1222/2070)
Updating files:  60% (1242/2070)
Updating files:  61% (1263/2070)
Updating files:  62% (1284/2070)
Updating files:  63% (1305/2070)
Updating files:  64% (1325/2070)
Updating files:  65% (1346/2070)
Updating files:  66% (1367/2070)
Updating files:  67% (1387/2070)
Updating files:  68% (1408/2070)
Updating files:  69% (1429/2070)
Updating files:  70% (1449/2070)
Updating files:  71% (1470/2070)
Updating files:  72% (1491/2070)
Updating files:  73% (1512/2070)
Updating files:  74% (1532/2070)
Updating files:  75% (1553/2070)
Updating files:  76% (1574/2070)
Updating files:  77% (1594/2070)
Updating files:  78% (1615/2070)
Updating files:  79% (1636/2070)
Updating files:  80% (1656/2070)
Updating files:  81% (1677/2070)
Updating files:  82% (1698/2070)
Updating files:  83% (1719/2070)
Updating files:  84% (1739/2070)
Updating files:  85% (1760/2070)
Updating files:  86% (1781/2070)
Updating files:  87% (1801/2070)
Updating files:  88% (1822/2070)
Updating files:  89% (1843/2070)
Updating files:  90% (1863/2070)
Updating files:  91% (1884/2070)
Updating files:  92% (1905/2070)
Updating files:  93% (1926/2070)
Updating files:  94% (1946/2070)
Updating files:  95% (1967/2070)
Updating files:  96% (1988/2070)
Updating files:  97% (2008/2070)
Updating files:  98% (2029/2070)
Updating files:  99% (2050/2070)
Updating files: 100% (2070/2070)
Updating files: 100% (2070/2070), done.
HEAD is now at 936c69f update
```

## Commande
```powershell
git -C "C:\Users\arche\AppData\Local\Temp\am-dev-v2-01-05-proof-final2-20260529090234" apply --check "C:\Users\arche\ambulance-manager/docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH/DEV-V2-01-05-code.diff" && echo EXIT_CODE:0
```
Sortie :
```text
EXIT_CODE:0
```

## Commande
```powershell
git -C "C:\Users\arche\AppData\Local\Temp\am-dev-v2-01-05-proof-final2-20260529090234" apply "C:\Users\arche\ambulance-manager/docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH/DEV-V2-01-05-code.diff" && echo EXIT_CODE:0
```
Sortie :
```text
EXIT_CODE:0
```

## Commande
```powershell
git -C "C:\Users\arche\AppData\Local\Temp\am-dev-v2-01-05-proof-final2-20260529090234" apply --check "C:\Users\arche\ambulance-manager/docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH/DEV-V2-01-05_FIX-01-code.diff" && echo EXIT_CODE:0
```
Sortie :
```text
EXIT_CODE:0
```

## Commande
```powershell
git -C "C:\Users\arche\AppData\Local\Temp\am-dev-v2-01-05-proof-final2-20260529090234" status --short --untracked-files=all
```
Sortie :
```text
 M app/dashboard/page.tsx
 M app/layout.tsx
 M app/onboarding/onboarding-client.tsx
 M app/onboarding/page.tsx
 M app/templates/templates-client.tsx
```

## Commande
```powershell
git worktree remove --force "C:\Users\arche\AppData\Local\Temp\am-dev-v2-01-05-proof-final2-20260529090234"
```
Sortie :
```text
[aucune sortie]
```

## Commande
```powershell
git status --short --untracked-files=all docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH
```
Sortie :
```text
[aucune sortie]
```

## Commande
```powershell
dir /a docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH
```
Sortie :
```text
cmd.exe : Option non valide - "2-SESSIONS".
Au caractère Ligne:14 : 8
+   $out=cmd.exe /d /c $full 2>&1 | Out-String
+        ~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (Option non valide - "2-SESSIONS".:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
```

## Commande
```powershell
Contrôle mojibake Unicode (script interne)
```
Sortie :
```text
Unicode suspects contrôlés: U+00C3, U+00C2, séquence U+00E2 U+20AC, U+FFFD
docs/2-SESSIONS/README_SESSIONS.md => OK
docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md => OK
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md => OK
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/FIN_SESSION.md => OK
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/RESULTATS.md => OK
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/NOTES.md => OK
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md => OK
```

## Commande
```powershell
Contrôle des points d interrogation (U+003F)
```
Sortie :
```text
Contrôle caractère U+003F dans les fichiers ciblés (sans reprise des lignes):
docs/2-SESSIONS/README_SESSIONS.md => U+003F_COUNT=0
docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md => U+003F_COUNT=0
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md => U+003F_COUNT=0
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/FIN_SESSION.md => U+003F_COUNT=0
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/RESULTATS.md => U+003F_COUNT=0
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/NOTES.md => U+003F_COUNT=0
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md => U+003F_COUNT=0
```

## Commande
```powershell
Contrôle UTF-8 sans BOM et newline final
```
Sortie :
```text
UTF-8 sans BOM + newline final (fichiers modifiés):
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md => BOM=False ; FINAL_LF=True
docs/2-SESSIONS/README_SESSIONS.md => BOM=False ; FINAL_LF=True
docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md => BOM=False ; FINAL_LF=True
```

## Commande
```powershell
git status --short --untracked-files=all
```
Sortie :
```text
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md
 M docs/2-SESSIONS/README_SESSIONS.md
 M docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md
```


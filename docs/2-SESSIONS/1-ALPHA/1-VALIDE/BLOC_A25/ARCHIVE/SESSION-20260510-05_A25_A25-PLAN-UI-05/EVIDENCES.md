# EVIDENCES

Elements factuels utilises pendant la reprise corrective V2.

---

## Perimetre applique

- Aucun scan large du depot.
- Travail limite aux fichiers documentaires et patch de session listes par la consigne.
- Aucune modification de logique metier / API / Prisma / RBAC / autoschedule / matching.

## Verification encodage UTF-8 sans BOM

Fichiers verifies/reexportes en UTF-8 sans BOM :

- PATCH/PATCH__SESSION-20260510-05_A25_A25-PLAN-UI-05.diff
- PATCH/README_PATCH.md
- SESSION.md
- NOTES.md
- EVIDENCES.md
- RESULTATS.md
- FIN_SESSION.md
- LINT_OUTPUT.txt
- BUILD_OUTPUT.txt

Preuve des premiers octets du patch final :

- HEX: 64-69-66-66-20-2D-2D-67-69-74-20-61-2F-61-70-70
- Interprete: diff --git sans prefixe EF-BB-BF.

## Preuve reelle git apply --check

Commande 1 :

`powershell
git worktree add --detach C:/Users/arche/ambulance-manager__tmp_applycheck_A25_05_v2b HEAD
`

Sortie complete :

`	ext
git.exe : Preparing worktree (detached HEAD cd094e9)
Au caractère Ligne:5 : 11
+ $wtOut = (& git worktree add --detach $tmp HEAD 2>&1 | Out-String);
+           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (Preparing workt...d HEAD cd094e9):String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Updating files:   3% (60/1933)
Updating files:   4% (78/1933)
Updating files:   5% (97/1933)
Updating files:   6% (116/1933)
Updating files:   7% (136/1933)
Updating files:   8% (155/1933)
Updating files:   9% (174/1933)
Updating files:  10% (194/1933)
Updating files:  11% (213/1933)
Updating files:  12% (232/1933)
Updating files:  13% (252/1933)
Updating files:  14% (271/1933)
Updating files:  15% (290/1933)
Updating files:  16% (310/1933)
Updating files:  17% (329/1933)
Updating files:  18% (348/1933)
Updating files:  19% (368/1933)
Updating files:  20% (387/1933)
Updating files:  21% (406/1933)
Updating files:  22% (426/1933)
Updating files:  23% (445/1933)
Updating files:  24% (464/1933)
Updating files:  25% (484/1933)
Updating files:  26% (503/1933)
Updating files:  27% (522/1933)
Updating files:  28% (542/1933)
Updating files:  29% (561/1933)
Updating files:  30% (580/1933)
Updating files:  31% (600/1933)
Updating files:  32% (619/1933)
Updating files:  33% (638/1933)
Updating files:  34% (658/1933)
Updating files:  35% (677/1933)
Updating files:  36% (696/1933)
Updating files:  37% (716/1933)
Updating files:  38% (735/1933)
Updating files:  39% (754/1933)
Updating files:  40% (774/1933)
Updating files:  41% (793/1933)
Updating files:  42% (812/1933)
Updating files:  43% (832/1933)
Updating files:  43% (836/1933)
Updating files:  44% (851/1933)
Updating files:  45% (870/1933)
Updating files:  46% (890/1933)
Updating files:  47% (909/1933)
Updating files:  48% (928/1933)
Updating files:  49% (948/1933)
Updating files:  50% (967/1933)
Updating files:  51% (986/1933)
Updating files:  52% (1006/1933)
Updating files:  53% (1025/1933)
Updating files:  54% (1044/1933)
Updating files:  55% (1064/1933)
Updating files:  56% (1083/1933)
Updating files:  57% (1102/1933)
Updating files:  58% (1122/1933)
Updating files:  59% (1141/1933)
Updating files:  60% (1160/1933)
Updating files:  61% (1180/1933)
Updating files:  62% (1199/1933)
Updating files:  63% (1218/1933)
Updating files:  63% (1219/1933)
Updating files:  64% (1238/1933)
Updating files:  65% (1257/1933)
Updating files:  66% (1276/1933)
Updating files:  67% (1296/1933)
Updating files:  68% (1315/1933)
Updating files:  69% (1334/1933)
Updating files:  70% (1354/1933)
Updating files:  71% (1373/1933)
Updating files:  72% (1392/1933)
Updating files:  73% (1412/1933)
Updating files:  74% (1431/1933)
Updating files:  75% (1450/1933)
Updating files:  76% (1470/1933)
Updating files:  77% (1489/1933)
Updating files:  78% (1508/1933)
Updating files:  79% (1528/1933)
Updating files:  80% (1547/1933)
Updating files:  81% (1566/1933)
Updating files:  82% (1586/1933)
Updating files:  83% (1605/1933)
Updating files:  84% (1624/1933)
Updating files:  85% (1644/1933)
Updating files:  86% (1663/1933)
Updating files:  87% (1682/1933)
Updating files:  88% (1702/1933)
Updating files:  89% (1721/1933)
Updating files:  89% (1738/1933)
Updating files:  90% (1740/1933)
Updating files:  91% (1760/1933)
Updating files:  92% (1779/1933)
Updating files:  93% (1798/1933)
Updating files:  94% (1818/1933)
Updating files:  95% (1837/1933)
Updating files:  96% (1856/1933)
Updating files:  97% (1876/1933)
Updating files:  98% (1895/1933)
Updating files:  99% (1914/1933)
Updating files: 100% (1933/1933)
Updating files: 100% (1933/1933), done.
HEAD is now at cd094e9 update

`

Code retour : 0

Commande 2 :

`powershell
git -C C:/Users/arche/ambulance-manager__tmp_applycheck_A25_05_v2b apply --check C:/Users/arche/ambulance-manager/docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-05_A25_A25-PLAN-UI-05/PATCH/PATCH__SESSION-20260510-05_A25_A25-PLAN-UI-05.diff
`

Sortie complete :

`	ext

`

Code retour : 0

Commande 3 :

`powershell
git worktree remove --force C:/Users/arche/ambulance-manager__tmp_applycheck_A25_05_v2b
`

Sortie complete :

`	ext

`

Code retour : 0

## Preuve officielle npm run lint

Commande archivee :

`powershell
npm run lint
`

Sortie complete :

`	ext

> ambulance-manager@0.1.0 lint
> eslint .


`

Code retour : 0

## Preuve officielle npm run build

Commande archivee :

`powershell
npm run build
`

Sortie complete :

`	ext

> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 14.1s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 2.5s
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


`

Code retour : 0

## Harmonisation preuve build

La preuve officielle de build pour cette reprise V2 est le fichier BUILD_OUTPUT.txt du dossier session.
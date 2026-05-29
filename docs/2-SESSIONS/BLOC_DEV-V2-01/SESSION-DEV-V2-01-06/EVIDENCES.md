# EVIDENCES

Elements factuels du correctif `DEV-V2-01-06_FIX-01`.

---

## Sources lues (correctif)

- `app/ui/access-denied-state.tsx`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/FIN_SESSION.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/RESULTATS.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/NOTES.md`

## Commandes executees et sorties brutes

### git status --short

```text
 M app/ui/access-denied-state.tsx
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/FIN_SESSION.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/NOTES.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/RESULTATS.md
?? docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/PATCH/DEV-V2-01-06_FIX-01.diff
```

### npm run docs:encoding

```text
> ambulance-manager@0.1.0 docs:encoding
> node scripts/check-doc-encoding.mjs

Documentation encoding guard passed.
Checked files: 46
UTF-8 strict: OK
UTF-8 without BOM: OK
No active mojibake sequence found.
```

### npm run lint

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

### npm run build

```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 9.6s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29)
  Generating static pages using 15 workers (14/29)
  Generating static pages using 15 workers (21/29)
✓ Generating static pages using 15 workers (29/29) in 366.2ms
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

### git apply --check docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/PATCH/DEV-V2-01-06_FIX-01.diff

```text
(exit code 0, aucune sortie)
```

Contexte de verification:
- verification executee dans un worktree propre prepare sans `app/ui/access-denied-state.tsx` pour valider l'ajout explicite du fichier par le patch de creation.

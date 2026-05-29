# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documents obligatoires lus

- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/SESSION.md`

### Continuité bloc DEV-V2-01 (relecture ciblee)

- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01B/RESULTATS.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/RESULTATS.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/RESULTATS.md`

### Fichiers frontend inspectes et/ou modifies

- `app/planning/page.tsx`
- `app/depots/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- `app/users/page.tsx`
- `app/company/page.tsx`
- `app/audit/page.tsx`
- `app/onboarding/page.tsx`
- `app/ui/error-message.tsx`
- `app/ui/index.ts`

---

## Commandes executees et sorties

### 1) git status --short

```text
 M app/audit/page.tsx
 M app/company/page.tsx
 M app/depots/page.tsx
 M app/onboarding/page.tsx
 M app/planning/page.tsx
 M app/templates/page.tsx
 M app/ui/index.ts
 M app/users/page.tsx
 M app/vehicles/page.tsx
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/FIN_SESSION.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/NOTES.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/RESULTATS.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/SESSION.md
?? app/ui/access-denied-state.tsx
?? docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/PATCH/
```

### 2) npm run docs:encoding

```text
> ambulance-manager@0.1.0 docs:encoding
> node scripts/check-doc-encoding.mjs

Documentation encoding guard passed.
Checked files: 46
UTF-8 strict: OK
UTF-8 without BOM: OK
No active mojibake sequence found.
```

### 3) npm run lint

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

### 4) npm run build

```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 7.6s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 648.8ms
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

### 5) Controle mojibake / points d'interrogation / UTF-8-BOM / newline (Markdown modifies)

```text
=== MOJIBAKE_SCAN ===
NO_MOJIBAKE_SEQUENCE_FOUND
=== SUSPICIOUS_QUESTION_MARK_SCAN ===
C:\Users\arche\ambulance-manager\docs\2-SESSIONS\BLOC_DEV-V2-01\SESSION-DEV-V2-01-06\EVIDENCES.md:55:?? app/ui/access-denied-state.tsx
C:\Users\arche\ambulance-manager\docs\2-SESSIONS\BLOC_DEV-V2-01\SESSION-DEV-V2-01-06\EVIDENCES.md:56:?? docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/PATCH/
=== UTF8_BOM_AND_FINAL_NEWLINE_CHECK ===
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/SESSION.md | BOM=False | FINAL_LF=True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/NOTES.md | BOM=False | FINAL_LF=True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/EVIDENCES.md | BOM=False | FINAL_LF=True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/RESULTATS.md | BOM=False | FINAL_LF=True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/FIN_SESSION.md | BOM=False | FINAL_LF=True
```

### 6) Patch code et controle git apply --check

Patch genere:
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/PATCH/DEV-V2-01-06-code.diff`

Controle execute:

```text
git apply --check C:/Users/arche/ambulance-manager/docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/PATCH/DEV-V2-01-06-code.diff
```

Sortie:

```text
(exit code 0, aucune sortie)
```

Contexte de preuve:
- execution de `git apply --check` dans un worktree propre base sur `HEAD` (`C:/Users/arche/ambulance-manager-patchcheck`) pour verifier l'applicabilite du patch sur une base non modifiee.

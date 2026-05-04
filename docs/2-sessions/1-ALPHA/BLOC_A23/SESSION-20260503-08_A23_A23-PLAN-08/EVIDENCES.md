# EVIDENCES

## Sorties terminales brutes completes (commandes annoncees)

### 1) `git status --short` avant

```text
[sortie vide]
```

### 2) `git apply --check PATCH__SESSION-20260503-08_A23_A23-PLAN-08.diff`

```text
[aucune sortie]
```

### 3) `git apply PATCH__SESSION-20260503-08_A23_A23-PLAN-08.diff`

```text
[aucune sortie]
```

### 4) `npm run lint`

```text

> ambulance-manager@0.1.0 lint
> eslint .
```

### 5) `npm run build`

```text

> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 7.3s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 398.3ms
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

### 6) `git status --short` final

```text
 M app/api/planning/shifts/[id]/route.ts
 M app/api/planning/shifts/route.ts
 M app/planning/manual-planning-panel.tsx
 M docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/EVIDENCES.md
 M docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/FIN_SESSION.md
 M docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/NOTES.md
 M docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/PATCH/README_PATCH.md
 M docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/RESULTATS.md
 M docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/SESSION.md
?? .codex-temp/a23-plan08-validate.mjs
?? docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/ANNEXE_PREUVE_BRUTE_NODE.md
?? docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/PATCH/PATCH__SESSION-20260503-08_A23_A23-PLAN-08.diff
```

## Source des captures

- Sorties 1 a 3 : captures de la sequence d'application du patch principal pendant la session.
- Sorties 4, 5 et 6 : relancees pour ce controle qualite documentaire.
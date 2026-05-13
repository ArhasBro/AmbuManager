# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/RESULTATS.md`

---

## Patch principal

Chemin:
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04/PATCH/PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff`

Verification en arbre courant:

Commande:
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04/PATCH/PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff"
```

Sortie:
```text
error: patch failed: app/globals.css:1888
error: app/globals.css: patch does not apply
error: patch failed: app/planning/manual-planning-panel.tsx:88
error: app/planning/manual-planning-panel.tsx: patch does not apply
```

Code retour: `1`

Cause precise:
- Le patch est deja applique dans l'arbre de travail courant.

Preuve alternative controlee (worktree propre):

Commande:
```bash
git worktree add --detach C:/Users/arche/ambulance-manager/.codex-temp/applycheck-a25-ui-04 HEAD
git -C C:/Users/arche/ambulance-manager/.codex-temp/applycheck-a25-ui-04 apply --check "C:/Users/arche/ambulance-manager/docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04/PATCH/PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff"
git worktree remove --force C:/Users/arche/ambulance-manager/.codex-temp/applycheck-a25-ui-04
```

Sortie significative:
```text
__WORKTREE_ADD_EXIT__=0
__APPLY_CHECK_CLEAN_EXIT__=0
```

Code retour verification propre: `0`

---

## Validation terminale: npm run lint

Commande:
```bash
npm run lint
```

Sortie complete:
```text
> ambulance-manager@0.1.0 lint
> eslint .
```

Code retour: `0`

---

## Validation terminale: npm run build

Commande:
```bash
npm run build
```

Sortie complete:
```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 12.0s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29)
  Generating static pages using 15 workers (14/29)
  Generating static pages using 15 workers (21/29)
✓ Generating static pages using 15 workers (29/29) in 994.5ms
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

Code retour: `0`
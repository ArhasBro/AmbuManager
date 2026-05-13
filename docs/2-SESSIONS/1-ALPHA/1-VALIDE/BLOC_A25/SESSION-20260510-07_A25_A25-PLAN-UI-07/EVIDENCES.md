# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`
- `app/planning/planning-client.tsx`
- `app/globals.css`

## Patches produits

- Patch principal : `PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07.diff`
- Patch correctif : `PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07_FIX-01.diff`

## Preuves UTF-8 sans BOM

- Patch principal : octets initiaux `64 69 66` (pas de BOM).
- Patch FIX-01 : octets initiaux `64 69 66` (pas de BOM).

## Preuves patch

- Patch principal : preuve `git apply --check` fournie sur worktree temporaire propre, `RC=0`.
- Patch FIX-01 : preuve `git apply --check` fournie sur worktree temporaire propre, `RC=0`.
- Limite constatée au contrôle final : le patch FIX-01 joint n’est pas retenu comme preuve de rejouabilité séquentielle complète après patch principal depuis un repo propre.

## Preuve d’application effective et validation visuelle

- Le code final est validé par application effective dans le repo courant.
- Validation visuelle manuelle Nathan confirmée :
  - chevauchement corrigé sur `Planning manuel` ;
  - panneau contextuel vert non recouvrant ;
  - colonne principale gauche stable ;
  - autres onglets visuellement corrects ;
  - structure A25-PLAN-UI-07 validée.

## Preuves terminales retenues

### Commande

```powershell
npm run lint
```

### Sortie complète

```text
> ambulance-manager@0.1.0 lint
> eslint .
```

### Code retour

`0`

---

### Commande

```powershell
npm run build
```

### Sortie complète

```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 13.7s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 1665.2ms
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

### Code retour

`0`
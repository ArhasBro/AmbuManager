# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

References:
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/RAPPORT_PREPARATOIRE_A25.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../2-Planning/Planning_V1.2_INFO_DETAIL.png`

Code inspecte:
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/globals.css`
- `app/ui/page-header.tsx`
- `app/ui/action-button.tsx`
- `app/ui/status-badge.tsx`
- `app/ui/error-message.tsx`
- `app/ui/empty-state.tsx`
- `app/api/planning/exports/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`

Captures avant produites (session A25 courante):
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01/CAPTURES_AVANT/planning_light_before.png`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01/CAPTURES_AVANT/planning_dark_before.png`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01/CAPTURES_AVANT/planning_manual_day_before.png`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01/CAPTURES_AVANT/planning_manual_week_before.png`
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01/CAPTURES_AVANT/planning_manual_month_before.png`

Capture panneau/drawer:
INFORMATION NON FOURNIE — À CONFIRMER

## Preuves terminales executees

Commandes executees (selection):
- inventaire fichiers planning (`rg --files`, `rg -n`) ;
- lecture references et fichiers code (`Get-Content`, `rg -n`) ;
- verification route locale (`Invoke-WebRequest http://localhost:3000/login`) ;
- capture automatisee Playwright:
  - `npx playwright test .codex-temp/a25-planning-capture.spec.ts --reporter=line`
  - resultat: `1 passed (27.8s)` ;
- restauration dependances:
  - `npm ci`
  - `npx prisma generate`.

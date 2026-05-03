# EVIDENCES

## Documents lus

### Noyau obligatoire

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

### References UI principales

- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md`
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-07_A21_UX-07/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md`

### Contexte A22 utile

- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-23_A22_CLOTURE_A22/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-23_A22_CLOTURE_A22/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-23_A22_CLOTURE_A22/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-23_A22_CLOTURE_A22/FIN_SESSION.md`

### Contexte A23 utile

- `docs/NOTE_STRATEGIE_A23_A24_UI_UX_AMBULANCE_MANAGER.md`

## Commandes executees (preuves)

- `git status --short`
  - resultat : `WORKTREE_CLEAN` avant redaction.
- `npm run dev`
  - resultat : serveur local demarre (`http://localhost:3000`) ; log : `tmp/a23-ui-05-dev.log`.
- `npx playwright --version`
  - resultat : `Version 1.59.1`.
- `curl` CSRF + callback NextAuth credentials + session
  - resultat : session admin validee (`admin@ambulance.local`).
- `npx playwright screenshot ...`
  - tentative 1 : KO (navigateur Playwright absent localement).
  - correction de prerequis : `npx playwright install chromium` OK.
  - tentative 2 : OK pour les 11 routes ciblees.

## Captures ecran produites

Dossier :

- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-05_A23_A23-UI-05/CAPTURES/`

Fichiers :

- `login.png`
- `dashboard.png`
- `users.png`
- `vehicles.png`
- `templates.png`
- `company.png`
- `depots.png`
- `planning.png`
- `audit.png`
- `onboarding.png`
- `privacy.png`

## Zone code inspectee (sans patch)

- Shell/UI commun :
  - `app/layout.tsx`
  - `app/app-shell.tsx`
  - `app/globals.css`
  - `app/ui/page-header.tsx`
  - `app/ui/data-table.tsx`
  - `app/ui/filter-bar.tsx`
  - `app/ui/stat-card.tsx`
  - `app/ui/status-badge.tsx`
  - `app/ui/action-button.tsx`
- Pages cibles :
  - `app/login/page.tsx`
  - `app/dashboard/page.tsx`
  - `app/users/page.tsx`
  - `app/vehicles/page.tsx`
  - `app/templates/page.tsx`
  - `app/company/page.tsx`
  - `app/depots/page.tsx`
  - `app/planning/page.tsx`
  - `app/audit/page.tsx`
  - `app/onboarding/page.tsx`
  - `app/privacy/page.tsx`

## Limites de preuve

Comparaison maquette pixel-perfect A21 :

INFORMATION NON FOURNIE — À CONFIRMER

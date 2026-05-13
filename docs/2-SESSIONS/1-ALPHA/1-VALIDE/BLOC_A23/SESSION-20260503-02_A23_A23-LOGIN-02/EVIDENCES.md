# EVIDENCES

## Documents relus (cibles)

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/NOTES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/FIN_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH/README_PATCH.md

## Fichiers analyses (code)

- app/layout.tsx
- app/app-shell.tsx
- app/providers.tsx
- app/login/page.tsx
- app/dashboard/page.tsx
- lib/auth.ts
- types/next-auth.d.ts

## Patch-first

- Patch principal produit :
  - docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH/PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff
- Verification patch :
  - `git apply --check ./docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH/PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff` => OK
- Application patch :
  - `git apply ./docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH/PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff` => OK

## Validations terminales executees

- `npx prisma validate` => OK
- `npx prisma generate` => OK
- `npm run lint` => OK
- `npm run build` => OK
- `npm run test:smoke` => KO (test privacy hors perimetre login)
- `npm run test:targeted` => OK
- `npm run test:quality` => KO (echec `test:smoke` privacy, hors perimetre login)

## Preuve fonctionnelle post-login (moyens disponibles)

Scenario execute :
- serveur local `npm run dev` demarre ;
- login credentials via endpoints NextAuth avec session cookie ;
- rendu `/dashboard` verifie immediatement apres auth.

Resultat mesure (JSON) :
- `dashboard_status=200`
- `has_shell=true`
- `has_dashboard=true`
- `has_user_chip=true`
- `has_role_chip=true`
- `has_company_title=true`
- `fallback_company_present=false`
- `fallback_user_present=false`
- `fallback_role_present=false`

Interpretation :
- dashboard/sidebar/topbar/session context sont coherents dans le rendu post-login ;
- plus de marqueurs fallback "session non connectee" observes.

Limite :
- INFORMATION NON FOURNIE — À CONFIRMER : capture visuelle navigateur automatisee type Playwright non executee (package absent du depot au moment de la session).
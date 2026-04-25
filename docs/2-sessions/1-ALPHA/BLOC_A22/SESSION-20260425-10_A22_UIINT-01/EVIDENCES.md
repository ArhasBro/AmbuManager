# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

Documents relus :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md`
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-07_A21_UX-07/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md`

Code inspecte (principal) :
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/globals.css`
- Pages connectees : `app/dashboard/page.tsx`, `app/planning/page.tsx`, `app/users/page.tsx`, `app/vehicles/page.tsx`, `app/templates/page.tsx`, `app/company/page.tsx`, `app/depots/page.tsx`, `app/onboarding/page.tsx`, `app/audit/page.tsx`

## Commandes et constats

1. `git apply --check docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/PATCH/SESSION-20260425-10_A22_UIINT-01.diff`
- Resultat : KO
- Extrait utile : `patch failed: app/globals.css:180`

2. `git apply docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/PATCH/SESSION-20260425-10_A22_UIINT-01.diff`
- Resultat : KO
- Extrait utile : `patch failed: app/globals.css:180`

3. `git apply --check --ignore-space-change --ignore-whitespace docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/PATCH/SESSION-20260425-10_A22_UIINT-01.diff`
- Resultat : OK
- Extrait utile : verification sans erreur

4. `git apply --ignore-space-change --ignore-whitespace docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/PATCH/SESSION-20260425-10_A22_UIINT-01.diff`
- Resultat : OK
- Extrait utile : application sans erreur

5. `npm run lint`
- Resultat : KO
- Extrait utile : execution de scripts PowerShell desactivee (`npm.ps1` bloque)

6. `npm.cmd run lint`
- Resultat : OK
- Extrait utile : `eslint .`

7. `npm.cmd run build`
- Resultat : OK
- Extrait utile : `Compiled successfully`, `Generating static pages (29/29)`
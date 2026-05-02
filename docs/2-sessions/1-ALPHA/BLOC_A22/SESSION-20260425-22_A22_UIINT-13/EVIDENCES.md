# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

Noyau obligatoire relu :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Template relu :
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

References UI/UX relues :
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md`
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-07_A21_UX-07/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md`
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-05_A21_UX-05/VALIDATION_PAGES_SIMPLES_FINITIONS_V1.0.md`

Continuite A22 immediate relue :
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-21_A22_UIINT-12/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-21_A22_UIINT-12/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-21_A22_UIINT-12/FIN_SESSION.md`

Code reel inspecte :
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/globals.css`
- `app/app-shell.tsx`
- `app/ui/page-header.tsx`

## Preuves commandes

Patch principal :
- `git apply --check docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13.diff` : OK
- `git apply docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13.diff` : OK (warnings whitespace sur le fichier patch)

Patch correctif minimal :
- `git apply --check docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-01.diff` : OK
- `git apply docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-22_A22_UIINT-13/PATCH/PATCH__SESSION-20260425-22_A22_UIINT-13_FIX-01.diff` : OK (warnings whitespace sur le fichier patch)

Validations terminales :
- `npm.cmd run lint` : KO puis OK apres `FIX-01`
- `npm.cmd run build` : KO hors perimetre

Erreur build utile (premieres causes bloquantes) :
- `Module not found: Can't resolve '@prisma/client'`
- `Module not found: Can't resolve 'bcrypt'`
- `Module not found: Can't resolve 'pg'`

Confirmation perimetre :
- Aucune erreur liee aux modifications `app/login/page.tsx`, `app/privacy/page.tsx`, `app/globals.css` n'apparait avant les erreurs de dependances globales.

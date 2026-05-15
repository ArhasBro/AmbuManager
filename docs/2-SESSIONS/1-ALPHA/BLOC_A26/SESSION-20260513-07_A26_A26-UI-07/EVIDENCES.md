# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

References documentaires lues :
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md`

Reference visuelle lue :
- `docs/1-MASTER/1-MAQUETTE/MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/1-Templates/Templates_V1.1.png`

Fichiers code lus/modifies :
- `app/templates/page.tsx` (lu)
- `app/templates/templates-client.tsx` (modifie)
- `app/a24-vehicles-templates.css` (modifie)
- `app/globals.css` (lu)

## Preuves commandes (reelles)

1. Verification patch FIX-01 sur baseline
- commande :
  - `git -C C:/Users/arche/ambulance-manager__tmpfixbaseline apply --check C:/Users/arche/ambulance-manager/docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH/PATCH__SESSION-20260513-07_A26_A26-UI-07_FIX-01.diff`
- code retour : `0`

2. Verification patch FIX-01 sur etat courant (deja applique)
- commande :
  - `git apply --check docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-07_A26_A26-UI-07/PATCH/PATCH__SESSION-20260513-07_A26_A26-UI-07_FIX-01.diff`
- code retour : `1`
- observation : echec attendu car patch deja present dans l'arbre courant.

3. Lint
- commande : `npm run lint`
- code retour : `0`
- resultat : 18 warnings `@typescript-eslint/no-unused-vars` dans `app/planning/planning-client.tsx` (hors perimetre), 0 erreur.

4. Build
- commande : `npm run build`
- code retour : `0`
- resultat : build Next.js valide.

## Preuve patch UTF-8 sans BOM

Patch : `PATCH__SESSION-20260513-07_A26_A26-UI-07_FIX-01.diff`
- premiers octets : `64 69 66`
- interpretation : debut direct `diff` (pas de BOM `EF BB BF`).
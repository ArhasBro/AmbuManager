# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/REGISTRE_DECISIONS.md`
- `docs/1-MASTER/RECAP_DISCUSSIONS.md`
- `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md`
- `docs/1-MASTER/1-MAQUETTE/PAGES_SIMPLES_FINITIONS_IMAGE_V1.0/1-Login/Login_V1.1.png`
- `app/login/page.tsx`
- `app/globals.css`

## Preuves techniques

- Patch principal + FIX-01..FIX-06 exportes dans `PATCH/`.
- Verification UTF-8 sans BOM faite a chaque export de patch (octets initiaux `646966`, soit `diff`).
- Preuve `git apply --check` fournie pour chaque patch, sur copie de travail pre-patch.
- Verifications terminales relancees apres chaque correction :
  - `npm run lint` : code retour `0` (warnings hors perimetre Login)
  - `npm run build` : code retour `0`

## Point de suivi depot

- `public/assets/login/ambulance-login-bg.webp` present localement et servi en URL,
  mais non suivi Git dans l'etat local observe (`?? public/assets/...`).
- Action attendue au commit final : inclure ce fichier dans le commit de livraison.
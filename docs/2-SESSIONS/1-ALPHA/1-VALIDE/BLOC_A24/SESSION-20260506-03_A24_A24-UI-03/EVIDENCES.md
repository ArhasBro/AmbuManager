# EVIDENCES

## Sources utilisees

Lecture obligatoire :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Lecture complementaire ciblee A24-UI-03 :
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/ICONES/LISTE_ICONES_EXPORTEES_V1_1.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-01_A24_A24-UI-01/FIN_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-02_A24_A24-UI-02/FIN_SESSION.md`

Reference `MAQUETTE_DA` utilisee pour Login/Dashboard (inventaire de maquettes consulte pendant la session) :
- `docs/1-master/MAQUETTE/MAQUETTE_DA/PAGES_SIMPLES_FINITIONS_IMAGE_V1.0/A21-UX-05_PAGES_SIMPLES_FINITIONS_IMAGE_V1.0/1-Login/Login_V1.1.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/1-Dashboard/Dashboard_V1.png`

## Captures avant/apres

Commandes principales executees (Playwright CLI) :

```bash
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1400 http://localhost:3100/login ".../CAPTURES_AVANT/login_light_before.png"
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1600 --load-storage=".../CAPTURES_AVANT/storage-login-before-temp-dark.json" http://localhost:3100/login ".../CAPTURES_AVANT/login_dark_before.png"
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=2000 --load-storage=".../CAPTURES_AVANT/storage-auth-before-temp-light.json" http://localhost:3100/dashboard ".../CAPTURES_AVANT/dashboard_light_before.png"
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=2000 --load-storage=".../CAPTURES_AVANT/storage-auth-before-temp-dark.json" http://localhost:3100/dashboard ".../CAPTURES_AVANT/dashboard_dark_before.png"

npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1400 http://localhost:3100/login ".../CAPTURES_APRES/login_light_after.png"
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1600 --load-storage=".../CAPTURES_APRES/storage-login-dark-only.json" http://localhost:3100/login ".../CAPTURES_APRES/login_dark_after.png"
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=2000 --load-storage=".../CAPTURES_APRES/storage-auth-after-3100-light.json" http://localhost:3100/dashboard ".../CAPTURES_APRES/dashboard_light_after.png"
npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=2000 --load-storage=".../CAPTURES_APRES/storage-auth-after-3100-dark.json" http://localhost:3100/dashboard ".../CAPTURES_APRES/dashboard_dark_after.png"
```

Extraits de sortie :
- `Navigating to http://localhost:3100/login`
- `Capturing screenshot into .../login_light_before.png`
- `Navigating to http://localhost:3100/dashboard`
- `Capturing screenshot into .../dashboard_dark_after.png`

Note technique : les captures AVANT dashboard ont ete prises en bascule temporaire des 3 fichiers modifies vers `HEAD` (pre-session), puis restauration immediate des fichiers de travail.
Les fichiers temporaires d'authentification (`auth-cookies*.txt`, `storage-*.json`) ont ete supprimes avant livraison finale.

## Validations terminales

Commande 1 :

```bash
npm run lint
```

Extrait terminal reel :

```text
> ambulance-manager@0.1.0 lint
> eslint .
```

Resultat : succes  
Code retour : `0`

Commande 2 :

```bash
npm run build
```

Extrait terminal reel :

```text
> ambulance-manager@0.1.0 build
> next build
...
✓ Compiled successfully
...
✓ Generating static pages ...
```

Resultat : succes  
Code retour : `0`

## Patch principal - format et applicabilite

Patch principal :
`docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/PATCH/PATCH__SESSION-20260506-03_A24_A24-UI-03.diff`

Controles format :
- premiere ligne : `diff --git a/app/dashboard/page.tsx b/app/dashboard/page.tsx`
- premiers octets : `100 105 102 102`
- encodage : texte standard (UTF-8 sans BOM / ASCII compatible)

Verification applicabilite dans l'arbre courant :

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/PATCH/PATCH__SESSION-20260506-03_A24_A24-UI-03.diff"
```

Extrait terminal reel :

```text
error: patch failed: app/dashboard/page.tsx:7
error: app/dashboard/page.tsx: patch does not apply
error: patch failed: app/globals.css:1267
error: app/globals.css: patch does not apply
error: patch failed: app/login/page.tsx:1
error: app/login/page.tsx: patch does not apply
```

Resultat : echec attendu (modifications deja appliquees dans l'arbre courant)  
Code retour : `1`

Clarification : ce KO sur arbre courant ne signifie pas un patch invalide ; il indique que les changements du patch principal sont deja presents dans l'arbre de travail.

Verification applicabilite en etat propre :

```bash
git worktree add .codex-temp/apply-check-main HEAD
git -C .codex-temp/apply-check-main apply --check "..\..\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-03_A24_A24-UI-03\PATCH\PATCH__SESSION-20260506-03_A24_A24-UI-03.diff"
git worktree remove --force .codex-temp/apply-check-main
```

Extrait terminal reel :

```text
HEAD is now at a399636 update
exit_code=0
```

Resultat : applicabilite validee sur arbre propre  
Code retour : `0`

## Correctif minimal FIX-01

Patch correctif :
`docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/PATCH/PATCH__SESSION-20260506-03_A24_A24-UI-03_FIX-01.diff`

Portee du correctif :
- conservation de la checkbox `Se souvenir de moi` sans extension de logique d'authentification ;
- remplacement des formulations Login non prouvees sur hebergement/RGPD par des formulations neutres ;
- complement documentaire (checkbox future, reference MAQUETTE_DA, clarifications d'applicabilite).

Validation demandee :

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/PATCH/PATCH__SESSION-20260506-03_A24_A24-UI-03_FIX-01.diff"
```

Extrait terminal reel (arbre courant) :

```text
current_exit=1
error: patch failed: app/login/page.tsx:150
error: ... patch does not apply
```

Resultat : echec attendu sur arbre courant (correctif deja present).  
Code retour : `1`

Verification complementaire en etat pre-correctif reconstruit :

```bash
git -C .codex-temp/fix01-repo reset --hard HEAD
git -C .codex-temp/fix01-repo apply --check "..\..\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-03_A24_A24-UI-03\PATCH\PATCH__SESSION-20260506-03_A24_A24-UI-03_FIX-01.diff"
```

Extrait terminal reel :

```text
clean_exit=0
```

Resultat : patch FIX-01 exploitable et applicable sur etat pre-correctif.  
Code retour : `0`

## Patch documentaire - format et applicabilite

Patch documentaire :
`docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/PATCH/PATCH__SESSION-20260506-03_A24_A24-UI-03_DOCS.diff`

Controles format :
- premiere ligne : `diff --git a/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/EVIDENCES.md ...`
- premiers octets : `100 105 102 102`
- encodage : texte standard (UTF-8 sans BOM / ASCII compatible)

Verification applicabilite dans l'arbre courant :

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/PATCH/PATCH__SESSION-20260506-03_A24_A24-UI-03_DOCS.diff"
```

Extrait terminal reel :

```text
error: patch failed: .../EVIDENCES.md:1
error: ... patch does not apply
...
```

Resultat : echec attendu (modifications deja appliquees dans l'arbre courant)  
Code retour : `1`

Verification applicabilite en etat propre :

```bash
git worktree add .codex-temp/apply-check-docs HEAD
git -C .codex-temp/apply-check-docs apply --check "..\..\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-03_A24_A24-UI-03\PATCH\PATCH__SESSION-20260506-03_A24_A24-UI-03_DOCS.diff"
git worktree remove --force .codex-temp/apply-check-docs
```

Extrait terminal reel :

```text
HEAD is now at a399636 update
exit_code_clean=0
```

Resultat : applicabilite validee sur arbre propre  
Code retour : `0`

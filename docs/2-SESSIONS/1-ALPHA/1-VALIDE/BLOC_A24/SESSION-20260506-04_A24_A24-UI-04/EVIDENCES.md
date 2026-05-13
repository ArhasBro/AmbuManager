# EVIDENCES

## Sources utilisees

Lecture obligatoire :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Lecture complementaire ciblee A24-UI-04 :
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/ICONES/LISTE_ICONES_EXPORTEES_V1_1.md`
- `docs/1-master/MAQUETTE/ICONES/TABLE_MAPPING_ICONES_V1_1.csv`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-02_A24_A24-UI-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/RESULTATS.md`

References maquettes DA utilisees :
- `docs/1-master/MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/2-Société-paramètres-métier/Société_V1.0.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/3-Dépôts-bases/Dépôts-bases_V1.0.png`

## Validations terminales executees

### 1) `git apply --check` patch principal

Commande :

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/PATCH/PATCH__SESSION-20260506-04_A24_A24-UI-04.diff"
```

Extrait terminal reel (arbre courant) :

```text
error: patch failed: app/company/company-profile-form.tsx:1
error: app/company/company-profile-form.tsx: patch does not apply
error: patch failed: app/company/company-rules-panel.tsx:1
error: app/company/company-rules-panel.tsx: patch does not apply
error: patch failed: app/company/page.tsx:1
error: app/company/page.tsx: patch does not apply
error: patch failed: app/depots/depots-client.tsx:1
error: app/depots/depots-client.tsx: patch does not apply
error: patch failed: app/depots/page.tsx:1
error: app/depots/page.tsx: patch does not apply
error: patch failed: app/globals.css:2283
error: app/globals.css: patch does not apply
EXIT_MAIN_CHECK=1
```

Resultat : echec attendu sur arbre courant (patch deja applique).

Verification sur etat propre :

```bash
git worktree add .codex-temp/apply-check-ui04 HEAD
git -C .codex-temp/apply-check-ui04 apply --check "..\..\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-04_A24_A24-UI-04\PATCH\PATCH__SESSION-20260506-04_A24_A24-UI-04.diff"
git worktree remove --force .codex-temp/apply-check-ui04
```

Extrait terminal reel :

```text
EXIT_CLEAN_CHECK=0
```

Resultat : applicabilite validee sur etat propre.

### 2) `npm run lint`

Commande :

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

### 3) `npm run build`

Commande :

```bash
npm run build
```

Extrait terminal reel :

```text
> ambulance-manager@0.1.0 build
> next build
... 
✓ Compiled successfully in 10.2s
✓ Generating static pages using 15 workers (29/29)
```

Resultat : succes  
Code retour : `0`

## Captures AVANT/APRES

Captures produites :
- `CAPTURES_AVANT/company_light_before.png`
- `CAPTURES_AVANT/company_dark_before.png`
- `CAPTURES_AVANT/depots_light_before.png`
- `CAPTURES_AVANT/depots_dark_before.png`
- `CAPTURES_APRES/company_light_after.png`
- `CAPTURES_APRES/company_dark_after.png`
- `CAPTURES_APRES/depots_light_after.png`
- `CAPTURES_APRES/depots_dark_after.png`

Commandes principales (resume) :

```bash
# serveur BEFORE (etat HEAD propre via worktree) sur 3000
npm run dev -- --port 3000
node .codex-temp/capture-ui04.cjs

# serveur AFTER (etat modifie) sur 3000
npm run dev -- --port 3000
node .codex-temp/capture-ui04.cjs
```

Note technique : `NEXTAUTH_URL` etant fixe a `http://localhost:3000`, les captures authentifiees ont ete realisees sur le port 3000 pour les deux etats (avant/apres), en sequence.

## Preuves d'encodage patch principal

Patch principal :
`docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/PATCH/PATCH__SESSION-20260506-04_A24_A24-UI-04.diff`

Controles :
- premiers octets : `100 105 102 102`
- premiere ligne : `diff --git a/app/company/company-profile-form.tsx b/app/company/company-profile-form.tsx`
- encodage : UTF-8 sans BOM (ecriture via `System.Text.UTF8Encoding($false)`)
- absence BOM UTF-16 : oui (pas de `255 254` / `254 255`)

## Preuves d'encodage patch documentaire

Patch documentaire :
`docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/PATCH/PATCH__SESSION-20260506-04_A24_A24-UI-04_DOCS.diff`

Controles :
- premiers octets : `100 105 102 102`
- premiere ligne : `diff --git a/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/CAPTURES_APRES/company_dark_after.png ...`
- encodage : UTF-8 sans BOM / ASCII compatible (patch binaire Git)
- absence BOM UTF-16 : oui (pas de `255 254` / `254 255`)

Verification applicabilite dans l'arbre courant :

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/PATCH/PATCH__SESSION-20260506-04_A24_A24-UI-04_DOCS.diff"
```

Extrait terminal reel :

```text
error: .../CAPTURES_APRES/company_dark_after.png: already exists in working directory
...
error: .../SESSION.md: patch does not apply
EXIT_DOCS_CHECK=1
```

Resultat : echec attendu (fichiers deja presents et modifications deja appliquees).

Verification applicabilite en etat propre :

```bash
git worktree add .codex-temp/apply-check-ui04-docs HEAD
git -C .codex-temp/apply-check-ui04-docs apply --check "..\..\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-04_A24_A24-UI-04\PATCH\PATCH__SESSION-20260506-04_A24_A24-UI-04_DOCS.diff"
git worktree remove --force .codex-temp/apply-check-ui04-docs
```

Extrait terminal reel :

```text
EXIT_DOCS_CLEAN_CHECK=0
```

Resultat : patch documentaire applicable sur etat propre.

## Verification contenu ZIP final

ZIP : `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/SESSION-20260506-04_A24_A24-UI-04_DOCS.zip`

Extrait listing verifie :

```text
PATCH\PATCH__SESSION-20260506-04_A24_A24-UI-04.diff
PATCH\PATCH__SESSION-20260506-04_A24_A24-UI-04_DOCS.diff
PATCH\README_PATCH.md
CAPTURES_AVANT\company_dark_before.png
CAPTURES_AVANT\company_light_before.png
CAPTURES_AVANT\depots_dark_before.png
CAPTURES_AVANT\depots_light_before.png
CAPTURES_APRES\company_dark_after.png
CAPTURES_APRES\company_light_after.png
CAPTURES_APRES\depots_dark_after.png
CAPTURES_APRES\depots_light_after.png
SESSION.md
NOTES.md
EVIDENCES.md
RESULTATS.md
FIN_SESSION.md
```

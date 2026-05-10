# EVIDENCES

Elements factuels utilises pendant la session CLOTURE_A24.

## 1) Etat initial du depot

### Commande
`git status --short`

### Extrait terminal reel
`(aucune ligne)`

### Resultat
Worktree propre au lancement du controle.

### Code retour
`0`

---

## 2) Lecture documentaire obligatoire

### Commandes
- `Get-Content -Raw docs/1-master/DOCUMENT_MAITRE.md`
- `Get-Content -Raw docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `Get-Content -Raw docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

### Extraits terminaux reels
- `# Ambulance Manager ... DOCUMENT_MAITRE`
- `# Ambulance Manager ... PLAN_DE_DEVELOPPEMENT`
- `# TEMPLATE_DEBUT_SESSION.md`

### Resultat
Lectures effectuees.

### Code retour
`0`

---

## 3) Lecture references A24 / maquettes

### Commandes
- `Get-Content -Raw docs/1-master/REFERENCE_UI_UX_A24.md`
- `Get-Content -Raw docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `Get-Content -Raw docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `Get-ChildItem -Recurse -File docs/1-master/MAQUETTE/MAQUETTE_DA | Select-Object -ExpandProperty Name`

### Extrait terminal reel
`Templates_V1.1.png ... Dashboard_V1.png ... Planning_V1.2.png ... Login_V1.1.png ... Privacy_V1.0.png`

### Resultat
Reference A24 confirmee avec 11 maquettes PNG cibles.

### Code retour
`0`

---

## 4) Controle sessions A24 produites

### Commande
`Get-ChildItem docs/2-sessions/1-ALPHA/BLOC_A24 | Select-Object Name,LastWriteTime`

### Extrait terminal reel
- `SESSION-20260506-01_A24_A24-UI-01`
- `...`
- `SESSION-20260506-09_A24_A24-UI-09`
- `SESSION-20260506-10_A24_CLOTURE_A24`

### Resultat
Sessions UI-01 a UI-09 + CLOTURE_A24 presentes.

### Code retour
`0`

---

## 5) Controle captures disponibles

### Commande
`Get-ChildItem docs/2-sessions/1-ALPHA/BLOC_A24 -Directory | ... CaptureCount`

### Extrait terminal reel
- `SESSION-20260506-03_A24_A24-UI-03  CaptureCount=8`
- `SESSION-20260506-04_A24_A24-UI-04  CaptureCount=8`
- `SESSION-20260506-08_A24_A24-UI-08  CaptureCount=2`
- `SESSION-20260506-09_A24_A24-UI-09  CaptureCount=22`

### Resultat
Captures presentes, majoritairement consolidees en UI-09.

### Code retour
`0`

---

## 6) Controle ZIP reels

### Commande
`Get-ChildItem docs/2-sessions/1-ALPHA/BLOC_A24 -Directory | ForEach-Object { ... ZipCount ... }`

### Extrait terminal reel
- `SESSION-20260506-09_A24_A24-UI-09  ZipCount=1  SESSION-20260506-09_A24_A24-UI-09_DOCS_FINAL.zip`
- `autres sessions : ZipCount=0`

### Resultat
Un seul ZIP historique detecte dans BLOC_A24.

### Code retour
`0`

### Note
Preuve ZIP UI-01 a UI-08 sur disque courant :
`INFORMATION NON FOURNIE — À CONFIRMER`

---

## 7) Controle patchs A24 (.diff)

### Commande
Script de controle global des `.diff` A24 :
- premiers octets,
- BOM,
- caracteres nuls,
- premiere ligne,
- `git apply --check`, puis `git apply --reverse --check`.

### Extraits terminaux reels
- `FIRST3=100,105,102 BOM=False NULL=False FIRSTLINE=diff --git ...`
- `APPLY_CHECK=ALREADY_APPLIED_REVERSE_OK` (certains patchs)
- `APPLY_CHECK=FAIL_FORWARD_AND_REVERSE` (certains patchs sur HEAD courant)

### Resultat
Format technique des patchs valide (prefixe `diff --git`, pas de BOM, pas de NULL). Applicabilite variable sur etat courant (drift temporel inter-sessions).

### Code retour
`0`

---

## 8) Validations terminales relancees (depot courant)

### Commande
`npm run lint`

### Extrait terminal reel
- `> ambulance-manager@0.1.0 lint`
- `> eslint .`

### Resultat
Succes.

### Code retour
`0`

### Commande
`npm run build`

### Extrait terminal reel
- `> ambulance-manager@0.1.0 build`
- `> next build`
- `Compiled successfully`
- `Generating static pages ... (29/29)`

### Resultat
Succes.

### Code retour
`0`

---

## 9) Controle final de la documentation CLOTURE_A24

### Commande
`git status --short`

### Extrait terminal reel
`M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-10_A24_CLOTURE_A24/...`

### Resultat
Modifications limitees au dossier de session CLOTURE_A24.

### Code retour
`0`

---

## 10) Patch documentaire CLOTURE_A24 - preuves techniques

### Commande
Controle encodage + structure du patch :
`[System.IO.File]::ReadAllBytes(...PATCH__SESSION-20260506-10_A24_CLOTURE_A24_DOCS.diff)`

### Extrait terminal reel
- `FIRST3=100,105,102`
- `BOM=False`
- `NULL=False`
- `FIRSTLINE=diff --git a/docs/2-sessions/.../EVIDENCES.md b/docs/2-sessions/.../EVIDENCES.md`

### Resultat
Patch documentaire conforme (`diff --git`, UTF-8 sans BOM, sans caractere nul).

### Code retour
`0`

### Commande
`git -C .codex-temp/apply-check-closure apply --check "..\\..\\docs\\2-sessions\\1-ALPHA\\BLOC_A24\\SESSION-20260506-10_A24_CLOTURE_A24\\PATCH\\PATCH__SESSION-20260506-10_A24_CLOTURE_A24_DOCS.diff"`

### Extrait terminal reel
`APPLY_CHECK_EXIT=0`

### Resultat
Patch documentaire applicable sur worktree propre.

### Code retour
`0`

---

## 11) ZIP final CLOTURE_A24

### Commande
`Compress-Archive -Path <session/*> -DestinationPath SESSION-20260506-10_A24_CLOTURE_A24_DOCS_FINAL.zip`

### Extrait terminal reel
- `ZIP_CREATED=docs\\2-sessions\\1-ALPHA\\BLOC_A24\\SESSION-20260506-10_A24_CLOTURE_A24\\SESSION-20260506-10_A24_CLOTURE_A24_DOCS_FINAL.zip`
- Entrees ZIP :
  - `PATCH\\NO_PATCH.md`
  - `PATCH\\NO_PATCH_CODE.md`
  - `PATCH\\PATCH__SESSION-20260506-10_A24_CLOTURE_A24_DOCS.diff`
  - `PATCH\\README_PATCH.md`
  - `EVIDENCES.md`
  - `FIN_SESSION.md`
  - `NOTES.md`
  - `RESULTATS.md`
  - `SESSION.md`

### Resultat
ZIP documentaire final genere et contenu verifie.

### Code retour
`0`

---

## 12) Reprise documentaire minimale - correction encodage

### Commande
Conversion explicite en UTF-8 sans BOM des 8 fichiers Markdown cibles via `System.Text.UTF8Encoding($false)`.

### Extrait terminal reel
- `FILE=.../SESSION.md FIRST3=35,32,83 BOM=False NULL=False`
- `FILE=.../NOTES.md FIRST3=35,32,78 BOM=False NULL=False`
- `FILE=.../EVIDENCES.md FIRST3=35,32,69 BOM=False NULL=False`
- `FILE=.../RESULTATS.md FIRST3=35,32,82 BOM=False NULL=False`
- `FILE=.../FIN_SESSION.md FIRST3=35,32,70 BOM=False NULL=False`
- `FILE=.../PATCH/README_PATCH.md FIRST3=35,32,82 BOM=False NULL=False`
- `FILE=.../PATCH/NO_PATCH_CODE.md FIRST3=35,32,78 BOM=False NULL=False`
- `FILE=.../PATCH/NO_PATCH.md FIRST3=35,32,78 BOM=False NULL=False`

### Resultat
Encodage corrige et verifie (BOM absent, NULL absent) sur les 8 fichiers Markdown demandes.

### Code retour
`0`

---

## 13) Regeneration ZIP final avec chemins internes `/`

### Commande
Creation du ZIP via `System.IO.Compression.ZipArchive` avec noms d'entrees explicites en `/`.

### Extrait terminal reel
- `ZIP_CREATED=.../SESSION-20260506-10_A24_CLOTURE_A24_DOCS_FINAL.zip`
- Entrees ZIP :
  - `PATCH/NO_PATCH.md`
  - `PATCH/NO_PATCH_CODE.md`
  - `PATCH/PATCH__SESSION-20260506-10_A24_CLOTURE_A24_DOCS.diff`
  - `PATCH/README_PATCH.md`
  - `EVIDENCES.md`
  - `FIN_SESSION.md`
  - `NOTES.md`
  - `RESULTATS.md`
  - `SESSION.md`

### Resultat
ZIP final corrige avec separateurs internes standards `/`.

### Code retour
`0`

# EVIDENCES

## 1. Sources lues

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-01_A24_A24-UI-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/FIN_SESSION.md`

## 2. Fichiers code inspectes

- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/app-shell.tsx`
- `app/globals.css`
- `package.json`

## 3. Commandes executees avec preuves reelles

### Commande
`try { (Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/login' -TimeoutSec 5).StatusCode } catch { $_.Exception.Message; exit 1 }`

Extrait terminal reel :
`Impossible de se connecter au serveur distant`

Resultat : echec (serveur non demarre)
Code retour : `1`

---

### Commande
`Start-Process ... 'npm run dev > .codex-temp\\a24-ui08-devserver.out.log ...'`

Extrait terminal reel :
- `> ambulance-manager@0.1.0 dev`
- `> next dev`
- `Local: http://localhost:3000`
- `Ready in 2.2s`

Resultat : succes (serveur demarre)
Code retour : `0`

---

### Commande
`node .codex-temp/a24-ui08-auth-storage.mjs` (premier essai)

Extrait terminal reel :
- `Error: ENOENT: no such file or directory ... CAPTURES_AVANT/storage-auth-light.json`

Resultat : echec (dossier manquant)
Code retour : `1`

---

### Commande
`New-Item -ItemType Directory -Force .../CAPTURES_AVANT ; node .codex-temp/a24-ui08-auth-storage.mjs`

Extrait terminal reel :
`AUTH_STORAGE_OK`

Resultat : succes
Code retour : `0`

---

### Commande
`npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=2500 --full-page --load-storage=".../storage-auth-light.json" "http://localhost:3000/planning" ".../planning_light_before.png"`

Extrait terminal reel :
- `Navigating to http://localhost:3000/planning`
- `Capturing screenshot into .../planning_light_before.png`

Resultat : succes
Code retour : `0`

---

### Commande
`npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=2500 --full-page --load-storage=".../storage-auth-dark.json" "http://localhost:3000/planning" ".../planning_dark_before.png"`

Extrait terminal reel :
- `Navigating to http://localhost:3000/planning`
- `Capturing screenshot into .../planning_dark_before.png`

Resultat : succes
Code retour : `0`

---

### Commande
`npx playwright test .codex-temp/a24-ui08-captures.spec.ts --project=chromium --workers=1 --reporter=line`

Extrait terminal reel :
`Project(s) "chromium" not found. Available projects: ""`

Resultat : echec
Code retour : `1`

---

### Commande
`npx playwright test .codex-temp/a24-ui08-captures.spec.ts --workers=1 --reporter=line`

Extrait terminal reel :
`Cannot find module '@playwright/test'`

Resultat : echec
Code retour : `1`

---

### Commande
`npx --yes --package playwright node .codex-temp/a24-ui08-capture-views.cjs`

Extrait terminal reel :
`Cannot find module 'playwright'`

Resultat : echec
Code retour : `1`

---

### Commande
`try { (Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/login' -TimeoutSec 4).StatusCode; 'SERVER_UP' } catch { 'SERVER_DOWN' }`

Extrait terminal reel (avant arret):
- `200`
- `SERVER_UP`

Resultat : serveur actif
Code retour : `0`

---

### Commande
`netstat -ano | Select-String ':3000' ... taskkill /PID <id> /F`

Extrait terminal reel :
`KILLED_PIDS=25140`

Resultat : succes (processus local coupe)
Code retour : `0`

---

### Commande
`try { (Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/login' -TimeoutSec 4).StatusCode; 'SERVER_UP' } catch { 'SERVER_DOWN' }`

Extrait terminal reel (apres arret):
`SERVER_DOWN`

Resultat : serveur arrete
Code retour : `0`

---

### Commande
`git status --short`

Extrait terminal reel :
- `M docs/2-sessions/.../SESSION-20260506-08_A24_A24-UI-08/...`
- `?? docs/2-sessions/.../CAPTURES_AVANT/`
- modifications hors session deja presentes : `docs/CMD.md`, `test-results/.last-run.json`

Resultat : succes
Code retour : `0`

---

### Commande
`Compress-Archive -Path <session/*> -DestinationPath <SESSION-..._DOCS.zip>`

Extrait terminal reel :
`ZIP_CREATED=docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-08_A24_A24-UI-08\SESSION-20260506-08_A24_A24-UI-08_DOCS.zip`

Resultat : succes
Code retour : `0`

---

### Commande
`[System.IO.Compression.ZipFile]::OpenRead(...).Entries`

Extrait terminal reel :
- `CAPTURES_AVANT\planning_dark_before.png`
- `CAPTURES_AVANT\planning_light_before.png`
- `PATCH\NO_PATCH_CODE.md`
- `PATCH\README_PATCH.md`
- `EVIDENCES.md`
- `FIN_SESSION.md`
- `NOTES.md`
- `RAPPORT_PREPARATOIRE_A25.md`
- `RESULTATS.md`
- `SESSION.md`

Resultat : succes
Code retour : `0`

## 4. Captures produites

- `CAPTURES_AVANT/planning_light_before.png`
- `CAPTURES_AVANT/planning_dark_before.png`

Captures non produites dans cette session :
- vues manuel `day/week/month` en interaction
- etat vide force
- etat drawer detail cellule maquette-like

Statut exact a reporter :
INFORMATION NON FOURNIE — À CONFIRMER

## 5. Preuves encodage

Commande executee :
`ReadAllBytes + controle BOM/NULL`

Extrait terminal reel :
- `SESSION.md|BOM=False|NULL=False`
- `NOTES.md|BOM=False|NULL=False`
- `EVIDENCES.md|BOM=False|NULL=False`
- `RESULTATS.md|BOM=False|NULL=False`
- `FIN_SESSION.md|BOM=False|NULL=False`
- `RAPPORT_PREPARATOIRE_A25.md|BOM=False|NULL=False`
- `PATCH/README_PATCH.md|BOM=False|NULL=False`
- `PATCH/NO_PATCH_CODE.md|BOM=False|NULL=False`

Resultat : succes
Code retour : `0`

## 6. Decision patch

- Session AUDIT
- Decision : `NO_PATCH_CODE`
- Aucun fichier applicatif modifie (`app/**`, `lib/**`, `prisma/**`)